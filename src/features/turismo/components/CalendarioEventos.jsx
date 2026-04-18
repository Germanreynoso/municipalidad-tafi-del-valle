import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Music, Users, Star, Info } from 'lucide-react';
import { eventosCalendario } from '../data/eventos';

const tipoIcons = {
  'dance': <Music className="text-pink-500" size={16} />,
  'festival': <Star className="text-yellow-500" size={16} />,
  'tradition': <Users className="text-earth-500" size={16} />,
  'folclore': <Music className="text-orange-500" size={16} />,
  'nationalEvent': <Star className="text-yellow-600 font-bold" size={20} />,
  'culture': <Users className="text-stone-500" size={16} />,
  'religiosity': <Star className="text-sky-500" size={16} />,
};

export default function CalendarioEventos() {
  const { t } = useTranslation(['tourism', 'common']);

  return (
    <section className="py-20 bg-stone-50 rounded-[3rem] px-4 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sky-600 font-bold tracking-widest uppercase text-xs mb-3 block">
            {t('tourism:calendar.subtitle')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-stone-900 mb-6 font-heading">
            {t('tourism:calendar.title')}
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto font-body">
            {t('tourism:calendar.description')}
          </p>
        </div>

        <div className="space-y-12">
          {eventosCalendario.map((periodo, idx) => (
            <motion.div
              key={periodo.mesId}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Month Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-200">
                  <Calendar size={24} />
                </div>
                <h3 className="text-2xl font-black text-stone-800 uppercase tracking-tight font-heading">
                  {t(`common:months.${periodo.mesId}`)}
                </h3>
                <div className="h-px bg-stone-200 flex-grow hidden sm:block"></div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pl-0 sm:pl-16">
                {periodo.eventos.map((evento) => (
                  <motion.div
                    key={evento.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-3xl border transition-all duration-300 ${
                      evento.destacado 
                        ? 'bg-amber-50 border-amber-200 shadow-xl shadow-amber-100 ring-2 ring-amber-400/20' 
                        : 'bg-white border-stone-100 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-[10px] font-bold text-stone-500 uppercase">
                        {tipoIcons[evento.tipoId] || <Info size={14} />} {t(`common:eventTypes.${evento.tipoId}`)}
                      </span>
                      {evento.destacado && (
                        <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-black rounded-full uppercase italic tracking-tighter shadow-sm">
                          {t('tourism:calendar.featuredLabel')}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-lg font-bold text-stone-900 mb-3 font-heading leading-snug">
                      {t(`tourism:calendar.festivities.${evento.id}.nombre`)}
                    </h4>
                    
                    <p className="text-sm text-stone-600 leading-relaxed font-body">
                      {t(`tourism:calendar.festivities.${evento.id}.descripcion`)}
                    </p>

                    {evento.destacado && (
                      <div className="mt-6 pt-4 border-t border-amber-200 flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-700">
                          {t('tourism:calendar.missIt')}
                        </span>
                        <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full bg-amber-400 border-2 border-amber-50" />
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
