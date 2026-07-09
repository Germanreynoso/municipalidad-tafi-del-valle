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
