"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// ── Create a new session ─────────────────────────────────────
export async function createSession(data: {
  date?: string;
  start_time: string;
  mental_state: string;
  checklist_passed: boolean;
  notes?: string;
}) {
  // Horario restriction removed for development — will be re-added later
  
  if (!data.checklist_passed) {
    return { error: "Debes aprobar el checklist pre-vuelo obligatoriamente." };
  }

  // Prevent multiple active sessions
  const activeSession = await prisma.session.findFirst({
    where: { is_closed: false }
  });

  if (activeSession) {
    return { error: "Ya tienes una sesión activa. Ciérrala antes de abrir una nueva." };
  }

  try {
    const session = await prisma.session.create({
      data: {
        date:             new Date(data.date ?? Date.now()),
        start_time:       new Date(data.start_time),
        mental_state:     data.mental_state,
        checklist_passed: data.checklist_passed,
        notes:            data.notes ?? null,
        discipline_score: 100,
      },
    });
    revalidatePath("/");
    revalidatePath("/sessions");
    return session;
  } catch (err) {
    console.error("[CREATE SESSION ERROR]", err);
    return { error: "Error de base de datos al crear la sesión." };
  }
}

// ── Get all sessions (paginated desc by date) ────────────────
export async function getSessions(limit = 30, offset = 0) {
  await autoCloseStaleSessions();

  return prisma.session.findMany({
    orderBy: { date: "desc" },
    take:    limit,
    skip:    offset,
    include: {
      trades: {
        include: { mistakes: true, checklist: true },
      },
    },
  });
}


// ── Get single session ───────────────────────────────────────
export async function getSession(id: number) {
  return prisma.session.findUnique({
    where: { id },
    include: {
      trades: {
        orderBy: { time: "asc" },
        include: { mistakes: true, checklist: true },
      },
    },
  });
}

// ── Auto-close stale sessions (from previous days) ──────────
async function autoCloseStaleSessions() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const staleSessions = await prisma.session.findMany({
    where: {
      is_closed: false,
      date: { lt: startOfDay }
    }
  });

  for (const sess of staleSessions) {
    await prisma.session.update({
      where: { id: sess.id },
      data: {
        is_closed: true,
        end_time: new Date(),
        conclusion: "Sesión cerrada automáticamente al acabar el día.",
      }
    });
  }
}

// ── Get today's open session (or null) ───────────────────────
export async function getTodaySession() {
  await autoCloseStaleSessions();

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return prisma.session.findFirst({
    where: {
      date:      { gte: start, lte: end },
      is_closed: false,
    },
    include: {
      trades: { include: { mistakes: true, checklist: true } },
    },
    orderBy: { created_at: "desc" },
  });
}


// ── Close a session (requires conclusion) ───────────────────
export async function closeSession(
  id: number,
  conclusion: string,
  disciplineScore: number
) {
  if (!conclusion.trim()) {
    throw new Error("Debes escribir una conclusión antes de cerrar la sesión.");
  }

  const session = await prisma.session.update({
    where: { id },
    data: {
      is_closed:       true,
      end_time:        new Date(),
      conclusion:      conclusion.trim(),
      discipline_score: disciplineScore,
    },
  });
  revalidatePath("/");
  revalidatePath("/sessions");
  return session;
}

// ── Delete session ───────────────────────────────────────────
export async function deleteSession(id: number) {
  await prisma.session.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/sessions");
}

// ── Update session PnL ───────────────────────────────────────
export async function recalcSessionPnl(sessionId: number) {
  const trades = await prisma.trade.findMany({
    where: { session_id: sessionId },
    select: { result_pnl: true },
  });

  const totalPnl = trades.reduce((sum, t) => sum + t.result_pnl, 0);

  const mistakes = await prisma.mistake.findMany({
    where: { trade: { session_id: sessionId } },
    select: { penalty_score: true },
  });
  const totalPenalty = mistakes.reduce((sum, m) => sum + m.penalty_score, 0);

  const dodgedBullets = await prisma.dodgedBullet.count({
    where: { session_id: sessionId },
  });

  // Calculate score: 100 - penalties + (dodged_bullets * 5)
  const disciplineScore = Math.min(100, Math.max(0, 100 - totalPenalty + (dodgedBullets * 5)));

  return prisma.session.update({
    where: { id: sessionId },
    data: { total_pnl: totalPnl, discipline_score: disciplineScore },
  });
}

// ── Get dashboard stats ──────────────────────────────────────
export async function getDashboardStats() {
  const sessions = await prisma.session.findMany({
    orderBy: { date: "desc" },
    take: 30,
    include: {
      trades: {
        include: { mistakes: true, checklist: true },
      },
    },
  });

  const allTrades = sessions.flatMap((s) => s.trades);
  const totalTrades = allTrades.length;
  const winners     = allTrades.filter((t) => t.result_pnl > 0).length;
  const inPlan      = allTrades.filter((t) => t.is_in_plan).length;
  const winrate     = totalTrades > 0 ? (winners / totalTrades) * 100 : 0;
  const inPlanRate  = totalTrades > 0 ? (inPlan  / totalTrades) * 100 : 0;
  const totalPnl    = allTrades.reduce((s, t) => s + t.result_pnl, 0);

  const allMistakes = sessions.flatMap((s) => s.trades.flatMap((t) => t.mistakes));
  const mistakeMap: Record<string, number> = {};
  allMistakes.forEach((m) => {
    mistakeMap[m.mistake_type] = (mistakeMap[m.mistake_type] ?? 0) + 1;
  });

  const avgDiscipline =
    sessions.length > 0
      ? sessions.reduce((s, sess) => s + sess.discipline_score, 0) / sessions.length
      : 100;

  return {
    sessions,
    totalTrades,
    winrate,
    inPlanRate,
    totalPnl,
    avgDiscipline,
    mistakeMap,
  };
}
