-- KotaTech ERP Online - Supabase PostgreSQL
-- Execute este arquivo no SQL Editor do Supabase.

create extension if not exists pgcrypto;

create table if not exists public.company_settings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  company_name text default 'KotaTech ERP',
  trade_name text default '',
  cnpj text default '',
  phone text default '',
  whatsapp text default '',
  email text default '',
  address text default '',
  city text default '',
  state text default '',
  zip_code text default '',
  footer_notes text default 'Obrigado pela preferência.',
  logo_url text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  phone text default '',
  whatsapp text default '',
  email text default '',
  document text default '',
  address text default '',
  notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  phone text default '',
  email text default '',
  document text default '',
  address text default '',
  notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.devices (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  client_name text default '',
  device_type text default '',
  brand text default '',
  model text default '',
  serial_number text default '',
  notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.stock_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  category text default '',
  quantity numeric default 0,
  cost numeric default 0,
  sale_price numeric default 0,
  supplier_name text default '',
  notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.service_orders (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  os_number text not null,
  client_name text default '',
  device_desc text default '',
  issue_reported text default '',
  diagnosis text default '',
  status text default 'Aberta',
  technician text default '',
  labor_value numeric default 0,
  parts_value numeric default 0,
  discount_value numeric default 0,
  total_value numeric default 0,
  internal_notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  budget_number text not null,
  client_name text default '',
  device_desc text default '',
  problem_reported text default '',
  diagnosis text default '',
  items_description text default '',
  labor_value numeric default 0,
  parts_value numeric default 0,
  discount_value numeric default 0,
  total_value numeric default 0,
  validity_days integer default 10,
  status text default 'Em aberto',
  notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.accounts_receivable (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  description text not null,
  client_name text default '',
  due_date date,
  amount numeric default 0,
  status text default 'Aberto',
  notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.accounts_payable (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  description text not null,
  supplier_name text default '',
  due_date date,
  amount numeric default 0,
  status text default 'Aberto',
  notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.company_settings enable row level security;
alter table public.clients enable row level security;
alter table public.suppliers enable row level security;
alter table public.devices enable row level security;
alter table public.stock_items enable row level security;
alter table public.service_orders enable row level security;
alter table public.budgets enable row level security;
alter table public.accounts_receivable enable row level security;
alter table public.accounts_payable enable row level security;

do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'company_settings','clients','suppliers','devices','stock_items',
    'service_orders','budgets','accounts_receivable','accounts_payable'
  ]
  loop
    execute format('drop policy if exists "%s_select" on public.%I', tbl, tbl);
    execute format('drop policy if exists "%s_insert" on public.%I', tbl, tbl);
    execute format('drop policy if exists "%s_update" on public.%I', tbl, tbl);
    execute format('drop policy if exists "%s_delete" on public.%I', tbl, tbl);

    execute format('create policy "%s_select" on public.%I for select using (auth.uid() = owner_id)', tbl, tbl);
    execute format('create policy "%s_insert" on public.%I for insert with check (auth.uid() = owner_id)', tbl, tbl);
    execute format('create policy "%s_update" on public.%I for update using (auth.uid() = owner_id)', tbl, tbl);
    execute format('create policy "%s_delete" on public.%I for delete using (auth.uid() = owner_id)', tbl, tbl);
  end loop;
end $$;

create index if not exists idx_clients_owner_name on public.clients(owner_id, name);
create index if not exists idx_service_orders_owner_number on public.service_orders(owner_id, os_number);
create index if not exists idx_budgets_owner_number on public.budgets(owner_id, budget_number);
create index if not exists idx_stock_owner_name on public.stock_items(owner_id, name);
