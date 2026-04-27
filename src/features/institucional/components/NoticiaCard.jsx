import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatFecha } from '../../../utils/formatFecha.js';

export default function NoticiaCard({ id, fecha, image }) {
  const { t } = useTranslation('municipality');
  
  const titulo = t(`institutional.news.${id}.title`);
  const categoria = t(`institutional.news.${id}.category`);
  const extracto = t(`institutional.news.${id}.excerpt`);

  return (
    <article
      className="group overflow-hidden rounded-2xl border border-stone-light bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div className="overflow-hidden h-48">
        <img
          src={image}
          alt={titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold font-body"
            style={{ backgroundColor: '#EDE8E3', color: 'var(--color-earth)' }}
          >
            {categoria}
          </span>
          <span className="text-xs text-stone font-body">{formatFecha(fecha)}</span>
        </div>
        <h3 className="font-bold text-base mb-2 line-clamp-2 leading-snug text-stone-dark font-heading">{titulo}</h3>
        <p className="text-sm mb-4 line-clamp-3 text-stone font-body">{extracto}</p>
        <div
          className="flex items-center gap-1 text-sm font-semibold font-body transition-colors duration-200"
          style={{ color: 'var(--color-earth)' }}
        >
          {t('common:buttons.readMore', { defaultValue: 'Leer más' })} <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
