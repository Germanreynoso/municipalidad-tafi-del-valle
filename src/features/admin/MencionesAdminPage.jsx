import { useState } from 'react';
import { useMenciones } from '../menciones/hooks/useMenciones.js';
import { crearMencion, eliminarMencion, validarMencion } from '../menciones/api/menciones.js';
import { formatFecha } from '../../utils/formatFecha.js';

const VACIA = { titulo: '', medio: '', url: '', imagen_url: '', descripcion: '', publicado_el: '' };

const inputClass =
  'w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white font-body placeholder:text-stone-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

export default function MencionesAdminPage() {
  const { menciones, loading, error, recargar } = useMenciones();
  const [form, setForm] = useState(VACIA);
  const [guardando, setGuardando] = useState(false);
  const [formError, setFormError] = useState(null);

  const set = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));

  const agregar = async (e) => {
    e.preventDefault();
    setFormError(null);
    const check = validarMencion(form);
    if (!check.ok) { setFormError(check.error); return; }
    setGuardando(true);
    try {
      await crearMencion(form);
      setForm(VACIA);
      recargar();
    } catch {
      setFormError('No se pudo guardar la mención.');
    } finally {
      setGuardando(false);
    }
  };

  const borrar = async (id) => {
    if (!window.confirm('¿Eliminar esta mención de prensa?')) return;
    try {
      await eliminarMencion(id);
      recargar();
    } catch {
      alert('No se pudo eliminar la mención.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black text-stone-dark font-heading mb-2">Tafí en los medios</h1>
      <p className="font-body text-stone mb-8 text-sm">
        Notas sobre Tafí publicadas en otros medios. Las 3 más recientes aparecen en la portada del sitio.
      </p>

      <form
        onSubmit={agregar}
        className="bg-white rounded-2xl border border-stone-200 p-6 mb-8 max-w-2xl space-y-4"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <div>
          <label className="block text-sm font-semibold mb-1.5 font-body text-stone-dark">Link de la nota</label>
          <input value={form.url} onChange={set('url')} placeholder="https://ejemplo.com/la-nota/" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5 font-body text-stone-dark">Título</label>
          <input value={form.titulo} onChange={set('titulo')} placeholder="Título de la nota" className={inputClass} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5 font-body text-stone-dark">Medio</label>
            <input value={form.medio} onChange={set('medio')} placeholder="Ej: Turismo 180 Grados" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5 font-body text-stone-dark">
              Fecha de publicación (opcional)
            </label>
            <input type="date" value={form.publicado_el} onChange={set('publicado_el')} className={inputClass} />
            <p className="text-xs text-stone mt-1 font-body">La fecha en que salió la nota. Si la dejás vacía, se usa la de hoy.</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5 font-body text-stone-dark">
            Imagen (opcional)
          </label>
          <input value={form.imagen_url} onChange={set('imagen_url')} placeholder="https://... (link a la imagen de la nota)" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5 font-body text-stone-dark">Descripción (opcional)</label>
          <textarea value={form.descripcion} onChange={set('descripcion')} rows={2} placeholder="Resumen corto que se muestra en la tarjeta" className={inputClass} />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={guardando}
            className="px-5 py-2.5 rounded-xl font-bold text-white font-body disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-earth)' }}
          >
            {guardando ? 'Guardando…' : '+ Agregar mención'}
          </button>
          {formError && <p className="text-sm text-red-600 font-body">{formError}</p>}
        </div>
      </form>

      {loading && <p className="font-body text-stone">Cargando…</p>}
      {error && <p className="font-body text-red-600">No se pudieron cargar las menciones.</p>}

      {!loading && !error && (
        <div className="bg-white rounded-2xl border border-stone-light overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-stone-light/50">
              <tr className="text-xs uppercase tracking-wider text-stone font-body">
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Medio</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {menciones.map((m) => (
                <tr key={m.id} className="border-t border-stone-light font-body text-sm">
                  <td className="px-4 py-3">
                    <a href={m.url} target="_blank" rel="noopener noreferrer" className="font-semibold" style={{ color: 'var(--color-earth)' }}>
                      {m.titulo}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-stone">{m.medio}</td>
                  <td className="px-4 py-3 text-stone whitespace-nowrap">{formatFecha(m.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => borrar(m.id)} className="font-semibold text-red-600">Borrar</button>
                  </td>
                </tr>
              ))}
              {menciones.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-stone">Todavía no hay menciones cargadas.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
