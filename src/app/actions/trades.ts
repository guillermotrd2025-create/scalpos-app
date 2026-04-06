"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { calcRiskScore } from "@/lib/utils";
import { recalcSessionPnl } from "./sessions";

// ── Check cooldown ──────────────────────────────────────────────
export async function getLastTradeTime(): Promise<string | null> {
  const lastTrade = await prisma.trade.findFirst({
    orderBy: { created_at: "desc" },
  });
  return lastTrade ? lastTrade.created_at.toISOString() : null;
}

// ── Create trade with checklist + mistakes ────────────────────
export async function createTrade(data: {
  session_id: number;
  account_id: number;
  setup_a_passed: boolean;
  risk_accepted: boolean;
  execution_score: number;
  time?: string;
  asset?: string;
  direction: string;
  setup_type: string;
  rr_planned: number;
  entry_price?: number;
  sl_price?: number;
  tp_price?: number;
  result_pnl: number;
  is_in_plan: boolean;
  notes?: string;
  screenshot_pre?: string;
  screenshot_post?: string;
  // Emotions (3-phase)
  emotion_pre?: string;
  emotion_during?: string;
  emotion_post?: string;
  // Checklist
  checklist: {
    has_fomo: boolean;
    is_extended: boolean;
    is_chasing: boolean;
    is_revenge_trade: boolean;
    is_out_of_hours: boolean;
    trend_aligned: boolean;
    pullback_ema: boolean;
    atr_above_avg: boolean;
    vwap_favor: boolean;
    break_structure: boolean;
  };
  // Mistake tags
  mistakes?: Array<{ mistake_type: string; penalty_score: number; note?: string }>;
}) {
  const riskScore = calcRiskScore(data.checklist);

  const trade = await prisma.trade.create({
    data: {
      session_id:     data.session_id,
      account_id:     data.account_id,
      setup_a_passed: data.setup_a_passed,
      risk_accepted:  data.risk_accepted,
      execution_score:data.execution_score,
      time:           data.time ? new Date(data.time) : new Date(),
      asset:          data.asset ?? "DAX",
      direction:      data.direction,
      setup_type:     data.setup_type,
      rr_planned:     data.rr_planned,
      entry_price:    data.entry_price ?? null,
      sl_price:       data.sl_price ?? null,
      tp_price:       data.tp_price ?? null,
      result_pnl:     data.result_pnl,
      is_in_plan:     data.is_in_plan,
      notes:          data.notes ?? null,
      screenshot_pre: data.screenshot_pre ?? null,
      screenshot_post: data.screenshot_post ?? null,
      emotion_pre:    data.emotion_pre ?? null,
      emotion_during: data.emotion_during ?? null,
      emotion_post:   data.emotion_post ?? null,
      checklist: {
        create: {
          ...data.checklist,
          risk_score: riskScore,
        },
      },
      mistakes: {
        create: [
          ...(data.mistakes ?? []),
          // Auto-add danger trade penalty if red flags exist
          ...((data.checklist.has_fomo || data.checklist.is_extended || data.checklist.is_chasing || data.checklist.is_revenge_trade || data.checklist.is_out_of_hours)
            ? [{ mistake_type: "DANGER_TRADE", penalty_score: 15, note: "Operado con señales de peligro activas." }]
            : [])
        ]
      },
    },
    include: { checklist: true, mistakes: true },
  });

  // Recalculate session totals
  await recalcSessionPnl(data.session_id);

  revalidatePath("/");
  revalidatePath("/trades");
  revalidatePath(`/sessions/${data.session_id}`);

  return trade;
}

// ── Get trades (with filters) ────────────────────────────────
export async function getTrades(filters?: {
  session_id?: number;
  setup_type?: string;
  direction?: string;
  is_in_plan?: boolean;
  has_mistakes?: boolean;
  limit?: number;
  offset?: number;
}) {
  const where: Record<string, unknown> = {};
  if (filters?.session_id)  where.session_id = filters.session_id;
  if (filters?.setup_type)  where.setup_type  = filters.setup_type;
  if (filters?.direction)   where.direction   = filters.direction;
  if (filters?.is_in_plan !== undefined) where.is_in_plan = filters.is_in_plan;
  if (filters?.has_mistakes) {
    where.mistakes = { some: {} };
  }

  return prisma.trade.findMany({
    where,
    orderBy: { time: "desc" },
    take:    filters?.limit  ?? 50,
    skip:    filters?.offset ?? 0,
    include: {
      session:   { select: { date: true, is_closed: true } },
      checklist: true,
      mistakes:  true,
    },
  });
}

// ── Get single trade ─────────────────────────────────────────
export async function getTrade(id: number) {
  return prisma.trade.findUnique({
    where: { id },
    include: { session: true, checklist: true, mistakes: true },
  });
}

// ── Update trade screenshots ─────────────────────────────────
export async function updateTradeScreenshots(
  tradeId: number,
  data: { screenshot_pre?: string; screenshot_post?: string }
) {
  const trade = await prisma.trade.update({
    where: { id: tradeId },
    data,
  });
  revalidatePath("/trades");
  revalidatePath(`/trades/${tradeId}`);
  return trade;
}

// ── Add mistake to existing trade ────────────────────────────
export async function addMistake(
  tradeId: number,
  mistakeType: string,
  penaltyScore: number,
  note?: string
) {
  const mistake = await prisma.mistake.create({
    data: { trade_id: tradeId, mistake_type: mistakeType, penalty_score: penaltyScore, note },
  });
  const trade = await prisma.trade.findUnique({ where: { id: tradeId }, select: { session_id: true } });
  if (trade) await recalcSessionPnl(trade.session_id);
  revalidatePath("/trades");
  return mistake;
}

// ── Delete trade ─────────────────────────────────────────────
export async function deleteTrade(tradeId: number) {
  const trade = await prisma.trade.findUnique({ where: { id: tradeId }, select: { session_id: true } });
  await prisma.trade.delete({ where: { id: tradeId } });
  if (trade) await recalcSessionPnl(trade.session_id);
  revalidatePath("/trades");
  revalidatePath("/");
}

// ── Create Dodged Bullet (Prevented Trade) ──────────────────
export async function createDodgedBullet(sessionId: number, reason?: string) {
  const bullet = await prisma.dodgedBullet.create({
    data: {
      session_id: sessionId,
      reason: reason ?? "Disciplina: Trade abortado por no cumplir criterios.",
    },
  });

  // Re-calculate to give points
  await recalcSessionPnl(sessionId);

  revalidatePath("/");
  revalidatePath("/sessions");
  return bullet;
}
