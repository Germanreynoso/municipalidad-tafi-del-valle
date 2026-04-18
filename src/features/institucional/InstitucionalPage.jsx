import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { noticias, documentos } from './data/noticias.js';
import NoticiaCard from './components/NoticiaCard.jsx';
import DocumentoItem from './components/DocumentoItem.jsx';

export default function InstitucionalPage() {
  const { t } = useTranslation(['municipality', 'common']);

  return (
    <div>
      {/* Hero */}
      <div
        className="relative py-24 px-4"
        style={{ background: 'linear-gradient(135deg, var(--color-earth) 0%, #6B4E2E 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70 font-body">
            <Link to="/" className="hover:text-white transition-colors">{t('common:nav.home')}</Link>
            {' / '}{t('municipality:institutional.breadcrumb')}
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight font-heading">
            {t('municipality:institutional.title')}
          </h1>
          <p className="text-lg text-white/80 max-w-xl font-body">
            {t('municipality:institutional.subtitle')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black mb-8 text-stone-dark font-heading">
              {t('municipality:institutional.newsTitle')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {noticias.map((n) => <NoticiaCard key={n.id} {...n} />)}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black mb-8 text-stone-dark font-heading">
              {t('municipality:institutional.documentsTitle')}
            </h2>
            <div className="space-y-3">
              {documentos.map((d) => <DocumentoItem key={d.id} {...d} />)}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-4 text-center" style={{ backgroundColor: '#EDE8E3' }}>
        <h3 className="text-2xl font-black mb-3 font-heading" style={{ color: 'var(--color-earth)' }}>
          {t('municipality:institutional.openGov.title')}
        </h3>
        <p className="text-sm mb-6 text-stone font-body">
          {t('municipality:institutional.openGov.subtitle')}
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 font-body"
          style={{ backgroundColor: 'var(--color-earth)' }}
        >
          {t('municipality:institutional.openGov.cta')}
        </a>
      </div>
    </div>
  );
}
