# KotaTech ERP Online

ERP online para assistência técnica usando:

- Next.js
- Supabase PostgreSQL
- Supabase Auth
- Supabase Row Level Security
- Vercel
- Tailwind CSS

## O sistema tem

- Login online
- Dashboard
- Clientes
- Fornecedores
- Equipamentos
- Estoque
- Ordens de serviço
- Orçamentos
- Contas a receber
- Contas a pagar
- Empresa
- PDF de listagens
- Layout responsivo para celular

## Dá para usar sem pagar?

Sim, para começar usando os planos gratuitos:

- Vercel Hobby
- Supabase Free

Importante: planos gratuitos possuem limites. Se o sistema crescer muito ou virar operação comercial maior, pode precisar migrar para planos pagos ou outra hospedagem.

## Como instalar localmente

1. Instale Node.js LTS.
2. Abra a pasta do projeto.
3. Rode:

```bash
npm install
```

4. Copie `.env.example` para `.env.local`.

```bash
cp .env.example .env.local
```

No Windows, pode copiar manualmente.

5. Crie um projeto grátis no Supabase.
6. No Supabase, abra SQL Editor e execute:

```txt
supabase/schema.sql
```

7. Copie as chaves do Supabase para `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC
```

8. Rode:

```bash
npm run dev
```

9. Abra:

```txt
http://localhost:3000
```

## Como publicar grátis na Vercel

1. Crie uma conta no GitHub.
2. Envie esta pasta para um repositório.
3. Crie conta na Vercel.
4. Clique em Add New Project.
5. Importe o repositório.
6. Adicione as variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

7. Clique em Deploy.

Depois disso, o sistema ficará acessível por um link como:

```txt
https://kotatech-erp.vercel.app
```

Você pode abrir esse link no celular.

## Segurança

O projeto usa Row Level Security no Supabase.

Cada usuário só acessa seus próprios registros usando `owner_id`.

## Observação importante

Este projeto é um MVP profissional inicial. Ele já serve como base online real, mas para vender como SaaS seria ideal adicionar:

- recuperação de senha
- multiempresa com planos
- logs de auditoria
- backups automáticos
- upload de logo
- emissão de nota fiscal oficial
- permissões por função
- testes automatizados
