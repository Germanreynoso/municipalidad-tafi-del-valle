-- ============================================================
-- Esquema Supabase para Reels de Instagram (últimas novedades)
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

create table public.reels (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  created_at timestamptz not null default now(),
  author_id uuid references auth.users(id) on delete set null,
  constraint reels_url_check check (
    url ~ '^https://(www\.)?instagram\.com/(reel|p)/'
  )
);

-- RLS
alter table public.reels enable row level security;

create policy "reels visibles para todos"
  on public.reels for select
  to anon, authenticated using (true);

create policy "autenticados crean reels"
  on public.reels for insert
  to authenticated with check (true);

create policy "autenticados borran reels"
  on public.reels for delete
  to authenticated using (true);
