import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { crear, actualizar, getById } from '../noticias/api/noticias.js';
import { CATEGORIAS } from '../noticias/data/categorias.js';
import EditorWYSIWYG from './components/EditorWYSIWYG.jsx';
import ImageUploader from './components/ImageUploader.jsx';

const VACIA = {
  titulo: '', extracto: '', contenido: '',
  categoria: CATEGORIAS[0], imagen_url: '', estado: 'borrador',
};

export default function NoticiaEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form, setForm] = useState(VACIA);
  const [tituloOriginal, setTituloOriginal] = useState('');
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!editando) return;
    getById(id)
      .then((n) => {
        setForm({
          titulo: n.titulo || '', extracto: n.extracto || '', contenido: n.contenido || '',
          categoria: n.categoria, imagen_url: n.imagen_url || '', estado: n.estado,
        });
        setTituloOriginal(n.titulo || '');
      })
      .catch(() => setError('No se pudo cargar la noticia.'))
      .finally(() => setCargando(false));
  }, [id, editando]);

  const set = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));

  const guardar = async (estado) => {
    setError(null);
    if (!form.titulo.trim()) { setError('El título es obligatorio.'); return; }
    setGuardando(true);
    try {
      const payload = { ...form, estado };
      if (editando) {
        await actualizar(id, payload, { tituloAnterior: tituloOriginal });
      } else {
        await crear(payload);
      }
      navigate('/admin');
    } catch {
      setError('No se pudo guardar la noticia.');
      setGuardando(false);
    }
  };

  if (cargando) return <p className="font-body text-stone">Cargando…</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-black text-stone-dark font-heading mb-8">
        {editando ? 'Editar noticia' : 'Nueva noticia'}
      </h1>
      {error && <p className="text-red-600 font-body mb-4">{error}</p>}

      <div
        className="space-y-6 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <div>
          <label className="block text-sm font-semibold mb-1.5 font-body text-stone-dark">Título</label>
          <input
            value={form.titulo}
            onChange={set('titulo')}
            placeholder="Título de la noticia"
            className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white font-body placeholder:text-stone-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5 font-body text-stone-dark">Extracto</label>
          <textarea
            value={form.extracto}
            onChange={set('extracto')}
            rows={2}
            placeholder="Resumen corto que se muestra en la tarjeta del listado"
            className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white font-body placeholder:text-stone-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5 font-body text-stone-dark">Categoría</label>
          <select
            value={form.categoria}
            onChange={set('categoria')}
            className="px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5 font-body text-stone-dark">Imagen</label>
          <ImageUploader value={form.imagen_url} onChange={(url) => setForm((f) => ({ ...f, imagen_url: url }))} />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5 font-body text-stone-dark">Contenido</label>
          <EditorWYSIWYG value={form.contenido} onChange={(html) => setForm((f) => ({ ...f, contenido: html }))} />
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={() => guardar('borrador')} disabled={guardando}
            className="px-5 py-2.5 rounded-xl font-bold font-body border border-stone-light text-stone-dark disabled:opacity-60">
            Guardar borrador
          </button>
          <button onClick={() => guardar('publicado')} disabled={guardando}
            className="px-5 py-2.5 rounded-xl font-bold text-white font-body disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-earth)' }}>
            {guardando ? 'Guardando…' : 'Publicar'}
          </button>
        </div>
      </div>
    </div>
  );
}
