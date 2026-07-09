import { supabase } from '../../../lib/supabase.js';

const TABLA = 'menciones';

export function validarMencion({ titulo, medio, url, imagen_url }) {
  if (!titulo?.trim()) return { ok: false, error: 'El título es obligatorio.' };
  if (!medio?.trim()) return { ok: false, error: 'El nombre del medio es obligatorio.' };
  if (!/^https?:\/\/.+\..+/.test(url?.trim() || '')) {
    return { ok: false, error: 'Pegá el link completo de la nota (empieza con https://).' };
  }
  if (imagen_url?.trim() && !/^https?:\/\/.+\..+/.test(imagen_url.trim())) {
    return { ok: false, error: 'El link de la imagen no es válido (tiene que empezar con https://). Si no tenés imagen, dejá el campo vacío.' };
  }
  return { ok: true };
}

export async function listMenciones({ limit } = {}) {
  let query = supabase
    .from(TABLA)
    .select('*')
    .order('created_at', { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// payload: { titulo, medio, url, imagen_url?, descripcion?, publicado_el? }
export async function crearMencion(payload) {
  const { data: userData } = await supabase.auth.getUser();
  const row = {
    titulo: payload.titulo.trim(),
    medio: payload.medio.trim(),
    url: payload.url.trim(),
    imagen_url: payload.imagen_url?.trim() || null,
    descripcion: payload.descripcion?.trim() || null,
    publicado_el: payload.publicado_el || null,
    author_id: userData?.user?.id ?? null,
  };
  const { data, error } = await supabase.from(TABLA).insert(row).select().single();
  if (error) throw error;
  return data;
}

export async function eliminarMencion(id) {
  const { error } = await supabase.from(TABLA).delete().eq('id', id);
  if (error) throw error;
}
