"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`
              flex items-center gap-3 p-4 pr-10 rounded-lg shadow-lg border animate-slide-up relative overflow-hidden backdrop-blur-md
              ${t.type === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : ""}
              ${t.type === "error" ? "bg-red-500/10 border-red-500/30 text-red-400" : ""}
              ${t.type === "info" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : ""}
            `}
            style={{ 
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
              minWidth: "250px"
            }}
          >
            {t.type === "success" && <CheckCircle size={20} />}
            {t.type === "error" && <XCircle size={20} />}
            {t.type === "info" && <Info size={20} />}
            
            <p className="text-sm font-medium">{t.message}</p>
            
            <button 
              onClick={() => removeToast(t.id)} 
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>

            {/* Premium progress bar effect */}
            <div 
              className={`absolute bottom-0 left-0 h-[2px] animate-shrink-width
                ${t.type === "success" ? "bg-emerald-500" : ""}
                ${t.type === "error" ? "bg-red-500" : ""}
                ${t.type === "info" ? "bg-blue-500" : ""}
              `}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
