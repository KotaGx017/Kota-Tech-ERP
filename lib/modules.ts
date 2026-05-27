import type { ModuleConfig } from "./types";

export const modules: ModuleConfig[] = [
  {
    table: "clients",
    title: "Clientes",
    description: "Cadastro de clientes da assistência.",
    listFields: ["name", "phone", "whatsapp", "email", "document"],
    fields: [
      { name: "name", label: "Nome", required: true },
      { name: "phone", label: "Telefone" },
      { name: "whatsapp", label: "WhatsApp" },
      { name: "email", label: "E-mail" },
      { name: "document", label: "CPF/CNPJ" },
      { name: "address", label: "Endereço", type: "textarea" },
      { name: "notes", label: "Observações", type: "textarea" }
    ]
  },
  {
    table: "suppliers",
    title: "Fornecedores",
    description: "Cadastro de fornecedores.",
    listFields: ["name", "phone", "email", "document"],
    fields: [
      { name: "name", label: "Nome", required: true },
      { name: "phone", label: "Telefone" },
      { name: "email", label: "E-mail" },
      { name: "document", label: "Documento" },
      { name: "address", label: "Endereço", type: "textarea" },
      { name: "notes", label: "Observações", type: "textarea" }
    ]
  },
  {
    table: "devices",
    title: "Equipamentos",
    description: "Equipamentos vinculados aos clientes.",
    listFields: ["client_name", "device_type", "brand", "model", "serial_number"],
    fields: [
      { name: "client_name", label: "Cliente" },
      { name: "device_type", label: "Tipo" },
      { name: "brand", label: "Marca" },
      { name: "model", label: "Modelo" },
      { name: "serial_number", label: "Número de série" },
      { name: "notes", label: "Observações", type: "textarea" }
    ]
  },
  {
    table: "stock_items",
    title: "Estoque",
    description: "Peças, acessórios e produtos.",
    listFields: ["name", "category", "quantity", "cost", "sale_price"],
    fields: [
      { name: "name", label: "Nome", required: true },
      { name: "category", label: "Categoria" },
      { name: "quantity", label: "Quantidade", type: "number" },
      { name: "cost", label: "Custo", type: "number" },
      { name: "sale_price", label: "Preço de venda", type: "number" },
      { name: "supplier_name", label: "Fornecedor" },
      { name: "notes", label: "Observações", type: "textarea" }
    ]
  },
  {
    table: "service_orders",
    title: "Ordens de Serviço",
    description: "Controle completo de OS.",
    listFields: ["os_number", "client_name", "device_desc", "status", "total_value"],
    fields: [
      { name: "os_number", label: "Número da OS", required: true },
      { name: "client_name", label: "Cliente", required: true },
      { name: "device_desc", label: "Equipamento" },
      { name: "issue_reported", label: "Defeito relatado", type: "textarea" },
      { name: "diagnosis", label: "Diagnóstico / Serviço", type: "textarea" },
      { name: "status", label: "Status", type: "select", options: ["Aberta", "Em diagnóstico", "Aguardando aprovação", "Em andamento", "Concluída", "Entregue", "Cancelada"] },
      { name: "technician", label: "Técnico" },
      { name: "labor_value", label: "Mão de obra", type: "number" },
      { name: "parts_value", label: "Peças", type: "number" },
      { name: "discount_value", label: "Desconto", type: "number" },
      { name: "total_value", label: "Total", type: "number" },
      { name: "internal_notes", label: "Observações internas", type: "textarea" }
    ]
  },
  {
    table: "budgets",
    title: "Orçamentos",
    description: "Orçamentos para aprovação.",
    listFields: ["budget_number", "client_name", "device_desc", "status", "total_value"],
    fields: [
      { name: "budget_number", label: "Número", required: true },
      { name: "client_name", label: "Cliente", required: true },
      { name: "device_desc", label: "Equipamento" },
      { name: "problem_reported", label: "Problema relatado", type: "textarea" },
      { name: "diagnosis", label: "Diagnóstico", type: "textarea" },
      { name: "items_description", label: "Itens / Peças", type: "textarea" },
      { name: "labor_value", label: "Mão de obra", type: "number" },
      { name: "parts_value", label: "Peças", type: "number" },
      { name: "discount_value", label: "Desconto", type: "number" },
      { name: "total_value", label: "Total", type: "number" },
      { name: "validity_days", label: "Validade em dias", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["Em aberto", "Aprovado", "Reprovado", "Convertido em OS"] },
      { name: "notes", label: "Observações", type: "textarea" }
    ]
  },
  {
    table: "accounts_receivable",
    title: "Contas a Receber",
    description: "Valores a receber.",
    listFields: ["description", "client_name", "due_date", "amount", "status"],
    fields: [
      { name: "description", label: "Descrição", required: true },
      { name: "client_name", label: "Cliente" },
      { name: "due_date", label: "Vencimento", type: "date" },
      { name: "amount", label: "Valor", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["Aberto", "Pago", "Atrasado", "Cancelado"] },
      { name: "notes", label: "Observações", type: "textarea" }
    ]
  },
  {
    table: "accounts_payable",
    title: "Contas a Pagar",
    description: "Valores a pagar.",
    listFields: ["description", "supplier_name", "due_date", "amount", "status"],
    fields: [
      { name: "description", label: "Descrição", required: true },
      { name: "supplier_name", label: "Fornecedor" },
      { name: "due_date", label: "Vencimento", type: "date" },
      { name: "amount", label: "Valor", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["Aberto", "Pago", "Atrasado", "Cancelado"] },
      { name: "notes", label: "Observações", type: "textarea" }
    ]
  }
];

export function getModule(table: string) {
  return modules.find((m) => m.table === table);
}
