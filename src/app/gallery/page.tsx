import { getTrades } from "@/app/actions/trades";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { Image as ImageIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = { title: "Galería de Trades — ScalpOS" };

export default async function GalleryPage() {
  const trades = await getTrades({
    limit: 200,
  });

  const withImages = trades.filter((t: any) => t.screenshot_pre || t.screenshot_post);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ImageIcon size={22} /> Galería de Trades
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Revisa visualmente tus entradas. Filtra por setup o por tipo de captura.
          </p>
        </div>
      </div>

      {withImages.length === 0 ? (
        <div className="card p-16 text-center">
          <ImageIcon size={40} className="mx-auto mb-4 opacity-20" />
          <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
            Aún no tienes capturas de pantalla subidas
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Al registrar un trade, arrastra tus screenshots del antes y después
          </p>
        </div>
      ) : (
        <GalleryGrid trades={withImages} />
      )}
    </div>
  );
}
