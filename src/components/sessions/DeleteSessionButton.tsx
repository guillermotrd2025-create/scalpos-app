"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteSession } from "@/app/actions/sessions";

export default function DeleteSessionButton({ sessionId }: { sessionId: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que quieres borrar esta sesión? Se eliminarán todos los trades y errores asociados. Esta acción NO se puede deshacer.")) {
      return;
    }
    
    setLoading(true);
    try {
      await deleteSession(sessionId);
      router.push("/sessions");
    } catch (e: any) {
      console.error(e);
      alert("Error al borrar la sesión.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 rounded-lg transition-colors hover:bg-zinc-800"
      title="Borrar sesión"
      style={{ color: "var(--red)" }}
    >
      <Trash2 size={16} />
    </button>
  );
}
