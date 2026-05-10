"use client";

import Link from "next/link";
import { Trophy, Flame, Zap, ChevronRight } from "lucide-react";
import {
  DISCIPLINE_LEVELS,
  STREAK_MESSAGES,
  STREAK_MULTIPLIERS,
} from "@/lib/constants";

type WeekDay = {
  label: string;
  status: "perfect" | "partial" | "failed" | "rest" | "pending";
  totalTrades: number;
  inPlanTrades: number;
};

type ProfileData = {
  total_xp: number;
  current_level: number;
  current_streak: number;
  best_streak: number;
  xpProgress: number;
  xpForNextLevel: number;
  multiplier: number;
  multiplierLabel: string;
  levelInfo: (typeof DISCIPLINE_LEVELS)[number];
  nextLevelInfo: (typeof DISCIPLINE_LEVELS)[number] | null;
};

export default function ChallengeWidget({
  profile,
  weekDays,
}: {
  profile: ProfileData;
  weekDays: WeekDay[];
}) {
  const streakMsg =
    STREAK_MESSAGES.find(
      (m) => profile.current_streak >= m.min && profile.current_streak <= m.max
    )?.message ?? "";

  const multiplierTier = STREAK_MULTIPLIERS.find(
    (t) => profile.current_streak >= t.min && profile.current_streak <= t.max
  );

  const statusColors: Record<string, string> = {
    perfect: "var(--green)",
    partial: "var(--amber)",
    failed: "var(--red)",
    rest: "#3b82f6",
    pending: "var(--bg-muted)",
  };

  const statusBg: Record<string, string> = {
    perfect: "rgba(34,197,94,0.2)",
    partial: "rgba(245,158,11,0.2)",
    failed: "rgba(239,68,68,0.2)",
    rest: "rgba(59,130,246,0.15)",
    pending: "var(--bg-elevated)",
  };

  const statusEmoji: Record<string, string> = {
    perfect: "✅",
    partial: "🟡",
    failed: "❌",
    rest: "🧘",
    pending: "⬜",
  };

  return (
    <div className="card p-5 animate-fade-in" style={{ overflow: "hidden" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{
              background: "var(--brand-dim)",
              border: "1px solid rgba(99,102,241,0.3)",
            }}
          >
            <Trophy size={18} style={{ color: "var(--brand)" }} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--brand)" }}>
              Disciplina XP
            </p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              Nivel {profile.current_level} · {profile.levelInfo.name} {profile.levelInfo.emoji}
            </p>
          </div>
        </div>
        <Link
          href="/challenge"
          className="btn btn-ghost text-xs flex items-center gap-1"
        >
          Ver todo <ChevronRight size={12} />
        </Link>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-mono font-semibold" style={{ color: "var(--brand)" }}>
            {profile.total_xp} XP
          </span>
          {profile.nextLevelInfo && (
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              {profile.xpForNextLevel} XP para Nivel {profile.nextLevelInfo.level} {profile.nextLevelInfo.emoji}
            </span>
          )}
        </div>
        <div
          className="rounded-full overflow-hidden"
          style={{ height: 6, background: "var(--bg-elevated)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.min(profile.xpProgress, 100)}%`,
              background: "linear-gradient(90deg, #6366f1, #a855f7)",
            }}
          />
        </div>
      </div>

      {/* Streak + Multiplier */}
      <div
        className="flex items-center justify-between rounded-xl p-3 mb-4"
        style={{
          background: profile.current_streak > 0
            ? "rgba(245,158,11,0.08)"
            : "var(--bg-elevated)",
          border: profile.current_streak > 0
            ? "1px solid rgba(245,158,11,0.2)"
            : "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Flame
              size={20}
              style={{
                color: profile.current_streak > 0 ? "var(--amber)" : "var(--text-muted)",
              }}
              className={profile.current_streak >= 5 ? "animate-pulse" : ""}
            />
            <span
              className="text-2xl font-bold font-mono"
              style={{
                color: profile.current_streak > 0 ? "var(--amber)" : "var(--text-muted)",
              }}
            >
              {profile.current_streak}
            </span>
          </div>
          <div>
            <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              Racha de trades
            </p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              Mejor: {profile.best_streak}
            </p>
          </div>
        </div>
        {profile.multiplier > 1 && (
          <div
            className="px-2.5 py-1 rounded-lg text-xs font-bold"
            style={{
              background: "rgba(245,158,11,0.15)",
              color: "var(--amber)",
              border: "1px solid rgba(245,158,11,0.3)",
            }}
          >
            <Zap size={10} className="inline mr-0.5" />
            ×{profile.multiplier}
          </div>
        )}
      </div>

      {/* Weekly mini calendar */}
      <div className="mb-3">
        <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
          Esta semana
        </p>
        <div className="flex gap-1.5">
          {weekDays.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
                {day.label}
              </span>
              <div
                className="w-full aspect-square rounded-lg flex items-center justify-center text-xs transition-all"
                style={{
                  background: statusBg[day.status],
                  border: `1px solid ${day.status === "pending" ? "var(--border)" : statusColors[day.status]}30`,
                }}
                title={
                  day.status === "rest"
                    ? "Descanso inteligente"
                    : day.totalTrades > 0
                    ? `${day.inPlanTrades}/${day.totalTrades} en plan`
                    : "Sin trades"
                }
              >
                {statusEmoji[day.status]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational message */}
      <p
        className="text-xs text-center leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {streakMsg}
      </p>
    </div>
  );
}
