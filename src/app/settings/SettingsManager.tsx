"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateSettings, hardResetDatabase } from "@/app/actions/settings";
import { createAccount, updateAccount, deleteAccount } from "@/app/actions/accounts";
import { ShieldAlert, Download, Save, Trash2, Plus, RefreshCw, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function SettingsManager({ 
  initialSettings, 
  initialAccounts 
}: { 
  initialSettings: any; 
  initialAccounts: any[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  // Accounts State
  const [accounts, setAccounts] = useState(initialAccounts);
  const [newAccName, setNewAccName] = useState("");
  const [newAccBalance, setNewAccBalance] = useState("");

  useEffect(() => {
    setAccounts(initialAccounts);
  }, [initialAccounts]);

  // Hard Reset Modal
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetInput, setResetInput] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  // Delete Modal
  const [accountToDelete, setAccountToDelete] = useState<number | null>(null);

  // --- Handlers ---
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await updateSettings({
        risk_per_trade_pct: parseFloat(settings.risk_per_trade_pct),
        default_sl_pts: parseInt(settings.default_sl_pts),
        default_tp_pts: parseInt(settings.default_tp_pts),
        operating_hours_start: settings.operating_hours_start,
        operating_hours_end: settings.operating_hours_end,
        max_trades_per_day: parseInt(settings.max_trades_per_day),
        max_daily_loss_pct: parseFloat(settings.max_daily_loss_pct),
      });
      toast("Configuración guardada en la base de datos.", "success");
    } catch (e: any) {
      toast("Error al guardar: " + e.message, "error");
    }
    setIsSaving(false);
  };

  const handleAddAccount = async () => {
    if (!newAccName || !newAccBalance) return;
    const balance = parseFloat(newAccBalance);
    await createAccount({ name: newAccName, initial_balance: isNaN(balance) ? 10000 : balance });
    setNewAccName("");
    setNewAccBalance("");
    toast("Cuenta añadida correctamente.", "success");
    router.refresh();
  };

  const confirmDeleteAccount = async () => {
    if (!accountToDelete) return;
    const id = accountToDelete;
    setAccountToDelete(null); // close modal

    try {
      // Optimistic update
      setAccounts(prev => prev.filter(acc => acc.id !== id));

      await deleteAccount(id);
      toast("Cuenta purgada. El balance de Scalping ha sido ajustado.", "success");
      router.refresh();
    } catch (e: any) {
      toast("No se ha podido borrar la cuenta: " + e.message, "error");
      // Revert on error
      setAccounts(initialAccounts);
      router.refresh();
    }
  };

  const handleHardReset = async () => {
    setIsResetting(true);
    await hardResetDatabase();
    setShowResetModal(false);
    setResetInput("");
    setIsResetting(false);
    toast("La Base de Datos ha sido reseteada a Cero.", "success");
    router.refresh();
  };

  return (
    <div className="space-y-8 max-w-4xl">

      {/* --- SECCIÓN 1: GESTIÓN DE CUENTAS Y TAMAÑO DE POSICIÓN --- */}
      <section className="card p-6 border border-[var(--border)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#3b82f6]"></div>
        <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
          1. Gestión de Cuentas y Posición
        </h2>

        {/* Accounts Array */}
        <div className="mb-6">
          <label className="text-sm font-semibold mb-3 block" style={{ color: "var(--text-muted)" }}>
            Tus Cuentas (Round-Robin)
          </label>
          <div className="space-y-3 mb-3">
            {accounts.map(acc => (
              <div key={acc.id} className="flex justify-between items-center p-3 rounded-lg" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                <div>
                  <p className="font-bold text-sm">{acc.name}</p>
                  <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>Balance: ${acc.current_balance}</p>
                </div>
                <button 
                  onClick={() => setAccountToDelete(acc.id)}
                  className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Add Account */}
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Nombre</label>
              <input type="text" className="input" placeholder="Ej: Cuenta Fondeo 1" value={newAccName} onChange={e => setNewAccName(e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Balance ($)</label>
              <input type="number" className="input" placeholder="Ej: 10000" onFocus={e => e.target.select()} value={newAccBalance} onChange={e => setNewAccBalance(e.target.value)} />
            </div>
            <button onClick={handleAddAccount} className="btn py-[14px] hover:bg-[#3b82f6]/20 transition-colors" style={{ background: "var(--brand-dim)", color: "var(--brand)" }}>
              <Plus size={16} /> Añadir
            </button>
          </div>
        </div>

        {/* Form specific settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-5" style={{ borderColor: "var(--border)" }}>
          <div>
            <label className="text-xs font-semibold mb-1 block" style={{ color: "var(--text-muted)" }}>Riesgo por Trade (%)</label>
            <input type="number" step="0.1" className="input" onFocus={e => e.target.select()} value={settings.risk_per_trade_pct} onChange={e => setSettings({...settings, risk_per_trade_pct: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-semibold mb-1 block" style={{ color: "var(--text-muted)" }}>Stop Loss Defecto (Pts)</label>
            <input type="number" className="input" onFocus={e => e.target.select()} value={settings.default_sl_pts} onChange={e => setSettings({...settings, default_sl_pts: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-semibold mb-1 block" style={{ color: "var(--text-muted)" }}>Take Profit Defecto (Pts)</label>
            <input type="number" className="input" onFocus={e => e.target.select()} value={settings.default_tp_pts} onChange={e => setSettings({...settings, default_tp_pts: e.target.value})} />
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 2: GUARDARRAÍLES PSICOLÓGICOS --- */}
      <section className="card p-6 border border-[var(--border)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#10b981]"></div>
        <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
          2. Guardarraíles Psicológicos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-3">
             <div className="flex-1">
              <label className="text-xs font-semibold mb-1 block" style={{ color: "var(--text-muted)" }}>Inicio Operativo</label>
              <input type="time" className="input" value={settings.operating_hours_start} onChange={e => setSettings({...settings, operating_hours_start: e.target.value})} />
             </div>
             <div className="flex-1">
              <label className="text-xs font-semibold mb-1 block" style={{ color: "var(--text-muted)" }}>Fin Operativo</label>
              <input type="time" className="input" value={settings.operating_hours_end} onChange={e => setSettings({...settings, operating_hours_end: e.target.value})} />
             </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs font-semibold mb-1 block" style={{ color: "var(--text-muted)" }}>Max Trades / Día</label>
              <input type="number" className="input" onFocus={e => e.target.select()} value={settings.max_trades_per_day} onChange={e => setSettings({...settings, max_trades_per_day: e.target.value})} />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold mb-1 block" style={{ color: "var(--text-muted)" }}>Max Pérdida Diaria (%)</label>
              <input type="number" step="0.1" className="input text-red-400 font-mono" onFocus={e => e.target.select()} value={settings.max_daily_loss_pct} onChange={e => setSettings({...settings, max_daily_loss_pct: e.target.value})} />
            </div>
          </div>
        </div>
      </section>

      {/* Global Save Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleSaveSettings} 
          disabled={isSaving} 
          className="btn py-4 px-8 font-bold text-base text-white hover:opacity-90 transition-opacity flex items-center justify-center min-w-[280px]"
          style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)", boxShadow: "0 4px 15px rgba(168,85,247,0.3)" }}
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <><Save size={18} className="mr-2" /> Guardar Toda la Configuración</>
          )}
        </button>
      </div>

      {/* --- SECCIÓN 3: ZONA DE PELIGRO --- */}
      <section className="card p-6 border-red-500/20 relative overflow-hidden bg-red-500/5 mt-10">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
        <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-red-500">
          <ShieldAlert size={20} /> 3. Zona de Peligro
        </h2>

        <div className="flex gap-4">
          <a href="/api/export" className="btn flex-1 py-4 justify-center" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
            <Download size={18} /> Exportar Datos a CSV
          </a>
          <button onClick={() => setShowResetModal(true)} className="btn flex-1 py-4 justify-center font-bold" style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
            <RefreshCw size={18} /> Hard Reset (Borrar Todo)
          </button>
        </div>
      </section>

      {/* Delete Account Modal */}
      {accountToDelete && (
        <div className="modal-overlay animate-fade-in" style={{ zIndex: 100 }}>
          <div className="modal-box semaphore-amber border-amber-500/20 box-shadow-amber shadow-2xl">
            <h2 className="text-lg font-bold text-amber-500 mb-2 flex items-center gap-2">
              <AlertTriangle size={20} /> Confirmar Eliminación
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              ¿Estás completamente seguro de que deseas eliminar o desactivar esta cuenta? Si tiene trades vinculados, se archivará automáticamente para no romper tus estadísticas.
            </p>
            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => setAccountToDelete(null)} 
                className="btn flex-1 hover:bg-zinc-800 transition-colors" 
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDeleteAccount}
                className="btn flex-1 bg-amber-600 text-white font-bold hover:bg-amber-700 transition-colors"
                style={{ border: "1px solid rgba(245, 158, 11, 0.5)" }}
              >
                Sí, Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hard Reset Modal */}
      {showResetModal && (
        <div className="modal-overlay animate-fade-in" style={{ zIndex: 100 }}>
          <div className="modal-box semaphore-red animate-scale-in">
            <h2 className="text-lg font-bold text-red-500 mb-2">BORRADO SUPREMO (HARD RESET)</h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              Esta acción es <strong>IRREVERSIBLE</strong>. Se borrarán permanentemente todos tus trades, sesiones mapeadas, errores y puntuaciones. Las cuentas de fondeo se resetearán a su balance inicial.
            </p>
            <div className="p-4 rounded-lg bg-zinc-950/50 border border-red-500/20 mb-4">
              <label className="text-xs text-white/50 mb-2 block">Escribe &quot;RESET&quot; para confirmar</label>
              <input 
                type="text" 
                className="input w-full font-mono text-center text-red-400 bg-transparent border-red-500/50" 
                placeholder="R E S E T"
                value={resetInput}
                onChange={e => setResetInput(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => setShowResetModal(false)} className="btn flex-1" style={{ background: "var(--bg-elevated)" }}>
                Cancelar
              </button>
              <button 
                onClick={handleHardReset} 
                disabled={resetInput !== "RESET" || isResetting}
                className="btn flex-1 bg-red-600 text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isResetting ? "Borrando..." : "Confirmar Borrado Múltiple"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
