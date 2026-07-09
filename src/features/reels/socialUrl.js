// Detección, validación y normalización de links de redes sociales
// (Instagram + Facebook) para la sección "Últimas novedades".
// Funciones puras, sin dependencia de Supabase, para poder testearlas aisladas.

const IG_REGEX = /^https:\/\/(www\.)?instagram\.com\/(reel|p)\//;
const FB_REGEX = /^https:\/\/((www|web|m)\.)?facebook\.com\//;
const FB_SHARE_REGEX = /^https:\/\/((www|web|m)\.)?facebook\.com\/share\//;
const FB_VIDEO_REGEX = /facebook\.com\/(reel\/|watch|[^/]+\/videos\/)/;
// URLs de CONTENIDO de Facebook (publicación, foto, video). Un link al perfil
// o página (facebook.com/MiPagina) pasa el dominio pero el plugin de embed
// muestra "publicación no disponible" para siempre — hay que rechazarlo.
const FB_CONTENT_REGEX = new RegExp(
  '^https://((www|web|m)\\.)?facebook\\.com/(' +
    'story\\.php\\?|permalink\\.php\\?|photo(\\.php)?([/?]|$)|reel/|watch/?\\?|' +
    '[^/?#]+/(posts|videos|photos)/' +
    ')'
);

// Params de tracking que Facebook agrega al compartir; no identifican al contenido.
const FB_TRACKING_PARAMS = ['rdid', 'share_url', 'mibextid', 'ref', 'refsrc', '_rdr'];

export function plataformaDe(url) {
  if (IG_REGEX.test(url)) return 'instagram';
  if (FB_REGEX.test(url)) return 'facebook';
  return null;
}

// Los videos/reels nativos de Facebook usan el plugin de video;
// los posts (incluidos story.php con video adentro) usan el plugin de post.
export function esVideoFacebook(url) {
  return FB_VIDEO_REGEX.test(url);
}

export function validarSocialUrl(url) {
  const limpio = (url || '').trim();
  if (!limpio) {
    return { ok: false, error: 'Pegá el link de la publicación.' };
  }
  if (FB_SHARE_REGEX.test(limpio)) {
    return {
      ok: false,
      error:
        'Ese es un link de "compartir" de Facebook y no se puede mostrar en el sitio. ' +
        'Abrilo en Facebook y copiá la dirección completa que aparece en la barra del navegador (la URL real de la publicación).',
    };
  }
  if (FB_REGEX.test(limpio) && !FB_CONTENT_REGEX.test(limpio)) {
    return {
      ok: false,
      error:
        'Ese link de Facebook no apunta a una publicación (parece un perfil o página). ' +
        'Abrí la publicación puntual y copiá la dirección de la barra del navegador.',
    };
  }
  if (!plataformaDe(limpio)) {
    return {
      ok: false,
      error:
        'El link debe ser de Instagram (https://www.instagram.com/reel/...) o de una publicación pública de Facebook.',
    };
  }
  return { ok: true };
}

export function normalizarSocialUrl(url) {
  const limpio = url.trim();

  // Instagram exige el permalink sin query params y con barra final.
  if (plataformaDe(limpio) === 'instagram') {
    const sinQuery = limpio.split('?')[0];
    return sinQuery.endsWith('/') ? sinQuery : `${sinQuery}/`;
  }

  // Facebook: los query params pueden identificar al contenido
  // (story.php?story_fbid=...&id=..., watch?v=...); solo se quitan los de tracking.
  try {
    const u = new URL(limpio);
    FB_TRACKING_PARAMS.forEach((p) => u.searchParams.delete(p));
    return u.toString();
  } catch {
    return limpio;
  }
}
