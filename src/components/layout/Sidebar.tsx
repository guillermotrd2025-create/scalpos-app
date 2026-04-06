"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  BookOpen,
  Image as ImageIcon,
  Activity,
  ChevronRight,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/",           label: "Dashboard",   icon: LayoutDashboard },
  { href: "/sessions",   label: "Sesiones",    icon: Activity },
  { href: "/trades/new", label: "Nuevo Trade", icon: TrendingUp, accent: true },
  { href: "/trades",     label: "Mis Trades",  icon: BookOpen },
  { href: "/gallery",    label: "Galería",     icon: ImageIcon },
  { href: "/settings",   label: "Configuración",icon: Settings },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col border-r"
           style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>

      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
               style={{ background: "var(--brand)" }}>
            S
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>ScalpOS</p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>DAX Discipline Journal</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, label, icon: Icon, accent }) => {
          const active = path === href || (href !== "/" && path.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                accent && "mt-3",
                active
                  ? "text-white"
                  : "hover:bg-zinc-800",
              )}
              style={active
                ? { background: accent ? "var(--brand)" : "var(--bg-elevated)", color: "var(--text-primary)" }
                : { color: accent ? "var(--brand)" : "var(--text-secondary)" }}
            >
              <Icon size={16} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {active && !accent && <ChevronRight size={12} style={{ color: "var(--text-muted)" }} />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t" style={{ borderColor: "var(--border)" }}>
        <p className="text-[10px] text-center" style={{ color: "var(--text-muted)" }}>
          Prop Firm Mode 🎯
        </p>
      </div>
    </aside>
  );
}
