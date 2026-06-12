import { supabase } from '../../../lib/supabase.js';

const TABLA = 'reels';

// Debe coincidir con el CHECK constraint reels_url_check de la tabla.
export const REEL_URL_REGEX = /^https:\/\/(www\.)?instagram\.com\/(reel|p)\//;

export function validarReelUrl(url) {
  if (!url || !url.trim()) {
    return { ok: false, error: 'Pegá el link del reel.' };
  }
  if (!REEL_URL_REGEX.test(url.trim())) {
    return { ok: false, error: 'El link debe ser de un reel o post de Instagram (https://www.instagram.com/reel/...).' };
  }
  return { ok: true };
}

// Instagram exige el permalink sin query params y con barra final.
export function normalizarReelUrl(url) {
  const clean = url.trim().split('?')[0];
  return clean.endsWith('/') ? clean : `${clean}/`;
}

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
