export const dynamic = "force-dynamic";
import { getTrades } from "@/app/actions/trades";
import Link from "next/link";
import { Plus } from "lucide-react";
import TradesListClient from "@/components/trades/TradesListClient";

export const metadata = {
  title: "Mis Trades — ScalpOS",
};

export default async function TradesPage({
  searchParams,
}: {
  searchParams: Promise<{ setup?: string; direction?: string; plan?: string; mistakes?: string }>;
}) {
  const params = await searchParams;
  const trades = await getTrades({
    setup_type:  params.setup,
    direction:   params.direction,
    is_in_plan:  params.plan === "true" ? true : params.plan === "false" ? false : undefined,
    has_mistakes: params.mistakes === "true" ? true : undefined,
    limit: 100,
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mis Trades</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {trades.length} trades registrados — clic en cualquier fila para ver el detalle completo
          </p>
        </div>
        <Link href="/trades/new" className="btn btn-primary">
          <Plus size={15} /> Nuevo Trade
        </Link>
      </div>

      <TradesListClient trades={trades} filterParams={params} />
    </div>
  );
}
