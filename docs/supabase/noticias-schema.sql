-- ============================================================
-- Esquema Supabase para la sección de Noticias
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- Además, crear el bucket público 'noticias' en Storage → New bucket (Public)
-- ============================================================

-- Tabla noticias
create table public.noticias (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titulo text not null,
  extracto text,
  contenido text,
  categoria text not null,
  imagen_url text,
  estado text not null default 'borrador',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  author_id uuid references auth.users(id),
  constraint noticias_estado_check check (estado in ('borrador','publicado')),
  constraint noticias_categoria_check check (
    categoria in ('Gobierno','Cultura','Turismo','Obras','Comunidad','Eventos')
  )
);

-- Trigger updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

create trigger noticias_set_updated_at
  before update on public.noticias
  for each row execute function public.set_updated_at();

-- RLS
alter table public.noticias enable row level security;

create policy "publicadas visibles para todos"
  on public.noticias for select
  to anon using (estado = 'publicado');

create policy "autenticados ven todo"
  on public.noticias for select
  to authenticated using (true);

create policy "autenticados crean"
  on public.noticias for insert
  to authenticated with check (true);

create policy "autenticados editan"
  on public.noticias for update
  to authenticated using (true) with check (true);

create policy "autenticados borran"
  on public.noticias for delete
  to authenticated using (true);

-- ============================================================
-- Storage: políticas del bucket 'noticias'
-- (crear primero el bucket público desde el dashboard)
-- ============================================================
create policy "lectura publica imagenes noticias"
  on storage.objects for select
  to anon using (bucket_id = 'noticias');

create policy "autenticados suben imagenes"
  on storage.objects for insert
  to authenticated with check (bucket_id = 'noticias');

create policy "autenticados actualizan imagenes"
  on storage.objects for update
  to authenticated using (bucket_id = 'noticias');

create policy "autenticados borran imagenes"
  on storage.objects for delete
  to authenticated using (bucket_id = 'noticias');
