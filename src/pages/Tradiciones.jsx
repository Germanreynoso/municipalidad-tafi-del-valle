import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Music, Calendar, Star, Utensils, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import fiestaImg from '../assets/fiesta-tradicion.png';
const quesoImg = "/assets/eventos/evento-17.jpeg";

const YoutubeIcon = ({ size = 16, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
  >
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.002 3.002 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
import GastronomyCarousel from '../components/GastronomyCarousel';
import EventsCarousel from '../components/EventsCarousel';
import CraftsCarousel from '../components/CraftsCarousel';
import CalendarioEventos from '../features/turismo/components/CalendarioEventos';

export default function Tradiciones() {
  const { t } = useTranslation(['municipality', 'common']);
  const [activeVideos, setActiveVideos] = useState({});

  return (
    <div className="bg-white-warm min-h-screen">
      
      {/* Hero Section */}
      <div className="relative py-24 px-4 overflow-hidden bg-earth">
        <div className="absolute inset-0 z-0">
          <img 
            src={fiestaImg} 
            alt={t('municipality:traditions.title')} 
            className="w-full h-full object-cover opacity-30 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-earth via-earth/60 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/80 font-body"> 
            {t('municipality:traditions.breadcrumb')}
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 font-heading">
            {t('municipality:traditions.title')}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-body leading-relaxed">
            {t('municipality:traditions.subtitle')}
          </p>
        </div>
      </div>

      {/* Fiesta Nacional del Queso Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-earth/10 rounded-[3rem] blur-2xl group-hover:bg-earth/20 transition-all duration-500"></div>
            <img 
              src={quesoImg} 
              alt={t('municipality:traditions.cheeseFestival.title')} 
              className="relative rounded-[2.5rem] shadow-2xl z-10 w-full object-cover aspect-[4/3] transform group-hover:-translate-y-2 transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 border border-stone-light hidden md:block group-hover:scale-105 transition-transform">
              <Star className="text-yellow-500 fill-yellow-500 mb-2" size={32} />
              <p className="text-[10px] font-black uppercase text-stone tracking-widest leading-none">
                {t('municipality:traditions.cheeseFestival.star.label')}
              </p>
              <p className="text-sm font-bold text-earth">
                {t('municipality:traditions.cheeseFestival.star.value')}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-earth/10 text-earth text-xs font-bold uppercase tracking-widest">
              <Calendar size={14} /> {t('municipality:traditions.cheeseFestival.badge')}
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-stone-dark font-heading leading-tight italic">
              {t('municipality:traditions.cheeseFestival.title')}
            </h2>
            <p className="text-lg text-stone font-body leading-relaxed">
              {t('municipality:traditions.cheeseFestival.description')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-2xl border-l-4 border-earth shadow-sm">
                <p className="text-xs font-black text-stone mb-1 uppercase">
                  {t('municipality:traditions.cheeseFestival.skills.title')}
                </p>
                <p className="text-sm text-stone-dark font-body">
                  {t('municipality:traditions.cheeseFestival.skills.desc')}
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl border-l-4 border-earth shadow-sm">
                <p className="text-xs font-black text-stone mb-1 uppercase">
                  {t('municipality:traditions.cheeseFestival.sabor.title')}
                </p>
                <p className="text-sm text-stone-dark font-body">
                  {t('municipality:traditions.cheeseFestival.sabor.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Streams Sub-Section */}
        <div className="mt-20 pt-16 border-t border-stone-200/50">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-3xl font-black text-stone-dark font-heading tracking-tight mb-4">
              🎥 {t('municipality:traditions.cheeseFestival.liveStreams.title')}
            </h3>
            <p className="text-lg text-stone font-body leading-relaxed">
              {t('municipality:traditions.cheeseFestival.liveStreams.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['night1', 'night2', 'night3'].map((nightKey, idx) => {
              const videoIds = ['buyh1_3CR6U', 'bDsyhf-SNEA', 'duF4U-Qntmc'];
              const videoId = videoIds[idx];
              const isPlaying = activeVideos[videoId];

              return (
                <motion.div
                  key={videoId}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-stone-200/50 group flex flex-col h-full"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-stone-900 shadow-inner group/video">
                    {isPlaying ? (
                      <iframe
                        className="w-full h-full absolute inset-0"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title={t(`municipality:traditions.cheeseFestival.liveStreams.nights.${nightKey}.title`)}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                          alt={t(`municipality:traditions.cheeseFestival.liveStreams.nights.${nightKey}.title`)}
                          className="w-full h-full object-cover transform scale-102 group-hover/video:scale-108 transition-transform duration-700 opacity-90 group-hover/video:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover/video:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                          <button
                            onClick={() => setActiveVideos(prev => ({ ...prev, [videoId]: true }))}
                            className="w-16 h-16 rounded-full text-white flex items-center justify-center shadow-lg transform group-hover/video:scale-110 hover:scale-115 transition-all duration-300 cursor-pointer z-20"
                            aria-label="Reproducir video"
                            style={{ backgroundColor: 'var(--color-earth)' }}
                          >
                            <Play size={24} className="fill-white translate-x-0.5" />
                          </button>
                        </div>
                        <div className="absolute top-4 left-4 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-10 flex items-center gap-1.5 animate-pulse" style={{ backgroundColor: 'var(--color-earth)' }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                          {t('municipality:traditions.cheeseFestival.badge')} 2026
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                    <div>
                      <h4 className="text-lg font-black text-stone-dark font-heading tracking-tight mb-2 group-hover:text-earth transition-colors">
                        {t(`municipality:traditions.cheeseFestival.liveStreams.nights.${nightKey}.title`)}
                      </h4>
                      <p className="text-sm text-stone font-body leading-relaxed mb-6">
                        {t(`municipality:traditions.cheeseFestival.liveStreams.nights.${nightKey}.desc`)}
                      </p>
                    </div>
                    
                    <a
                      href={`https://www.youtube.com/live/${videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-stone-300 hover:border-earth bg-white hover:bg-earth/5 text-xs font-bold text-stone-dark hover:text-earth transition-all duration-300 uppercase tracking-widest"
                    >
                      <YoutubeIcon size={16} className="text-red-600" />
                      {t('municipality:traditions.cheeseFestival.liveStreams.watchOnYoutube')}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Artesanías Section */}
      <section className="py-24 px-4 bg-stone-50 overflow-hidden border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <div className="inline-block px-4 py-1 rounded-full bg-stone-200 text-stone-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                {t('municipality:traditions.crafts.badge')}
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-stone-dark font-heading leading-[0.9] mb-8">
                {t('municipality:traditions.crafts.title')} <br />
                <span className="text-earth italic">{t('municipality:traditions.crafts.subtitle')}</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-stone font-body leading-relaxed">
                  {t('municipality:traditions.crafts.description')}
                </p>
                <div className="h-0.5 w-20 bg-earth/20"></div>
                <p className="text-sm text-stone/60 font-body uppercase tracking-widest font-bold">
                  {t('municipality:traditions.crafts.footer')}
                </p>
              </div>
            </div>
            <div className="lg:w-2/3 w-full">
              <CraftsCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Música Section */}
      <section className="bg-stone-dark py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[120px] rounded-full translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-8 shadow-inner shadow-black/20">
                <Music size={32} />
              </div>
              <h2 className="text-4xl font-black font-heading mb-6 tracking-tight">
                {t('municipality:traditions.music.title')} <br />
                <span className="text-primary-mid">{t('municipality:traditions.music.subtitle')}</span>
              </h2>
              <p className="text-lg text-white/70 font-body leading-relaxed mb-8">
                {t('municipality:traditions.music.description')}
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-6">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-2xl font-black font-heading text-primary-light">
                  {t('municipality:traditions.music.instruments.cajas.title')}
                </p>
                <p className="text-xs text-white/60 uppercase font-bold tracking-widest mt-1">
                  {t('municipality:traditions.music.instruments.cajas.subtitle')}
                </p>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors translate-y-8">
                <p className="text-2xl font-black font-heading text-primary-light">
                  {t('municipality:traditions.music.instruments.violin.title')}
                </p>
                <p className="text-xs text-white/60 uppercase font-bold tracking-widest mt-1">
                  {t('municipality:traditions.music.instruments.violin.subtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Festividades */}
      <section className="py-24 px-4 bg-white-warm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-black font-heading text-stone-dark mb-6 tracking-tight">
              {t('municipality:traditions.festivities.title')}
            </h2>
          </div>
          <EventsCarousel />
        </div>
      </section>

      {/* NUEVO: Calendario Detallado de Fiestas */}
      <div className="max-w-7xl mx-auto mb-24 px-4">
        <CalendarioEventos />
      </div>

      {/* Gastronomía */}
      <section className="py-24 px-4 bg-white-warm text-center mb-20 border-t border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <Utensils className="mx-auto mb-6 text-earth/40" size={48} />
            <h2 className="text-4xl sm:text-6xl font-black font-heading text-stone-dark mb-6 tracking-tight italic">
              {t('municipality:traditions.gastronomy.title')}
            </h2>
            <p className="text-xl text-stone font-body max-w-2xl mx-auto leading-relaxed">
              {t('municipality:traditions.gastronomy.description')}
            </p>
          </div>

          <GastronomyCarousel />
        </div>
      </section>
    </div>
  );
}
