import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { actividades, categoriasActividades } from './data/cosasHacer.js';
import { Search, Clock, Activity, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '../../components/common/OptimizedImage';

// Custom Instagram Icon to avoid library version issues
const InstagramIcon = ({ size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function CosasHacerPage() {
  const { t } = useTranslation('tourism');
  const [filtro, setFiltro] = useState('todos');
  const [search, setSearch] = useState('');

  const filtradas = useMemo(() => {
    return actividades.filter(a => {
      const matchFiltro = filtro === 'todos' || a.categoria === filtro;
      const translatedName = t(`activities.places.${a.id}.nombre`, { defaultValue: '' });
      const translatedDesc = t(`activities.places.${a.id}.descripcion`, { defaultValue: '' });
      const matchSearch = translatedName.toLowerCase().includes(search.toLowerCase()) || 
                          translatedDesc.toLowerCase().includes(search.toLowerCase());
      return matchFiltro && matchSearch;
    });
  }, [filtro, search, t]);

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Header / Hero */}
      <div 
        className="relative pt-32 pb-20 px-4 text-center"
        style={{ background: 'linear-gradient(rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0))' }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-emerald-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 font-body">
              {t('activities.labels.guide')}
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-stone-900 mb-6 font-heading leading-tight">
              {t('activities.title')} <br />
              <span className="text-emerald-500">{t('activities.subtitle')}</span>
            </h1>
            <p className="text-stone-500 max-w-xl mx-auto mb-12 font-body">
              {t('activities.description')}
            </p>
          </motion.div>

          {/* Search Bar Container */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-stone-400">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder={t('activities.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border-none shadow-xl shadow-emerald-900/5 focus:ring-2 focus:ring-emerald-500 transition-all font-body text-stone-dark"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categoriasActividades.map((cat) => (
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
              {t(`activities.categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtradas.map((act) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={act.id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-300 group flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <OptimizedImage 
                    src={act.image} 
                    alt={t(`activities.places.${act.id}.nombre`)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    width={400}
                    height={256}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm border border-stone-100">
                      {t(`activities.categories.${act.categoria}`)}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-stone-400 font-body uppercase tracking-[0.15em]">
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <Clock size={12} className="text-emerald-500" />
                      {t(`activities.places.${act.id}.duracion`)}
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <Activity size={12} className="text-emerald-500" />
                      {t(`activities.places.${act.id}.dificultad`)}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-stone-800 font-heading mb-3 group-hover:text-emerald-600 transition-colors leading-tight">
                    {t(`activities.places.${act.id}.nombre`)}
                  </h3>
                  
                  <p className="text-stone-500 font-body leading-relaxed mb-8 flex-grow">
                    {t(`activities.places.${act.id}.descripcion`)}
                  </p>

                  <div className="mt-auto">
                    {act.instagram ? (
                      <a 
                        href={act.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-4 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white hover:opacity-90 transition-all duration-300 shadow-lg shadow-pink-500/20 font-bold text-sm"
                      >
                        <InstagramIcon size={18} />
                        {t('activities.exploreInstagram')}
                      </a>
                    ) : (
                      <button className="w-full py-4 flex items-center justify-center gap-3 rounded-2xl bg-stone-900 text-white hover:bg-stone-800 transition-all duration-300 font-bold text-sm">
                        {t('activities.viewInfo')} <ArrowRight size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filtradas.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-stone-300" />
            </div>
            <h4 className="text-xl font-bold text-stone-800 mb-2 font-heading">{t('activities.noResults.title')}</h4>
            <p className="text-stone-500 font-body">{t('activities.noResults.description')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
