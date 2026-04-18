"use client";

import { useState, useEffect } from "react";
import {
  X, TrendingUp, TrendingDown, CheckCircle2, XCircle, ZoomIn,
} from "lucide-react";
import {
  EMOTIONS_PRE, EMOTIONS_DURING, EMOTIONS_POST,
} from "@/lib/constants";
import { formatTime, formatPnl, getMistakeInfo } from "@/lib/utils";

// ── Lightbox ────────────────────────────────────────────────────────
function ImageViewer({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{label}</p>
        <div
          className="relative rounded-xl overflow-hidden cursor-zoom-in group"
          onClick={() => setOpen(true)}
        >
          <img src={src} alt={alt} className="w-full h-44 object-cover transition-transform group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
            <ZoomIn size={28} className="text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div
            className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-medium text-white"
            style={{ background: "rgba(0,0,0,0.6)" }}
          >
            {label}
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          style={{ zIndex: 9999 }}
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-xl transition-colors"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
            onClick={() => setOpen(false)}
          >
            <X size={22} />
          </button>
          <p
            className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-medium"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {label} — clic para cerrar
          </p>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

// ── Empty screenshot placeholder ────────────────────────────────────
function NoScreenshot({ label }: { label: string }) {
  return (
    <div>
      <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{label}</p>
      <div
        className="w-full h-44 rounded-xl flex flex-col items-center justify-center gap-2 border-2 border-dashed"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        <span className="text-2xl opacity-30">📷</span>
        <span className="text-xs">Sin captura</span>
      </div>
    </div>
  );
}

// ── Emotion chip (display-only) ──────────────────────────────────────
function EmotionDisplay({
  phase, emoji, label,
}: { phase: string; emoji?: string; label?: string }) {
  return (
    <div
      className="flex-1 rounded-xl p-3 text-center"
      style={{ background: "var(--bg-elevated)" }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
        {phase}
      </p>
      <div className="text-3xl mb-1">{emoji ?? "—"}</div>
      <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
        {label ?? "Sin registrar"}
      </p>
    </div>
  );
}

// ── Main Modal ───────────────────────────────────────────────────────
export default function TradeDetailModal({
  trade,
  onClose,
}: {
  trade: any;
  onClose: () => void;
}) {
  const isWin = trade.result_pnl >= 0;

  const emotionPre    = EMOTIONS_PRE.find((e) => e.value === trade.emotion_pre);
  const emotionDuring = EMOTIONS_DURING.find((e) => e.value === trade.emotion_during);
  const emotionPost   = EMOTIONS_POST.find((e) => e.value === trade.emotion_post);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="modal-overlay animate-fade-in"
      style={{ zIndex: 300 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="modal-box animate-scale-in"
        style={{
          maxWidth: 780,
          padding: 0,
          overflow: "hidden",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Header ── */}
        <div
          className="px-6 py-4 flex items-center justify-between border-b shrink-0"
          style={{
            borderColor: "var(--border)",
            background: isWin
              ? "rgba(34,197,94,0.06)"
              : "rgba(239,68,68,0.06)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className={`direction-badge ${trade.direction === "LONG" ? "long" : "short"}`}>
              {trade.direction === "LONG"
                ? <TrendingUp size={14} />
                : <TrendingDown size={14} />}
              {trade.direction}
            </span>
            <div>
              <p className="font-semibold text-sm">{trade.setup_type}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                {formatTime(trade.time)}
                {trade.rr_planned ? ` · ${trade.rr_planned}R planeado` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p
              className="text-2xl font-bold font-mono"
              style={{ color: isWin ? "var(--green)" : "var(--red)" }}
            >
              {isWin ? "+" : ""}{Number(trade.result_pnl).toFixed(2)}€
            </p>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors hover:bg-zinc-700"
              title="Cerrar (Esc)"
            >
              <X size={18} style={{ color: "var(--text-muted)" }} />
            </button>
          </div>
        </div>

        {/* ── Body (scrollable) ── */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3">
            <div className="card p-3 text-center">
              <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>En Plan</p>
              <div className="flex justify-center">
                {trade.is_in_plan
                  ? <CheckCircle2 size={20} style={{ color: "var(--green)" }} />
                  : <XCircle size={20} style={{ color: "var(--red)" }} />}
              </div>
            </div>
            <div className="card p-3 text-center">
              <p className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "var(--text-muted)" }}>Score</p>
              <p className="text-lg font-bold font-mono" style={{ color: "#a855f7" }}>
                {trade.execution_score}<span className="text-xs opacity-60">/10</span>
              </p>
            </div>
            <div className="card p-3 text-center">
              <p className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "var(--text-muted)" }}>SL (pts)</p>
              <p className="text-sm font-mono font-semibold">{trade.sl_price ?? "—"}</p>
            </div>
            <div className="card p-3 text-center">
              <p className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "var(--text-muted)" }}>TP (pts)</p>
              <p className="text-sm font-mono font-semibold">{trade.tp_price ?? "—"}</p>
            </div>
          </div>

          {/* Main grid: info left | screenshots right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ── LEFT: Info ── */}
            <div className="space-y-5">

              {/* Emociones */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                  Estado emocional
                </p>
                <div className="flex gap-2">
                  <EmotionDisplay
                    phase="Antes"
                    emoji={emotionPre?.emoji}
                    label={emotionPre?.label}
                  />
                  <EmotionDisplay
                    phase="Durante"
                    emoji={emotionDuring?.emoji}
                    label={emotionDuring?.label}
                  />
                  <EmotionDisplay
                    phase="Después"
                    emoji={emotionPost?.emoji}
                    label={emotionPost?.label}
                  />
                </div>
              </div>

              {/* Errores */}
              {trade.mistakes && trade.mistakes.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--red)" }}>
                    ⚠ Errores cometidos
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {trade.mistakes.map((m: any) => {
                      const info = getMistakeInfo(m.mistake_type);
                      return (
                        <span
                          key={m.id ?? m.mistake_type}
                          className="badge px-3 py-1 text-xs"
                          style={{
                            background: `${info.color}18`,
                            color: info.color,
                            border: `1px solid ${info.color}40`,
                          }}
                        >
                          {info.label}
                          <span className="opacity-60 ml-1.5">−{m.penalty_score}pts</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notas */}
              {trade.notes ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                    📝 Notas
                  </p>
                  <div
                    className="rounded-xl p-4 text-sm leading-relaxed"
                    style={{
                      background: "var(--bg-elevated)",
                      color: "var(--text-secondary)",
                      borderLeft: "3px solid var(--brand)",
                    }}
                  >
                    {trade.notes}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                    📝 Notas
                  </p>
                  <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>Sin notas registradas</p>
                </div>
              )}
            </div>

            {/* ── RIGHT: Screenshots ── */}
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                📷 Screenshots
              </p>
              {trade.screenshot_pre
                ? <ImageViewer src={trade.screenshot_pre} alt="Pre-entrada" label="Pre-entrada" />
                : <NoScreenshot label="Pre-entrada" />
              }
              {trade.screenshot_post
                ? <ImageViewer src={trade.screenshot_post} alt="Resultado" label="Resultado final" />
                : <NoScreenshot label="Resultado final" />
              }
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="shrink-0 px-6 py-3 border-t flex justify-end"
          style={{ borderColor: "var(--border)" }}
        >
          <button onClick={onClose} className="btn btn-ghost text-sm px-5">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
