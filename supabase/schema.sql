create table if not exists public.site_catalog (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_catalog enable row level security;

drop policy if exists "Public can read catalog" on public.site_catalog;
create policy "Public can read catalog"
on public.site_catalog
for select
to anon, authenticated
using (true);

create table if not exists public.admin_login_guard (
  id text primary key,
  failures int not null default 0,
  locked_until timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.admin_login_guard enable row level security;
