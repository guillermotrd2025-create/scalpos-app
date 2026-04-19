export const dynamic = "force-dynamic";
import { getDashboardStats, getTodaySession } from "@/app/actions/sessions";
import { getTrades } from "@/app/actions/trades";
import {
  DisciplinePnlChart,
  CumulativePnlChart,
  MistakeFrequencyChart,
  DisciplineGauge,
} from "@/components/dashboard/Charts";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, Target, AlertTriangle,
  CheckCircle2, XCircle, Plus, Activity
} from "lucide-react";
import { formatPnl, getDisciplineColor, getDisciplineLabel, formatDate, formatTime } from "@/lib/utils";
import { MISTAKE_TYPES, EMOTIONS_PRE, EMOTIONS_DURING, EMOTIONS_POST } from "@/lib/constants";

export default async function DashboardPage() {
  const [stats, todaySession, recentTrades] = await Promise.all([
    getDashboardStats(),
    getTodaySession(),
    getTrades({ limit: 10 }),
  ]);

  const allTrades = stats.sessions.flatMap((s: any) => s.trades);
  const disciplineColor = getDisciplineColor(Math.round(stats.avgDiscipline));
  const disciplineLabel = getDisciplineLabel(Math.round(stats.avgDiscipline));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Tu rendimiento de disciplina — últimas 30 sesiones
          </p>
        </div>
        <Link href="/trades/new" className="btn btn-primary">
          <Plus size={15} /> Nuevo Trade
        </Link>
      </div>

      {/* ── Session banner ── */}
      {todaySession && !todaySession.is_closed && (
        <div className="card p-4 flex items-center justify-between semaphore-green animate-fade-in">
          <div className="flex items-center gap-3">
            <Activity size={18} style={{ color: "var(--green)" }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--green)" }}>Sesión activa</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Inicio: {formatTime(todaySession.start_time)} · {todaySession.trades.length} trades
              </p>
            </div>
          </div>
          <Link href={`/sessions/${todaySession.id}`} className="btn btn-ghost text-xs">
            Ver sesión →
          </Link>
        </div>
      )}

      {/* ── KPI row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Discipline Score"
          value={`${Math.round(stats.avgDiscipline)}`}
          sub={disciplineLabel}
          color={disciplineColor}
          icon={<Target size={18} />}
        />
        <KpiCard
          label="PnL Total"
          value={formatPnl(stats.totalPnl)}
          sub="últimas 30 sesiones"
          color={stats.totalPnl >= 0 ? "var(--green)" : "var(--red)"}
          icon={stats.totalPnl >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
        />
        <KpiCard
          label="Winrate"
          value={`${stats.winrate.toFixed(1)}%`}
          sub={`${stats.totalTrades} trades`}
          color="var(--blue)"
          icon={<CheckCircle2 size={18} />}
        />
        <KpiCard
          label="Trades en Plan"
          value={`${stats.inPlanRate.toFixed(1)}%`}
          sub={`${Math.round(stats.totalTrades * stats.inPlanRate / 100)} / ${stats.totalTrades}`}
          color={stats.inPlanRate >= 80 ? "var(--green)" : stats.inPlanRate >= 60 ? "var(--amber)" : "var(--red)"}
          icon={<AlertTriangle size={18} />}
        />
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Discipline + PnL */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">PnL vs Disciplina (14 días)</h2>
            <div className="flex gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block bg-indigo-500" />Disciplina</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block bg-emerald-500" />PnL +</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block bg-red-500" />PnL −</span>
            </div>
          </div>
          {stats.sessions.length > 0
            ? <DisciplinePnlChart sessions={stats.sessions} />
            : <EmptyChartMsg msg="Sin sesiones aún" />
          }
        </div>

        {/* Discipline gauge */}
        <div className="card p-5 flex flex-col items-center justify-center gap-2">
          <p className="text-sm font-semibold self-start w-full">Score Promedio</p>
          <DisciplineGauge score={Math.round(stats.avgDiscipline)} />
          <p className="text-xs font-semibold" style={{ color: disciplineColor }}>{disciplineLabel}</p>
          <p className="text-[11px] text-center mt-1" style={{ color: "var(--text-muted)" }}>
            La disciplina paga más que el PnL
          </p>
        </div>
      </div>

      {/* ── Second charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cumulative PnL */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold mb-4">PnL Acumulado: En Plan vs FOMO</h2>
          {allTrades.length > 0
            ? <CumulativePnlChart trades={allTrades} />
            : <EmptyChartMsg msg="Sin trades aún" />
          }
        </div>

        {/* Mistake frequency */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold mb-1">Errores más frecuentes</h2>
          <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
            Cuánto te cuesta cada patrón de error
          </p>
          <MistakeFrequencyChart mistakeMap={stats.mistakeMap} />
        </div>
      </div>

      {/* ── Recent trades table ── */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Últimos Trades</h2>
          <Link href="/trades" className="text-xs" style={{ color: "var(--brand)" }}>Ver todos →</Link>
        </div>
        {recentTrades.length === 0
          ? <EmptyChartMsg msg="Aún no has registrado trades" />
          : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ color: "var(--text-muted)", borderColor: "var(--border)" }} className="border-b">
                    {["Hora","Dir","Setup","R:R","PnL","Plan","Emociones","Errores"].map(h => (
                      <th key={h} className="pb-2 text-left font-medium pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {recentTrades.map((t: any) => {
                    const pre = EMOTIONS_PRE.find(e => e.value === t.emotion_pre)?.emoji || "—";
                    const dur = EMOTIONS_DURING.find(e => e.value === t.emotion_during)?.emoji || "—";
                    const pos = EMOTIONS_POST.find(e => e.value === t.emotion_post)?.emoji || "—";
                    
                    return (
                    <tr key={t.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-2 pr-4" style={{ color: "var(--text-muted)" }}>{formatTime(t.time)}</td>
                      <td className="py-2 pr-4">
                        <span className={`badge ${t.direction === "LONG" ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>
                          {t.direction}
                        </span>
                      </td>
                      <td className="py-2 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>{t.setup_type}</td>
                      <td className="py-2 pr-4" style={{ color: "var(--text-muted)" }}>{Number(t.rr_planned).toFixed(2)}R</td>
                      <td className="py-2 pr-4 font-mono font-semibold" style={{ color: t.result_pnl >= 0 ? "var(--green)" : "var(--red)" }}>
                        {formatPnl(t.result_pnl)}
                      </td>
                      <td className="py-2 pr-4">
                        {t.is_in_plan
                          ? <CheckCircle2 size={13} style={{ color: "var(--green)" }} />
                          : <XCircle size={13} style={{ color: "var(--red)" }} />
                        }
                      </td>
                      <td className="py-2 pr-4 text-sm space-x-1 whitespace-nowrap">
                        <span title="Pre">{pre}</span>
                        <span title="Durante">{dur}</span>
                        <span title="Post">{pos}</span>
                      </td>
                      <td className="py-2">
                        {t.mistakes.length > 0
                          ? <span className="badge text-red-400 bg-red-400/10">{t.mistakes.length}</span>
                          : <span style={{ color: "var(--text-muted)" }}>—</span>
                        }
                      </td>
                    </tr>
                  );
                  })}
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────
function KpiCard({ label, value, sub, color, icon }: {
  label: string; value: string; sub: string; color: string; icon: React.ReactNode;
}) {
  return (
    <div className="card p-5 flex flex-col gap-3 animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{label}</span>
        <span style={{ color }}>{icon}</span>
      </div>
      <p className="text-2xl font-bold font-mono" style={{ color }}>{value}</p>
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</p>
    </div>
  );
}

function EmptyChartMsg({ msg }: { msg: string }) {
  return (
    <div className="h-32 flex items-center justify-center text-sm" style={{ color: "var(--text-muted)" }}>
      {msg}
    </div>
  );
}
