import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useNoticia } from './hooks/useNoticia.js';
import { formatFecha } from '../../utils/formatFecha.js';

export default function NoticiaDetallePage() {
  const { slug } = useParams();
  const { noticia, loading, error } = useNoticia(slug);

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-20 text-stone font-body">Cargando…</div>;
  if (error || !noticia) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-stone font-body mb-4">No se encontró la noticia.</p>
        <Link to="/noticias" className="font-semibold" style={{ color: 'var(--color-earth)' }}>
          ← Volver a noticias
        </Link>
      </div>
    );
  }

  const fecha = noticia.published_at || noticia.created_at;
  const html = DOMPurify.sanitize(noticia.contenido || '');

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link to="/noticias" className="text-sm font-semibold font-body" style={{ color: 'var(--color-earth)' }}>
        ← Noticias
      </Link>
      <div className="flex items-center gap-2 mt-6 mb-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold font-body"
          style={{ backgroundColor: '#EDE8E3', color: 'var(--color-earth)' }}
        >
          {noticia.categoria}
        </span>
        <span className="text-xs text-stone font-body">{formatFecha(fecha)}</span>
      </div>
      <h1 className="text-4xl font-black text-stone-dark mb-6 font-heading leading-tight">{noticia.titulo}</h1>
      {noticia.imagen_url && (
        <img src={noticia.imagen_url} alt={noticia.titulo} className="w-full rounded-2xl mb-8 object-cover" />
      )}
      <div
        className="prose prose-stone max-w-none font-body text-stone-dark"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
