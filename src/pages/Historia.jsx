import { Link } from 'react-router-dom';
import { Mountain, Users, Map, SunSnow, Landmark } from 'lucide-react';
import historiaHero from '../assets/historia-hero.png';

export default function Historia() {
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
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            {' / '} Municipio
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-tight font-heading">
            Historia
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-body leading-relaxed">
            Descubre los orígenes, las culturas y la evolución del corazón de los valles calchaquíes.
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
                <h2 className="text-3xl font-black text-stone-dark font-heading m-0">Origen del Nombre</h2>
              </div>
              <p className="text-lg text-stone font-body leading-relaxed">
                El nombre <strong>Tafí</strong> deriva del vocablo diaguita <strong>TAKTILLAKTA</strong>, 
                que quiere decir <span className="text-primary font-semibold">"pueblo de entrada espléndida"</span>. 
                Esta villa está enclavada entre las montañas, en la región central del oeste de Tucumán 
                y es una combinación perfecta de montañas y ríos que la convierten en uno de los destinos 
                más elegidos por el turismo nacional e internacional.
              </p>
            </section>

            <section className="prose prose-lg max-w-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-earth/10 flex items-center justify-center text-earth">
                  <Users size={28} />
                </div>
                <h2 className="text-3xl font-black text-stone-dark font-heading m-0">Culturas Originarias</h2>
              </div>
              <p className="text-lg text-stone font-body leading-relaxed">
                Todo el Valle de Tafí fue sede de importantes culturas originarias, lo prueban los numerosos testimonios hallados. 
                Se destacan los <strong>menhires</strong>, monolitos de piedra, obra de una antiquísima civilización 
                y con significados aún no precisados.
              </p>
            </section>

            <section className="prose prose-lg max-w-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-stone-light flex items-center justify-center text-stone-dark">
                  <Landmark size={28} />
                </div>
                <h2 className="text-3xl font-black text-stone-dark font-heading m-0">Arqueología</h2>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-stone font-body leading-relaxed">
                  En todo el valle se conservan vestigios de la cultura que lo habitó, testigo de una rica herencia y del paso del tiempo de habitantes laboriosos y organizados, con una proyección de más de <strong>3000 años de antigüedad</strong>.
                </p>
                <div className="bg-stone-light/50 p-6 rounded-2xl border-l-4 border-stone">
                  <p className="text-sm font-bold uppercase tracking-widest text-stone-dark mb-2">Yacimientos Principales</p>
                  <p className="text-stone font-body">
                    Carapunco, Las Bolsas, Las Carreras, Malvinas, La Costa y <strong>Casas Viejas</strong> (la leyenda lo señala como el primer asentamiento poblacional de la conquista en el norte del país).
                  </p>
                </div>
                <p className="text-lg text-stone font-body leading-relaxed">
                  En el <strong>Museo Jesuítico de La Banda</strong> se conserva una colección de gran valor: pucos, urnas funerarias, cántaros y utensilios que narran la vida cotidiana de siglos pasados.
                </p>
              </div>
            </section>

            <section className="prose prose-lg max-w-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sky/10 flex items-center justify-center text-sky">
                  <Map size={28} />
                </div>
                <h2 className="text-3xl font-black text-stone-dark font-heading m-0">Periodo Colonial y Modernidad</h2>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-stone font-body leading-relaxed">
                  Después de la llegada de los españoles, las tierras donde está asentada la villa pertenecieron a la 
                  <strong> Compañía de Jesús</strong>, desde 1718 hasta su expulsión, ordenada por la corona española en 1767.
                </p>
                <p className="text-lg text-stone font-body leading-relaxed">
                  A mediados del siglo pasado, en el año 1943, con motivo de la apertura de la <strong>Ruta Provincial 307</strong>, 
                  comenzó a poblarse con casas de veraneo y se consolidó como la principal villa veraniega de la provincia.
                </p>
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
                <h3 className="text-xl font-black text-stone-dark font-heading">Información General</h3>
              </div>

              <div className="space-y-6">
                <div className="pb-6 border-b border-stone-light">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone mb-1">Superficie</p>
                  <p className="text-2xl font-black text-primary font-heading">360 Km²</p>
                </div>

                <div className="pb-6 border-b border-stone-light">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone mb-1">Clima</p>
                  <p className="text-lg font-semibold text-stone-dark font-body">
                    Semiárido templado a frío con nevadas invernales.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone mb-1">Temperaturas Máximas</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary-light p-4 rounded-2xl">
                      <p className="text-[10px] font-bold uppercase text-primary mb-1">Verano</p>
                      <p className="text-xl font-black text-primary font-heading">31°C</p>
                    </div>
                    <div className="bg-sky/5 p-4 rounded-2xl">
                      <p className="text-[10px] font-bold uppercase text-sky mb-1">Invierno</p>
                      <p className="text-xl font-black text-sky font-heading">4°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA or Extra Card */}
            <div className="mt-8 bg-earth rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
                <Mountain size={120} />
              </div>
              <h4 className="text-lg font-black font-heading mb-2 relative z-10">¡Visítanos!</h4>
              <p className="text-sm text-white/80 font-body mb-6 relative z-10">Tafí del Valle te espera con sus paisajes y cultura única.</p>
              <Link to="/turismo" className="inline-block px-6 py-3 rounded-xl bg-white text-earth font-bold text-sm hover:bg-stone-light transition-colors relative z-10">
                Guía de Turismo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
