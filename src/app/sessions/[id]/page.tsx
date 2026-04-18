export const dynamic = "force-dynamic";
import { getSession } from "@/app/actions/sessions";
import { notFound } from "next/navigation";
import {
  formatDate, formatTime, formatPnl,
  getDisciplineColor, getDisciplineLabel, getMistakeInfo,
} from "@/lib/utils";
import { Clock } from "lucide-react";

import CloseSessionPanel from "@/components/sessions/CloseSessionPanel";
import SessionTradesClient from "@/components/sessions/SessionTradesClient";

export const metadata = { title: "Detalle Sesión — ScalpOS" };

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession(parseInt(id, 10));
  if (!session) notFound();

  const dc = getDisciplineColor(session.discipline_score);
  const winners   = session.trades.filter((t: any) => t.result_pnl > 0).length;
  const inPlan    = session.trades.filter((t: any) => t.is_in_plan).length;
  const mistakes  = session.trades.flatMap((t: any) => t.mistakes);
  const wr        = session.trades.length > 0 ? Math.round((winners / session.trades.length) * 100) : 0;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Sesión del {formatDate(session.date)}
          </h1>
          <div className="flex items-center gap-4 mt-1.5">
            <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              <Clock size={11} /> {formatTime(session.start_time)}
              {session.end_time && ` → ${formatTime(session.end_time)}`}
            </span>
            <span className="badge text-xs"
                  style={{
                    color: session.mental_state === "A_GAME" || session.mental_state === "B_GAME"
                      ? "var(--green)" : "var(--amber)",
                    background: "var(--bg-elevated)",
                  }}>
              {session.mental_state}
            </span>
          </div>
        </div>
        {!session.is_closed && (
          <CloseSessionPanel
            sessionId={session.id}
            currentScore={session.discipline_score}
          />
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Disciplina" value={`${session.discipline_score}/100`} color={dc} />
        <StatCard
          label="PnL"
          value={formatPnl(session.total_pnl)}
          color={session.total_pnl >= 0 ? "var(--green)" : "var(--red)"}
        />
        <StatCard label="Winrate" value={`${wr}%`} color="var(--blue)" />
        <StatCard label="En Plan" value={`${inPlan}/${session.trades.length}`}
                  color={inPlan === session.trades.length ? "var(--green)" : "var(--amber)"} />
      </div>

      {/* Conclusion (if closed) */}
      {session.is_closed && session.conclusion && (
        <div className="card p-5 semaphore-green">
          <p className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "var(--green)" }}>
            Conclusión de sesión
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{session.conclusion}</p>
        </div>
      )}

      {/* Mistakes summary */}
      {mistakes.length > 0 && (
        <div className="card p-5">
          <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "var(--red)" }}>
            ⚠ Errores de la sesión
          </p>
          <div className="flex flex-wrap gap-2">
            {mistakes.map((m: any) => {
              const info = getMistakeInfo(m.mistake_type);
              return (
                <span key={m.id} className="badge px-3 py-1 text-xs"
                      style={{ background: `${info.color}18`, color: info.color, border: `1px solid ${info.color}40` }}>
                  {info.label} <span className="opacity-60 ml-1">−{m.penalty_score}pts</span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Trades list */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between"
             style={{ borderColor: "var(--border)" }}>
          <p className="text-sm font-semibold">Trades de la sesión</p>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {session.trades.length} registrados — clic para ver detalle
          </span>
        </div>
        <SessionTradesClient trades={session.trades} />
      </div>
    </div>
  );
}


function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="card p-4">
      <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{label}</p>
      <p className="text-xl font-bold font-mono" style={{ color }}>{value}</p>
    </div>
  );
}
