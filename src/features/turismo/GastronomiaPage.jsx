import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { gastronomia, categoriasGastronomia } from './data/gastronomia.js';
import { Search, MapPin, Utensils, Star, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GastronomiaPage() {
  const { t } = useTranslation('tourism');
  const [filtro, setFiltro] = useState('todos');
  const [search, setSearch] = useState('');

  const filtrados = useMemo(() => {
    return gastronomia.filter(g => {
      const matchFiltro = filtro === 'todos' || g.categoria === filtro;
      const translatedDesc = t(`gastronomy.places.${g.descripcionId}`, { defaultValue: '' });
      const matchSearch = g.nombre.toLowerCase().includes(search.toLowerCase()) || 
                          translatedDesc.toLowerCase().includes(search.toLowerCase());
      return matchFiltro && matchSearch;
    });
  }, [filtro, search, t]);

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Header / Hero */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ 
            backgroundImage: `url('/assets/gastronomia/comida-12.jpeg')`,
          }}
        />
        {/* Overlay gradiente para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/40 to-transparent z-[5]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <p className="text-orange-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 font-body">
              {t('gastronomy.officialGuide')}
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-heading leading-tight">
              {t('gastronomy.title')} <br />
              <span className="text-orange-500">{t('gastronomy.subtitle')}</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 font-body max-w-lg">
              {t('gastronomy.description')}
            </p>
            
            {/* Search Bar inside Hero for more impact */}
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-stone-400">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder={t('gastronomy.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-xl bg-white/95 backdrop-blur-sm border-none shadow-2xl focus:ring-2 focus:ring-orange-500 transition-all font-body text-stone-dark"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categoriasGastronomia.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold capitalize transition-all duration-200 border border-stone-200 font-body"
              style={{
                backgroundColor: filtro === cat ? 'var(--color-stone-dark)' : 'white',
                color: filtro === cat ? 'white' : 'var(--color-stone-dark)',
                borderColor: filtro === cat ? 'var(--color-stone-dark)' : 'transparent',
                boxShadow: filtro === cat ? '0 10px 15px -5px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {t(`gastronomy.categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 px-2 font-body text-xs text-stone-400 font-bold uppercase tracking-widest">
          <span>{t('gastronomy.results', { count: filtrados.length })}</span>
          <div className="flex items-center gap-2">
            <Utensils size={14} className="text-orange-500" />
            <span className="text-orange-600">{t('gastronomy.officialGuide')}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtrados.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-stone-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-900/5 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 text-[9px] font-black uppercase tracking-wider">
                      {t(`gastronomy.categories.${item.categoria}`)}
                    </span>
                    <Star size={14} className="text-orange-300" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-800 font-heading leading-tight mb-2 group-hover:text-orange-600 transition-colors">
                    {item.nombre}
                  </h3>
                  <p className="text-stone-500 text-sm font-body leading-relaxed">
                    {t(`gastronomy.places.${item.descripcionId}`)}
                  </p>
                </div>

                <div className="mt-auto pt-6">
                  <a 
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 flex items-center justify-center gap-3 rounded-xl bg-stone-900 text-white hover:bg-orange-600 transition-all duration-300 font-bold text-sm shadow-lg shadow-stone-900/10"
                  >
                    <MapPin size={18} />
                    {t('gastronomy.viewOnMaps')}
                    <ExternalLink size={14} className="opacity-50" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filtrados.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-stone-300" />
            </div>
            <h4 className="text-xl font-bold text-stone-800 mb-2 font-heading">{t('gastronomy.noResults.title')}</h4>
            <p className="text-stone-500 font-body">{t('gastronomy.noResults.description')}</p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-stone-900 py-24 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h3 className="text-4xl font-black text-white mb-6 font-heading">{t('gastronomy.footer.title')}</h3>
          <p className="text-white/50 font-body leading-relaxed mb-10">
            {t('gastronomy.footer.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-bold uppercase tracking-widest font-body">
              {t('gastronomy.footer.tag1')}
            </div>
            <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-bold uppercase tracking-widest font-body">
              {t('gastronomy.footer.tag2')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
