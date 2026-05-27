export type TableName =
  | "clients"
  | "suppliers"
  | "devices"
  | "stock_items"
  | "service_orders"
  | "budgets"
  | "accounts_receivable"
  | "accounts_payable";

export type FieldType = "text" | "number" | "textarea" | "date" | "select";

export type Field = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  options?: string[];
};

export type ModuleConfig = {
  table: TableName;
  title: string;
  description: string;
  fields: Field[];
  listFields: string[];
};
