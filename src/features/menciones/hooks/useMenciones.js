import { useEffect, useState, useCallback } from 'react';
import { listMenciones } from '../api/menciones.js';

export function useMenciones({ limit } = {}) {
  const [menciones, setMenciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setMenciones(await listMenciones({ limit }));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => { cargar(); }, [cargar]);

  return { menciones, loading, error, recargar: cargar };
}
