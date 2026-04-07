export const dynamic = "force-dynamic";
import { getSessions, createSession } from "@/app/actions/sessions";
import Link from "next/link";
import { formatDate, formatTime, formatPnl, getDisciplineColor, getDisciplineLabel } from "@/lib/utils";
import { Activity, CheckCircle2, Clock, Plus, ChevronRight } from "lucide-react";
import NewSessionButton from "@/components/sessions/NewSessionButton";

export const metadata = { title: "Sesiones — ScalpOS" };

export default async function SessionsPage() {
  const sessions = await getSessions(50);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sesiones</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Historial de días de trading
          </p>
        </div>
        <NewSessionButton />
      </div>

      {sessions.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
            No hay sesiones registradas. Comienza tu primer día.
          </p>
          <NewSessionButton />
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((s: any) => {
            const dc = getDisciplineColor(s.discipline_score);
            const dl = getDisciplineLabel(s.discipline_score);
            const winners = s.trades.filter((t: any) => t.result_pnl > 0).length;
            const wr = s.trades.length > 0 ? Math.round((winners / s.trades.length) * 100) : 0;

            return (
              <Link
                key={s.id}
                href={`/sessions/${s.id}`}
                className="card p-5 flex items-center gap-5 hover:bg-zinc-800/60 transition-colors group"
              >
                {/* Status dot */}
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: s.is_closed ? "var(--text-muted)" : "var(--green)" }}
                />

                {/* Date */}
                <div className="min-w-[90px]">
                  <p className="text-sm font-semibold">{formatDate(s.date)}</p>
                  <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "var(--text-muted)" }}>
                    <Clock size={10} /> {formatTime(s.start_time)}
                  </p>
                </div>

                {/* Discipline score */}
                <div className="min-w-[90px]">
                  <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>Disciplina</p>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-muted)" }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${s.discipline_score}%`, background: dc }}
                      />
                    </div>
                    <span className="text-xs font-bold" style={{ color: dc }}>{s.discipline_score}</span>
                  </div>
                  <p className="text-[10px] mt-0.5" style={{ color: dc }}>{dl}</p>
                </div>

                {/* PnL */}
                <div className="min-w-[80px]">
                  <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>PnL</p>
                  <p className="text-base font-mono font-bold"
                     style={{ color: s.total_pnl >= 0 ? "var(--green)" : "var(--red)" }}>
                    {formatPnl(s.total_pnl)}
                  </p>
                </div>

                {/* Trades */}
                <div className="min-w-[60px]">
                  <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>Trades</p>
                  <p className="text-sm font-semibold">{s.trades.length}</p>
                </div>

                {/* Winrate */}
                <div className="min-w-[60px]">
                  <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>Winrate</p>
                  <p className="text-sm font-semibold">{wr}%</p>
                </div>

                {/* Estado */}
                <div className="flex-1">
                  {s.is_closed
                    ? <span className="badge text-xs" style={{ color: "var(--text-muted)", background: "var(--bg-elevated)" }}>
                        <CheckCircle2 size={10} className="inline mr-1" /> Cerrada
                      </span>
                    : <span className="badge text-xs" style={{ color: "var(--green)", background: "var(--green-dim)" }}>
                        <Activity size={10} className="inline mr-1" /> Activa
                      </span>
                  }
                </div>

                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: "var(--text-muted)" }} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
