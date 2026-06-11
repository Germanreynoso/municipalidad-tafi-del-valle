import { useEffect } from 'react';

const EMBED_SCRIPT_SRC = 'https://www.instagram.com/embed.js';

function loadEmbedScript() {
  return new Promise((resolve) => {
    if (window.instgrm?.Embeds) {
      resolve();
      return;
    }
    let script = document.querySelector(`script[src="${EMBED_SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = EMBED_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener('load', () => resolve(), { once: true });
  });
}

// Instagram exige el permalink sin query params y con barra final.
function normalizePermalink(url) {
  const clean = url.split('?')[0];
  return clean.endsWith('/') ? clean : `${clean}/`;
}

export default function InstagramEmbed({ url }) {
  useEffect(() => {
    let cancelled = false;
    loadEmbedScript().then(() => {
      if (!cancelled) window.instgrm?.Embeds?.process();
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  const permalink = normalizePermalink(url);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={permalink}
      data-instgrm-version="14"
      style={{
        background: '#fff',
        border: 0,
        borderRadius: '16px',
        boxShadow: 'var(--shadow-card)',
        margin: 0,
        maxWidth: '540px',
        minWidth: '280px',
        width: '100%',
      }}
    >
      {/* Fallback visible hasta que embed.js procesa el blockquote */}
      <a href={permalink} target="_blank" rel="noopener noreferrer">
        {permalink}
      </a>
    </blockquote>
  );
}
