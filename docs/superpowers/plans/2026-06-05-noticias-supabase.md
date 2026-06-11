# Sección de Noticias con Supabase — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **⚠️ COMMITS:** El usuario pidió **no hacer commits sin su autorización**. Los pasos "Commit" de este plan son puntos de control: dejar los cambios staged y **pedir OK antes de commitear** (o agrupar y confirmar al final de cada tarea).

**Goal:** Permitir que prensa cree, edite, borre y publique noticias desde un panel admin, con almacenamiento en Supabase y vistas públicas (listado + detalle).

**Architecture:** SPA Vite + React 19. `@supabase/supabase-js` desde el cliente, protegido por RLS (lectura pública de publicadas, escritura solo autenticados). Módulo API delgado + hooks propios. Editor WYSIWYG con Tiptap; HTML sanitizado con DOMPurify al renderizar. Imágenes en Supabase Storage.

**Tech Stack:** React 19, react-router-dom v7, Tailwind v4, `@supabase/supabase-js`, `@tiptap/react` + `@tiptap/starter-kit`, `dompurify`, `vitest` (lógica pura).

---

## Trabajo previo del usuario (manual, fuera de este plan)

Estos pasos los ejecuta el usuario en Supabase **antes** de Task 7 (auth) y siguientes que tocan datos. El SQL/bucket se detalla en Task 2.

1. Crear proyecto Supabase → obtener `Project URL` y `anon public key`.
2. Ejecutar el SQL de Task 2 (tabla + RLS + trigger).
3. Crear bucket `noticias` (público) + políticas de Storage de Task 2.
4. Crear usuarios de prensa (Authentication → Add user → email/contraseña).
5. Cargar `.env` con las variables (Task 1).

---

## Estructura de archivos

```
.env                                       # vars Supabase (no commitear)
.env.example                               # plantilla (sí commitear)
src/lib/supabase.js                        # cliente Supabase
src/utils/slug.js                          # slugify (puro, testeable)
src/utils/validarImagen.js                 # validación archivo (puro, testeable)
src/features/noticias/
  data/categorias.js                       # lista fija de categorías
  api/noticias.js                          # CRUD + uploadImagen + slug único
  hooks/useNoticias.js                     # listado
  hooks/useNoticia.js                      # detalle por slug
  NoticiasPage.jsx                         # /noticias
  NoticiaDetallePage.jsx                   # /noticias/:slug
  components/NoticiaCard.jsx               # (mover/adaptar el existente)
src/features/admin/
  auth/AuthContext.jsx                     # sesión + login/logout
  auth/useAuth.js
  ProtectedRoute.jsx
  LoginPage.jsx                            # /admin/login
  AdminLayout.jsx
  NoticiasAdminPage.jsx                    # /admin
  NoticiaEditorPage.jsx                    # /admin/noticias/nueva | /:id/editar
  components/EditorWYSIWYG.jsx
  components/ImageUploader.jsx
src/utils/__tests__/slug.test.js
src/utils/__tests__/validarImagen.test.js
```

---

### Task 1: Dependencias, cliente Supabase y variables de entorno

**Files:**
- Modify: `package.json` (scripts test)
- Create: `src/lib/supabase.js`
- Create: `.env.example`
- Modify: `.env` (lo crea el usuario, no se commitea)
- Modify: `.gitignore` (asegurar `.env`)

- [ ] **Step 1: Instalar dependencias**

```bash
npm install @supabase/supabase-js @tiptap/react @tiptap/starter-kit dompurify
npm install -D vitest
```

- [ ] **Step 2: Agregar script de test en package.json**

En `"scripts"` agregar:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Crear `src/lib/supabase.js`**

```js
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    'Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Configurá el archivo .env'
  );
}

export const supabase = createClient(url, anonKey);
```

- [ ] **Step 4: Crear `.env.example`**

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-public-key
```

- [ ] **Step 5: Verificar que `.env` esté en `.gitignore`**

Run: `Select-String -Path .gitignore -Pattern "^\.env"`
Expected: aparece `.env` (si no, agregar la línea `.env`).

- [ ] **Step 6: Commit** (pedir autorización)

```bash
git add package.json package-lock.json src/lib/supabase.js .env.example .gitignore
git commit -m "feat(noticias): agregar deps Supabase/Tiptap y cliente"
```

---

### Task 2: Esquema SQL, RLS y Storage (ejecuta el usuario en Supabase)

**Files:**
- Create: `docs/supabase/noticias-schema.sql` (referencia, se commitea)

- [ ] **Step 1: Crear `docs/supabase/noticias-schema.sql`**

```sql
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

-- Storage: políticas del bucket 'noticias' (crear el bucket público desde el dashboard)
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
```

- [ ] **Step 2: El usuario ejecuta el SQL** en Supabase → SQL Editor, y crea el bucket `noticias` (Storage → New bucket → Public).

- [ ] **Step 3: Commit** (pedir autorización)

```bash
git add docs/supabase/noticias-schema.sql
git commit -m "docs(noticias): esquema SQL y políticas RLS de Supabase"
```

---

### Task 3: Utilidad `slug` (TDD)

**Files:**
- Create: `src/utils/slug.js`
- Test: `src/utils/__tests__/slug.test.js`

- [ ] **Step 1: Escribir el test que falla**

```js
import { describe, it, expect } from 'vitest';
import { slugify } from '../slug.js';

describe('slugify', () => {
  it('pasa a minúsculas y reemplaza espacios por guiones', () => {
    expect(slugify('Nueva Plaza Central')).toBe('nueva-plaza-central');
  });
  it('quita acentos y eñes', () => {
    expect(slugify('Año de la Educación')).toBe('ano-de-la-educacion');
  });
  it('elimina caracteres especiales', () => {
    expect(slugify('¡Obras! en la Ruta 307 (2026)')).toBe('obras-en-la-ruta-307-2026');
  });
  it('colapsa guiones repetidos y recorta extremos', () => {
    expect(slugify('  Hola   ---  Mundo  ')).toBe('hola-mundo');
  });
});
```

- [ ] **Step 2: Correr el test para verlo fallar**

Run: `npm test -- src/utils/__tests__/slug.test.js`
Expected: FAIL ("slugify is not a function" / módulo no encontrado).

- [ ] **Step 3: Implementar `src/utils/slug.js`**

```js
export function slugify(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita diacríticos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')     // no alfanumérico -> guion
    .replace(/-+/g, '-')             // colapsa guiones
    .replace(/^-|-$/g, '');          // recorta extremos
}
```

- [ ] **Step 4: Correr el test para verlo pasar**

Run: `npm test -- src/utils/__tests__/slug.test.js`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit** (pedir autorización)

```bash
git add src/utils/slug.js src/utils/__tests__/slug.test.js
git commit -m "feat(noticias): utilidad slugify con tests"
```

---

### Task 4: Validador de imagen (TDD)

**Files:**
- Create: `src/utils/validarImagen.js`
- Test: `src/utils/__tests__/validarImagen.test.js`

- [ ] **Step 1: Escribir el test que falla**

```js
import { describe, it, expect } from 'vitest';
import { validarImagen, TIPOS_PERMITIDOS, TAMANO_MAX } from '../validarImagen.js';

const archivo = (type, size) => ({ type, size });

describe('validarImagen', () => {
  it('acepta jpg dentro del límite', () => {
    expect(validarImagen(archivo('image/jpeg', 500_000))).toEqual({ ok: true });
  });
  it('rechaza tipo no permitido', () => {
    const r = validarImagen(archivo('application/pdf', 1000));
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/tipo/i);
  });
  it('rechaza archivo demasiado grande', () => {
    const r = validarImagen(archivo('image/png', TAMANO_MAX + 1));
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/tama/i);
  });
  it('rechaza ausencia de archivo', () => {
    expect(validarImagen(null).ok).toBe(false);
  });
  it('expone tipos permitidos y tamaño máximo', () => {
    expect(TIPOS_PERMITIDOS).toContain('image/webp');
    expect(TAMANO_MAX).toBe(2 * 1024 * 1024);
  });
});
```

- [ ] **Step 2: Correr el test para verlo fallar**

Run: `npm test -- src/utils/__tests__/validarImagen.test.js`
Expected: FAIL (módulo no encontrado).

- [ ] **Step 3: Implementar `src/utils/validarImagen.js`**

```js
export const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp'];
export const TAMANO_MAX = 2 * 1024 * 1024; // 2 MB

export function validarImagen(file) {
  if (!file) return { ok: false, error: 'No se seleccionó ningún archivo.' };
  if (!TIPOS_PERMITIDOS.includes(file.type)) {
    return { ok: false, error: 'Tipo de archivo no permitido (usá JPG, PNG o WebP).' };
  }
  if (file.size > TAMANO_MAX) {
    return { ok: false, error: 'La imagen supera el tamaño máximo de 2 MB.' };
  }
  return { ok: true };
}
```

- [ ] **Step 4: Correr el test para verlo pasar**

Run: `npm test -- src/utils/__tests__/validarImagen.test.js`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit** (pedir autorización)

```bash
git add src/utils/validarImagen.js src/utils/__tests__/validarImagen.test.js
git commit -m "feat(noticias): validador de imagen con tests"
```

---

### Task 5: Lista de categorías

**Files:**
- Create: `src/features/noticias/data/categorias.js`

- [ ] **Step 1: Crear el archivo**

```js
// Debe coincidir EXACTAMENTE con el CHECK constraint de la tabla noticias.
export const CATEGORIAS = [
  'Gobierno',
  'Cultura',
  'Turismo',
  'Obras',
  'Comunidad',
  'Eventos',
];
```

- [ ] **Step 2: Commit** (pedir autorización)

```bash
git add src/features/noticias/data/categorias.js
git commit -m "feat(noticias): lista fija de categorías"
```

---

### Task 6: Módulo API de noticias

**Files:**
- Create: `src/features/noticias/api/noticias.js`

Depende de: `src/lib/supabase.js` (Task 1), `src/utils/slug.js` (Task 3).

- [ ] **Step 1: Crear `src/features/noticias/api/noticias.js`**

```js
import { supabase } from '../../../lib/supabase.js';
import { slugify } from '../../../utils/slug.js';

const TABLA = 'noticias';
const BUCKET = 'noticias';

// Listado público: solo publicadas, más recientes primero.
export async function listPublicadas({ limit } = {}) {
  let query = supabase
    .from(TABLA)
    .select('*')
    .eq('estado', 'publicado')
    .order('published_at', { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Listado admin: todas (borradores + publicadas).
export async function listAll() {
  const { data, error } = await supabase
    .from(TABLA)
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getBySlug(slug) {
  const { data, error } = await supabase
    .from(TABLA)
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return data;
}

export async function getById(id) {
  const { data, error } = await supabase
    .from(TABLA)
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

// Genera un slug único consultando los existentes con el mismo prefijo.
async function slugUnico(titulo, idActual = null) {
  const base = slugify(titulo);
  const { data, error } = await supabase
    .from(TABLA)
    .select('id, slug')
    .like('slug', `${base}%`);
  if (error) throw error;
  const ocupados = (data || [])
    .filter((n) => n.id !== idActual)
    .map((n) => n.slug);
  if (!ocupados.includes(base)) return base;
  let i = 2;
  while (ocupados.includes(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

export async function uploadImagen(file) {
  const ext = file.name.split('.').pop();
  const path = `noticias/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// payload: { titulo, extracto, contenido, categoria, imagen_url, estado }
export async function crear(payload) {
  const slug = await slugUnico(payload.titulo);
  const { data: userData } = await supabase.auth.getUser();
  const row = {
    ...payload,
    slug,
    author_id: userData?.user?.id ?? null,
    published_at: payload.estado === 'publicado' ? new Date().toISOString() : null,
  };
  const { data, error } = await supabase.from(TABLA).insert(row).select().single();
  if (error) throw error;
  return data;
}

export async function actualizar(id, payload, { tituloAnterior } = {}) {
  const patch = { ...payload };
  // Regenerar slug solo si cambió el título.
  if (payload.titulo && payload.titulo !== tituloAnterior) {
    patch.slug = await slugUnico(payload.titulo, id);
  }
  // Setear published_at al publicar por primera vez.
  if (payload.estado === 'publicado') {
    const actual = await getById(id);
    if (!actual.published_at) patch.published_at = new Date().toISOString();
  }
  const { data, error } = await supabase
    .from(TABLA)
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function eliminar(id) {
  const { error } = await supabase.from(TABLA).delete().eq('id', id);
  if (error) throw error;
}
```

- [ ] **Step 2: Verificar que el módulo importa sin errores de sintaxis**

Run: `npx vite build` (o dejar para el smoke test final de Task 16).
Expected: build sin errores de import.

- [ ] **Step 3: Commit** (pedir autorización)

```bash
git add src/features/noticias/api/noticias.js
git commit -m "feat(noticias): módulo API CRUD + upload de imagen"
```

---

### Task 7: Contexto de autenticación

**Files:**
- Create: `src/features/admin/auth/AuthContext.jsx`
- Create: `src/features/admin/auth/useAuth.js`

- [ ] **Step 1: Crear `src/features/admin/auth/AuthContext.jsx`**

```jsx
import { createContext, useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase.js';

export const AuthContext = createContext({ session: null, loading: true });

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const login = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });
  const logout = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

- [ ] **Step 2: Crear `src/features/admin/auth/useAuth.js`**

```js
import { useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';

export function useAuth() {
  return useContext(AuthContext);
}
```

- [ ] **Step 3: Commit** (pedir autorización)

```bash
git add src/features/admin/auth/
git commit -m "feat(admin): contexto de autenticación con Supabase"
```

---

### Task 8: Hooks de noticias

**Files:**
- Create: `src/features/noticias/hooks/useNoticias.js`
- Create: `src/features/noticias/hooks/useNoticia.js`

- [ ] **Step 1: Crear `src/features/noticias/hooks/useNoticias.js`**

```js
import { useEffect, useState, useCallback } from 'react';
import { listPublicadas, listAll } from '../api/noticias.js';

// modo: 'publicas' (default) o 'admin'
export function useNoticias({ modo = 'publicas', limit } = {}) {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = modo === 'admin' ? await listAll() : await listPublicadas({ limit });
      setNoticias(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [modo, limit]);

  useEffect(() => { cargar(); }, [cargar]);

  return { noticias, loading, error, recargar: cargar };
}
```

- [ ] **Step 2: Crear `src/features/noticias/hooks/useNoticia.js`**

```js
import { useEffect, useState } from 'react';
import { getBySlug } from '../api/noticias.js';

export function useNoticia(slug) {
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;
    setLoading(true);
    setError(null);
    getBySlug(slug)
      .then((data) => { if (activo) setNoticia(data); })
      .catch((e) => { if (activo) setError(e); })
      .finally(() => { if (activo) setLoading(false); });
    return () => { activo = false; };
  }, [slug]);

  return { noticia, loading, error };
}
```

- [ ] **Step 3: Commit** (pedir autorización)

```bash
git add src/features/noticias/hooks/
git commit -m "feat(noticias): hooks useNoticias y useNoticia"
```

---

### Task 9: NoticiaCard adaptado + NoticiasPage (listado público)

**Files:**
- Create: `src/features/noticias/components/NoticiaCard.jsx` (adaptado del existente, sin i18n)
- Create: `src/features/noticias/NoticiasPage.jsx`

Nota: el `NoticiaCard.jsx` viejo vive en `src/features/institucional/components/`. Se crea uno nuevo en `noticias/` que recibe datos de Supabase. El viejo se elimina en Task 16.

- [ ] **Step 1: Crear `src/features/noticias/components/NoticiaCard.jsx`**

```jsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatFecha } from '../../../utils/formatFecha.js';

export default function NoticiaCard({ noticia }) {
  const { slug, titulo, extracto, categoria, imagen_url, published_at, created_at } = noticia;
  const fecha = published_at || created_at;

  return (
    <Link
      to={`/noticias/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-stone-light bg-white transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div className="overflow-hidden h-48">
        <img
          src={imagen_url}
          alt={titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold font-body"
            style={{ backgroundColor: '#EDE8E3', color: 'var(--color-earth)' }}
          >
            {categoria}
          </span>
          <span className="text-xs text-stone font-body">{formatFecha(fecha)}</span>
        </div>
        <h3 className="font-bold text-base mb-2 line-clamp-2 leading-snug text-stone-dark font-heading">{titulo}</h3>
        <p className="text-sm mb-4 line-clamp-3 text-stone font-body">{extracto}</p>
        <div
          className="flex items-center gap-1 text-sm font-semibold font-body"
          style={{ color: 'var(--color-earth)' }}
        >
          Leer más <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Crear `src/features/noticias/NoticiasPage.jsx`**

```jsx
import { Link } from 'react-router-dom';
import { useNoticias } from './hooks/useNoticias.js';
import NoticiaCard from './components/NoticiaCard.jsx';

export default function NoticiasPage() {
  const { noticias, loading, error } = useNoticias({ modo: 'publicas' });

  return (
    <div>
      <div
        className="relative py-24 px-4"
        style={{ background: 'linear-gradient(135deg, var(--color-earth) 0%, #6B4E2E 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70 font-body">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            {' / '}Noticias
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight font-heading">
            Noticias
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading && <p className="text-stone font-body">Cargando noticias…</p>}
        {error && <p className="text-red-600 font-body">No se pudieron cargar las noticias.</p>}
        {!loading && !error && noticias.length === 0 && (
          <p className="text-stone font-body">Todavía no hay noticias publicadas.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((n) => <NoticiaCard key={n.id} noticia={n} />)}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit** (pedir autorización)

```bash
git add src/features/noticias/components/NoticiaCard.jsx src/features/noticias/NoticiasPage.jsx
git commit -m "feat(noticias): listado público y tarjeta de noticia"
```

---

### Task 10: NoticiaDetallePage (render HTML sanitizado)

**Files:**
- Create: `src/features/noticias/NoticiaDetallePage.jsx`

Depende de: `dompurify` (Task 1), `useNoticia` (Task 8).

- [ ] **Step 1: Crear `src/features/noticias/NoticiaDetallePage.jsx`**

```jsx
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useNoticia } from './hooks/useNoticia.js';
import { formatFecha } from '../../utils/formatFecha.js';

export default function NoticiaDetallePage() {
  const { slug } = useParams();
  const { noticia, loading, error } = useNoticia(slug);

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-20 text-stone font-body">Cargando…</div>;
  if (error || !noticia) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-stone font-body mb-4">No se encontró la noticia.</p>
        <Link to="/noticias" className="font-semibold" style={{ color: 'var(--color-earth)' }}>
          ← Volver a noticias
        </Link>
      </div>
    );
  }

  const fecha = noticia.published_at || noticia.created_at;
  const html = DOMPurify.sanitize(noticia.contenido || '');

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link to="/noticias" className="text-sm font-semibold font-body" style={{ color: 'var(--color-earth)' }}>
        ← Noticias
      </Link>
      <div className="flex items-center gap-2 mt-6 mb-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold font-body"
          style={{ backgroundColor: '#EDE8E3', color: 'var(--color-earth)' }}
        >
          {noticia.categoria}
        </span>
        <span className="text-xs text-stone font-body">{formatFecha(fecha)}</span>
      </div>
      <h1 className="text-4xl font-black text-stone-dark mb-6 font-heading leading-tight">{noticia.titulo}</h1>
      {noticia.imagen_url && (
        <img src={noticia.imagen_url} alt={noticia.titulo} className="w-full rounded-2xl mb-8 object-cover" />
      )}
      <div
        className="prose prose-stone max-w-none font-body text-stone-dark"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
```

- [ ] **Step 2: Commit** (pedir autorización)

```bash
git add src/features/noticias/NoticiaDetallePage.jsx
git commit -m "feat(noticias): página de detalle con HTML sanitizado"
```

---

### Task 11: LoginPage del panel

**Files:**
- Create: `src/features/admin/LoginPage.jsx`

Depende de: `useAuth` (Task 7).

- [ ] **Step 1: Crear `src/features/admin/LoginPage.jsx`**

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/useAuth.js';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    const { error } = await login(email, password);
    setEnviando(false);
    if (error) {
      setError('Email o contraseña incorrectos.');
      return;
    }
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-light px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-2xl p-8 border border-stone-light" style={{ boxShadow: 'var(--shadow-card)' }}>
        <h1 className="text-2xl font-black mb-6 text-stone-dark font-heading">Panel de Prensa</h1>
        {error && <p className="text-red-600 text-sm mb-4 font-body">{error}</p>}
        <label className="block text-sm font-semibold mb-1 font-body text-stone-dark">Email</label>
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
          className="w-full mb-4 px-3 py-2 rounded-lg border border-stone-light font-body"
        />
        <label className="block text-sm font-semibold mb-1 font-body text-stone-dark">Contraseña</label>
        <input
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
          className="w-full mb-6 px-3 py-2 rounded-lg border border-stone-light font-body"
        />
        <button
          type="submit" disabled={enviando}
          className="w-full py-3 rounded-xl font-bold text-white font-body disabled:opacity-60"
          style={{ backgroundColor: 'var(--color-earth)' }}
        >
          {enviando ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Commit** (pedir autorización)

```bash
git add src/features/admin/LoginPage.jsx
git commit -m "feat(admin): página de login"
```

---

### Task 12: ProtectedRoute + AdminLayout + NoticiasAdminPage

**Files:**
- Create: `src/features/admin/ProtectedRoute.jsx`
- Create: `src/features/admin/AdminLayout.jsx`
- Create: `src/features/admin/NoticiasAdminPage.jsx`

Depende de: `useAuth` (Task 7), `listAll`/`eliminar` (Task 6).

- [ ] **Step 1: Crear `src/features/admin/ProtectedRoute.jsx`**

```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth/useAuth.js';

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();
  if (loading) return <div className="p-10 font-body text-stone">Verificando sesión…</div>;
  if (!session) return <Navigate to="/admin/login" replace />;
  return children;
}
```

- [ ] **Step 2: Crear `src/features/admin/AdminLayout.jsx`**

```jsx
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/useAuth.js';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const salir = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-stone-light">
      <header className="bg-white border-b border-stone-light">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/admin" className="font-black text-stone-dark font-heading">Panel de Prensa</Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-body text-stone hover:text-stone-dark">Ver sitio</Link>
            <button onClick={salir} className="text-sm font-semibold font-body" style={{ color: 'var(--color-earth)' }}>
              Salir
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Crear `src/features/admin/NoticiasAdminPage.jsx`**

```jsx
import { Link } from 'react-router-dom';
import { useNoticias } from '../noticias/hooks/useNoticias.js';
import { eliminar } from '../noticias/api/noticias.js';
import { formatFecha } from '../../utils/formatFecha.js';

export default function NoticiasAdminPage() {
  const { noticias, loading, error, recargar } = useNoticias({ modo: 'admin' });

  const borrar = async (id) => {
    if (!window.confirm('¿Eliminar esta noticia? No se puede deshacer.')) return;
    try {
      await eliminar(id);
      recargar();
    } catch {
      alert('No se pudo eliminar la noticia.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-stone-dark font-heading">Noticias</h1>
        <Link
          to="/admin/noticias/nueva"
          className="px-5 py-2.5 rounded-xl font-bold text-white font-body"
          style={{ backgroundColor: 'var(--color-earth)' }}
        >
          + Nueva noticia
        </Link>
      </div>

      {loading && <p className="font-body text-stone">Cargando…</p>}
      {error && <p className="font-body text-red-600">No se pudieron cargar las noticias.</p>}

      {!loading && !error && (
        <div className="bg-white rounded-2xl border border-stone-light overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-stone-light/50">
              <tr className="text-xs uppercase tracking-wider text-stone font-body">
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {noticias.map((n) => (
                <tr key={n.id} className="border-t border-stone-light font-body text-sm">
                  <td className="px-4 py-3 font-semibold text-stone-dark">{n.titulo}</td>
                  <td className="px-4 py-3 text-stone">{n.categoria}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${n.estado === 'publicado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {n.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone">{formatFecha(n.published_at || n.created_at)}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link to={`/admin/noticias/${n.id}/editar`} className="font-semibold mr-4" style={{ color: 'var(--color-earth)' }}>
                      Editar
                    </Link>
                    <button onClick={() => borrar(n.id)} className="font-semibold text-red-600">Borrar</button>
                  </td>
                </tr>
              ))}
              {noticias.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-stone">Todavía no hay noticias.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Commit** (pedir autorización)

```bash
git add src/features/admin/ProtectedRoute.jsx src/features/admin/AdminLayout.jsx src/features/admin/NoticiasAdminPage.jsx
git commit -m "feat(admin): layout, ruta protegida y listado admin"
```

---

### Task 13: EditorWYSIWYG (Tiptap) + ImageUploader

**Files:**
- Create: `src/features/admin/components/EditorWYSIWYG.jsx`
- Create: `src/features/admin/components/ImageUploader.jsx`

Depende de: `@tiptap/react` + `@tiptap/starter-kit` (Task 1), `uploadImagen` (Task 6), `validarImagen` (Task 4).

- [ ] **Step 1: Crear `src/features/admin/components/EditorWYSIWYG.jsx`**

```jsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

function Boton({ activo, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1 rounded text-sm font-body border ${activo ? 'bg-stone-dark text-white border-stone-dark' : 'bg-white text-stone-dark border-stone-light'}`}
    >
      {children}
    </button>
  );
}

export default function EditorWYSIWYG({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Sincronizar contenido externo (ej. al cargar una noticia para editar).
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border border-stone-light rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-stone-light bg-stone-light/30">
        <Boton activo={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>Negrita</Boton>
        <Boton activo={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>Cursiva</Boton>
        <Boton activo={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>Título</Boton>
        <Boton activo={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>Lista</Boton>
        <Boton activo={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>Lista num.</Boton>
      </div>
      <EditorContent editor={editor} className="prose prose-stone max-w-none p-4 min-h-[200px] font-body" />
    </div>
  );
}
```

- [ ] **Step 2: Crear `src/features/admin/components/ImageUploader.jsx`**

```jsx
import { useState } from 'react';
import { uploadImagen } from '../../noticias/api/noticias.js';
import { validarImagen } from '../../../utils/validarImagen.js';

export default function ImageUploader({ value, onChange }) {
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState(null);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    setError(null);
    const check = validarImagen(file);
    if (!check.ok) { setError(check.error); return; }
    setSubiendo(true);
    try {
      const url = await uploadImagen(file);
      onChange(url);
    } catch {
      setError('No se pudo subir la imagen.');
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div>
      {value && <img src={value} alt="" className="w-full max-w-sm rounded-lg mb-3 object-cover" />}
      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onFile} className="font-body text-sm" />
      {subiendo && <p className="text-sm text-stone mt-2 font-body">Subiendo…</p>}
      {error && <p className="text-sm text-red-600 mt-2 font-body">{error}</p>}
    </div>
  );
}
```

- [ ] **Step 3: Commit** (pedir autorización)

```bash
git add src/features/admin/components/
git commit -m "feat(admin): editor Tiptap y uploader de imágenes"
```

---

### Task 14: NoticiaEditorPage (crear/editar)

**Files:**
- Create: `src/features/admin/NoticiaEditorPage.jsx`

Depende de: Tasks 5, 6, 13.

- [ ] **Step 1: Crear `src/features/admin/NoticiaEditorPage.jsx`**

```jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { crear, actualizar, getById } from '../noticias/api/noticias.js';
import { CATEGORIAS } from '../noticias/data/categorias.js';
import EditorWYSIWYG from './components/EditorWYSIWYG.jsx';
import ImageUploader from './components/ImageUploader.jsx';

const VACIA = {
  titulo: '', extracto: '', contenido: '',
  categoria: CATEGORIAS[0], imagen_url: '', estado: 'borrador',
};

export default function NoticiaEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form, setForm] = useState(VACIA);
  const [tituloOriginal, setTituloOriginal] = useState('');
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!editando) return;
    getById(id)
      .then((n) => {
        setForm({
          titulo: n.titulo || '', extracto: n.extracto || '', contenido: n.contenido || '',
          categoria: n.categoria, imagen_url: n.imagen_url || '', estado: n.estado,
        });
        setTituloOriginal(n.titulo || '');
      })
      .catch(() => setError('No se pudo cargar la noticia.'))
      .finally(() => setCargando(false));
  }, [id, editando]);

  const set = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));

  const guardar = async (estado) => {
    setError(null);
    if (!form.titulo.trim()) { setError('El título es obligatorio.'); return; }
    setGuardando(true);
    try {
      const payload = { ...form, estado };
      if (editando) {
        await actualizar(id, payload, { tituloAnterior: tituloOriginal });
      } else {
        await crear(payload);
      }
      navigate('/admin');
    } catch {
      setError('No se pudo guardar la noticia.');
      setGuardando(false);
    }
  };

  if (cargando) return <p className="font-body text-stone">Cargando…</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-black text-stone-dark font-heading mb-8">
        {editando ? 'Editar noticia' : 'Nueva noticia'}
      </h1>
      {error && <p className="text-red-600 font-body mb-4">{error}</p>}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-1 font-body text-stone-dark">Título</label>
          <input value={form.titulo} onChange={set('titulo')} className="w-full px-3 py-2 rounded-lg border border-stone-light font-body" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 font-body text-stone-dark">Extracto</label>
          <textarea value={form.extracto} onChange={set('extracto')} rows={2} className="w-full px-3 py-2 rounded-lg border border-stone-light font-body" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 font-body text-stone-dark">Categoría</label>
          <select value={form.categoria} onChange={set('categoria')} className="px-3 py-2 rounded-lg border border-stone-light font-body">
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 font-body text-stone-dark">Imagen</label>
          <ImageUploader value={form.imagen_url} onChange={(url) => setForm((f) => ({ ...f, imagen_url: url }))} />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 font-body text-stone-dark">Contenido</label>
          <EditorWYSIWYG value={form.contenido} onChange={(html) => setForm((f) => ({ ...f, contenido: html }))} />
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={() => guardar('borrador')} disabled={guardando}
            className="px-5 py-2.5 rounded-xl font-bold font-body border border-stone-light text-stone-dark disabled:opacity-60">
            Guardar borrador
          </button>
          <button onClick={() => guardar('publicado')} disabled={guardando}
            className="px-5 py-2.5 rounded-xl font-bold text-white font-body disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-earth)' }}>
            {guardando ? 'Guardando…' : 'Publicar'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit** (pedir autorización)

```bash
git add src/features/admin/NoticiaEditorPage.jsx
git commit -m "feat(admin): formulario de crear/editar noticia"
```

---

### Task 15: Cableado de rutas y AuthProvider en App.jsx

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Agregar imports en `src/App.jsx`** (junto a los demás imports, antes de `function Layout`)

```jsx
import { AuthProvider } from './features/admin/auth/AuthContext.jsx';
import ProtectedRoute from './features/admin/ProtectedRoute.jsx';
import AdminLayout from './features/admin/AdminLayout.jsx';
import LoginPage from './features/admin/LoginPage.jsx';
import NoticiasAdminPage from './features/admin/NoticiasAdminPage.jsx';
import NoticiaEditorPage from './features/admin/NoticiaEditorPage.jsx';
import NoticiasPage from './features/noticias/NoticiasPage.jsx';
import NoticiaDetallePage from './features/noticias/NoticiaDetallePage.jsx';
```

- [ ] **Step 2: Agregar rutas públicas de noticias** dentro del array `children` del `Layout` (después de `/institucional`)

```jsx
      { path: '/noticias',         element: <NoticiasPage /> },
      { path: '/noticias/:slug',   element: <NoticiaDetallePage /> },
```

- [ ] **Step 3: Agregar las rutas admin** como nuevos objetos de primer nivel en el array de `createBrowserRouter` (hermanos del objeto `Layout`, NO dentro de su `children`, para que no usen Navbar/Footer del sitio)

```jsx
  {
    path: '/admin/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <NoticiasAdminPage /> },
      { path: 'noticias/nueva', element: <NoticiaEditorPage /> },
      { path: 'noticias/:id/editar', element: <NoticiaEditorPage /> },
    ],
  },
```

- [ ] **Step 4: Envolver el `RouterProvider` con `AuthProvider`** — reemplazar el `export default function App`

```jsx
export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
```

- [ ] **Step 5: Verificar build**

Run: `npx vite build`
Expected: build exitoso sin errores de import/rutas.

- [ ] **Step 6: Commit** (pedir autorización)

```bash
git add src/App.jsx
git commit -m "feat: cablear rutas de noticias y panel admin"
```

---

### Task 16: Migrar InstitucionalPage + Home y limpiar hardcode

**Files:**
- Modify: `src/features/institucional/InstitucionalPage.jsx`
- Modify: `src/pages/Home.jsx`
- Modify: `src/features/institucional/data/noticias.js` (quitar export `noticias`, conservar `documentos`)
- Delete: `src/features/institucional/components/NoticiaCard.jsx` (reemplazado por el de `noticias/`)

- [ ] **Step 1: Actualizar `InstitucionalPage.jsx`** — reemplazar imports y el bloque de noticias.

Reemplazar líneas 1-5 (imports) por:

```jsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { documentos } from './data/noticias.js';
import DocumentoItem from './components/DocumentoItem.jsx';
import { useNoticias } from '../noticias/hooks/useNoticias.js';
import NoticiaCard from '../noticias/components/NoticiaCard.jsx';
```

Dentro del componente, después de `const { t } = useTranslation(...)`, agregar:

```jsx
  const { noticias, loading } = useNoticias({ modo: 'publicas', limit: 4 });
```

Reemplazar el grid de noticias (actual líneas 38-40) por:

```jsx
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {loading && <p className="text-stone font-body">Cargando noticias…</p>}
              {!loading && noticias.length === 0 && (
                <p className="text-stone font-body">No hay noticias publicadas.</p>
              )}
              {noticias.map((n) => <NoticiaCard key={n.id} noticia={n} />)}
            </div>
```

- [ ] **Step 2: Limpiar `Home.jsx`** — quitar el import de `noticias` (línea 8) y la línea muerta `const noticiasRecientes = noticias.slice(0, 3);` (línea 20).

- [ ] **Step 3: Actualizar `src/features/institucional/data/noticias.js`** — eliminar el export `noticias` (líneas 1-6), conservar solo `documentos`:

```js
export const documentos = [
  { id: 1, tipo: 'PDF', fecha: '2026-01-15', url: '#' },
  { id: 2, tipo: 'PDF', fecha: '2026-03-01', url: '#' },
  { id: 3, tipo: 'PDF', fecha: '2026-02-28', url: '#' },
  { id: 4, tipo: 'PDF', fecha: '2026-04-01', url: '#' },
];
```

- [ ] **Step 4: Eliminar el NoticiaCard viejo**

Run: `Remove-Item src/features/institucional/components/NoticiaCard.jsx`

- [ ] **Step 5: Verificar que no queden referencias al NoticiaCard viejo ni al export noticias**

Run: `Select-String -Path src/**/*.jsx -Pattern "institucional/components/NoticiaCard|data/noticias'"`
Expected: sin resultados que importen el viejo `NoticiaCard` o el export `noticias`.

- [ ] **Step 6: Correr tests + build**

Run: `npm test; npx vite build`
Expected: tests PASS, build exitoso.

- [ ] **Step 7: Smoke test manual**

Run: `npm run dev` y verificar en el navegador:
- `/noticias` muestra el listado (vacío si no hay datos seed).
- `/admin/login` → ingresar con un usuario de prensa → redirige a `/admin`.
- Crear noticia con imagen y publicarla → aparece en `/noticias` y en `/institucional`.
- Abrir el detalle `/noticias/:slug` → contenido renderizado.
- Editar y borrar desde `/admin`.

- [ ] **Step 8: Commit** (pedir autorización)

```bash
git add src/features/institucional/InstitucionalPage.jsx src/pages/Home.jsx src/features/institucional/data/noticias.js
git commit -m "feat(noticias): migrar Institucional/Home a Supabase y limpiar hardcode"
```

---

## Self-review (cobertura del spec)

- ✅ Modelo de datos `noticias` → Task 2.
- ✅ RLS (lectura pública publicadas / escritura autenticados) + Storage → Task 2.
- ✅ Slug único → Task 3 (puro) + Task 6 (`slugUnico`).
- ✅ Categorías fijas → Task 5 + CHECK en Task 2.
- ✅ Imágenes a Storage + validación → Task 4, Task 6 (`uploadImagen`), Task 13.
- ✅ Auth alta manual + login + guard → Tasks 7, 11, 12.
- ✅ Vistas públicas listado + detalle → Tasks 9, 10.
- ✅ Editor WYSIWYG (Tiptap) → Task 13.
- ✅ Borrador/publicado → Tasks 6, 12, 14.
- ✅ Render HTML sanitizado (DOMPurify) → Task 10.
- ✅ Migración Institucional/Home + limpieza hardcode → Task 16.
- ✅ Testing pure-logic (Vitest) → Tasks 3, 4.

## Fuera de alcance (del spec)
Noticias bilingües, gestión de documentos/ordenanzas, gestión de categorías desde panel, registro/invitación de usuarios, comentarios/etiquetas/búsqueda/paginación.
