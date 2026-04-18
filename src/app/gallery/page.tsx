export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";

// La galería de imágenes se ha integrado en el historial de trades.
// Redirigir al listado completo de trades.
export default function GalleryRedirect() {
  redirect("/trades");
}
