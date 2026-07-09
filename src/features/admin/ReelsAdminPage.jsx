import { useState } from 'react';
import { useReels } from '../reels/hooks/useReels.js';
import { crearReel, eliminarReel, validarReelUrl } from '../reels/api/reels.js';
import { formatFecha } from '../../utils/formatFecha.js';

export default function ReelsAdminPage() {
  const { reels, loading, error, recargar } = useReels();
  const [url, setUrl] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [formError, setFormError] = useState(null);

  const agregar = async (e) => {
    e.preventDefault();
    setFormError(null);
    const check = validarReelUrl(url);
    if (!check.ok) { setFormError(check.error); return; }
    setGuardando(true);
    try {
      await crearReel(url);
      setUrl('');
      recargar();
    } catch {
      setFormError('No se pudo guardar el reel.');
    } finally {
      setGuardando(false);
    }
  };

  const borrar = async (id) => {
    if (!window.confirm('¿Eliminar este reel de la portada?')) return;
    try {
      await eliminarReel(id);
      recargar();
    } catch {
      alert('No se pudo eliminar el reel.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black text-stone-dark font-heading mb-2">Reels de Instagram</h1>
      <p className="font-body text-stone mb-8 text-sm">
        Los 3 más recientes aparecen en la portada del sitio como "Últimas novedades".
      </p>

      <div
        className="bg-white rounded-2xl border border-stone-200 p-6 mb-8 max-w-2xl"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <label className="block text-sm font-semibold mb-1.5 font-body text-stone-dark">
          Link del reel
        </label>
        <form onSubmit={agregar} className="flex flex-col sm:flex-row gap-3">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.instagram.com/reel/..."
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white font-body placeholder:text-stone-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            disabled={guardando}
            className="px-5 py-2.5 rounded-xl font-bold text-white font-body disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-earth)' }}
          >
            {guardando ? 'Guardando…' : '+ Agregar reel'}
          </button>
        </form>
        <p className="text-xs text-stone mt-2 font-body">
          Pegá el link del reel desde Instagram (botón Compartir → Copiar enlace).
        </p>
        {formError && <p className="text-sm text-red-600 mt-2 font-body">{formError}</p>}
      </div>

      {loading && <p className="font-body text-stone">Cargando…</p>}
      {error && <p className="font-body text-red-600">No se pudieron cargar los reels.</p>}

      {!loading && !error && (
        <div className="bg-white rounded-2xl border border-stone-light overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-stone-light/50">
              <tr className="text-xs uppercase tracking-wider text-stone font-body">
                <th className="px-4 py-3">Link</th>
                <th className="px-4 py-3">Agregado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reels.map((reel) => (
                <tr key={reel.id} className="border-t border-stone-light font-body text-sm">
                  <td className="px-4 py-3">
                    <a href={reel.url} target="_blank" rel="noopener noreferrer"
                      className="font-semibold break-all" style={{ color: 'var(--color-earth)' }}>
                      {reel.url}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-stone whitespace-nowrap">{formatFecha(reel.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => borrar(reel.id)} className="font-semibold text-red-600">Borrar</button>
                  </td>
                </tr>
              ))}
              {reels.length === 0 && (
                <tr><td colSpan={3} className="px-4 py-8 text-center text-stone">Todavía no hay reels cargados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
