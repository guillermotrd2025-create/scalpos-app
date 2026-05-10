"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  DISCIPLINE_LEVELS,
  XP_VALUES,
  STREAK_MULTIPLIERS,
} from "@/lib/constants";

// ── Helper: get or create singleton profile ──────────────────
async function ensureProfile() {
  let profile = await prisma.disciplineProfile.findUnique({
    where: { id: 1 },
    include: { badges: true, rest_days: true },
  });
  if (!profile) {
    profile = await prisma.disciplineProfile.create({
      data: { id: 1 },
      include: { badges: true, rest_days: true },
    });
  }
  return profile;
}

// ── Helper: compute level from total XP ─────────────────────
function computeLevel(totalXp: number): number {
  let level = 1;
  for (const l of DISCIPLINE_LEVELS) {
    if (totalXp >= l.xp_required) level = l.level;
  }
  return level;
}

// ── Helper: get multiplier for streak ───────────────────────
function getMultiplier(streak: number): number {
  for (const tier of STREAK_MULTIPLIERS) {
    if (streak >= tier.min && streak <= tier.max) return tier.multiplier;
  }
  return 1.0;
}

// ── Get profile (public) ────────────────────────────────────
export async function getProfile() {
  const profile = await ensureProfile();
  const level = DISCIPLINE_LEVELS.find((l) => l.level === profile.current_level) ?? DISCIPLINE_LEVELS[0];
  const nextLevel = DISCIPLINE_LEVELS.find((l) => l.level === profile.current_level + 1);
  const multiplier = getMultiplier(profile.current_streak);
  const multiplierTier = STREAK_MULTIPLIERS.find(
    (t) => profile.current_streak >= t.min && profile.current_streak <= t.max
  );

  return {
    ...profile,
    levelInfo: level,
    nextLevelInfo: nextLevel ?? null,
    xpForNextLevel: nextLevel ? nextLevel.xp_required - profile.total_xp : 0,
    xpProgress: nextLevel
      ? ((profile.total_xp - level.xp_required) / (nextLevel.xp_required - level.xp_required)) * 100
      : 100,
    multiplier,
    multiplierLabel: multiplierTier?.label ?? "Base",
  };
}

// ── Award XP after a trade ──────────────────────────────────
export async function awardTradeXP(data: {
  isInPlan: boolean;
  executionScore: number;
  mistakeCount: number;
}): Promise<{
  xpAwarded: number;
  newStreak: number;
  streakBroken: boolean;
  previousStreak: number;
  newLevel: number;
  leveledUp: boolean;
  newBadges: string[];
  totalXp: number;
  multiplier: number;
}> {
  const profile = await ensureProfile();
  const previousStreak = profile.current_streak;
  let xpBase = 0;
  let newStreak = profile.current_streak;
  let streakBroken = false;

  if (data.isInPlan) {
    // Base XP
    xpBase = XP_VALUES.TRADE_IN_PLAN;

    // Bonuses
    if (data.executionScore >= 8) xpBase += XP_VALUES.EXECUTION_BONUS;
    if (data.mistakeCount === 0) xpBase += XP_VALUES.CLEAN_TRADE_BONUS;

    // Streak multiplier
    newStreak = profile.current_streak + 1;
  } else {
    // Out of plan: no XP, streak resets
    xpBase = 0;
    newStreak = 0;
    streakBroken = profile.current_streak > 0;
  }

  const multiplier = getMultiplier(data.isInPlan ? newStreak - 1 : 0);
  const xpAwarded = Math.floor(xpBase * multiplier);
  const newTotalXp = profile.total_xp + xpAwarded;
  const newLevel = computeLevel(newTotalXp);
  const leveledUp = newLevel > profile.current_level;
  const newBestStreak = Math.max(profile.best_streak, newStreak);

  // Update profile
  await prisma.disciplineProfile.update({
    where: { id: 1 },
    data: {
      total_xp: newTotalXp,
      current_level: newLevel,
      current_streak: newStreak,
      best_streak: newBestStreak,
    },
  });

  // Check and award badges
  const newBadges = await checkAndAwardBadges(newStreak, newTotalXp, newLevel, data.isInPlan);

  revalidatePath("/");
  revalidatePath("/challenge");

  return {
    xpAwarded,
    newStreak,
    streakBroken,
    previousStreak,
    newLevel,
    leveledUp,
    newBadges,
    totalXp: newTotalXp,
    multiplier,
  };
}

// ── Register rest day ───────────────────────────────────────
export async function registerRestDay(reason: string) {
  const profile = await ensureProfile();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if already registered today
  const existing = await prisma.restDay.findFirst({
    where: {
      profile_id: 1,
      date: today,
    },
  });

  if (existing) {
    return { error: "Ya has registrado un día de descanso hoy." };
  }

  // Check if there are trades today (can't rest if already traded)
  const todayStart = new Date(today);
  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);
  const tradesCount = await prisma.trade.count({
    where: {
      time: { gte: todayStart, lte: todayEnd },
    },
  });

  if (tradesCount > 0) {
    return { error: "Ya has operado hoy. No puedes registrar día de descanso." };
  }

  // Create rest day
  await prisma.restDay.create({
    data: {
      profile_id: 1,
      date: today,
      reason,
    },
  });

  // Award XP for rest day (streak preserved)
  const xpAwarded = XP_VALUES.REST_DAY;
  const newTotalXp = profile.total_xp + xpAwarded;
  const newLevel = computeLevel(newTotalXp);

  await prisma.disciplineProfile.update({
    where: { id: 1 },
    data: {
      total_xp: newTotalXp,
      current_level: newLevel,
    },
  });

  // Check SMART_REST badge
  await checkAndAwardBadges(profile.current_streak, newTotalXp, newLevel, true);

  revalidatePath("/");
  revalidatePath("/challenge");

  return { success: true, xpAwarded };
}

// ── Weekly summary (Mon-Fri) ────────────────────────────────
export async function getWeeklySummary() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);
  friday.setHours(23, 59, 59, 999);

  // Get trades for the week
  const trades = await prisma.trade.findMany({
    where: {
      time: { gte: monday, lte: friday },
    },
    select: { time: true, is_in_plan: true },
    orderBy: { time: "asc" },
  });

  // Get rest days for the week
  const restDays = await prisma.restDay.findMany({
    where: {
      profile_id: 1,
      date: { gte: monday, lte: friday },
    },
  });

  // Build 5-day summary (Mon-Fri)
  const days: Array<{
    date: Date;
    label: string;
    status: "perfect" | "partial" | "failed" | "rest" | "pending";
    totalTrades: number;
    inPlanTrades: number;
  }> = [];

  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dayLabels = ["Lun", "Mar", "Mié", "Jue", "Vie"];

    const dayTrades = trades.filter((t) => {
      const td = new Date(t.time);
      return td.toDateString() === d.toDateString();
    });

    const isRest = restDays.some((r) => new Date(r.date).toDateString() === d.toDateString());
    const totalTrades = dayTrades.length;
    const inPlanTrades = dayTrades.filter((t) => t.is_in_plan).length;

    let status: "perfect" | "partial" | "failed" | "rest" | "pending";
    if (d > today) {
      status = "pending";
    } else if (isRest) {
      status = "rest";
    } else if (totalTrades === 0) {
      status = "pending";
    } else if (inPlanTrades === totalTrades) {
      status = "perfect";
    } else if (inPlanTrades / totalTrades >= 0.8) {
      status = "partial";
    } else {
      status = "failed";
    }

    days.push({
      date: d,
      label: dayLabels[i],
      status,
      totalTrades,
      inPlanTrades,
    });
  }

  const isPerfectWeek = days
    .filter((d) => d.status !== "pending")
    .every((d) => d.status === "perfect" || d.status === "rest");

  return { days, isPerfectWeek, mondayDate: monday };
}

// ── Monthly summary (heatmap) ───────────────────────────────
export async function getMonthlySummary(year?: number, month?: number) {
  const now = new Date();
  const y = year ?? now.getFullYear();
  const m = month ?? now.getMonth(); // 0-indexed

  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0, 23, 59, 59, 999);

  const trades = await prisma.trade.findMany({
    where: {
      time: { gte: firstDay, lte: lastDay },
    },
    select: { time: true, is_in_plan: true },
    orderBy: { time: "asc" },
  });

  const restDays = await prisma.restDay.findMany({
    where: {
      profile_id: 1,
      date: { gte: firstDay, lte: lastDay },
    },
  });

  // Build day-by-day map
  const daysInMonth = lastDay.getDate();
  const dayCells: Array<{
    date: Date;
    dayNum: number;
    isWeekend: boolean;
    status: "perfect" | "partial" | "failed" | "rest" | "none" | "future";
    totalTrades: number;
    inPlanTrades: number;
  }> = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, m, d);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const dayTrades = trades.filter((t) => new Date(t.time).getDate() === d);
    const isRest = restDays.some((r) => new Date(r.date).getDate() === d);
    const totalTrades = dayTrades.length;
    const inPlanTrades = dayTrades.filter((t) => t.is_in_plan).length;

    let status: "perfect" | "partial" | "failed" | "rest" | "none" | "future";
    if (date > now) {
      status = "future";
    } else if (isRest) {
      status = "rest";
    } else if (totalTrades === 0) {
      status = "none";
    } else if (inPlanTrades === totalTrades) {
      status = "perfect";
    } else if (inPlanTrades / totalTrades >= 0.5) {
      status = "partial";
    } else {
      status = "failed";
    }

    dayCells.push({
      date,
      dayNum: d,
      isWeekend,
      status,
      totalTrades,
      inPlanTrades,
    });
  }

  // Monthly stats
  const tradingDays = dayCells.filter((d) => d.totalTrades > 0);
  const totalTrades = trades.length;
  const inPlanTrades = trades.filter((t) => t.is_in_plan).length;
  const adherence = totalTrades > 0 ? (inPlanTrades / totalTrades) * 100 : 0;

  return {
    year: y,
    month: m,
    dayCells,
    stats: {
      tradingDays: tradingDays.length,
      restDays: restDays.length,
      totalTrades,
      inPlanTrades,
      adherence,
      perfectDays: tradingDays.filter((d) => d.status === "perfect").length,
      failedDays: tradingDays.filter((d) => d.status === "failed").length,
    },
  };
}

// ── Get badges ──────────────────────────────────────────────
export async function getBadges() {
  const profile = await ensureProfile();
  return profile.badges;
}

// ── Check and award badges ──────────────────────────────────
async function checkAndAwardBadges(
  currentStreak: number,
  totalXp: number,
  currentLevel: number,
  lastTradeInPlan: boolean,
): Promise<string[]> {
  const profile = await ensureProfile();
  const existingKeys = new Set(profile.badges.map((b) => b.badge_key));
  const newBadges: string[] = [];

  const maybeAward = async (key: string) => {
    if (!existingKeys.has(key)) {
      await prisma.badge.create({
        data: { profile_id: 1, badge_key: key },
      });
      newBadges.push(key);
    }
  };

  // FIRST_BLOOD: first in-plan trade
  if (lastTradeInPlan) {
    await maybeAward("FIRST_BLOOD");
  }

  // STREAK badges
  if (currentStreak >= 10) await maybeAward("STREAK_10");
  if (currentStreak >= 25) await maybeAward("STREAK_25");
  if (currentStreak >= 50) await maybeAward("STREAK_50");
  if (currentStreak >= 100) await maybeAward("PLAN_IS_LAW");

  // SMART_REST: first rest day
  const restCount = await prisma.restDay.count({ where: { profile_id: 1 } });
  if (restCount > 0) await maybeAward("SMART_REST");

  // WISE_WEEK: 3+ rest days in current month
  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const monthlyRestDays = await prisma.restDay.count({
    where: {
      profile_id: 1,
      date: { gte: firstOfMonth, lte: lastOfMonth },
    },
  });
  if (monthlyRestDays >= 3) await maybeAward("WISE_WEEK");

  // PERFECT_WEEK: check current week
  const weekly = await getWeeklySummary();
  if (weekly.isPerfectWeek) {
    const operativeDays = weekly.days.filter((d) => d.status !== "pending");
    if (operativeDays.length >= 5) {
      await maybeAward("PERFECT_WEEK");
    }
  }

  // MONTHLY_DISC: 20 trading days, ≥90% in plan
  const monthly = await getMonthlySummary();
  if (monthly.stats.tradingDays >= 20 && monthly.stats.adherence >= 90) {
    await maybeAward("MONTHLY_DISC");
  }

  return newBadges;
}
