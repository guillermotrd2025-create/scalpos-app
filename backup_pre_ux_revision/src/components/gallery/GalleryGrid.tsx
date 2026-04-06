"use client";

import { useState } from "react";
import { formatDate, formatTime, formatPnl, getMistakeInfo } from "@/lib/utils";
import { CheckCircle2, XCircle, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { SETUP_TYPES } from "@/lib/constants";

type Trade = {
  id: number;
  time: Date | string;
  direction: string;
  setup_type: string;
  result_pnl: number;
  is_in_plan: boolean;
  screenshot_pre: string | null;
  screenshot_post: string | null;
  rr_planned: number;
  notes: string | null;
  session: { date: Date | string };
  mistakes: { id: number; mistake_type: string }[];
};

export default function GalleryGrid({ trades }: { trades: Trade[] }) {
  const [filter, setFilter] = useState<"all" | "pre" | "post">("all");
  const [setupFilter, setSetupFilter] = useState("all");
  const [lightbox, setLightbox] = useState<{ trade: Trade; img: string } | null>(null);

  // Collect all displayable trades
  const withImages = trades.filter((t) =>
    filter === "all"
      ? t.screenshot_pre || t.screenshot_post
      : filter === "pre"
      ? t.screenshot_pre
      : t.screenshot_post
  ).filter((t) =>
    setupFilter === "all" || t.setup_type === setupFilter
  );

  // Lightbox navigation
  const allImages = withImages.flatMap((t) => {
    const imgs: { trade: Trade; img: string }[] = [];
    if (t.screenshot_pre  && (filter !== "post")) imgs.push({ trade: t, img: t.screenshot_pre });
    if (t.screenshot_post && (filter !== "pre"))  imgs.push({ trade: t, img: t.screenshot_post });
    return imgs;
  });

  const currentIdx = lightbox
    ? allImages.findIndex((i) => i.img === lightbox.img && i.trade.id === lightbox.trade.id)
    : -1;

  const navigate = (dir: 1 | -1) => {
    if (currentIdx < 0) return;
    const next = allImages[(currentIdx + dir + allImages.length) % allImages.length];
    if (next) setLightbox(next);
  };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        {/* Type filter */}
        <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
          {(["all","pre","post"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 text-xs font-medium transition-all"
              style={{
                background: filter === f ? "var(--brand)" : "var(--bg-elevated)",
                color:      filter === f ? "#fff" : "var(--text-muted)",
              }}
            >
              {f === "all" ? "Todas" : f === "pre" ? "Antes" : "Después"}
            </button>
          ))}
        </div>

        {/* Setup filter */}
        <select
          className="input text-xs"
          style={{ width: "auto", paddingRight: 28 }}
          value={setupFilter}
          onChange={(e) => setSetupFilter(e.target.value)}
        >
          <option value="all">Todos los setups</option>
          {SETUP_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <span className="text-xs self-center ml-auto" style={{ color: "var(--text-muted)" }}>
          {withImages.length} trades · {allImages.length} capturas
        </span>
      </div>

      {/* Grid */}
      {withImages.length === 0 ? (
        <div className="card p-12 text-center text-sm" style={{ color: "var(--text-muted)" }}>
          No hay capturas con este filtro
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {withImages.map((t) => {
            const imgs = [
              ...(t.screenshot_pre  && filter !== "post" ? [{ src: t.screenshot_pre,  label: "Antes" }] : []),
              ...(t.screenshot_post && filter !== "pre"  ? [{ src: t.screenshot_post, label: "Después" }] : []),
            ];

            return imgs.map(({ src, label }) => (
              <div
                key={`${t.id}-${label}`}
                className="card overflow-hidden group cursor-pointer"
                onClick={() => setLightbox({ trade: t, img: src })}
              >
                {/* Image */}
                <div className="relative">
                  <img src={src} alt={`${t.setup_type} ${label}`}
                       className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all
                                  flex items-center justify-center">
                    <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {/* Label chip */}
                  <span className="absolute top-2 left-2 badge text-[10px]"
                        style={{ background: "rgba(0,0,0,0.7)", color: "#fff" }}>
                    {label}
                  </span>
                  {/* PnL chip */}
                  <span className="absolute top-2 right-2 badge font-mono font-bold text-[10px]"
                        style={{
                          background: t.result_pnl >= 0 ? "rgba(34,197,94,0.85)" : "rgba(239,68,68,0.85)",
                          color: "#fff",
                        }}>
                    {formatPnl(t.result_pnl)}
                  </span>
                </div>

                {/* Meta */}
                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold truncate">{t.setup_type}</span>
                    <span className={`badge text-[10px] ${t.direction === "LONG"
                      ? "bg-emerald-400/10 text-emerald-400"
                      : "bg-red-400/10 text-red-400"}`}>
                      {t.direction === "LONG" ? "▲" : "▼"}
                    </span>
                  </div>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    {formatDate(t.session.date)} · {formatTime(t.time)}
                  </p>
                  <div className="flex items-center gap-2">
                    {t.is_in_plan
                      ? <CheckCircle2 size={10} style={{ color: "var(--green)" }} />
                      : <XCircle size={10} style={{ color: "var(--red)" }} />}
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                      {t.is_in_plan ? "En plan" : "Fuera del plan"}
                    </span>
                    {t.mistakes.length > 0 && (
                      <span className="badge text-[10px] ml-auto"
                            style={{ background: "var(--red-dim)", color: "var(--red)" }}>
                        {t.mistakes.length} error{t.mistakes.length > 1 ? "es" : ""}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ));
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="modal-overlay animate-fade-in" onClick={() => setLightbox(null)}>
          <div className="animate-scale-in flex flex-col items-center gap-4 max-w-5xl w-full px-4"
               onClick={(e) => e.stopPropagation()}>
            {/* Top bar */}
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-sm font-bold">{lightbox.trade.setup_type}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {formatDate(lightbox.trade.session.date)} · {formatTime(lightbox.trade.time)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm"
                      style={{ color: lightbox.trade.result_pnl >= 0 ? "var(--green)" : "var(--red)" }}>
                  {formatPnl(lightbox.trade.result_pnl)}
                </span>
                <button onClick={() => setLightbox(null)} className="btn btn-ghost p-1.5">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative w-full rounded-2xl overflow-hidden"
                 style={{ maxHeight: "65vh", background: "var(--bg-elevated)" }}>
              <img src={lightbox.img} alt="screenshot"
                   className="w-full h-full object-contain" style={{ maxHeight: "65vh" }} />

              <button
                onClick={() => navigate(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 btn btn-ghost p-2"
                style={{ background: "rgba(0,0,0,0.6)" }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost p-2"
                style={{ background: "rgba(0,0,0,0.6)" }}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Notes + mistakes */}
            {(lightbox.trade.notes || lightbox.trade.mistakes.length > 0) && (
              <div className="card p-4 w-full flex flex-wrap gap-4 text-sm">
                {lightbox.trade.notes && (
                  <p style={{ color: "var(--text-secondary)" }}>{lightbox.trade.notes}</p>
                )}
                {lightbox.trade.mistakes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {lightbox.trade.mistakes.map((m) => {
                      const info = getMistakeInfo(m.mistake_type);
                      return (
                        <span key={m.id} className="badge"
                              style={{ background: `${info.color}20`, color: info.color }}>
                          {info.label}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Counter */}
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {currentIdx + 1} / {allImages.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
