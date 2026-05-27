"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { modules } from "@/lib/modules";
import { LayoutDashboard, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Sidebar() {
  const pathname = usePathname();

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <aside className="w-full md:w-72 md:min-h-screen bg-zinc-950 border-r border-zinc-800 p-4">
      <div className="mb-6">
        <div className="text-2xl font-black text-white">KotaTech</div>
        <div className="text-sm text-brand-100">ERP Online</div>
      </div>

      <nav className="grid gap-2">
        <Link
          href="/dashboard"
          className={`rounded-xl px-3 py-2 flex items-center gap-2 ${pathname === "/dashboard" ? "bg-brand-500" : "bg-zinc-900 hover:bg-zinc-800"}`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        {modules.map((m) => (
          <Link
            key={m.table}
            href={`/dashboard/${m.table}`}
            className={`rounded-xl px-3 py-2 ${pathname.includes(m.table) ? "bg-brand-500" : "bg-zinc-900 hover:bg-zinc-800"}`}
          >
            {m.title}
          </Link>
        ))}

        <Link
          href="/dashboard/company"
          className={`rounded-xl px-3 py-2 ${pathname.includes("company") ? "bg-brand-500" : "bg-zinc-900 hover:bg-zinc-800"}`}
        >
          Empresa
        </Link>

        <button onClick={logout} className="mt-4 rounded-xl px-3 py-2 bg-zinc-900 hover:bg-zinc-800 flex items-center gap-2">
          <LogOut size={18} />
          Sair
        </button>
      </nav>
    </aside>
  );
}
