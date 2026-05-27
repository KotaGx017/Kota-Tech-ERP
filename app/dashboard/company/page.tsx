"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const fields = [
  ["company_name", "Razão social / Nome"],
  ["trade_name", "Nome fantasia"],
  ["cnpj", "CNPJ"],
  ["phone", "Telefone"],
  ["whatsapp", "WhatsApp"],
  ["email", "E-mail"],
  ["address", "Endereço"],
  ["city", "Cidade"],
  ["state", "Estado"],
  ["zip_code", "CEP"],
  ["footer_notes", "Rodapé / Observações"]
];

export default function CompanyPage() {
  const [userId, setUserId] = useState("");
  const [id, setId] = useState("");
  const [form, setForm] = useState<any>({ company_name: "KotaTech ERP" });

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

    const { data: settings } = await supabase.from("company_settings").select("*").limit(1).maybeSingle();
    if (settings) {
      setId(settings.id);
      setForm(settings);
    }
  }

  async function save() {
    const payload = {
      ...form,
      owner_id: userId,
      updated_at: new Date().toISOString()
    };

    const result = id
      ? await supabase.from("company_settings").update(payload).eq("id", id)
      : await supabase.from("company_settings").insert(payload).select().single();

    if (result.error) {
      alert(result.error.message);
      return;
    }

    if (!id && result.data) setId(result.data.id);
    alert("Dados salvos.");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Empresa</h1>
        <p className="text-zinc-400">Dados usados em relatórios e PDFs.</p>
      </div>

      <section className="card p-4">
        <div className="grid md:grid-cols-2 gap-3">
          {fields.map(([name, label]) => (
            <label key={name} className={name === "footer_notes" ? "md:col-span-2" : ""}>
              <span className="block text-sm text-zinc-400 mb-1">{label}</span>
              {name === "footer_notes" ? (
                <textarea value={form[name] || ""} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="w-full" />
              ) : (
                <input value={form[name] || ""} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="w-full" />
              )}
            </label>
          ))}
        </div>

        <button onClick={save} className="btn-primary mt-4">Salvar empresa</button>
      </section>
    </div>
  );
}
