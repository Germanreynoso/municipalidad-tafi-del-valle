import { useEffect, useState, useCallback } from 'react';
import { listReels } from '../api/reels.js';

export function useReels({ limit } = {}) {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setReels(await listReels({ limit }));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => { cargar(); }, [cargar]);

  return { reels, loading, error, recargar: cargar };
}
