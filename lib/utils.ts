export function brl(value: unknown): string {
  const number = Number(value || 0);
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

export function stamp(prefix: string): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${prefix}${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

export function labelFromKey(key: string): string {
  const labels: Record<string, string> = {
    name: "Nome",
    phone: "Telefone",
    whatsapp: "WhatsApp",
    email: "E-mail",
    document: "Documento",
    address: "Endereço",
    notes: "Observações",
    client_name: "Cliente",
    supplier_name: "Fornecedor",
    device_type: "Tipo",
    brand: "Marca",
    model: "Modelo",
    serial_number: "Série",
    quantity: "Qtd.",
    cost: "Custo",
    sale_price: "Venda",
    os_number: "OS",
    budget_number: "Orçamento",
    device_desc: "Equipamento",
    issue_reported: "Defeito",
    problem_reported: "Problema",
    diagnosis: "Diagnóstico",
    status: "Status",
    technician: "Técnico",
    labor_value: "Mão de obra",
    parts_value: "Peças",
    discount_value: "Desconto",
    total_value: "Total",
    validity_days: "Validade",
    description: "Descrição",
    due_date: "Vencimento",
    amount: "Valor",
    created_at: "Criado em",
    updated_at: "Atualizado em"
  };
  return labels[key] || key;
}
