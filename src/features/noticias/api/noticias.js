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
