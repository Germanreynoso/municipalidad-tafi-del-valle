import { Link } from 'react-router-dom';
import { Droplets, Sprout, Footprints, Tractor, ChevronRight } from 'lucide-react';

export default function PerfilValle() {
  return (
    <div className="bg-white-warm min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--color-earth) 0%, #5d4328 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70 font-body">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            {' / '} Municipio
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight font-heading">
            Perfil del Valle
          </h1>
          <p className="text-lg text-white/80 max-w-xl font-body">
            Naturaleza, hidrografía y el motor productivo que da vida a nuestra región.
          </p>
        </div>
      </div>

      {/* Nature Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-stone-dark font-heading">Entorno Natural</h2>
            
            {/* Hidrografía */}
            <div className="bg-white p-8 rounded-3xl shadow-card border border-stone-light border-l-8 border-l-sky">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky/10 flex items-center justify-center text-sky">
                  <Droplets size={24} />
                </div>
                <h3 className="text-2xl font-bold text-stone-dark font-heading">Hidrografía</h3>
              </div>
              <p className="text-stone font-body leading-relaxed mb-4">
                El corazón hídrico de la región es el <strong>Río Tafí</strong>, que recorre el valle nutriendo sus tierras. Sus principales afluentes, que descienden de las cumbres, son:
              </p>
              <div className="flex flex-wrap gap-2">
                {['El Mollar', 'La Ovejería', 'El Blanquito'].map(rio => (
                  <span key={rio} className="px-3 py-1 bg-sky-50 text-sky-800 text-xs font-bold rounded-full border border-sky-100 italic">
                    {rio}
                  </span>
                ))}
              </div>
            </div>

            {/* Flora y Fauna */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-light">
                <div className="flex items-center gap-3 mb-4 text-primary">
                  <Sprout size={20} />
                  <h4 className="font-bold font-heading">Flora</h4>
                </div>
                <p className="text-sm text-stone font-body mb-4">
                  Desde los valles hasta las altas cumbres (arriba de los 2.000m), la vegetación varía:
                </p>
                <ul className="text-xs space-y-2 text-stone-dark font-body">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary" /> Algarrobo blanco, churqui, tusca</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary" /> Alisos y queñua (en altura)</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary" /> Sauces y frutales variados</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-light">
                <div className="flex items-center gap-3 mb-4 text-earth">
                  <Footprints size={20} />
                  <h4 className="font-bold font-heading">Fauna</h4>
                </div>
                <p className="text-sm text-stone font-body mb-4">
                  La fauna autóctona está fuertemente representada por los camélidos andinos:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {['Vicuñas', 'Guanacos', 'Llamas'].map(animal => (
                    <div key={animal} className="flex items-center justify-between p-2 bg-stone-light/50 rounded-lg text-xs font-bold text-stone-dark">
                      {animal} <ChevronRight size={12} className="text-stone/40" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Image Placeholder/Visual */}
          <div className="relative group overflow-hidden rounded-[2.5rem] shadow-hover border-8 border-white">
            <div className="absolute inset-0 bg-stone-dark/20 group-hover:bg-transparent transition-colors duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=1000&auto=format&fit=crop" 
              alt="Campo Tafí" 
              className="w-full h-full object-cover aspect-square md:aspect-auto"
            />
            <div className="absolute bottom-10 left-10 text-white">
              <p className="text-4xl font-black font-heading leading-tight underline decoration-primary decoration-4">Suelo fértil,<br />espíritu vivo.</p>
            </div>
          </div>
        </div>

        {/* Productive Section */}
        <div className="pt-20 border-t border-stone-light">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-stone-dark font-heading mb-4">Motor Productivo</h2>
            <p className="text-stone font-body">La economía vallista se sustenta en la nobleza de su suelo y el trabajo de su gente en la agricultura y la ganadería.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Agricultura */}
            <div className="bg-primary-light/30 rounded-[2rem] p-10 border border-primary-light">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                  <Tractor size={30} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-primary font-heading uppercase tracking-tight">Agricultura</h3>
                  <p className="text-xs font-bold text-primary/60 uppercase tracking-widest">Base Exportadora</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/80 p-6 rounded-2xl border-l-4 border-primary">
                  <p className="text-sm font-bold text-stone-dark mb-1">Producto Estrella</p>
                  <p className="text-xl font-black text-primary font-heading">Papa Semilla</p>
                  <p className="text-sm text-stone font-body">Principal producción para exportación de la región.</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-stone-dark mb-3">Otras Producciones:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-[10px] uppercase font-bold text-stone mb-1 tracking-tighter">Hortalizas</p>
                      <p className="text-xs text-stone-dark font-semibold">Lechuga, arveja, poroto, maíz, ajo.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-[10px] uppercase font-bold text-stone mb-1 tracking-tighter">Frutales</p>
                      <p className="text-xs text-stone-dark font-semibold">Manzana, durazno, nueces, peras, ciruelas.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ganadería */}
            <div className="bg-stone-light/50 rounded-[2rem] p-10 border border-stone-light">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-stone-dark text-white flex items-center justify-center shadow-lg">
                  <Footprints size={30} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-stone-dark font-heading uppercase tracking-tight">Ganadería</h3>
                  <p className="text-xs font-bold text-stone mb-1 uppercase tracking-widest">Diversidad Pecuaria</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-stone tracking-widest">Tradicional</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Vacunos', 'Bovinos', 'Porcinos', 'Caprinos', 'Avícolas'].map(item => (
                      <span key={item} className="px-3 py-1 bg-white border border-stone-light text-stone-dark text-[10px] font-bold rounded-lg">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-stone tracking-widest">Autóctona y Menor</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Guanacos', 'Llamas', 'Liebres', 'Chinchillas'].map(item => (
                      <span key={item} className="px-3 py-1 bg-white border border-stone-light text-stone-dark text-[10px] font-bold rounded-lg">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-earth/10 rounded-2xl border border-earth/20">
                <p className="text-[10px] font-black uppercase text-earth mb-2">Dato Valor:</p>
                <p className="text-sm text-stone font-body italic leading-snug">
                  "La convivencia entre la ganadería tradicional y la autóctona (camélidos) es una de las señas de identidad del valle."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
