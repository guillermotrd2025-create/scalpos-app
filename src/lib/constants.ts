// ============================================================
// ScalpOS Constants
// ============================================================

export const SETUP_TYPES = [
  "BOS+Retest EMA9",
  "FVG+Order Block",
  "VWAP Bounce",
  "PDH/PDL Break",
  "EMA9 Cross",
  "Structure Sweep",
  "Opening Range Break",
  "Manual / Other",
] as const;

export const MISTAKE_TYPES = [
  { value: "FOMO",         label: "FOMO",              penalty: 10, color: "#ef4444" },
  { value: "REVENGE",      label: "Revenge Trade",     penalty: 15, color: "#f97316" },
  { value: "CHASING",      label: "Chasing the Candle",penalty: 10, color: "#eab308" },
  { value: "OVERTRADING",  label: "Overtrading",       penalty: 8,  color: "#a855f7" },
  { value: "BOREDOM",      label: "Boredom Trade",     penalty: 8,  color: "#6366f1" },
  { value: "EARLY_EXIT",   label: "Early Exit",        penalty: 5,  color: "#14b8a6" },
  { value: "LATE_ENTRY",   label: "Late Entry",        penalty: 5,  color: "#0ea5e9" },
  { value: "NO_SL",        label: "No Stop Loss",      penalty: 20, color: "#dc2626" },
  { value: "MOVED_SL",     label: "Moved SL to Worse", penalty: 12, color: "#b91c1c" },
  { value: "DANGER_TRADE", label: "Ignored Danger Sign",penalty: 15, color: "#ef4444" },
] as const;

export const MENTAL_STATES = [
  { value: "A_GAME", label: "A-Game (Flujo, Paciente)",    icon: "🎯", color: "var(--success)" },
  { value: "B_GAME", label: "B-Game (Dudas, Frustrado)",  icon: "😰", color: "var(--warning)" },
  { value: "C_GAME", label: "C-Game (Tilt, Venganza)",     icon: "😡", color: "var(--danger)" },
] as const;

export const PRE_FLIGHT_CHECKLIST = [
  { id: "tech_levels", label: "¿Tengo marcados mis niveles macro (PDH, PDL, Zonas de Liquidez)?" },
  { id: "tech_calendar", label: "¿He revisado el calendario económico y no hay noticias rojas inminentes?" },
  { id: "emot_sleep", label: "¿He dormido bien y me siento enfocado?" },
  { id: "emot_tilt", label: "Recordatorio: Mi error letal es operar en rango o vengar una pérdida. ¿Estoy libre de ese impulso ahora mismo?" },
  { id: "risk_limit", label: "He aceptado mi Daily Stop. Si pierdo 2 seguidas, cierro y me voy." },
];

export const DIRECTION_TYPES = ["LONG", "SHORT"] as const;

// Discipline score thresholds
export const DISCIPLINE_THRESHOLDS = {
  EXCELLENT: 85,
  GOOD:      70,
  WARNING:   50,
  DANGER:    0,
} as const;

// Red-flag checklist fields (triggers warning modal)
export const RED_FLAG_FIELDS = [
  "has_fomo",
  "is_extended",
  "is_chasing",
  "is_revenge_trade",
  "is_out_of_hours",
] as const;

// Green-flag checklist fields (must all be true for clean trade)
export const GREEN_FLAG_FIELDS = [
  "trend_aligned",
  "pullback_ema",
  "atr_above_avg",
  "vwap_favor",
  "break_structure",
] as const;

// Emotion selectors for 3-phase psychotrading
export const EMOTIONS_PRE = [
  { value: "COLD",      emoji: "🥶", label: "Frío" },
  { value: "CONFIDENT", emoji: "😎", label: "Confiado" },
  { value: "ANXIOUS",   emoji: "😰", label: "Ansioso" },
  { value: "FOMO",      emoji: "🤑", label: "FOMO" },
] as const;

export const EMOTIONS_DURING = [
  { value: "CALM",       emoji: "🧘", label: "Tranquilo" },
  { value: "NERVOUS",    emoji: "😬", label: "Nervioso" },
  { value: "FRUSTRATED", emoji: "😡", label: "Frustrado" },
  { value: "EUPHORIC",   emoji: "🤩", label: "Eufórico" },
] as const;

export const EMOTIONS_POST = [
  { value: "SATISFIED",    emoji: "😌", label: "Satisfecho" },
  { value: "ANGRY",        emoji: "😤", label: "Cabreado" },
  { value: "DISAPPOINTED", emoji: "😭", label: "Decepcionado" },
  { value: "INDIFFERENT",  emoji: "🥱", label: "Indiferente" },
] as const;
