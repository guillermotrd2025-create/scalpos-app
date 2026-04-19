"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2, XCircle, Plus, Filter,
} from "lucide-react";
import { formatDate, formatTime, formatPnl, getMistakeInfo } from "@/lib/utils";
import {
  SETUP_TYPES,
  EMOTIONS_PRE, EMOTIONS_DURING, EMOTIONS_POST,
} from "@/lib/constants";
import TradeDetailModal from "@/components/trades/TradeDetailModal";

function FilterChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className="badge transition-all"
      style={{
        background:   active ? "var(--brand-dim)" : "var(--bg-elevated)",
        color:        active ? "var(--brand)"     : "var(--text-muted)",
        border:       `1px solid ${active ? "var(--brand)" : "transparent"}`,
        padding:      "5px 12px",
        borderRadius: "99px",
        fontSize:     "0.75rem",
      }}
    >
      {label}
    </Link>
  );
}

export default function TradesListClient({
  trades,
  filterParams,
}: {
  trades: any[];
  filterParams: { setup?: string; direction?: string; plan?: string; mistakes?: string };
}) {
  const [selectedTrade, setSelectedTrade] = useState<any | null>(null);
  const params = filterParams;

  return (
    <>
      {selectedTrade && (
        <TradeDetailModal
          trade={selectedTrade}
          onClose={() => setSelectedTrade(null)}
        />
      )}

      {/* Filter bar */}
      <div className="card p-4 flex flex-wrap items-center gap-3">
        <Filter size={14} style={{ color: "var(--text-muted)" }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>Filtrar por:</span>

        <FilterChip href="/trades" label="Todos" active={!params.setup && !params.direction && !params.plan && !params.mistakes} />
        <FilterChip href="/trades?plan=true"     label="✅ En plan"     active={params.plan === "true"} />
        <FilterChip href="/trades?plan=false"    label="❌ Fuera plan"  active={params.plan === "false"} />
        <FilterChip href="/trades?direction=LONG"  label="▲ LONG"  active={params.direction === "LONG"} />
        <FilterChip href="/trades?direction=SHORT" label="▼ SHORT" active={params.direction === "SHORT"} />
        <FilterChip href="/trades?mistakes=true" label="⚠ Con errores" active={params.mistakes === "true"} />
      </div>

      {/* Trades table */}
      {trades.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>No hay trades con estos filtros</p>
          <Link href="/trades/new" className="btn btn-primary inline-flex">
            <Plus size={15} /> Registrar primer trade
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="border-b text-xs"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                {["Fecha", "Hora", "Dir", "Setup", "SL:TP (Pts)", "R:R", "PnL (€)", "Plan", "Emociones", "Ejecución", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trades.map((t: any) => {
                const pre = EMOTIONS_PRE.find((e) => e.value === t.emotion_pre)?.emoji || "—";
                const dur = EMOTIONS_DURING.find((e) => e.value === t.emotion_during)?.emoji || "—";
                const pos = EMOTIONS_POST.find((e) => e.value === t.emotion_post)?.emoji || "—";
                const hasImages = t.screenshot_pre || t.screenshot_post;

                return (
                  <tr
                    key={t.id}
                    onClick={() => setSelectedTrade(t)}
                    className="border-b transition-colors hover:bg-zinc-800/50 cursor-pointer"
                    style={{ borderColor: "var(--border)" }}
                    title="Clic para ver detalle completo"
                  >
                    <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                      {formatDate(t.session.date)}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                      {formatTime(t.time)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge font-bold ${
                        t.direction === "LONG"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-red-400/10 text-red-400"
                      }`}>
                        {t.direction === "LONG" ? "▲" : "▼"} {t.direction}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
                      {t.setup_type}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                      {t.sl_price ?? "—"}:{t.tp_price ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>
                      {Number(t.rr_planned).toFixed(2)}R
                    </td>
                    <td
                      className="px-4 py-3 font-mono font-bold whitespace-nowrap"
                      style={{ color: t.result_pnl >= 0 ? "var(--green)" : "var(--red)" }}
                    >
                      {formatPnl(t.result_pnl)}
                    </td>
                    <td className="px-4 py-3">
                      {t.is_in_plan
                        ? <CheckCircle2 size={14} style={{ color: "var(--green)" }} />
                        : <XCircle size={14} style={{ color: "var(--red)" }} />}
                    </td>
                    <td className="px-4 py-3 text-lg space-x-0.5 whitespace-nowrap">
                      <span title="Pre-trade">{pre}</span>
                      <span title="Durante">{dur}</span>
                      <span title="Post-trade">{pos}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/40 px-1.5 py-0.5 rounded">
                          {t.execution_score}/10
                        </span>
                        {t.mistakes.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {t.mistakes.slice(0, 2).map((m: any) => {
                              const info = getMistakeInfo(m.mistake_type);
                              return (
                                <span
                                  key={m.id}
                                  className="badge text-xs"
                                  style={{ background: `${info.color}20`, color: info.color }}
                                >
                                  {info.label}
                                </span>
                              );
                            })}
                            {t.mistakes.length > 2 && (
                              <span className="badge" style={{ color: "var(--text-muted)", background: "var(--bg-elevated)" }}>
                                +{t.mistakes.length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span style={{ color: "var(--text-muted)" }}>—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 items-center">
                        {hasImages && (
                          <span className="badge" style={{ color: "var(--brand)", background: "var(--brand-dim)" }}>
                            📷
                          </span>
                        )}
                        {t.notes && (
                          <span className="badge" style={{ color: "var(--text-primary)", background: "var(--bg-muted)" }}>
                            📝
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
