export const dynamic = "force-dynamic";
import TradeForm from "@/components/trades/TradeForm";
import { getTodaySession } from "@/app/actions/sessions";
import { getSettings } from "@/app/actions/settings";
import NewSessionButton from "@/components/sessions/NewSessionButton";
import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Nuevo Trade — ScalpOS",
  description: "Registra un trade con checklist pre-trade y semáforo de disciplina",
};

export default async function NewTradePage() {
  const session = await getTodaySession();
  const settings = await getSettings();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Nuevo Trade</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Completa el checklist de disciplina antes de registrar tu entrada
        </p>
      </div>

      {!session ? (
        <div className="card-elevated border-amber-500/30 bg-amber-500/10 p-12 flex flex-col items-center justify-center text-center gap-4 animate-scale-in">
          <div className="bg-amber-500/20 p-3 rounded-full">
            <AlertTriangle size={32} className="text-amber-500" />
          </div>
          <div>
            <h2 className="text-amber-500 font-bold text-lg mb-2">No hay ninguna sesión activa</h2>
            <p className="text-sm font-medium text-amber-500/90 leading-relaxed max-w-md mx-auto mb-6">
              Para registrar un trade, necesitas iniciar una sesión de trading primero. Te obligamos a esto para que pases el filtro de pre-apertura y registres tu estado mental.
            </p>
          </div>
          <div className="mt-2">
            <NewSessionButton />
          </div>
        </div>
      ) : (
        <TradeForm defaultSessionId={session.id} globalSettings={settings} />
      )}
    </div>
  );
}
