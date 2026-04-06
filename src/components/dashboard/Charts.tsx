"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LineChart, Line, ReferenceLine,
} from "recharts";
import { formatDate, formatPnl, getDisciplineColor } from "@/lib/utils";
import { MISTAKE_TYPES } from "@/lib/constants";

// ─── Discipline + PnL combined bar chart ─────────────────────
type SessionRow = {
  date: Date | string;
  total_pnl: number;
  discipline_score: number;
  trades: { mistakes: { mistake_type: string; penalty_score: number }[] }[];
};

export function DisciplinePnlChart({ sessions }: { sessions: SessionRow[] }) {
  const data = [...sessions]
    .reverse()
    .slice(-14)
    .map((s) => ({
      date:        formatDate(s.date).split(" ").slice(0, 2).join(" "),
      pnl:         s.total_pnl,
      discipline:  s.discipline_score,
      mistakes:    s.trades.reduce((acc, t) => acc + t.mistakes.length, 0),
      cost:        -s.trades
        .flatMap((t) => t.mistakes)
        .reduce((acc, m) => acc + Math.abs(m.penalty_score), 0),
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="card p-3 text-xs min-w-[140px]" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
        <p className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex justify-between gap-4 mb-1">
            <span style={{ color: "var(--text-muted)" }}>{p.name}</span>
            <span style={{ color: p.fill ?? p.color }} className="font-mono font-semibold">
              {p.name === "PnL" ? formatPnl(p.value) : p.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
        <YAxis yAxisId="pnl"   orientation="left"  tick={{ fontSize: 10 }} />
        <YAxis yAxisId="disc"  orientation="right" tick={{ fontSize: 10 }} domain={[0,100]} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine yAxisId="pnl" y={0} stroke="rgba(255,255,255,0.15)" />
        <Bar yAxisId="pnl" dataKey="pnl" name="PnL" radius={[4,4,0,0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.pnl >= 0 ? "rgba(34,197,94,0.7)" : "rgba(239,68,68,0.7)"} />
          ))}
        </Bar>
        <Bar yAxisId="disc" dataKey="discipline" name="Disciplina" fill="rgba(99,102,241,0.5)" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Cumulative PnL line ──────────────────────────────────────
type TradeRow = { time: Date | string; result_pnl: number; is_in_plan: boolean };

export function CumulativePnlChart({ trades }: { trades: TradeRow[] }) {
  let cum = 0;
  let cumPlan = 0;
  let cumFomo = 0;

  const data = [...trades].reverse().map((t, i) => {
    cum     += t.result_pnl;
    if (t.is_in_plan) cumPlan += t.result_pnl;
    else              cumFomo += t.result_pnl;
    return {
      i:    i + 1,
      all:  +cum.toFixed(2),
      plan: +cumPlan.toFixed(2),
      fomo: +cumFomo.toFixed(2),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="i" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip
          contentStyle={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
          labelFormatter={(l) => `Trade #${l}`}
          formatter={(val: any, name: any) => [formatPnl(Number(val)), String(name)]}
        />
        <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" />
        <Line dataKey="all"  name="Total"     stroke="#6366f1" strokeWidth={2} dot={false} />
        <Line dataKey="plan" name="En plan"   stroke="#22c55e" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
        <Line dataKey="fomo" name="Fuera plan" stroke="#ef4444" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ─── Mistake frequency bar ────────────────────────────────────
export function MistakeFrequencyChart({ mistakeMap }: { mistakeMap: Record<string, number> }) {
  const data = MISTAKE_TYPES
    .map((m) => ({ name: m.label, count: mistakeMap[m.value] ?? 0, color: m.color }))
    .filter((d) => d.count > 0)
    .sort((a, b) => b.count - a.count);

  if (data.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-sm" style={{ color: "var(--text-muted)" }}>
        Sin errores registrados 🎯
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
        <XAxis type="number" tick={{ fontSize: 10 }} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={80} />
        <Tooltip
          contentStyle={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
        />
        <Bar dataKey="count" name="Veces" radius={[0,4,4,0]}>
          {data.map((d, i) => <Cell key={i} fill={d.color} fillOpacity={0.8} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Discipline gauge (simple radial) ────────────────────────
export function DisciplineGauge({ score }: { score: number }) {
  const color = getDisciplineColor(score);
  const r     = 52;
  const circ  = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);

  return (
    <svg width={130} height={130} viewBox="0 0 130 130">
      <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
      <circle
        cx="65" cy="65" r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 65 65)"
        style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.4s" }}
      />
      <text x="65" y="60" textAnchor="middle" fill={color} fontSize="22" fontWeight="700">{score}</text>
      <text x="65" y="78" textAnchor="middle" fill="var(--text-muted)" fontSize="10">/ 100</text>
    </svg>
  );
}
