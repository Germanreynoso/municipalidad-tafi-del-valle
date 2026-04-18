import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mountain, Users, Map, SunSnow, Landmark } from 'lucide-react';
import historiaHero from '../assets/historia-hero.png';

export default function Historia() {
  const { t } = useTranslation(['municipality', 'common']);

  return (
    <div className="bg-white-warm min-h-screen">
      {/* Hero Section */}
      <div className="relative py-32 px-4 overflow-hidden bg-stone-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src={historiaHero} 
            alt="Tafí del Valle" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-dark via-stone-dark/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70 font-body">
            <Link to="/" className="hover:text-white transition-colors">{t('common:nav.home')}</Link>
            {' / '} {t('municipality:history.breadcrumb')}
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-tight font-heading">
            {t('municipality:history.title')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-body leading-relaxed">
            {t('municipality:history.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Text Content */}
          <div className="lg:col-span-8 space-y-12">
            <section className="prose prose-lg max-w-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center text-primary">
                  <Mountain size={28} />
                </div>
                <h2 className="text-3xl font-black text-stone-dark font-heading m-0">
                  {t('municipality:history.nameOrigin.title')}
                </h2>
              </div>
              <p 
                className="text-lg text-stone font-body leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('municipality:history.nameOrigin.content') }}
              />
            </section>

            <section className="prose prose-lg max-w-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-earth/10 flex items-center justify-center text-earth">
                  <Users size={28} />
                </div>
                <h2 className="text-3xl font-black text-stone-dark font-heading m-0">
                  {t('municipality:history.cultures.title')}
                </h2>
              </div>
              <p 
                className="text-lg text-stone font-body leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('municipality:history.cultures.content') }}
              />
            </section>

            <section className="prose prose-lg max-w-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-stone-light flex items-center justify-center text-stone-dark">
                  <Landmark size={28} />
                </div>
                <h2 className="text-3xl font-black text-stone-dark font-heading m-0">
                  {t('municipality:history.archaeology.title')}
                </h2>
              </div>
              <div className="space-y-6">
                <p 
                  className="text-lg text-stone font-body leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t('municipality:history.archaeology.content') }}
                />
                <div className="bg-stone-light/50 p-6 rounded-2xl border-l-4 border-stone">
                  <p className="text-sm font-bold uppercase tracking-widest text-stone-dark mb-2">
                    {t('municipality:history.archaeology.yacimientosTitle')}
                  </p>
                  <p 
                    className="text-stone font-body"
                    dangerouslySetInnerHTML={{ __html: t('municipality:history.archaeology.yacimientosContent') }}
                  />
                </div>
                <p 
                  className="text-lg text-stone font-body leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t('municipality:history.archaeology.museum') }}
                />
              </div>
            </section>

            <section className="prose prose-lg max-w-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sky/10 flex items-center justify-center text-sky">
                  <Map size={28} />
                </div>
                <h2 className="text-3xl font-black text-stone-dark font-heading m-0">
                  {t('municipality:history.colonial.title')}
                </h2>
              </div>
              <div className="space-y-6">
                <p 
                  className="text-lg text-stone font-body leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t('municipality:history.colonial.p1') }}
                />
                <p 
                  className="text-lg text-stone font-body leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t('municipality:history.colonial.p2') }}
                />
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="bg-white rounded-3xl p-8 shadow-card border border-stone-light">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                  <SunSnow size={20} />
                </div>
                <h3 className="text-xl font-black text-stone-dark font-heading">
                  {t('municipality:history.sidebar.title')}
                </h3>
              </div>

              <div className="space-y-6">
                <div className="pb-6 border-b border-stone-light">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone mb-1">
                    {t('municipality:history.sidebar.surface')}
                  </p>
                  <p className="text-2xl font-black text-primary font-heading">360 Km²</p>
                </div>

                <div className="pb-6 border-b border-stone-light">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone mb-1">
                    {t('municipality:history.sidebar.climate')}
                  </p>
                  <p className="text-lg font-semibold text-stone-dark font-body">
                    {t('municipality:history.sidebar.climateDesc')}
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone mb-1">
                    {t('municipality:history.sidebar.temps')}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary-light p-4 rounded-2xl">
                      <p className="text-[10px] font-bold uppercase text-primary mb-1">
                        {t('municipality:history.sidebar.summer')}
                      </p>
                      <p className="text-xl font-black text-primary font-heading">31°C</p>
                    </div>
                    <div className="bg-sky/5 p-4 rounded-2xl">
                      <p className="text-[10px] font-bold uppercase text-sky mb-1">
                        {t('municipality:history.sidebar.winter')}
                      </p>
                      <p className="text-xl font-black text-sky font-heading">4°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
