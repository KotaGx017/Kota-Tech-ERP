"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { brl } from "@/lib/utils";
import { modules } from "@/lib/modules";

export default function DashboardPage() {
  const [userId, setUserId] = useState("");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [totals, setTotals] = useState({ receive: 0, pay: 0 });

  useEffect(() => {
    boot();
  }, []);

  async function boot() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      window.location.href = "/login";
      return;
    }
    setUserId(data.user.id);

    const nextCounts: Record<string, number> = {};
    for (const m of modules) {
      const { count } = await supabase.from(m.table).select("*", { count: "exact", head: true });
      nextCounts[m.table] = count || 0;
    }
    setCounts(nextCounts);

    const { data: rec } = await supabase.from("accounts_receivable").select("amount,status");
    const { data: pay } = await supabase.from("accounts_payable").select("amount,status");

    setTotals({
      receive: (rec || []).filter((r: any) => r.status !== "Pago").reduce((s: number, r: any) => s + Number(r.amount || 0), 0),
      pay: (pay || []).filter((r: any) => r.status !== "Pago").reduce((s: number, r: any) => s + Number(r.amount || 0), 0)
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="text-zinc-400">Resumo geral do KotaTech ERP Online.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.slice(0, 6).map((m) => (
          <div key={m.table} className="card p-4">
            <p className="text-zinc-400 text-sm">{m.title}</p>
            <p className="text-3xl font-black">{counts[m.table] || 0}</p>
          </div>
        ))}

        <div className="card p-4">
          <p className="text-zinc-400 text-sm">A receber aberto</p>
          <p className="text-3xl font-black text-green-400">{brl(totals.receive)}</p>
        </div>

        <div className="card p-4">
          <p className="text-zinc-400 text-sm">A pagar aberto</p>
          <p className="text-3xl font-black text-red-400">{brl(totals.pay)}</p>
        </div>
      </div>

      <section className="card p-4">
        <h2 className="text-xl font-bold">Acesso no celular</h2>
        <p className="text-zinc-400">
          Após publicar na Vercel, abra o mesmo link no navegador do celular.
        </p>
      </section>
    </div>
  );
}
