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
