import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Droplets, Sprout, Footprints, Tractor, ChevronRight } from 'lucide-react';
import campoTafiImg from '../assets/campo-tafi.jpg';
import perfilHeroImg from '../assets/perfil-hero.jpeg';

export default function PerfilValle() {
  const { t } = useTranslation(['municipality', 'common']);

  return (
    <div className="bg-white-warm min-h-screen">
      {/* Hero Section con Imagen de Fondo */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{ 
            backgroundImage: `url(${perfilHeroImg})`,
          }}
        >
          {/* Overlay gradiente para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4 text-primary-light font-body">
            <Link to="/" className="hover:text-white transition-colors">{t('common:nav.home')}</Link>
            {' / '} {t('municipality:profile.breadcrumb')}
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-tight font-heading max-w-2xl">
            {t('municipality:profile.title')}
          </h1>
          <p className="text-xl text-white/90 max-w-xl font-body leading-relaxed">
            {t('municipality:profile.subtitle')}
          </p>
        </div>
      </div>

      {/* Nature Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-stone-dark font-heading">
              {t('municipality:profile.nature.title')}
            </h2>
            
            {/* Hidrografía */}
            <div className="bg-white p-8 rounded-3xl shadow-card border border-stone-light border-l-8 border-l-sky">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sky/10 flex items-center justify-center text-sky">
                  <Droplets size={28} />
                </div>
                <h3 className="text-2xl font-bold text-stone-dark font-heading">
                  {t('municipality:profile.nature.hydrography.title')}
                </h3>
              </div>
              <p 
                className="text-stone font-body leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: t('municipality:profile.nature.hydrography.content') }}
              />
              <div className="flex flex-wrap gap-2">
                {t('municipality:profile.nature.hydrography.rivers', { returnObjects: true }).map(rio => (
                  <span key={rio} className="px-3 py-1 bg-sky-50 text-sky-800 text-xs font-bold rounded-full border border-sky-100 italic">
                    {rio}
                  </span>
                ))}
              </div>
            </div>

            {/* Flora y Fauna */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-light">
                <div className="flex items-center gap-3 mb-4 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Sprout size={20} />
                  </div>
                  <h4 className="font-bold font-heading text-primary">
                    {t('municipality:profile.nature.flora.title')}
                  </h4>
                </div>
                <p className="text-sm text-stone font-body mb-4">
                  {t('municipality:profile.nature.flora.content')}
                </p>
                <ul className="text-xs space-y-2 text-stone-dark font-body">
                  {t('municipality:profile.nature.flora.items', { returnObjects: true }).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-light">
                <div className="flex items-center gap-3 mb-4 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-indigo/10 flex items-center justify-center text-indigo">
                    <Footprints size={20} />
                  </div>
                  <h4 className="font-bold font-heading text-indigo">
                    {t('municipality:profile.nature.fauna.title')}
                  </h4>
                </div>
                <p className="text-sm text-stone font-body mb-4">
                  {t('municipality:profile.nature.fauna.content')}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {t('municipality:profile.nature.fauna.items', { returnObjects: true }).map(animal => (
                    <div key={animal} className="flex items-center justify-between p-2 bg-stone-light/50 rounded-lg text-xs font-bold text-stone-dark">
                      {animal} <ChevronRight size={12} className="text-stone/40" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Imagen de Contrapunto */}
          <div className="relative group overflow-hidden rounded-[2.5rem] shadow-hover border-8 border-white">
            <div className="absolute inset-0 bg-stone-dark/20 group-hover:bg-transparent transition-colors duration-500"></div>
            <img 
              src={campoTafiImg} 
              alt="Campo Tafí" 
              className="w-full h-full object-cover aspect-square md:aspect-auto"
            />
            <div className="absolute bottom-10 left-10 text-white">
              <p className="text-4xl font-black font-heading leading-tight whitespace-pre-line">
                {t('municipality:profile.nature.quote')}
              </p>
            </div>
          </div>
        </div>

        {/* Productive Section */}
        <div className="pt-20 border-t border-stone-light">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-stone-dark font-heading mb-4">
              {t('municipality:profile.productive.title')}
            </h2>
            <p className="text-stone font-body">
              {t('municipality:profile.productive.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Agricultura */}
            <div className="bg-primary-light/30 rounded-[2rem] p-10 border border-primary-light">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                  <Tractor size={30} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-primary font-heading uppercase tracking-tight">
                    {t('municipality:profile.productive.agriculture.title')}
                  </h3>
                  <p className="text-xs font-bold text-primary/60 uppercase tracking-widest">
                    {t('municipality:profile.productive.agriculture.badge')}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/80 p-6 rounded-2xl border-l-4 border-primary">
                  <p className="text-sm font-bold text-stone-dark mb-1">
                    {t('municipality:profile.productive.agriculture.starProduct.label')}
                  </p>
                  <p className="text-xl font-black text-primary font-heading">
                    {t('municipality:profile.productive.agriculture.starProduct.name')}
                  </p>
                  <p className="text-sm text-stone font-body">
                    {t('municipality:profile.productive.agriculture.starProduct.desc')}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold text-stone-dark mb-3">
                    {t('municipality:profile.productive.agriculture.others.label')}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-[10px] uppercase font-bold text-stone mb-1 tracking-tighter">
                        {t('municipality:profile.productive.agriculture.others.horticulture.title')}
                      </p>
                      <p className="text-xs text-stone-dark font-semibold">
                        {t('municipality:profile.productive.agriculture.others.horticulture.items')}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-[10px] uppercase font-bold text-stone mb-1 tracking-tighter">
                        {t('municipality:profile.productive.agriculture.others.fruit.title')}
                      </p>
                      <p className="text-xs text-stone-dark font-semibold">
                        {t('municipality:profile.productive.agriculture.others.fruit.items')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ganadería */}
            <div className="bg-stone-light/50 rounded-[2rem] p-10 border border-stone-light">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-earth text-white flex items-center justify-center shadow-lg">
                  <Footprints size={30} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-earth font-heading uppercase tracking-tight">
                    {t('municipality:profile.productive.livestock.title')}
                  </h3>
                  <p className="text-xs font-bold text-stone mb-1 uppercase tracking-widest">
                    {t('municipality:profile.productive.livestock.badge')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-stone tracking-widest">
                    {t('municipality:profile.productive.livestock.traditional.title')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {t('municipality:profile.productive.livestock.traditional.items', { returnObjects: true }).map(item => (
                      <span key={item} className="px-3 py-1 bg-white border border-stone-light text-stone-dark text-[10px] font-bold rounded-lg">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-stone tracking-widest">
                    {t('municipality:profile.productive.livestock.indigenous.title')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {t('municipality:profile.productive.livestock.indigenous.items', { returnObjects: true }).map(item => (
                      <span key={item} className="px-3 py-1 bg-white border border-stone-light text-stone-dark text-[10px] font-bold rounded-lg">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-earth/10 rounded-2xl border border-earth/20">
                <p className="text-[10px] font-black uppercase text-earth mb-2">
                  {t('municipality:profile.productive.livestock.fact.label')}
                </p>
                <p className="text-sm text-stone font-body italic leading-snug">
                  {t('municipality:profile.productive.livestock.fact.content')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
