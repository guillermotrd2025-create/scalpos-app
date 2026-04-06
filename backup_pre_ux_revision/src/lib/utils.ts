import { DISCIPLINE_THRESHOLDS, MISTAKE_TYPES } from "./constants";

// ── Class merger (lightweight clsx) ─────────────────────────
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// ── Number formatters ────────────────────────────────────────
export function formatPnl(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}€${Math.abs(value).toFixed(2)}`;
}

export function formatPnlShort(value: number): string {
  const sign = value >= 0 ? "+" : "-";
  return `${sign}${Math.abs(value).toFixed(0)}`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Discipline score color ───────────────────────────────────
export function getDisciplineColor(score: number): string {
  if (score >= DISCIPLINE_THRESHOLDS.EXCELLENT) return "#22c55e"; // green
  if (score >= DISCIPLINE_THRESHOLDS.GOOD)      return "#84cc16"; // lime
  if (score >= DISCIPLINE_THRESHOLDS.WARNING)   return "#f59e0b"; // amber
  return "#ef4444";                                                // red
}

export function getDisciplineLabel(score: number): string {
  if (score >= DISCIPLINE_THRESHOLDS.EXCELLENT) return "Excelente";
  if (score >= DISCIPLINE_THRESHOLDS.GOOD)      return "Bueno";
  if (score >= DISCIPLINE_THRESHOLDS.WARNING)   return "En riesgo";
  return "Crítico";
}

// ── Calculate discipline score from mistakes ─────────────────
export function calcDisciplineScore(mistakes: { penalty_score: number }[]): number {
  const totalPenalty = mistakes.reduce((acc, m) => acc + m.penalty_score, 0);
  return Math.max(0, 100 - totalPenalty);
}

// ── Calculate pre-trade risk score ──────────────────────────
export function calcRiskScore(checklist: {
  has_fomo: boolean;
  is_extended: boolean;
  is_chasing: boolean;
  is_revenge_trade: boolean;
  has_confirmation: boolean;
  is_correct_session: boolean;
  has_clear_sl: boolean;
  follows_higher_tf: boolean;
}): number {
  let score = 0;
  if (checklist.has_fomo)          score += 25;
  if (checklist.is_extended)       score += 20;
  if (checklist.is_chasing)        score += 20;
  if (checklist.is_revenge_trade)  score += 30;
  if (!checklist.has_confirmation) score += 15;
  if (!checklist.is_correct_session) score += 10;
  if (!checklist.has_clear_sl)    score += 25;
  if (!checklist.follows_higher_tf) score += 5;
  return Math.min(100, score);
}

// ── Mistake lookup ───────────────────────────────────────────
export function getMistakeInfo(type: string) {
  return MISTAKE_TYPES.find((m) => m.value === type) ?? {
    value: type, label: type, penalty: 5, color: "#6b7280",
  };
}

// ── PnL class ────────────────────────────────────────────────
export function pnlClass(value: number): string {
  if (value > 0) return "text-emerald-400";
  if (value < 0) return "text-red-400";
  return "text-zinc-400";
}
