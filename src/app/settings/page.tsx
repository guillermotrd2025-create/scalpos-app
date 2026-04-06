import { getSettings } from "@/app/actions/settings";
import { getAccountsStatus } from "@/app/actions/accounts";
import SettingsManager from "./SettingsManager";

export const metadata = {
  title: "Configuración — ScalpOS",
};

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();
  const accounts = await getAccountsStatus();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Configuración del Sistema</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Gestiona las reglas de operación, cuentas y guardarraíles psicológicos de ScalpOS.
        </p>
      </div>

      <SettingsManager 
        initialSettings={settings} 
        initialAccounts={accounts} 
      />
    </div>
  );
}
