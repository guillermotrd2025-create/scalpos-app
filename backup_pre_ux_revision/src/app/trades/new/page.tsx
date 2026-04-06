import TradeForm from "@/components/trades/TradeForm";
import { getTodaySession } from "@/app/actions/sessions";

export const metadata = {
  title: "Nuevo Trade — ScalpOS",
  description: "Registra un trade con checklist pre-trade y semáforo de disciplina",
};

export default async function NewTradePage() {
  const session = await getTodaySession();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Nuevo Trade</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Completa el checklist de disciplina antes de registrar tu entrada
        </p>
      </div>

      <TradeForm defaultSessionId={session?.id} />
    </div>
  );
}
