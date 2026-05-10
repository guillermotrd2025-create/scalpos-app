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

// ============================================================
// DISCIPLINE XP — Gamification Constants
// ============================================================

// Levels with progressive XP requirements
export const DISCIPLINE_LEVELS = [
  { level: 1, xp_required: 0,    name: "Novato",       emoji: "🌱" },
  { level: 2, xp_required: 50,   name: "Aprendiz",     emoji: "📘" },
  { level: 3, xp_required: 150,  name: "Disciplinado", emoji: "🎯" },
  { level: 4, xp_required: 350,  name: "Consistente",  emoji: "⚡" },
  { level: 5, xp_required: 600,  name: "Veterano",     emoji: "🛡️" },
  { level: 6, xp_required: 1000, name: "Maestro",      emoji: "💎" },
  { level: 7, xp_required: 1500, name: "Élite",        emoji: "🏆" },
  { level: 8, xp_required: 2500, name: "Leyenda",      emoji: "👑" },
] as const;

// XP values for different actions
export const XP_VALUES = {
  TRADE_IN_PLAN: 10,        // Base XP per in-plan trade
  REST_DAY: 5,              // Smart rest day
  EXECUTION_BONUS: 3,       // Bonus for execution_score >= 8
  CLEAN_TRADE_BONUS: 2,     // Bonus for 0 mistakes
} as const;

// Streak multiplier tiers
export const STREAK_MULTIPLIERS = [
  { min: 0,  max: 4,   multiplier: 1.0, label: "Base" },
  { min: 5,  max: 14,  multiplier: 1.5, label: "🔥 En racha" },
  { min: 15, max: 29,  multiplier: 2.0, label: "💎 Máquina" },
  { min: 30, max: 9999, multiplier: 2.5, label: "👑 Leyenda" },
] as const;

// Motivational messages by streak range
export const STREAK_MESSAGES = [
  { min: 0,  max: 0,   message: "Empieza hoy. Un trade a la vez." },
  { min: 1,  max: 4,   message: "Buen arranque. No te confíes." },
  { min: 5,  max: 9,   message: "🔥 Estás construyendo un hábito. Sigue." },
  { min: 10, max: 14,  message: "🔥 Doble dígito. Estás en otro nivel." },
  { min: 15, max: 24,  message: "💎 Más de 15 trades sin salirte del plan. Eres otro trader." },
  { min: 25, max: 49,  message: "💎 Racha brutal. El plan es tu ventaja." },
  { min: 50, max: 99,  message: "👑 50+ trades. Disciplina de élite." },
  { min: 100, max: 9999, message: "⚔️ Eres la ley del mercado." },
] as const;

// Badge definitions with unlock conditions
export const BADGE_DEFINITIONS = [
  { key: "FIRST_BLOOD",    emoji: "🩸", name: "Primera Sangre",      description: "Primer trade en plan registrado" },
  { key: "PERFECT_WEEK",   emoji: "⭐", name: "Semana Perfecta",     description: "5 días operativos seguidos, todos trades en plan" },
  { key: "STREAK_10",      emoji: "🔥", name: "Racha de 10",         description: "10 trades consecutivos en plan" },
  { key: "STREAK_25",      emoji: "💎", name: "Racha de 25",         description: "25 trades consecutivos en plan" },
  { key: "STREAK_50",      emoji: "👑", name: "Racha de 50",         description: "50 trades consecutivos en plan" },
  { key: "SMART_REST",     emoji: "🧘", name: "Descanso Inteligente", description: "Primer día de descanso registrado" },
  { key: "WISE_WEEK",      emoji: "🦉", name: "Semana del Sabio",    description: "3+ días de descanso inteligente en un mes" },
  { key: "UNBREAKABLE",    emoji: "🛡️", name: "Inquebrantable",      description: "Subir de nivel sin ningún trade fuera de plan" },
  { key: "MONTHLY_DISC",   emoji: "📅", name: "Mes Disciplinado",    description: "20 días operativos en un mes, ≥90% trades en plan" },
  { key: "PLAN_IS_LAW",    emoji: "⚔️", name: "El Plan es la Ley",   description: "100 trades consecutivos en plan" },
] as const;

// Predefined smart rest day reasons
export const REST_DAY_REASONS = [
  { value: "CHOPPY",    emoji: "🌊", label: "Mercado choppy / sin estructura" },
  { value: "NEWS",      emoji: "📰", label: "Noticias macro de alto impacto" },
  { value: "EMOTIONAL", emoji: "🧠", label: "Estado emocional inadecuado" },
  { value: "SCHEDULE",  emoji: "⏰", label: "Fuera de horario / sin tiempo" },
  { value: "OTHER",     emoji: "📝", label: "Otro motivo" },
] as const;
