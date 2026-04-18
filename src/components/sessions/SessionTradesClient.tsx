"use client";

import { useState } from "react";
import {
  CheckCircle2, XCircle,
} from "lucide-react";
import { formatTime, getMistakeInfo } from "@/lib/utils";
import { EMOTIONS_PRE, EMOTIONS_DURING, EMOTIONS_POST } from "@/lib/constants";
import TradeDetailModal from "@/components/trades/TradeDetailModal";

export default function SessionTradesClient({ trades }: { trades: any[] }) {
  const [selectedTrade, setSelectedTrade] = useState<any | null>(null);

  if (trades.length === 0) {
    return (
      <div className="p-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
        Sin trades registrados en esta sesión
      </div>
    );
  }

  return (
    <>
      {selectedTrade && (
        <TradeDetailModal
          trade={selectedTrade}
          onClose={() => setSelectedTrade(null)}
        />
      )}

      <div className="divide-y" style={{ borderColor: "var(--border)" }}>
        {trades.map((t: any) => {
          const emotionPre    = EMOTIONS_PRE.find((e) => e.value === t.emotion_pre);
          const emotionDuring = EMOTIONS_DURING.find((e) => e.value === t.emotion_during);
          const emotionPost   = EMOTIONS_POST.find((e) => e.value === t.emotion_post);
          const hasImages     = t.screenshot_pre || t.screenshot_post;

          return (
            <div
              key={t.id}
              onClick={() => setSelectedTrade(t)}
              className="px-5 py-4 flex items-center gap-4 hover:bg-zinc-800/40 transition-colors cursor-pointer group"
              title="Clic para ver detalle completo"
            >
              {/* Direction */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm
                  ${t.direction === "LONG"
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-red-400/10 text-red-400"}`}
              >
                {t.direction === "LONG" ? "▲" : "▼"}
              </div>

              {/* Setup & time */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{t.setup_type}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {formatTime(t.time)} · {t.rr_planned}R planeado
                </p>
              </div>

              {/* Emociones (small) */}
              {(emotionPre || emotionDuring || emotionPost) && (
                <div className="flex items-center gap-0.5 text-base shrink-0" title="Estado emocional">
                  {emotionPre    && <span>{emotionPre.emoji}</span>}
                  {emotionDuring && <span>{emotionDuring.emoji}</span>}
                  {emotionPost   && <span>{emotionPost.emoji}</span>}
                </div>
              )}

              {/* In plan */}
              <div className="shrink-0">
                {t.is_in_plan
                  ? <CheckCircle2 size={16} style={{ color: "var(--green)" }} />
                  : <XCircle size={16} style={{ color: "var(--red)" }} />}
              </div>

              {/* Mistakes */}
              {t.mistakes.length > 0 && (
                <div className="flex gap-1 flex-wrap max-w-[160px]">
                  {t.mistakes.map((m: any) => {
                    const info = getMistakeInfo(m.mistake_type);
                    return (
                      <span
                        key={m.id}
                        className="badge text-[10px]"
                        style={{ background: `${info.color}18`, color: info.color }}
                      >
                        {info.label}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Images badge */}
              {hasImages && (
                <span
                  className="badge shrink-0"
                  style={{ color: "var(--brand)", background: "var(--brand-dim)" }}
                >
                  📷
                </span>
              )}

              {/* PnL */}
              <div className="text-right shrink-0 min-w-[70px]">
                <p
                  className="text-sm font-mono font-bold"
                  style={{ color: t.result_pnl >= 0 ? "var(--green)" : "var(--red)" }}
                >
                  {t.result_pnl >= 0 ? "+" : ""}{Number(t.result_pnl).toFixed(2)}€
                </p>
              </div>

              {/* Hover hint */}
              <div
                className="text-[10px] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--text-muted)" }}
              >
                Ver →
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
