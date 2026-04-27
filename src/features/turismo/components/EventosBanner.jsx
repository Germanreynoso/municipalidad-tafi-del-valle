import { useTranslation } from 'react-i18next';
import { Calendar, ArrowRight } from 'lucide-react';

export default function EventosBanner({ evento }) {
  const { t } = useTranslation(['tourism', 'common']);
  const { id, image, url } = evento;

  return (
    <div className="relative overflow-hidden rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-8 py-10" style={{ minHeight: '200px' }}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(37,99,168,0.85) 0%, rgba(37,99,168,0.5) 100%)' }}
      />
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Calendar size={16} className="text-white/80" />
          <span className="text-sm font-semibold text-white/80 font-body">
            {t(`tourism:eventos.${id}.fecha`)}
          </span>
        </div>
        <h3 className="text-3xl font-black text-white mb-2 font-heading">
          {t(`tourism:eventos.${id}.nombre`)}
        </h3>
        <p className="text-white/80 text-sm max-w-md font-body">
          {t(`tourism:eventos.${id}.descripcion`)}
        </p>
      </div>
      <a
        href={url || '#'}
        className="relative flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 whitespace-nowrap bg-white font-body"
        style={{ color: 'var(--color-sky)' }}
      >
        {t('common:buttons.readMore', { defaultValue: 'Ver programa' })} <ArrowRight size={16} />
      </a>
    </div>
  );
}
