-- ============================================================
-- Migración: menciones de prensa + soporte de Facebook en reels
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Permitir publicaciones de Facebook en la tabla reels.
--    Acepta Instagram (reel/p) y URLs canónicas de Facebook;
--    rechaza los links de compartir (facebook.com/share/...).
alter table public.reels drop constraint reels_url_check;
alter table public.reels add constraint reels_url_check check (
  url ~ '^https://(www\.)?instagram\.com/(reel|p)/'
  or (
    (
      url ~ '^https://((www|web|m)\.)?facebook\.com/(story\.php\?|permalink\.php\?|photo|reel/|watch)'
      or url ~ '^https://((www|web|m)\.)?facebook\.com/[^/?#]+/(posts|videos|photos)/'
    )
    and url !~ 'facebook\.com/share/'
  )
);

-- 2. Tabla de menciones de prensa (notas sobre Tafí en otros medios).
create table public.menciones (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  medio text not null,
  url text not null,
  imagen_url text,
  descripcion text,
  publicado_el date,
  created_at timestamptz not null default now(),
  author_id uuid references auth.users(id) on delete set null
);

alter table public.menciones enable row level security;

create policy "menciones visibles para todos"
  on public.menciones for select
  to anon, authenticated using (true);

create policy "autenticados crean menciones"
  on public.menciones for insert
  to authenticated with check (true);

create policy "autenticados borran menciones"
  on public.menciones for delete
  to authenticated using (true);

-- 3. Contenido inicial: las 2 notas de turismo180grados que pasó Prensa.
insert into public.menciones (titulo, medio, url, imagen_url, descripcion, publicado_el) values
(
  'El pueblo tucumano que luce en la vitrina internacional',
  'Turismo 180 Grados',
  'https://turismo180grados.com/internacional/el-pueblo-tucumano-que-luce-en-la-vitrina-internacional/',
  'https://turismo180grados.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-29-at-6.14.32-AM.jpeg',
  'La ONU Turismo tiene a Tafí del Valle en alta consideración como pueblo turístico. Este rincón de Tucumán, uno de los asentamientos más antiguos de Argentina, brilla por su patrimonio cultural ancestral.',
  '2026-06-29'
),
(
  'Tafí del Valle tiene entre sus riquezas a Ángela, una expresión de las cosas importantes de la vida',
  'Turismo 180 Grados',
  'https://turismo180grados.com/nacional/tafi-del-valle-tiene-entre-sus-riquezas-a-angela-una-expresion-de-las-cosas-importantes-de-la-vida/',
  'https://turismo180grados.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-30-at-11.26.38-AM.jpeg',
  'En lo alto de Rodeo Grande, Ángela Romano practica agroecología sustentable en "La casa de mi tata". Es guardiana de semillas criollas y participa en movimientos agroecológicos internacionales.',
  '2026-06-30'
);
