"use client";

import { useState } from "react";
import {
  DISCIPLINE_LEVELS,
  STREAK_MESSAGES,
  STREAK_MULTIPLIERS,
  BADGE_DEFINITIONS,
} from "@/lib/constants";
import {
  Trophy, Flame, Zap, Target, TrendingUp,
  Calendar, Award, Shield, ChevronLeft, ChevronRight,
} from "lucide-react";
import RestDayModal from "./RestDayModal";
import { useRouter } from "next/navigation";

type BadgeRecord = { badge_key: string; unlocked_at: string | Date };

type MonthlyData = {
  year: number;
  month: number;
  dayCells: Array<{
    date: string | Date;
    dayNum: number;
    isWeekend: boolean;
    status: "perfect" | "partial" | "failed" | "rest" | "none" | "future";
    totalTrades: number;
    inPlanTrades: number;
  }>;
  stats: {
    tradingDays: number;
    restDays: number;
    totalTrades: number;
    inPlanTrades: number;
    adherence: number;
    perfectDays: number;
    failedDays: number;
  };
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
  badges: BadgeRecord[];
};

export default function ChallengePageClient({
  profile,
  monthly,
}: {
  profile: ProfileData;
  monthly: MonthlyData;
}) {
  const router = useRouter();
  const [showRestModal, setShowRestModal] = useState(false);

  const streakMsg =
    STREAK_MESSAGES.find(
      (m) => profile.current_streak >= m.min && profile.current_streak <= m.max
    )?.message ?? "";

  const MONTH_NAMES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  const statusColors: Record<string, { bg: string; border: string; text: string }> = {
    perfect: { bg: "rgba(34,197,94,0.18)", border: "rgba(34,197,94,0.35)", text: "var(--green)" },
    partial: { bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)", text: "var(--amber)" },
    failed:  { bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)", text: "var(--red)" },
    rest:    { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.25)", text: "#3b82f6" },
    none:    { bg: "var(--bg-elevated)", border: "var(--border)", text: "var(--text-muted)" },
    future:  { bg: "transparent", border: "var(--border)", text: "var(--text-muted)" },
  };

  const statusEmoji: Record<string, string> = {
    perfect: "✅", partial: "🟡", failed: "❌", rest: "🧘", none: "", future: "",
  };

  // Compute first day offset for calendar grid
  const firstDayOfMonth = new Date(monthly.year, monthly.month, 1);
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7; // Mon=0

  const unlockedKeys = new Set(profile.badges.map((b) => b.badge_key));

  const handleMonthNav = (dir: -1 | 1) => {
    const now = new Date();
    let newMonth = monthly.month + dir;
    let newYear = monthly.year;
    if (newMonth < 0) { newMonth = 11; newYear--; }
    if (newMonth > 11) { newMonth = 0; newYear++; }
    // Don't go past current month
    if (newYear > now.getFullYear() || (newYear === now.getFullYear() && newMonth > now.getMonth())) return;
    router.push(`/challenge?year=${newYear}&month=${newMonth}`);
  };

  return (
    <>
      {showRestModal && (
        <RestDayModal onClose={() => { setShowRestModal(false); router.refresh(); }} />
      )}

      <div className="p-6 max-w-5xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Trophy size={24} style={{ color: "var(--brand)" }} />
              Disciplina XP
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Tu sistema de progresión de disciplina
            </p>
          </div>
          <button
            onClick={() => setShowRestModal(true)}
            className="btn btn-ghost flex items-center gap-2"
          >
            🧘 Registrar Descanso
          </button>
        </div>

        {/* ── Hero Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Level */}
          <div className="card p-5 text-center">
            <div className="text-4xl mb-2">{profile.levelInfo.emoji}</div>
            <p className="text-lg font-bold">{profile.levelInfo.name}</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Nivel {profile.current_level}</p>
            {/* XP Bar */}
            <div className="mt-3">
              <div className="rounded-full overflow-hidden" style={{ height: 5, background: "var(--bg-elevated)" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(profile.xpProgress, 100)}%`,
                    background: "linear-gradient(90deg, #6366f1, #a855f7)",
                  }}
                />
              </div>
              <p className="text-[10px] mt-1.5 font-mono" style={{ color: "var(--text-muted)" }}>
                {profile.total_xp} / {profile.nextLevelInfo?.xp_required ?? "MAX"} XP
              </p>
            </div>
          </div>

          {/* Streak */}
          <div className="card p-5 text-center">
            <Flame
              size={32}
              className={`mx-auto mb-2 ${profile.current_streak >= 5 ? "animate-pulse" : ""}`}
              style={{ color: profile.current_streak > 0 ? "var(--amber)" : "var(--text-muted)" }}
            />
            <p className="text-3xl font-bold font-mono" style={{ color: profile.current_streak > 0 ? "var(--amber)" : "var(--text-muted)" }}>
              {profile.current_streak}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Racha actual</p>
            {profile.multiplier > 1 && (
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold"
                style={{ background: "rgba(245,158,11,0.15)", color: "var(--amber)" }}>
                <Zap size={10} /> ×{profile.multiplier} XP
              </div>
            )}
          </div>

          {/* Best Streak */}
          <div className="card p-5 text-center">
            <Shield size={32} className="mx-auto mb-2" style={{ color: "var(--brand)" }} />
            <p className="text-3xl font-bold font-mono" style={{ color: "var(--brand)" }}>
              {profile.best_streak}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Mejor racha</p>
          </div>

          {/* Monthly Adherence */}
          <div className="card p-5 text-center">
            <Target size={32} className="mx-auto mb-2"
              style={{ color: monthly.stats.adherence >= 80 ? "var(--green)" : monthly.stats.adherence >= 60 ? "var(--amber)" : "var(--red)" }}
            />
            <p className="text-3xl font-bold font-mono"
              style={{ color: monthly.stats.adherence >= 80 ? "var(--green)" : monthly.stats.adherence >= 60 ? "var(--amber)" : "var(--red)" }}>
              {monthly.stats.adherence.toFixed(0)}%
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Adherencia este mes</p>
          </div>
        </div>

        {/* Motivation */}
        <div className="text-center py-2">
          <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            {streakMsg}
          </p>
        </div>

        {/* ── Level Progress ── */}
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
            Progresión de Niveles
          </p>
          <div className="flex items-center gap-1">
            {DISCIPLINE_LEVELS.map((l) => {
              const isActive = l.level === profile.current_level;
              const isPast = l.level < profile.current_level;
              return (
                <div key={l.level} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className="w-full h-2 rounded-full transition-all"
                    style={{
                      background: isPast || isActive
                        ? "linear-gradient(90deg, #6366f1, #a855f7)"
                        : "var(--bg-elevated)",
                      opacity: isPast ? 0.5 : 1,
                    }}
                  />
                  <span
                    className="text-sm"
                    style={{ opacity: isActive ? 1 : isPast ? 0.7 : 0.3 }}
                    title={`${l.name} — ${l.xp_required} XP`}
                  >
                    {l.emoji}
                  </span>
                  {isActive && (
                    <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>
                      Actual
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Monthly Calendar Heatmap ── */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar size={18} style={{ color: "var(--text-muted)" }} />
              <h2 className="text-sm font-semibold">
                {MONTH_NAMES[monthly.month]} {monthly.year}
              </h2>
            </div>
            <div className="flex gap-1">
              <button onClick={() => handleMonthNav(-1)} className="btn btn-ghost p-1.5">
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => handleMonthNav(1)} className="btn btn-ghost p-1.5">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1.5 mb-1.5">
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
              <div key={d} className="text-center text-[10px] font-medium py-1" style={{ color: "var(--text-muted)" }}>
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty cells for offset */}
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Day cells */}
            {monthly.dayCells.map((cell) => {
              const colors = statusColors[cell.status];
              const today = new Date();
              const cellDate = new Date(cell.date);
              const isToday = cellDate.toDateString() === today.toDateString();

              return (
                <div
                  key={cell.dayNum}
                  className="aspect-square rounded-lg flex flex-col items-center justify-center transition-all relative text-xs"
                  style={{
                    background: colors.bg,
                    border: isToday
                      ? "2px solid var(--brand)"
                      : `1px solid ${colors.border}`,
                    opacity: cell.isWeekend && cell.status === "none" ? 0.4 : 1,
                  }}
                  title={
                    cell.status === "rest"
                      ? "Descanso inteligente"
                      : cell.totalTrades > 0
                      ? `${cell.inPlanTrades}/${cell.totalTrades} en plan`
                      : cell.status === "future"
                      ? "Futuro"
                      : "Sin trades"
                  }
                >
                  <span className="text-[10px] font-mono" style={{ color: colors.text }}>
                    {cell.dayNum}
                  </span>
                  {statusEmoji[cell.status] && (
                    <span className="text-[10px] leading-none">{statusEmoji[cell.status]}</span>
                  )}
                  {cell.totalTrades > 0 && cell.status !== "rest" && (
                    <span className="text-[8px] font-mono" style={{ color: "var(--text-muted)" }}>
                      {cell.inPlanTrades}/{cell.totalTrades}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            {[
              { status: "perfect", label: "100% Plan" },
              { status: "partial", label: "Parcial" },
              { status: "failed", label: "Fuera plan" },
              { status: "rest", label: "Descanso" },
              { status: "none", label: "Sin trades" },
            ].map(({ status, label }) => (
              <div key={status} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded"
                  style={{
                    background: statusColors[status].bg,
                    border: `1px solid ${statusColors[status].border}`,
                  }}
                />
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Monthly stats */}
          <div className="grid grid-cols-4 gap-3 mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="text-center">
              <p className="text-lg font-bold font-mono" style={{ color: "var(--green)" }}>{monthly.stats.perfectDays}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Días perfectos</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold font-mono" style={{ color: "var(--red)" }}>{monthly.stats.failedDays}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Días fallidos</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold font-mono" style={{ color: "#3b82f6" }}>{monthly.stats.restDays}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Descansos</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold font-mono" style={{ color: "var(--brand)" }}>{monthly.stats.totalTrades}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Total trades</p>
            </div>
          </div>
        </div>

        {/* ── Badges ── */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Award size={18} style={{ color: "var(--amber)" }} />
            <h2 className="text-sm font-semibold">Insignias</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-lg"
              style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>
              {profile.badges.length}/{BADGE_DEFINITIONS.length}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {BADGE_DEFINITIONS.map((badge) => {
              const unlocked = unlockedKeys.has(badge.key);
              const record = profile.badges.find((b) => b.badge_key === badge.key);

              return (
                <div
                  key={badge.key}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all"
                  style={{
                    background: unlocked ? "rgba(245,158,11,0.08)" : "var(--bg-elevated)",
                    border: unlocked
                      ? "1px solid rgba(245,158,11,0.25)"
                      : "1px solid var(--border)",
                    opacity: unlocked ? 1 : 0.45,
                  }}
                >
                  <span className="text-2xl" style={{ filter: unlocked ? "none" : "grayscale(100%)" }}>
                    {badge.emoji}
                  </span>
                  <p className="text-xs font-semibold leading-tight" style={{ color: unlocked ? "var(--text-primary)" : "var(--text-muted)" }}>
                    {badge.name}
                  </p>
                  <p className="text-[10px] leading-snug" style={{ color: "var(--text-muted)" }}>
                    {badge.description}
                  </p>
                  {unlocked && record && (
                    <p className="text-[9px] font-mono" style={{ color: "var(--amber)" }}>
                      {new Date(record.unlocked_at).toLocaleDateString("es-ES")}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}
