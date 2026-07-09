import { useLayoutEffect, useRef, useState } from 'react';
import { esVideoFacebook } from '../../features/reels/socialUrl.js';

// Embed oficial de Facebook vía iframe (plugins/post.php | plugins/video.php).
// No requiere app ni token (el SDK XFBML ya no renderiza embeds sin app,
// verificado empíricamente — el iframe directo sí funciona).
// El plugin NO se adapta al iframe: renderiza al ancho fijo del parámetro
// `width`, así que se mide el contenedor al montar y se pasa ese ancho
// (mínimo 350, el que acepta el plugin). Como la altura del post no se puede
// conocer (cross-origin, sin postMessage), se usa una altura generosa por tipo
// y un link visible a Facebook como vía de escape si el post es más largo.
const ANCHO_MIN_PLUGIN = 350;
const ANCHO_MAX = 540;

export default function FacebookEmbed({ url }) {
  const contenedor = useRef(null);
  const [ancho, setAncho] = useState(null);

  useLayoutEffect(() => {
    if (contenedor.current) {
      const medido = Math.floor(contenedor.current.clientWidth) || ANCHO_MAX;
      setAncho(Math.max(ANCHO_MIN_PLUGIN, Math.min(ANCHO_MAX, medido)));
    }
  }, []);

  const esVideo = esVideoFacebook(url);
  const plugin = esVideo ? 'video.php' : 'post.php';
  const src = ancho
    ? `https://www.facebook.com/plugins/${plugin}?href=${encodeURIComponent(url)}&width=${ancho}&show_text=true`
    : null;

  return (
    <div ref={contenedor} className="w-full flex flex-col items-center" style={{ maxWidth: `${ANCHO_MAX}px` }}>
      {src && (
        <iframe
          src={src}
          title="Publicación de Facebook"
          style={{
            width: `${ancho}px`,
            maxWidth: '100%',
            height: esVideo ? '620px' : '740px',
            border: 0,
            borderRadius: '16px',
            background: '#fff',
            boxShadow: 'var(--shadow-card)',
          }}
          scrolling="no"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-sm font-semibold font-body hover:opacity-70"
        style={{ color: 'var(--color-earth)' }}
      >
        Ver la publicación en Facebook
      </a>
    </div>
  );
}
