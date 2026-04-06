"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createTrade } from "@/app/actions/trades";
import { createSession } from "@/app/actions/sessions";
import { getNextAccountToUse } from "@/app/actions/accounts";
import {
  SETUP_TYPES, MISTAKE_TYPES, MENTAL_STATES,
  RED_FLAG_FIELDS, GREEN_FLAG_FIELDS,
} from "@/lib/constants";
import { calcRiskScore } from "@/lib/utils";
import {
  AlertTriangle, CheckCircle2, XCircle, Upload,
  ChevronRight, ChevronLeft, ShieldAlert, X,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────
type ChecklistState = {
  has_fomo: boolean;
  is_extended: boolean;
  is_chasing: boolean;
  is_revenge_trade: boolean;
  has_confirmation: boolean;
  is_correct_session: boolean;
  has_clear_sl: boolean;
  follows_higher_tf: boolean;
};

const DEFAULT_CHECKLIST: ChecklistState = {
  has_fomo: false,
  is_extended: false,
  is_chasing: false,
  is_revenge_trade: false,
  has_confirmation: false,
  is_correct_session: false,
  has_clear_sl: false,
  follows_higher_tf: false,
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
  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-box semaphore-red animate-scale-in">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert size={28} className="shrink-0" style={{ color: "var(--red)" }} />
          <h2 className="text-lg font-bold" style={{ color: "var(--red)" }}>
            ⚠️ ALERTA: Error típico detectado
          </h2>
        </div>

        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Has marcado señales de peligro. Basado en tu historial, estos patrones
          <strong style={{ color: "var(--red)" }}> destruyen tu cuenta</strong> a largo plazo.
        </p>

        <div className="space-y-2 mb-6">
          {flags.map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm p-2 rounded-lg"
                 style={{ background: "rgba(239,68,68,0.1)" }}>
              <XCircle size={14} style={{ color: "var(--red)" }} />
              <span>{f}</span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl mb-6" style={{ background: "var(--bg-elevated)" }}>
          <p className="text-sm font-semibold mb-1">🧘 Respira. Pregúntate:</p>
          <ul className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
            <li>• ¿Tienes setup claro o estás reaccionando al precio?</li>
            <li>• ¿Estarías entrando si no hubiera movimiento previo?</li>
            <li>• ¿Tu SL está definido antes de entrar?</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button onClick={onAbort} className="btn btn-success flex-1">
            <CheckCircle2 size={14} /> Abortar — Buena decisión
          </button>
          <button onClick={onContinue} className="btn btn-danger flex-1">
            <AlertTriangle size={14} /> Registrar igualmente
          </button>
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
}: {
  label: string;
  value: string | null;
  onUpload: (path: string) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("field", label.includes("Antes") ? "screenshot_pre" : "screenshot_post");
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

// ── Main Form ─────────────────────────────────────────────────
export default function NewTradeForm({ defaultSessionId }: { defaultSessionId?: number }) {
  const router = useRouter();
  const [step, setStep]       = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistState>(DEFAULT_CHECKLIST);
  
  const [accountInfo, setAccountInfo] = useState<{account_id: number; name: string; maxRiskAmount: number} | null>(null);
  const [accountError, setAccountError] = useState<string | null>(null);
  const [riskAccepted, setRiskAccepted] = useState(false);
  const [executionScore, setExecutionScore] = useState<number>(10);

  // Load account info on mount
  useEffect(() => {
    getNextAccountToUse()
      .then(info => setAccountInfo(info))
      .catch(err => setAccountError(err.message));
  }, []);

  const [form, setForm] = useState({
    session_id:   defaultSessionId ?? 0,
    direction:    "LONG",
    setup_type:   SETUP_TYPES[0] as string,
    rr_planned:   2,
    entry_price:  "",
    sl_price:     "",
    tp_price:     "",
    result_pnl:   "",
    is_in_plan:   true,
    notes:        "",
    screenshot_pre:  null as string | null,
    screenshot_post: null as string | null,
    mistakes: [] as string[],
    // Session fields (if no session yet)
    mental_state: "A_GAME",
  });

  const riskScore   = calcRiskScore(checklist);
  const redFlags    = RED_FLAG_FIELDS.filter((f) => checklist[f]);
  const greenFlags  = GREEN_FLAG_FIELDS.filter((f) => !checklist[f]);
  const hasRedFlags = redFlags.length > 0;

  const semaphoreStatus = riskScore === 0
    ? "green" : riskScore < 30
    ? "amber" : "red";

  const redFlagLabels: Record<string, string> = {
    has_fomo:        "Estás entrando por FOMO",
    is_extended:     "El precio está extendido/sobrecomprado",
    is_chasing:      "Estás persiguiendo la vela",
    is_revenge_trade:"Estás en modo venganza",
  };

  const greenFlagLabels: Record<string, string> = {
    has_confirmation:   "Falta confirmación de estructura",
    is_correct_session: "No estás en horario óptimo",
    has_clear_sl:       "No tienes SL definido",
    follows_higher_tf:  "No está alineado con TF superior",
  };

  const handleStep2 = () => {
    if (hasRedFlags) {
      setShowModal(true);
    } else {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!form.result_pnl || !accountInfo) return;
    if (!riskAccepted) {
        alert("Debes aceptar el riesgo probabilístico antes de registrar el trade.");
        return;
    }

    setLoading(true);
    try {
      let sessionId = form.session_id;

      // Auto-create session if none
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

      await createTrade({
        session_id:     sessionId,
        account_id:     accountInfo.account_id,
        setup_a_passed: !hasRedFlags && greenFlags.length === 0,
        risk_accepted:  riskAccepted,
        execution_score: executionScore,
        direction:      form.direction,
        setup_type:     form.setup_type,
        rr_planned:     form.rr_planned,
        entry_price:    form.entry_price ? +form.entry_price : undefined,
        sl_price:       form.sl_price    ? +form.sl_price    : undefined,
        tp_price:       form.tp_price    ? +form.tp_price    : undefined,
        result_pnl:     parseFloat(form.result_pnl),
        is_in_plan:     form.is_in_plan,
        notes:          form.notes,
        screenshot_pre:  form.screenshot_pre  ?? undefined,
        screenshot_post: form.screenshot_post ?? undefined,
        checklist,
        mistakes: mistakeObjects,
      });

      router.push("/trades");
    } catch (e) {
      console.error(e);
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

  return (
    <>
      {showModal && (
        <WarningModal
          flags={[
            ...redFlags.map((f) => redFlagLabels[f]),
            ...greenFlags.map((f) => greenFlagLabels[f]),
          ]}
          onContinue={() => { setShowModal(false); setStep(2); }}
          onAbort={() => { setShowModal(false); router.back(); }}
        />
      )}

      <div className="max-w-2xl mx-auto">
        {/* ── Step indicator ── */}
        <div className="flex items-center gap-2 mb-6 px-1">
          {[
            { n: 1, label: "Checklist Pre-Trade" },
            { n: 2, label: "Detalles del Trade" },
          ].map(({ n, label }, i) => (
            <div key={n} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: step >= n ? "var(--brand)" : "var(--bg-elevated)",
                    color: step >= n ? "#fff" : "var(--text-muted)",
                  }}
                >{n}</div>
                <span className="text-xs" style={{ color: step >= n ? "var(--text-primary)" : "var(--text-muted)" }}>
                  {label}
                </span>
              </div>
              {i === 0 && <div className="flex-1 h-px mx-2" style={{ background: step === 2 ? "var(--brand)" : "var(--border)" }} />}
            </div>
          ))}
        </div>

        {/* ────────── STEP 1: Pre-Trade Checklist ────────── */}
        {step === 1 && (
          <div className="animate-fade-in">
            {accountError && (
              <div className="mb-4 p-4 rounded-xl text-center font-bold text-[#dc2626] bg-[#dc262610] border border-[#dc262650]">
                {accountError}
              </div>
            )}
            
            {accountInfo && (
              <div className="card p-4 mb-5 border border-[var(--brand)]">
                <p className="text-xs font-semibold mb-1 uppercase tracking-widest text-[var(--brand)]">Rotación de Cuentas Activa</p>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-lg font-bold">{accountInfo.name}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">Este trade irá a esta cuenta</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-[var(--text-muted)]">Riesgo Máximo Permitido</p>
                        <p className="text-lg font-mono text-[var(--red)] font-bold">{accountInfo.maxRiskAmount}€</p>
                    </div>
                </div>
              </div>
            )}

            {/* Semaphore header */}
            <div className={`card p-5 mb-5 semaphore-${semaphoreStatus}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">
                    {semaphoreStatus === "green" && "✅ Setup limpio — puedes operar"}
                    {semaphoreStatus === "amber" && "⚠️ Setup con riesgos — revisa bien"}
                    {semaphoreStatus === "red"   && "🚨 Setup de ALTO RIESGO — para y piensa"}
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

            {/* ── RED FLAGS ── */}
            <div className="card p-5 mb-4">
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "var(--red)" }}>
                🚩 Señales de Peligro
              </p>
              <div className="space-y-2">
                {[
                  { key: "has_fomo",        label: "Estoy entrando por FOMO / miedo a perderme el movimiento" },
                  { key: "is_extended",     label: "El precio ya está muy extendido / sobreextendido" },
                  { key: "is_chasing",      label: "Estoy persiguiendo una vela que ya se movió" },
                  { key: "is_revenge_trade",label: "Estoy operando para recuperar pérdidas (venganza)" },
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

            {/* ── GREEN FLAGS ── */}
            <div className="card p-5 mb-4">
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "var(--green)" }}>
                ✅ Condiciones Válidas
              </p>
              <div className="space-y-2">
                {[
                  { key: "has_confirmation",   label: "Tengo confirmación de estructura / momentum" },
                  { key: "is_correct_session", label: "Estoy en horario óptimo (XETRA / London overlap)" },
                  { key: "has_clear_sl",       label: "Tengo Stop Loss definido antes de entrar" },
                  { key: "follows_higher_tf",  label: "El trade está alineado con la tendencia en TF superior" },
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

            {/* Estado mental (si no hay sesión activa) */}
            {!defaultSessionId && (
              <div className="card p-5 mb-4">
                <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  Estado mental ahora mismo
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {MENTAL_STATES.map(({ value, label, icon, color }) => (
                    <button
                      key={value}
                      onClick={() => setForm((f) => ({ ...f, mental_state: value }))}
                      className="p-3 rounded-xl text-xs font-medium text-left transition-all border flex items-center gap-2"
                      style={{
                        background:   form.mental_state === value ? `${color}10` : "var(--bg-elevated)",
                        borderColor:  form.mental_state === value ? color : "transparent",
                        color:        form.mental_state === value ? color : "var(--text-muted)",
                      }}
                    >
                      <div className="text-xl">{icon}</div>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button onClick={handleStep2} disabled={!!accountError} className="btn btn-primary w-full py-3 disabled:opacity-50 mt-4">
              Continuar a Detalles del Trade <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* ────────── STEP 2: Trade Details ────────── */}
        {step === 2 && (
          <div className="animate-fade-in space-y-4">
            <div className="card p-5">
              <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Datos del Trade
              </p>
              <div className="grid grid-cols-2 gap-3">
                {/* Direction */}
                <div className="col-span-2">
                  <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Dirección</label>
                  <div className="flex gap-2">
                    {["LONG","SHORT"].map((d) => (
                      <button
                        key={d}
                        onClick={() => setForm((f) => ({ ...f, direction: d }))}
                        className="flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all"
                        style={{
                          background:  form.direction === d
                            ? d === "LONG" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)"
                            : "var(--bg-elevated)",
                          borderColor: form.direction === d
                            ? d === "LONG" ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)"
                            : "transparent",
                          color:       form.direction === d
                            ? d === "LONG" ? "var(--green)" : "var(--red)"
                            : "var(--text-muted)",
                        }}
                      >{d === "LONG" ? "▲ LONG" : "▼ SHORT"}</button>
                    ))}
                  </div>
                </div>

                {/* Setup type */}
                <div className="col-span-2">
                  <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Setup</label>
                  <select
                    className="input"
                    value={form.setup_type}
                    onChange={(e) => setForm((f) => ({ ...f, setup_type: e.target.value }))}
                  >
                    {SETUP_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Prices */}
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Entrada</label>
                  <input className="input" type="number" placeholder="18450.0"
                         value={form.entry_price} onChange={(e) => setForm((f) => ({ ...f, entry_price: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Stop Loss</label>
                  <input className="input" type="number" placeholder="18430.0"
                         value={form.sl_price} onChange={(e) => setForm((f) => ({ ...f, sl_price: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Take Profit</label>
                  <input className="input" type="number" placeholder="18490.0"
                         value={form.tp_price} onChange={(e) => setForm((f) => ({ ...f, tp_price: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>R:R Planeado</label>
                  <input className="input" type="number" step="0.5" min="0.5"
                         value={form.rr_planned} onChange={(e) => setForm((f) => ({ ...f, rr_planned: +e.target.value }))} />
                </div>

                {/* PnL result */}
                <div className="col-span-2">
                  <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>
                    Resultado PnL (€) <span style={{ color: "var(--red)" }}>*</span>
                  </label>
                  <input
                    className="input font-mono text-base"
                    type="number"
                    step="0.01"
                    placeholder="+125.00 o -80.00"
                    value={form.result_pnl}
                    onChange={(e) => setForm((f) => ({ ...f, result_pnl: e.target.value }))}
                    style={{
                      color: form.result_pnl
                        ? +form.result_pnl >= 0 ? "var(--green)" : "var(--red)"
                        : "var(--text-primary)",
                    }}
                  />
                </div>

                {/* In plan toggle */}
                <div className="col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <div
                      onClick={() => setForm((f) => ({ ...f, is_in_plan: !f.is_in_plan }))}
                      className="w-10 h-5 rounded-full transition-colors relative"
                      style={{ background: form.is_in_plan ? "var(--green)" : "var(--bg-muted)" }}
                    >
                      <div className="absolute w-3.5 h-3.5 bg-white rounded-full top-0.75 transition-all"
                           style={{ left: form.is_in_plan ? "calc(100% - 18px)" : "3px", top: "3px" }} />
                    </div>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Trade dentro del plan de sesión
                    </span>
                  </label>
                </div>

                {/* Notes */}
                <div className="col-span-2">
                  <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Notas rápidas</label>
                  <textarea
                    className="input resize-none"
                    rows={2}
                    placeholder="¿Qué viste en el gráfico?"
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* ── Screenshots ── */}
            <div className="card p-5">
              <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Capturas de Pantalla
              </p>
              <div className="grid grid-cols-2 gap-4">
                <UploadZone label="Antes de entrar" value={form.screenshot_pre}
                            onUpload={(p) => setForm((f) => ({ ...f, screenshot_pre: p }))} />
                <UploadZone label="Resultado final" value={form.screenshot_post}
                            onUpload={(p) => setForm((f) => ({ ...f, screenshot_post: p }))} />
              </div>
            </div>

            {/* ── Mistake tags ── */}
            <div className="card p-5">
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Errores cometidos (opcional)
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

            {/* ── Risk Acceptance (Mark Douglas) ── */}
            <div className="card p-5 border border-[#dc2626]">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <div
                  onClick={() => setRiskAccepted(!riskAccepted)}
                  className="w-6 h-6 rounded flex-shrink-0 flex items-center justify-center border transition-all mt-0.5"
                  style={{
                    borderColor: riskAccepted ? "var(--red)" : "var(--border)",
                    background: riskAccepted ? "var(--red)" : "transparent",
                  }}
                >
                  {riskAccepted && <CheckCircle2 size={16} color="#ffffff" />}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                     Filosofía de Mark Douglas (Obligatorio)
                  </p>
                  <p className="text-xs leading-relaxed mt-1" style={{ color: "var(--text-muted)" }}>
                     "Acepto que este trade es solo una probabilidad en mi serie. No sé ni necesito saber qué va a pasar para ganar dinero. Estoy 100% en paz si este trade toca mi Stop Loss de {accountInfo?.maxRiskAmount ?? 50}€."
                  </p>
                </div>
              </label>
            </div>

            {/* ── Execution Score ── */}
            <div className="card p-5">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#a855f7]">Score de Ejecución</p>
                <div className="bg-[#a855f720] text-[#a855f7] px-3 py-1 rounded-lg font-mono font-bold">
                  {executionScore}/10
                </div>
              </div>
              <p className="text-xs mb-4 text-[var(--text-muted)]">
                Ignora si ganaste o perdiste. ¿Qué tan bien ejecutaste tu plan (entrada, salida, disciplina)?
              </p>
              <input 
                type="range" min="1" max="10" step="1" 
                value={executionScore} 
                onChange={(e) => setExecutionScore(parseInt(e.target.value))}
                className="w-full accent-[#a855f7]"
              />
              <div className="flex justify-between text-xs mt-2 text-[var(--text-muted)] font-mono">
                <span>1 (Pésimo)</span>
                <span>10 (Robot)</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn btn-ghost">
                <ChevronLeft size={15} /> Atrás
              </button>
              <button
                onClick={handleSubmit}
                disabled={!form.result_pnl || loading || !riskAccepted}
                className="btn btn-primary flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Guardando..." : "✓ Guardar Trade"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ── Checklist item ────────────────────────────────────────────
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
