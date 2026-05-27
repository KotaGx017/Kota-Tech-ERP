"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { ModuleConfig } from "@/lib/types";
import { brl, labelFromKey, stamp } from "@/lib/utils";
import { FileDown, Plus, Save, Trash2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function CrudPage({ config, userId }: { config: ModuleConfig; userId: string }) {
  const [rows, setRows] = useState<any[]>([]);
  const [form, setForm] = useState<any>({});
  const [editingId, setEditingId] = useState<string>("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    const text = filter.toLowerCase();
    return rows.filter((r) => JSON.stringify(r).toLowerCase().includes(text));
  }, [rows, filter]);

  useEffect(() => {
    loadRows();
    clearForm();
  }, [config.table]);

  async function loadRows() {
    setLoading(true);
    const { data, error } = await supabase
      .from(config.table)
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setRows(data || []);
    setLoading(false);
  }

  function clearForm() {
    const initial: any = {};
    for (const f of config.fields) initial[f.name] = "";
    if (config.table === "service_orders") {
      initial.os_number = stamp("OS");
      initial.status = "Aberta";
    }
    if (config.table === "budgets") {
      initial.budget_number = stamp("ORC");
      initial.status = "Em aberto";
      initial.validity_days = 10;
    }
    if (config.table === "accounts_receivable" || config.table === "accounts_payable") {
      initial.status = "Aberto";
    }
    setForm(initial);
    setEditingId("");
  }

  function updateTotal(next: any) {
    if (["service_orders", "budgets"].includes(config.table)) {
      const labor = Number(next.labor_value || 0);
      const parts = Number(next.parts_value || 0);
      const discount = Number(next.discount_value || 0);
      next.total_value = Math.max(0, labor + parts - discount);
    }
    return next;
  }

  function setValue(name: string, value: any) {
    setForm((current: any) => updateTotal({ ...current, [name]: value }));
  }

  async function save() {
    for (const f of config.fields) {
      if (f.required && !String(form[f.name] || "").trim()) {
        alert(`Preencha: ${f.label}`);
        return;
      }
    }

    const payload = {
      ...form,
      owner_id: userId,
      updated_at: new Date().toISOString()
    };

    const { error } = editingId
      ? await supabase.from(config.table).update(payload).eq("id", editingId)
      : await supabase.from(config.table).insert({ ...payload, created_at: new Date().toISOString() });

    if (error) {
      alert(error.message);
      return;
    }

    clearForm();
    await loadRows();
  }

  async function remove() {
    if (!editingId) return alert("Selecione um registro.");
    if (!confirm("Deseja excluir este registro?")) return;
    const { error } = await supabase.from(config.table).delete().eq("id", editingId);
    if (error) return alert(error.message);
    clearForm();
    await loadRows();
  }

  function edit(row: any) {
    setEditingId(row.id);
    setForm(row);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function exportPdf() {
    const doc = new jsPDF();
    doc.text(`KotaTech ERP - ${config.title}`, 14, 15);
    autoTable(doc, {
      startY: 22,
      head: [config.listFields.map(labelFromKey)],
      body: filtered.map((r) => config.listFields.map((f) => formatValue(f, r[f])))
    });
    doc.save(`${config.table}.pdf`);
  }

  function formatValue(field: string, value: any) {
    if (["amount", "cost", "sale_price", "total_value", "labor_value", "parts_value", "discount_value"].includes(field)) {
      return brl(value);
    }
    if (field.includes("_at") && value) return new Date(value).toLocaleString("pt-BR");
    return value ?? "";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">{config.title}</h1>
        <p className="text-zinc-400">{config.description}</p>
      </div>

      <section className="card p-4">
        <h2 className="text-xl font-bold mb-4">{editingId ? "Editar registro" : "Novo registro"}</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {config.fields.map((field) => (
            <label key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
              <span className="block text-sm text-zinc-400 mb-1">{field.label}</span>
              {field.type === "textarea" ? (
                <textarea value={form[field.name] || ""} onChange={(e) => setValue(field.name, e.target.value)} rows={3} className="w-full" />
              ) : field.type === "select" ? (
                <select value={form[field.name] || ""} onChange={(e) => setValue(field.name, e.target.value)} className="w-full">
                  <option value="">Selecione</option>
                  {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                  value={form[field.name] || ""}
                  onChange={(e) => setValue(field.name, e.target.value)}
                  className="w-full"
                />
              )}
            </label>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button onClick={clearForm} className="btn-secondary flex items-center gap-2"><Plus size={18} /> Novo</button>
          <button onClick={save} className="btn-primary flex items-center gap-2"><Save size={18} /> Salvar</button>
          <button onClick={remove} className="btn-danger flex items-center gap-2"><Trash2 size={18} /> Excluir</button>
          <button onClick={exportPdf} className="btn-secondary flex items-center gap-2"><FileDown size={18} /> PDF</button>
        </div>
      </section>

      <section className="card p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <input placeholder="Pesquisar..." value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full" />
          <button onClick={loadRows} className="btn-secondary">Atualizar</button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-800">
                  {config.listFields.map((f) => <th key={f} className="text-left p-3">{labelFromKey(f)}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} onClick={() => edit(row)} className="border-b border-zinc-800 hover:bg-zinc-800 cursor-pointer">
                    {config.listFields.map((f) => <td key={f} className="p-3">{formatValue(f, row[f])}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            {!filtered.length && <p className="text-zinc-400 p-4">Nenhum registro encontrado.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
