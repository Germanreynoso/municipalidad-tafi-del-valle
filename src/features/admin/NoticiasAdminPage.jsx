import { Link } from 'react-router-dom';
import { useNoticias } from '../noticias/hooks/useNoticias.js';
import { eliminar } from '../noticias/api/noticias.js';
import { formatFecha } from '../../utils/formatFecha.js';

export default function NoticiasAdminPage() {
  const { noticias, loading, error, recargar } = useNoticias({ modo: 'admin' });

  const borrar = async (id) => {
    if (!window.confirm('¿Eliminar esta noticia? No se puede deshacer.')) return;
    try {
      await eliminar(id);
      recargar();
    } catch {
      alert('No se pudo eliminar la noticia.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-stone-dark font-heading">Noticias</h1>
        <Link
          to="/admin/noticias/nueva"
          className="px-5 py-2.5 rounded-xl font-bold text-white font-body"
          style={{ backgroundColor: 'var(--color-earth)' }}
        >
          + Nueva noticia
        </Link>
      </div>

      {loading && <p className="font-body text-stone">Cargando…</p>}
      {error && <p className="font-body text-red-600">No se pudieron cargar las noticias.</p>}

      {!loading && !error && (
        <div className="bg-white rounded-2xl border border-stone-light overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-stone-light/50">
              <tr className="text-xs uppercase tracking-wider text-stone font-body">
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {noticias.map((n) => (
                <tr key={n.id} className="border-t border-stone-light font-body text-sm">
                  <td className="px-4 py-3 font-semibold text-stone-dark">{n.titulo}</td>
                  <td className="px-4 py-3 text-stone">{n.categoria}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${n.estado === 'publicado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {n.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone">{formatFecha(n.published_at || n.created_at)}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link to={`/admin/noticias/${n.id}/editar`} className="font-semibold mr-4" style={{ color: 'var(--color-earth)' }}>
                      Editar
                    </Link>
                    <button onClick={() => borrar(n.id)} className="font-semibold text-red-600">Borrar</button>
                  </td>
                </tr>
              ))}
              {noticias.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-stone">Todavía no hay noticias.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
