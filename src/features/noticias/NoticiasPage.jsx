import { Link } from 'react-router-dom';
import { useNoticias } from './hooks/useNoticias.js';
import NoticiaCard from './components/NoticiaCard.jsx';

export default function NoticiasPage() {
  const { noticias, loading, error } = useNoticias({ modo: 'publicas' });

  return (
    <div>
      <div
        className="relative py-24 px-4"
        style={{ background: 'linear-gradient(135deg, var(--color-earth) 0%, #6B4E2E 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70 font-body">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            {' / '}Noticias
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight font-heading">
            Noticias
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading && <p className="text-stone font-body">Cargando noticias…</p>}
        {error && <p className="text-red-600 font-body">No se pudieron cargar las noticias.</p>}
        {!loading && !error && noticias.length === 0 && (
          <p className="text-stone font-body">Todavía no hay noticias publicadas.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((n) => <NoticiaCard key={n.id} noticia={n} />)}
        </div>
      </div>
    </div>
  );
}
