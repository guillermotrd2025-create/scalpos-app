"use client";

import { useState } from "react";
import { registerRestDay } from "@/app/actions/challenges";
import { REST_DAY_REASONS } from "@/lib/constants";
import { useToast } from "@/components/ui/Toast";
import { X, CheckCircle2 } from "lucide-react";

export default function RestDayModal({ onClose }: { onClose: () => void }) {
  const { toast } = useToast();
  const [selected, setSelected] = useState<string | null>(null);
  const [customNote, setCustomNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selected) return;
    setLoading(true);

    const reason =
      selected === "OTHER" && customNote.trim()
        ? customNote.trim()
        : REST_DAY_REASONS.find((r) => r.value === selected)?.label ?? selected;

    const result = await registerRestDay(reason);

    if (result && "error" in result) {
      toast(result.error as string, "error");
    } else {
      toast(`🧘 Día de descanso registrado. +${result.xpAwarded} XP`, "success");
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay animate-fade-in" style={{ zIndex: 300 }}>
      <div
        className="modal-box animate-scale-in"
        style={{ maxWidth: 440, padding: "2rem" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg transition-colors hover:bg-zinc-800"
          style={{ color: "var(--text-muted)" }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🧘</div>
          <h2 className="text-xl font-bold tracking-tight mb-1">
            Día de Descanso Inteligente
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            No operar también es seguir el plan. Registra tu motivo y gana{" "}
            <strong style={{ color: "var(--brand)" }}>+5 XP</strong>.
          </p>
        </div>

        {/* Reason selection */}
        <div className="space-y-2 mb-5">
          {REST_DAY_REASONS.map((reason) => {
            const isSelected = selected === reason.value;
            return (
              <button
                key={reason.value}
                onClick={() => setSelected(reason.value)}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all text-sm"
                style={{
                  background: isSelected
                    ? "rgba(99,102,241,0.12)"
                    : "var(--bg-elevated)",
                  border: `1px solid ${isSelected ? "rgba(99,102,241,0.4)" : "var(--border)"}`,
                  color: isSelected
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                }}
              >
                <span className="text-xl">{reason.emoji}</span>
                <span className="flex-1 font-medium">{reason.label}</span>
                {isSelected && (
                  <CheckCircle2
                    size={16}
                    style={{ color: "var(--brand)" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Custom note for "OTHER" */}
        {selected === "OTHER" && (
          <textarea
            className="input resize-none mb-4"
            rows={2}
            placeholder="Describe brevemente el motivo..."
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            autoFocus
          />
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={onClose} className="btn btn-ghost flex-1">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selected || loading}
            className="btn btn-primary flex-[2] py-3 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading
              ? "Registrando..."
              : "🧘 Registrar Descanso (+5 XP)"}
          </button>
        </div>
      </div>
    </div>
  );
}
