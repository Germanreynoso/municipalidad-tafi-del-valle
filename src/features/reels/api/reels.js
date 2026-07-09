import { supabase } from '../../../lib/supabase.js';
import { validarSocialUrl, normalizarSocialUrl } from '../socialUrl.js';

const TABLA = 'reels';

// La validación/normalización vive en socialUrl.js (Instagram + Facebook).
// Debe coincidir con el CHECK constraint reels_url_check de la tabla.
export const validarReelUrl = validarSocialUrl;
export const normalizarReelUrl = normalizarSocialUrl;

export async function listReels({ limit } = {}) {
  let query = supabase
    .from(TABLA)
    .select('*')
    .order('created_at', { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function crearReel(url) {
  const { data: userData } = await supabase.auth.getUser();
  const row = {
    url: normalizarReelUrl(url),
    author_id: userData?.user?.id ?? null,
  };
  const { data, error } = await supabase.from(TABLA).insert(row).select().single();
  if (error) throw error;
  return data;
}

export async function eliminarReel(id) {
  const { error } = await supabase.from(TABLA).delete().eq('id', id);
  if (error) throw error;
}
