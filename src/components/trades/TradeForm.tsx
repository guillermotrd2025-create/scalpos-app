"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createTrade, createDodgedBullet } from "@/app/actions/trades";
import { createSession } from "@/app/actions/sessions";
import { getNextAccountToUse } from "@/app/actions/accounts";
import {
  SETUP_TYPES, MISTAKE_TYPES,
  RED_FLAG_FIELDS, GREEN_FLAG_FIELDS,
  EMOTIONS_PRE, EMOTIONS_DURING, EMOTIONS_POST
} from "@/lib/constants";
import { calcRiskScore } from "@/lib/utils";
import { getLastTradeTime } from "@/app/actions/trades";
import { useToast } from "@/components/ui/Toast";
import {
  AlertTriangle, CheckCircle2, XCircle, Upload,
  ChevronRight, ChevronLeft, ShieldAlert, Timer,
  TrendingUp, TrendingDown, Activity, Zap,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────
type ChecklistState = {
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

const DEFAULT_CHECKLIST: ChecklistState = {
  has_fomo: false,
  is_extended: false,
  is_chasing: false,
  is_revenge_trade: false,
  is_out_of_hours: false,
  trend_aligned: false,
  pullback_ema: false,
  atr_above_avg: false,
  vwap_favor: false,
  break_structure: false,
};

// ── Warning Modal ─────────────────────────────────────────────
function WarningModal({
  flags,
  onContinue,
  onAbort,
}: {
  flags: string[];
  onContinue: () => void;
  onAbort: () => void;
}) {
  const [cooldown, setCooldown] = useState(5);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <div className="modal-overlay animate-fade-in" style={{ zIndex: 100 }}>
      <div className="modal-box semaphore-red animate-scale-in">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert size={28} className="shrink-0" style={{ color: "var(--red)" }} />
          <h2 className="text-lg font-bold" style={{ color: "var(--red)" }}>
            ⚠️ ALERTA: Salto de Reglas Detectado
          </h2>
        </div>

        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Has marcado señales de peligro. Basado en tu historial, estos patrones{" "}
          <strong style={{ color: "var(--red)" }}>destruyen tu cuenta</strong> a largo plazo.
        </p>

        <div className="space-y-1 mb-6">
          {flags.map((f) => (
            <div key={f} className="flex items-center gap-2 text-xs p-2 rounded-lg"
                 style={{ background: "rgba(239,68,68,0.1)" }}>
              <XCircle size={12} style={{ color: "var(--red)" }} />
              <span>{f}</span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl mb-6" style={{ background: "var(--bg-elevated)" }}>
          <p className="text-sm font-semibold mb-1">🧘 Respira. Tu cerebro busca dopamina:</p>
          <ul className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
            <li>• ¿Estarías entrando si no hubiera movimiento previo?</li>
            <li>• ¿Tu SL está definido ANTES de entrar?</li>
            <li>• ¿Este trade cumple el 100% de tu trading plan?</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={onAbort} className="btn btn-success w-full py-3">
            <CheckCircle2 size={16} /> Abortar Trade — Salvar mi disciplina
          </button>
          
          <div className="w-full">
            <button
              onClick={onContinue}
              disabled={cooldown > 0}
              className="btn btn-danger w-full py-3 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {cooldown > 0 ? (
                <><Timer size={16} className="animate-spin-slow" /> Espera {cooldown}s antes de continuar...</>
              ) : (
                <><AlertTriangle size={16} /> Registrar igualmente</>
              )}
            </button>
            <p className="text-center text-[10px] mt-2 text-zinc-500">
              Advertencia: Registrar este trade te restará -15 puntos de Discipline Score
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Drag-Drop Upload Zone ─────────────────────────────────────
function UploadZone({
  label,
  value,
  onUpload,
  fieldType = "pre",
}: {
  label: string;
  value: string | null;
  onUpload: (path: string) => void;
  fieldType?: "pre" | "post";
}) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("field", fieldType === "pre" ? "screenshot_pre" : "screenshot_post");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.path) onUpload(data.path);
    setUploading(false);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  return (
    <div>
      <p className="text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>{label}</p>
      {value ? (
        <div className="relative rounded-xl overflow-hidden group cursor-pointer"
             onClick={() => inputRef.current?.click()}>
          <img src={value} alt={label} className="w-full h-36 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity
                          flex items-center justify-center text-xs text-white">
            Cambiar imagen
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl h-36 flex flex-col items-center justify-center gap-2
                     cursor-pointer transition-all text-xs"
          style={{
            borderColor: dragging ? "var(--brand)" : "var(--border)",
            background:  dragging ? "var(--brand-dim)" : "var(--bg-elevated)",
            color: "var(--text-muted)",
          }}
        >
          <Upload size={20} />
          <span>{uploading ? "Subiendo..." : "Arrastra o haz clic"}</span>
          <span style={{ color: "var(--text-muted)", opacity: 0.6 }}>PNG, JPG, WebP</span>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}

// ── Check Item ────────────────────────────────────────────────
function CheckItem({
  label, checked, onChange, variant,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  variant: "red" | "green";
}) {
  const color = variant === "red" ? "var(--red)" : "var(--green)";
  const bg    = variant === "red" ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)";

  return (
    <label
      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all select-none text-sm"
      style={{ background: checked ? bg : "var(--bg-elevated)" }}
    >
      <div
        onClick={() => onChange(!checked)}
        className="w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-all"
        style={{
          borderColor: checked ? color : "var(--border)",
          background:  checked ? color : "transparent",
        }}
      >
        {checked && <CheckCircle2 size={12} color="#fff" />}
      </div>
      <span style={{ color: checked ? "var(--text-primary)" : "var(--text-secondary)" }}>
        {label}
      </span>
    </label>
  );
}

// ── Validation Message ────────────────────────────────────────
function ValidationMsg({ message }: { message: string }) {
  return (
    <div className="card-elevated border-amber-500/30 bg-amber-500/10 p-4 mb-4 flex items-center gap-3 animate-scale-in">
      <AlertTriangle size={18} className="text-amber-500 shrink-0" />
      <span className="text-sm font-medium text-amber-500/90">{message}</span>
    </div>
  );
}

// ── Emotion Chips ─────────────────────────────────────────────
function EmotionChips({ 
  emotions, value, onChange, label 
}: { 
  emotions: readonly { value: string, emoji: string, label: string }[], 
  value: string, 
  onChange: (v: string) => void, 
  label: string 
}) {
  return (
    <div className="card p-5 mb-4 border border-indigo-500/20 bg-indigo-500/5">
      <p className="text-xs font-semibold mb-3 tracking-widest text-[#a855f7] uppercase">{label} <span style={{ color: "var(--red)" }}>*</span></p>
      <div className="flex flex-wrap gap-2">
        {emotions.map((e) => {
          const isSelected = value === e.value;
          return (
            <button
              key={e.value}
              onClick={() => onChange(e.value)}
              className="badge transition-all select-none border"
              style={{
                background: isSelected ? "rgba(168, 85, 247, 0.15)" : "var(--bg-elevated)",
                borderColor: isSelected ? "#a855f7" : "transparent",
                color: isSelected ? "#a855f7" : "var(--text-muted)",
                padding: "8px 12px",
                borderRadius: "12px",
                fontSize: "13px"
              }}
            >
              <span className="mr-1">{e.emoji}</span> {e.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}


// ── Main Form ─────────────────────────────────────────────────
export default function NewTradeForm({ 
  defaultSessionId,
  globalSettings = {}
}: { 
  defaultSessionId?: number;
  globalSettings?: any;
}) {
  const router = useRouter();
  const { toast } = useToast();
  // step: 1 = checklist, 2 = trade in progress (State A), 3 = register result (State B)
  const [step, setStep]           = useState<1 | 2 | 3>(1);
  const [loading, setLoading]     = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistState>(DEFAULT_CHECKLIST);

  const [accountInfo, setAccountInfo] = useState<{ account_id: number; name: string; maxRiskAmount: number } | null>(null);
  const [accountError, setAccountError] = useState<string | null>(null);
  const [riskAccepted, setRiskAccepted] = useState(false);
  const [executionScore, setExecutionScore] = useState<number>(7);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);

  // Load account info on mount
  useEffect(() => {
    getNextAccountToUse()
      .then(info => setAccountInfo(info))
      .catch(err => setAccountError(err.message));

    // Check cooldown
    getLastTradeTime().then((lastTime) => {
      if (lastTime) {
        const last = new Date(lastTime).getTime();
        const now = new Date().getTime();
        const diffSecs = Math.floor((now - last) / 1000);
        const cooldownTime = 180; // 3 minutes
        if (diffSecs < cooldownTime) {
          setCooldownRemaining(cooldownTime - diffSecs);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (cooldownRemaining > 0) {
      const timer = setTimeout(() => setCooldownRemaining(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownRemaining]);

  const [form, setForm] = useState({
    session_id:      defaultSessionId ?? 0,
    direction:       "LONG",
    setup_type:      SETUP_TYPES[0] as string,
    result_pnl:      "",
    is_in_plan:      true,
    notes:           "",
    screenshot_pre:  null as string | null,
    screenshot_post: null as string | null,
    mistakes:        [] as string[],
    mental_state:    "A_GAME",
    // new fields
    emotion_pre:     "",
    emotion_during:  "",
    emotion_post:    "",
    sl_points:       globalSettings?.default_sl_pts?.toString() ?? "30",
    tp_points:       globalSettings?.default_tp_pts?.toString() ?? "30",
  });

  // ── Computed validation ───────────────────────────────────
  const riskScore   = calcRiskScore(checklist);
  const redFlags    = RED_FLAG_FIELDS.filter((f) => checklist[f as keyof ChecklistState]);
  const hasRedFlags = redFlags.length > 0;

  const greenFlagsMet = GREEN_FLAG_FIELDS.filter((f) => checklist[f as keyof ChecklistState]);
  const greenCount    = greenFlagsMet.length;
  const hasTrend      = checklist.trend_aligned;
  const hasStructure  = checklist.break_structure;
  const minGreenMet   = greenCount >= 3 && hasTrend && hasStructure;

  const semaphoreStatus = riskScore === 0
    ? "green" : riskScore < 30
    ? "amber" : "red";

  const computedRR = (form.sl_points && form.tp_points && +form.sl_points > 0)
    ? (+form.tp_points / +form.sl_points).toFixed(1)
    : "0.0";

  // What's blocking the main button?
  const getBlockReason = (): string | null => {
    if (cooldownRemaining > 0) return `Cooldown activo: espera ${Math.ceil(cooldownRemaining/60)} minutos y ${cooldownRemaining%60} segundos.`;
    if (!!accountError) return accountError!;

    // Check Out of Hours
    if (globalSettings?.operating_hours_start && globalSettings?.operating_hours_end) {
      const now = new Date();
      const currentHm = now.getHours() * 60 + now.getMinutes();
      const parseTime = (timeStr: string) => { const [h, m] = timeStr.split(':'); return parseInt(h)*60 + parseInt(m); };
      const startHm = parseTime(globalSettings.operating_hours_start);
      const endHm = parseTime(globalSettings.operating_hours_end);
      if (currentHm < startHm || currentHm > endHm) {
        return `Fuera de horario operativo configurado (${globalSettings.operating_hours_start} a ${globalSettings.operating_hours_end})`;
      }
    }

    if (hasRedFlags) return "No puedes continuar: hay señales de peligro activas";
    if (!hasTrend || !hasStructure)
      return "No puedes continuar: Tendencia y Ruptura de estructura son mandatorios";
    if (greenCount < 3)
      return `No puedes continuar: faltan condiciones técnicas del setup (${greenCount}/3 mínimo)`;
    if (!form.emotion_pre) return "No puedes continuar: selecciona tu emoción inicial";
    if (!riskAccepted)
      return "No puedes continuar: acepta la filosofía de Mark Douglas";
    return null;
  };

  const blockReason   = getBlockReason();
  const canAdvance    = !blockReason;

  const redFlagLabels: Record<string, string> = {
    has_fomo:         "Estás entrando por FOMO",
    is_extended:      "El precio está extendido/sobrecomprado",
    is_chasing:       "Estás persiguiendo la vela",
    is_revenge_trade: "Estás en modo venganza",
    is_out_of_hours:  "FUERA DE HORARIO OPERATIVO (07:00-11:00)",
  };

  // ── Handlers ──────────────────────────────────────────────
  const handleGoLive = () => {
    if (canAdvance) {
      setStep(2);
    }
  };

  const handleAbort = async () => {
    try {
      let sessionId = form.session_id;
      if (!sessionId) {
        const today = new Date();
        const session = await createSession({
          date:             today.toISOString(),
          start_time:       today.toISOString(),
          mental_state:     form.mental_state,
          checklist_passed: true,
        });
        sessionId = session.id;
      }
      toast("Trade abortado exitosamente. Esquivaste la bala.", "success");
      router.push("/");
    } catch (err: any) {
      toast("Error abortando: " + err.message, "error");
      router.push("/");
    }
  };

  const handleSubmit = async () => {
    if (!form.result_pnl || !accountInfo) return;

    setLoading(true);
    try {
      let sessionId = form.session_id;
      if (!sessionId) {
        const today = new Date();
        const session = await createSession({
          date:             today.toISOString(),
          start_time:       today.toISOString(),
          mental_state:     form.mental_state,
          checklist_passed: true,
        });
        sessionId = session.id;
      }

      const mistakeObjects = form.mistakes.map((type) => {
        const info = MISTAKE_TYPES.find((m) => m.value === type);
        return { mistake_type: type, penalty_score: info?.penalty ?? 5 };
      });

      const computedRR = (parseFloat(form.tp_points) / parseFloat(form.sl_points)) || 1.0;

      await createTrade({
        session_id:      sessionId,
        account_id:      accountInfo.account_id,
        setup_a_passed:  !hasRedFlags && minGreenMet,
        risk_accepted:   riskAccepted,
        execution_score: executionScore,
        direction:       form.direction,
        setup_type:      form.setup_type,
        rr_planned:      Number(computedRR),
        sl_price:        parseFloat(form.sl_points) || undefined,
        tp_price:        parseFloat(form.tp_points) || undefined,
        result_pnl:      parseFloat(form.result_pnl),
        is_in_plan:      form.is_in_plan,
        notes:           form.notes,
        screenshot_pre:  form.screenshot_pre  ?? undefined,
        screenshot_post: form.screenshot_post ?? undefined,
        emotion_pre:     form.emotion_pre     || undefined,
        emotion_during:  form.emotion_during  || undefined,
        emotion_post:    form.emotion_post    || undefined,
        checklist,
        mistakes: mistakeObjects,
      });

      router.push("/trades");
      toast("Trade completado y guardado correctamente.", "success");
      router.push("/trades");
    } catch (e: any) {
      toast("Error guardando el trade: " + e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleMistake = (type: string) => {
    setForm((f) => ({
      ...f,
      mistakes: f.mistakes.includes(type)
        ? f.mistakes.filter((m) => m !== type)
        : [...f.mistakes, type],
    }));
  };

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      {showModal && (
        <WarningModal
          flags={redFlags.map((f) => redFlagLabels[f as string])}
          onContinue={() => { setShowModal(false); setStep(2); }}
          onAbort={() => { setShowModal(false); router.push("/"); }}
        />
      )}

      <div className="max-w-2xl mx-auto">

        {/* ── Step indicator ── */}
        <div className="flex items-center gap-2 mb-6 px-1">
          {[
            { n: 1, label: "Checklist Pre-Trade" },
            { n: 2, label: step >= 3 ? "Trade Completado" : "Trade en Curso" },
          ].map(({ n, label }, i) => (
            <div key={n} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: step >= n ? "var(--brand)" : "var(--bg-elevated)",
                    color: step >= n ? "#fff" : "var(--text-muted)",
                  }}
                >
                  {step > n ? <CheckCircle2 size={14} /> : n}
                </div>
                <span className="text-xs" style={{ color: step >= n ? "var(--text-primary)" : "var(--text-muted)" }}>
                  {label}
                </span>
              </div>
              {i === 0 && <div className="flex-1 h-px mx-2" style={{ background: step >= 2 ? "var(--brand)" : "var(--border)" }} />}
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════
            STEP 1: PRE-TRADE CHECKLIST
        ══════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="animate-fade-in">



            {/* ── Account error / Account rotation card ── */}
            {accountError && (
              <div className="card-elevated border-amber-500/30 bg-amber-500/10 p-5 mb-5 flex items-start gap-4 animate-scale-in">
                <div className="bg-amber-500/20 p-2 rounded-full mt-1">
                  <AlertTriangle size={24} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="text-amber-500 font-bold mb-1">Operativa Suspendida</h3>
                  <p className="text-sm font-medium text-amber-500/90 leading-relaxed">{accountError}</p>
                </div>
              </div>
            )}

            {accountInfo && (
              <div className="card p-4 mb-5 border border-[var(--brand)]">
                <p className="text-xs font-semibold mb-1 uppercase tracking-widest text-[var(--brand)]">
                  Rotación de Cuentas Activa
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-lg font-bold">{accountInfo.name}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Este trade irá a esta cuenta</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[var(--text-muted)]">Riesgo Permitido</p>
                    <p className="text-lg font-mono text-[var(--red)] font-bold">
                      ${accountInfo.maxRiskAmount.toFixed(2)}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                      ({globalSettings?.risk_per_trade_pct ?? "0.5"}% del balance)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── RED FLAGS ── */}
            <div className="card p-5 mb-4">
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "var(--red)" }}>
                🚩 Señales de Peligro
              </p>
              <div className="space-y-2">
                {[
                  { key: "has_fomo",         label: "Estoy entrando por FOMO / miedo a perderme" },
                  { key: "is_extended",      label: "El precio ya está muy extendido / sobrecomprado" },
                  { key: "is_chasing",       label: "Estoy persiguiendo una vela que ya se movió" },
                  { key: "is_revenge_trade", label: "Estoy operando para recuperar pérdidas (venganza)" },
                ].map(({ key, label }) => (
                  <CheckItem
                    key={key}
                    label={label}
                    checked={checklist[key as keyof ChecklistState]}
                    variant="red"
                    onChange={(v) => setChecklist((c) => ({ ...c, [key]: v }))}
                  />
                ))}


              </div>
            </div>

            {/* ── GREEN FLAGS (A+ Setup) ── */}
            <div className="card p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--green)" }}>
                  ✅ Condiciones Válidas (A+ Setup)
                </p>
                <span className="text-xs font-mono px-2 py-0.5 rounded-lg"
                  style={{
                    background: minGreenMet ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.15)",
                    color: minGreenMet ? "var(--green)" : "var(--amber)",
                  }}>
                  {greenCount}/5 marcadas (mín. 3)
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { key: "trend_aligned",   label: "Tendencia 15m, 5m y 1m alineadas ★ Mandatorio" },
                  { key: "pullback_ema",    label: "Pullback a EMA9 o EMA20 (Sin estar extendido)" },
                  { key: "atr_above_avg",   label: "ATR por encima de su media (Mercado moviéndose)" },
                  { key: "vwap_favor",      label: "SMA200 y VWAP a favor" },
                  { key: "break_structure", label: "Ruptura de estructura clara en 1m ★ Mandatorio" },
                ].map(({ key, label }) => (
                  <CheckItem
                    key={key}
                    label={label}
                    checked={checklist[key as keyof ChecklistState]}
                    variant="green"
                    onChange={(v) => setChecklist((c) => ({ ...c, [key]: v }))}
                  />
                ))}
              </div>
            </div>

            {/* ── Risk Semaphore ── */}
            <div className={`card p-4 mb-4 semaphore-${semaphoreStatus}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">
                    {semaphoreStatus === "green" && "✅ VÍA LIBRE — Setup aprobado"}
                    {semaphoreStatus === "amber" && "⚠️ PRECAUCIÓN — Riesgo elevado"}
                    {semaphoreStatus === "red"   && "🚨 ALTO RIESGO — No operes"}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    Risk Score: {riskScore}/100
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                     style={{
                       background: semaphoreStatus === "green" ? "var(--green-dim)"
                         : semaphoreStatus === "amber" ? "var(--amber-dim)" : "var(--red-dim)",
                       color: semaphoreStatus === "green" ? "var(--green)"
                         : semaphoreStatus === "amber" ? "var(--amber)" : "var(--red)",
                     }}>
                  {riskScore}
                </div>
              </div>
            </div>

            {/* ── Mark Douglas (last checkbox, mandatory) ── */}
            <div className="card p-5 mb-5 border border-indigo-500/40 bg-indigo-500/5">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <div
                  onClick={() => setRiskAccepted(!riskAccepted)}
                  className="w-6 h-6 rounded flex-shrink-0 flex items-center justify-center border transition-all mt-0.5"
                  style={{
                    borderColor: riskAccepted ? "var(--brand)" : "var(--border)",
                    background:  riskAccepted ? "var(--brand)" : "transparent",
                  }}
                >
                  {riskAccepted && <CheckCircle2 size={16} color="#ffffff" />}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    Filosofía de Mark Douglas (Obligatorio)
                  </p>
                  <p className="text-[11px] leading-relaxed mt-1" style={{ color: "var(--text-muted)" }}>
                    "Acepto que este trade es solo una probabilidad. No sé ni necesito saber qué va a pasar para ganar dinero. Estoy 100% en paz si este trade toca mi SL de{" "}
                    <strong style={{ color: "var(--text-secondary)" }}>{accountInfo?.maxRiskAmount.toFixed(0) ?? "50"}€</strong>."
                  </p>
                </div>
              </label>
            </div>

            {/* EMOTION PRE */}
            <EmotionChips
              label="1. ¿Cómo te sientes antes de entrar?"
              emotions={EMOTIONS_PRE}
              value={form.emotion_pre}
              onChange={(v) => setForm((f) => ({ ...f, emotion_pre: v }))}
            />

            {/* ── Dynamic validation message just above buttons ── */}
            {blockReason && <ValidationMsg message={blockReason} />}

            {/* ── Action Buttons ── */}
            <div className="flex gap-3">
              <button
                id="btn-abort-trade"
                onClick={handleAbort}
                className="btn flex-1 py-4 font-bold rounded-xl text-white"
                style={{ background: "#dc2626", border: "1px solid #b91c1c" }}
              >
                Cancelar: Abortar Trade
              </button>

              <button
                id="btn-go-live"
                onClick={handleGoLive}
                disabled={!canAdvance}
                className="btn btn-primary flex-[2] py-4 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Zap size={17} />
                Checklist Superado: VÍA LIBRE PARA OPERAR
                <ChevronRight size={18} />
              </button>
            </div>

            <p className="text-[10px] text-center mt-3 text-zinc-600">
              * El botón se activa solo con 0 señales de peligro, Mark Douglas aceptado y mínimo 3 condiciones técnicas (Tendencia + Ruptura obligatorias).
            </p>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 2: TRADE EN CURSO (State A)
        ══════════════════════════════════════════════ */}
        {step === 2 && (
          <div className="animate-fade-in space-y-4">

            {/* Live banner */}
            <div className={`trade-live-banner ${form.direction === "LONG" ? "long" : "short"}`}>
              <div className="flex items-center gap-3">
                <span className={`live-dot ${form.direction === "LONG" ? "green" : "red"}`} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest"
                     style={{ color: form.direction === "LONG" ? "var(--green)" : "var(--red)" }}>
                    Trade en curso
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                    La orden está en tu broker. Registra el resultado cuando cierre.
                  </p>
                </div>
              </div>
              <Activity size={22} style={{ color: form.direction === "LONG" ? "var(--green)" : "var(--red)", opacity: 0.7 }} />
            </div>

            {/* Direction + Setup */}
            <div className="card p-5">
              <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Dirección & Setup
              </p>
              <div className="space-y-3">
                {/* Direction selector */}
                <div>
                  <label className="text-xs mb-2 block" style={{ color: "var(--text-muted)" }}>Dirección</label>
                  <div className="flex gap-2">
                    {["LONG", "SHORT"].map((d) => (
                      <button
                        key={d}
                        id={`btn-direction-${d.toLowerCase()}`}
                        onClick={() => setForm((f) => ({ ...f, direction: d }))}
                        className="flex-1 py-3 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2"
                        style={{
                          background:  form.direction === d
                            ? d === "LONG" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)"
                            : "var(--bg-elevated)",
                          borderColor: form.direction === d
                            ? d === "LONG" ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)"
                            : "transparent",
                          color: form.direction === d
                            ? d === "LONG" ? "var(--green)" : "var(--red)"
                            : "var(--text-muted)",
                        }}
                      >
                        {d === "LONG" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        {d === "LONG" ? "▲ LONG" : "▼ SHORT"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Setup type */}
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Setup</label>
                  <select
                    className="input"
                    value={form.setup_type}
                    onChange={(e) => setForm((f) => ({ ...f, setup_type: e.target.value }))}
                  >
                    {SETUP_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* SL / TP Points (R:R auto-calculated) */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Stop Loss (Puntos)</label>
                    <input type="number" className="input text-center" onFocus={e => e.target.select()} value={form.sl_points} onChange={e => setForm(f => ({ ...f, sl_points: e.target.value }))} />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Take Profit (Puntos)</label>
                    <input type="number" className="input text-center" onFocus={e => e.target.select()} value={form.tp_points} onChange={e => setForm(f => ({ ...f, tp_points: e.target.value }))} />
                  </div>
                  <div className="flex-[0.8] flex flex-col justify-end">
                    <div className="py-2.5 text-center rounded-xl border font-bold text-sm h-[42px] flex items-center justify-center mb-0.5" 
                         style={{ borderColor: "var(--border)", background: "var(--bg-elevated)", color: "var(--brand)" }}>
                      {computedRR}R
                    </div>
                  </div>
                </div>

                {/* In-plan toggle */}
                <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
                  <div
                    onClick={() => setForm((f) => ({ ...f, is_in_plan: !f.is_in_plan }))}
                    className="w-10 h-5 rounded-full transition-colors relative shrink-0"
                    style={{ background: form.is_in_plan ? "var(--green)" : "var(--bg-muted)" }}
                  >
                    <div className="absolute w-3.5 h-3.5 bg-white rounded-full transition-all"
                         style={{ left: form.is_in_plan ? "calc(100% - 18px)" : "3px", top: "3px" }} />
                  </div>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Trade dentro del plan de sesión
                  </span>
                </label>
              </div>
            </div>

            {/* Screenshot pre */}
            <div className="card p-5">
              <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Captura antes de entrar <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(opcional)</span>
              </p>
              <UploadZone
                label="Screenshot pre-entrada"
                value={form.screenshot_pre}
                fieldType="pre"
                onUpload={(p) => setForm((f) => ({ ...f, screenshot_pre: p }))}
              />
            </div>

            {/* Quick notes */}
            <div className="card p-5">
              <label className="text-xs font-semibold mb-2 block uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Notas rápidas <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(opcional)</span>
              </label>
              <textarea
                className="input resize-none mb-3"
                rows={2}
                placeholder="¿Qué viste en el gráfico? ¿Dónde está el SL y el TP?"
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              />
            </div>

            {/* EMOTION DURING */}
            <EmotionChips
              label="2. ¿Cómo te sientes con el trade abierto?"
              emotions={EMOTIONS_DURING}
              value={form.emotion_during}
              onChange={(v) => setForm((f) => ({ ...f, emotion_during: v }))}
            />

            {/* CTA */}
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn btn-ghost">
                <ChevronLeft size={15} /> Atrás
              </button>
              <button
                id="btn-trade-done"
                onClick={() => setStep(3)}
                className="btn flex-1 py-4 font-bold rounded-xl text-white"
                style={{ background: "var(--brand)", fontSize: "1rem" }}
              >
                <CheckCircle2 size={18} /> Trade Terminado: Registrar Resultado
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 3: REGISTRO DE RESULTADO (State B)
        ══════════════════════════════════════════════ */}
        {step === 3 && (
          <div className="animate-slide-down space-y-4">

            {/* Context recap */}
            <div className="card p-4 flex items-center gap-4">
              <span className={`direction-badge ${form.direction === "LONG" ? "long" : "short"}`}>
                {form.direction === "LONG" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {form.direction}
              </span>
              <div>
                <p className="text-sm font-semibold">{form.setup_type}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {computedRR}R · {form.is_in_plan ? "En el plan" : "Fuera del plan"}
                </p>
              </div>
            </div>

            {/* PnL — mandatory */}
            <div className="card p-5">
              <label className="text-xs font-semibold mb-2 block uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Resultado PnL (€) <span style={{ color: "var(--red)" }}>*</span>
              </label>
              <input
                id="input-result-pnl"
                className="input font-mono text-2xl text-center py-4 font-bold"
                type="number"
                step="0.01"
                placeholder="+125.00 ó -80.00"
                onFocus={e => e.target.select()}
                value={form.result_pnl}
                onChange={(e) => setForm((f) => ({ ...f, result_pnl: e.target.value }))}
                style={{
                  color: form.result_pnl
                    ? +form.result_pnl >= 0 ? "var(--green)" : "var(--red)"
                    : "var(--text-primary)",
                  fontSize: "1.5rem",
                }}
              />
            </div>

            {/* Screenshot post — optional */}
            <div className="card p-5">
              <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Captura resultado final <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(opcional)</span>
              </p>
              <UploadZone
                label="Screenshot resultado"
                value={form.screenshot_post}
                fieldType="post"
                onUpload={(p) => setForm((f) => ({ ...f, screenshot_post: p }))}
              />
            </div>

            {/* Mistake tags — optional */}
            <div className="card p-5">
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Errores cometidos <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(opcional)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {MISTAKE_TYPES.map(({ value, label, penalty, color }) => (
                  <button
                    key={value}
                    onClick={() => toggleMistake(value)}
                    className="badge transition-all border"
                    style={{
                      background:  form.mistakes.includes(value) ? `${color}20` : "var(--bg-elevated)",
                      borderColor: form.mistakes.includes(value) ? color : "transparent",
                      color:       form.mistakes.includes(value) ? color : "var(--text-muted)",
                      padding:     "6px 12px",
                    }}
                  >
                    {label} <span className="ml-1 opacity-60">-{penalty}pts</span>
                  </button>
                ))}
              </div>
            </div>

            {/* EMOTION POST */}
            <EmotionChips
              label="3. ¿Cómo te sientes tras cerrar?"
              emotions={EMOTIONS_POST}
              value={form.emotion_post}
              onChange={(v) => setForm((f) => ({ ...f, emotion_post: v }))}
            />

            {/* Execution Score — mandatory */}
            <div className="card p-5">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#a855f7]">
                  Score de Ejecución <span style={{ color: "var(--red)" }}>*</span>
                </p>
                <div className="bg-[#a855f720] text-[#a855f7] px-3 py-1 rounded-lg font-mono font-bold text-lg">
                  {executionScore}/10
                </div>
              </div>
              <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                Ignora si ganaste o perdiste. ¿Qué tan bien ejecutaste tu plan?
              </p>
              <input
                type="range" min="1" max="10" step="1"
                value={executionScore}
                onChange={(e) => setExecutionScore(parseInt(e.target.value))}
                className="w-full accent-[#a855f7]"
              />
              <div className="flex justify-between text-xs mt-2 font-mono" style={{ color: "var(--text-muted)" }}>
                <span>1 (Pésimo)</span>
                <span>5 (Aceptable)</span>
                <span>10 (Robot)</span>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn btn-ghost">
                <ChevronLeft size={15} /> Atrás
              </button>
              <button
                id="btn-save-trade"
                onClick={handleSubmit}
                disabled={!form.result_pnl || loading}
                className="btn btn-primary flex-1 py-4 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Guardando..." : "✓ Guardar Trade en el Diario"}
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
