"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSession } from "@/app/actions/sessions";
import { MENTAL_STATES, PRE_FLIGHT_CHECKLIST } from "@/lib/constants";
import { Plus, X, CheckSquare, Square } from "lucide-react";

export default function NewSessionButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    mental_state: "A_GAME",
    notes: "",
  });
  
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const allChecksPassed = PRE_FLIGHT_CHECKLIST.every((item) => checklist[item.id]);

  const handleCreate = async () => {
    if (!allChecksPassed) return;
    
    setLoading(true);
    const now = new Date().toISOString();
    try {
      const session = await createSession({
        date:            now,
        start_time:      now,
        mental_state:    form.mental_state,
        checklist_passed: true,
        notes:           form.notes,
      });
      setOpen(false);
      router.push(`/sessions/${session.id}`);
    } catch (error: any) {
      alert(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-primary">
        <Plus size={15} /> Nueva Sesión
      </button>

      {open && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-box animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold">Iniciar nueva sesión</h2>
              <button onClick={() => setOpen(false)} className="btn btn-ghost p-1.5">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold mb-2 uppercase tracking-widest text-[#ef4444]">
                  Filtro Pre-vuelo (Obligatorio)
                </p>
                <div className="space-y-2 mb-4 bg-[var(--bg-elevated)] p-3 rounded-lg border border-[var(--border)]">
                  {PRE_FLIGHT_CHECKLIST.map((item) => {
                    const isChecked = !!checklist[item.id];
                    return (
                      <button
                        key={item.id}
                        onClick={() => setChecklist((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                        className={`flex gap-3 text-left w-full items-start p-2 rounded-md transition-colors ${isChecked ? "text-white" : "text-[var(--text-muted)] hover:bg-[var(--bg-hover)]"}`}
                      >
                        <div className="mt-0.5 text-[var(--brand)]">
                          {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
                        </div>
                        <span className="text-sm font-medium leading-tight">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  Estado Mental
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {MENTAL_STATES.map(({ value, label, icon, color }) => {
                    const isSelected = form.mental_state === value;
                    if (value === "C_GAME") {
                      return (
                        <button
                          key={value}
                          onClick={() => {
                            alert("⛔ Si estás en C-Game o con ganas de vengar, la app NO te dejará operar. Vuelve mañana.");
                            setOpen(false);
                          }}
                          className="flex items-center justify-between p-3 rounded-xl border transition-all text-left bg-[#1a0f0f] border-[#dc2626] text-[#dc2626] opacity-70 hover:opacity-100"
                        >
                          <span className="font-medium">Jared Tendler: {label} {icon}</span>
                          <span className="text-xs font-bold bg-[#dc2626] text-white px-2 py-1 rounded">BLOQUEAR SESIÓN</span>
                        </button>
                      );
                    }
                    
                    return (
                      <button
                        key={value}
                        onClick={() => setForm((f) => ({ ...f, mental_state: value }))}
                        className="flex items-center gap-3 p-3 rounded-xl transition-all border text-left"
                        style={{
                          background:  isSelected ? `${color}15` : "var(--bg-elevated)",
                          borderColor: isSelected ? color : "transparent",
                          color:       isSelected ? color : "var(--text-muted)",
                        }}
                      >
                        <div className="text-xl">{icon}</div>
                        <span className="font-medium text-sm flex-1">{label}</span>
                        {isSelected && <CheckSquare size={16} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold mb-1 block uppercase tracking-widest"
                       style={{ color: "var(--text-muted)" }}>
                  Nota inicial (plan del día)
                </label>
                <textarea
                  className="input resize-none"
                  rows={3}
                  placeholder="¿Cuáles son tus setups prioritarios hoy? ¿Algún nivel clave?"
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                />
              </div>

              <button 
                onClick={handleCreate} 
                disabled={loading || !allChecksPassed} 
                className="btn btn-primary w-full py-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verificando..." : !allChecksPassed ? "Completa el Checklist 👆" : "🚀 Aprobar e Iniciar Sesión"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
