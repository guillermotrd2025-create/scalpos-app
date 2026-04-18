// ============================================================
// ScalpOS Constants
// ============================================================

export const SETUP_TYPES = [
  "Rotura+Retest EMA9",
  "FVG+Bloque de Órdenes",
  "Rebote VWAP",
  "Rotura PDH/PDL",
  "Cruce EMA9",
  "Barrido de Estructura",
  "Rotura Rango Apertura",
  "Manual / Otro",
] as const;

export const MISTAKE_TYPES = [
  { value: "FOMO",         label: "FOMO",                    penalty: 10, color: "#ef4444" },
  { value: "REVENGE",      label: "Trade de Venganza",       penalty: 15, color: "#f97316" },
  { value: "CHASING",      label: "Persiguiendo la Vela",    penalty: 10, color: "#eab308" },
  { value: "OVERTRADING",  label: "Sobreoperación",          penalty: 8,  color: "#a855f7" },
  { value: "BOREDOM",      label: "Trade por Aburrimiento",  penalty: 8,  color: "#6366f1" },
  { value: "EARLY_EXIT",   label: "Salida Prematura",        penalty: 5,  color: "#14b8a6" },
  { value: "LATE_ENTRY",   label: "Entrada Tardía",          penalty: 5,  color: "#0ea5e9" },
  { value: "NO_SL",        label: "Sin Stop Loss",           penalty: 20, color: "#dc2626" },
  { value: "MOVED_SL",     label: "Moviste el SL en contra", penalty: 12, color: "#b91c1c" },
  { value: "DANGER_TRADE", label: "Ignoraste Señal de Peligro", penalty: 15, color: "#ef4444" },
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

// Emotion selectors for 3-phase psychotrading (7 options each)
export const EMOTIONS_PRE = [
  { value: "COLD",      emoji: "🥶", label: "Frío / Neutro" },
  { value: "FOCUSED",   emoji: "🎯", label: "Enfocado" },
  { value: "CONFIDENT", emoji: "😎", label: "Confiado" },
  { value: "EXCITED",   emoji: "⚡", label: "Excitado" },
  { value: "ANXIOUS",   emoji: "😰", label: "Ansioso" },
  { value: "TIRED",     emoji: "😴", label: "Cansado" },
  { value: "FOMO",      emoji: "🤑", label: "Con FOMO" },
] as const;

export const EMOTIONS_DURING = [
  { value: "CALM",       emoji: "🧘", label: "Tranquilo" },
  { value: "CONFIDENT",  emoji: "💪", label: "Confiado" },
  { value: "NERVOUS",    emoji: "😬", label: "Nervioso" },
  { value: "IMPATIENT",  emoji: "⏳", label: "Impaciente" },
  { value: "FRUSTRATED", emoji: "😡", label: "Frustrado" },
  { value: "FEARFUL",    emoji: "😨", label: "Con miedo" },
  { value: "EUPHORIC",   emoji: "🤩", label: "Eufórico" },
] as const;

export const EMOTIONS_POST = [
  { value: "SATISFIED",    emoji: "😌", label: "Satisfecho" },
  { value: "PROUD",        emoji: "🏆", label: "Orgulloso" },
  { value: "RELIEVED",     emoji: "😅", label: "Aliviado" },
  { value: "CALM",         emoji: "🧘", label: "Tranquilo" },
  { value: "DISAPPOINTED", emoji: "😞", label: "Decepcionado" },
  { value: "ANGRY",        emoji: "😤", label: "Cabreado" },
  { value: "INDIFFERENT",  emoji: "🥱", label: "Indiferente" },
] as const;

// Post-trade psychotrading reflection quotes (shown randomly in cooldown modal)
export const PSYCHOTRADING_QUOTES = [
  {
    quote: "Lo importante no es el PnL de este trade. Lo importante es si has seguido tu plan al 100%.",
    author: "Filosofía ScalpOS",
  },
  {
    quote: "Una pérdida siguiendo tus reglas es una victoria de disciplina. Una ganancia rompiéndolas es una deuda con el mercado.",
    author: "Mark Douglas",
  },
  {
    quote: "Tu cerebro acaba de liberar dopamina. Espera. Los mejores traders no actúan bajo la influencia de sus emociones.",
    author: "Psicología del Trading",
  },
  {
    quote: "El mercado hace lo que quiere. Tu único trabajo es gestionar el riesgo y respetar las reglas. Eso es todo.",
    author: "Filosofía ScalpOS",
  },
  {
    quote: "Piensa en series de 100 trades, no en este. Este resultado es una gota en el océano de tu estadística.",
    author: "Mark Douglas",
  },
  {
    quote: "Si sientes la urgencia de volver a entrar ahora mismo, eso es exactamente la señal de que debes esperar.",
    author: "Psicología del Trading",
  },
  {
    quote: "La consistencia se construye trade a trade, respetando el proceso. El PnL es consecuencia, no objetivo.",
    author: "Filosofía ScalpOS",
  },
  {
    quote: "El mejor trade que puedes hacer ahora mismo es no hacer ninguno. Usa estos 3 minutos para resetear.",
    author: "Psicología del Trading",
  },
] as const;
