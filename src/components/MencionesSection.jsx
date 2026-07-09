import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Newspaper } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { fadeUp, stagger } from '../styles/motion.js';
import { useMenciones } from '../features/menciones/hooks/useMenciones.js';
import { formatFecha } from '../utils/formatFecha.js';

// publicado_el es date-only (YYYY-MM-DD): se ancla a medianoche local para
// que no se corra un día atrás al formatear en UTC-3.
function fechaMencion(mencion) {
  if (mencion.publicado_el) return formatFecha(`${mencion.publicado_el}T00:00:00`);
  return formatFecha(mencion.created_at);
}

function MencionCard({ mencion, cta }) {
  const [imagenRota, setImagenRota] = useState(false);
  const mostrarImagen = mencion.imagen_url && !imagenRota;

  return (
    <a
      href={mencion.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {mostrarImagen ? (
        <div className="overflow-hidden h-48">
          <img
            src={mencion.imagen_url}
            alt={mencion.titulo}
            loading="lazy"
            onError={() => setImagenRota(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="h-48 flex items-center justify-center bg-primary-light text-primary">
          <Newspaper size={40} />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold font-body"
            style={{ backgroundColor: '#EDE8E3', color: 'var(--color-earth)' }}
          >
            {mencion.medio}
          </span>
          <span className="text-xs text-stone font-body">{fechaMencion(mencion)}</span>
        </div>
        <h3 className="font-bold text-base mb-2 line-clamp-2 leading-snug text-stone-dark font-heading">
          {mencion.titulo}
        </h3>
        {mencion.descripcion && (
          <p className="text-sm mb-4 line-clamp-3 text-stone font-body">{mencion.descripcion}</p>
        )}
        <div
          className="mt-auto flex items-center gap-1.5 text-sm font-semibold font-body"
          style={{ color: 'var(--color-earth)' }}
        >
          {cta} <ExternalLink size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </a>
  );
}

export default function MencionesSection() {
  const { t } = useTranslation('home');
  const { menciones, loading, error } = useMenciones({ limit: 3 });

  // Sin menciones (o con error) la sección no aparece: la Home sigue intacta.
  if (loading || error || menciones.length === 0) return null;

  return (
    <section className="py-24 bg-stone-light overflow-hidden border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-stone font-body">
            {t('media.kicker')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-stone-dark font-heading">
            {t('media.title')}
          </h2>
        </Motion.div>

        <Motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {menciones.map((mencion) => (
            <Motion.div key={mencion.id} variants={fadeUp}>
              <MencionCard mencion={mencion} cta={t('media.cta')} />
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </section>
  );
}
