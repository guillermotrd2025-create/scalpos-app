"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { closeSession } from "@/app/actions/sessions";
import { Lock, ChevronDown, ChevronUp } from "lucide-react";

export default function CloseSessionPanel({
  sessionId,
  currentScore,
}: {
  sessionId: number;
  currentScore: number;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [conclusion, setConclusion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const wordCount = conclusion.trim().split(/\s+/).filter(Boolean).length;
  const MIN_WORDS = 20;

  const handleClose = async () => {
    if (wordCount < MIN_WORDS) {
      setError(`Necesitas al menos ${MIN_WORDS} palabras (tienes ${wordCount}).`);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await closeSession(sessionId, conclusion, currentScore);
      router.refresh();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-auto">
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn btn-ghost text-sm flex items-center gap-2"
        style={{ borderColor: "rgba(239,68,68,0.4)", color: "var(--red)" }}
      >
        <Lock size={14} /> Cerrar sesión
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {open && (
        <div className="mt-3 card p-5 semaphore-amber animate-scale-in" style={{ minWidth: 340 }}>
          <p className="text-sm font-semibold mb-2">📝 Conclusión obligatoria</p>
          <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
            Escribe tu análisis del día antes de cerrar la sesión.
            Mínimo <strong>{MIN_WORDS} palabras</strong>. ¿Qué salió bien? ¿Qué errores cometiste? ¿Qué cambiarás mañana?
          </p>

          <textarea
            className="input resize-none mb-2"
            rows={5}
            placeholder="Hoy he cometido FOMO en el tercer trade porque... La próxima sesión voy a..."
            value={conclusion}
            onChange={(e) => { setConclusion(e.target.value); setError(""); }}
          />

          <div className="flex justify-between items-center mb-3">
            <span className="text-xs" style={{ color: wordCount >= MIN_WORDS ? "var(--green)" : "var(--text-muted)" }}>
              {wordCount} / {MIN_WORDS} palabras mínimas
            </span>
            {wordCount >= MIN_WORDS && <span style={{ color: "var(--green)" }}>✓ Listo</span>}
          </div>

          {error && (
            <p className="text-xs mb-3 p-2 rounded-lg text-center"
               style={{ color: "var(--red)", background: "var(--red-dim)" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleClose}
            disabled={loading || wordCount < MIN_WORDS}
            className="btn w-full py-2.5"
            style={{
              background: wordCount >= MIN_WORDS ? "var(--brand)" : "var(--bg-muted)",
              color: wordCount >= MIN_WORDS ? "#fff" : "var(--text-muted)",
            }}
          >
            {loading ? "Guardando..." : "✓ Cerrar sesión y guardar"}
          </button>
        </div>
      )}
    </div>
  );
}
