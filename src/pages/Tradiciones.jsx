import { Music, Calendar, Star, Utensils, Info } from 'lucide-react';
import fiestaImg from '../assets/fiesta-tradicion.png';
import quesoImg from '../assets/fiesta-queso.jpg';
import GastronomyCarousel from '../components/GastronomyCarousel';
import EventsCarousel from '../components/EventsCarousel';
import CraftsCarousel from '../components/CraftsCarousel';

export default function Tradiciones() {
  const fiestas = [
    "Inauguración de temporada", "El Yerbiao", "Fiesta de La Chuscha",
    "Fiesta del Gaucho", "Vida y Pasión de Dios Hombre", "Festival del Lazo",
    "Fiesta del Agricultor"
  ];

  return (
    <div className="bg-white-warm min-h-screen">
      
      <div className="relative py-24 px-4 overflow-hidden bg-earth">
        <div className="absolute inset-0 z-0">
          <img 
            src={fiestaImg} 
            alt="Tradiciones de Tafí" 
            className="w-full h-full object-cover opacity-30 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-earth via-earth/60 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/80 font-body"> Cultura y Tradiciones </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 font-heading">
            El Alma del Valle
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-body leading-relaxed">
            Música, fiestas populares y el sabor inigualable de nuestra tierra.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-earth/10 rounded-[3rem] blur-2xl group-hover:bg-earth/20 transition-all duration-500"></div>
            <img 
              src={quesoImg} 
              alt="Fiesta Nacional del Queso" 
              className="relative rounded-[2.5rem] shadow-2xl z-10 w-full object-cover aspect-[4/3] transform group-hover:-translate-y-2 transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 border border-stone-light hidden md:block group-hover:scale-105 transition-transform">
              <Star className="text-yellow-500 fill-yellow-500 mb-2" size={32} />
              <p className="text-[10px] font-black uppercase text-stone tracking-widest leading-none">Declarada en 1987</p>
              <p className="text-sm font-bold text-earth">Fiesta Nacional</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-earth/10 text-earth text-xs font-bold uppercase tracking-widest">
              <Calendar size={14} /> Febrero
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-stone-dark font-heading leading-tight italic">
              Fiesta Nacional del Queso
            </h2>
            <p className="text-lg text-stone font-body leading-relaxed">
              Es el principal festival del valle y su convocatoria es masiva. En ella se vuelcan todas las expresiones populares de Tafí: desde las artesanías y la música hasta los bailes criollos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-2xl border-l-4 border-earth shadow-sm">
                <p className="text-xs font-black text-stone mb-1 uppercase">Destrezas del Corral</p>
                <p className="text-sm text-stone-dark font-body">Enlazadores, pialadores y avezados domadores.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border-l-4 border-earth shadow-sm">
                <p className="text-xs font-black text-stone mb-1 uppercase">Sabor de Antigüedad</p>
                <p className="text-sm text-stone-dark font-body">Quesos fabricados con un proceso artesanal jesuita.</p>
              </div>
            </div>
            <p className="text-sm text-stone font-body italic">
              "El gusto muy particular se debe a las bondades únicas de las pasturas de nuestra zona."
            </p>
          </div>
        </div>
      </section>

      {/* Artesanías Section */}
      <section className="py-24 px-4 bg-stone-50 overflow-hidden border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <div className="inline-block px-4 py-1 rounded-full bg-stone-200 text-stone-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                Legado Cultural
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-stone-dark font-heading leading-[0.9] mb-8">
                Manos <br />
                <span className="text-earth italic">Vallistas</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-stone font-body leading-relaxed">
                  El arte de Tafí nace de la tierra misma. Nuestros artesanos transforman la lana, el cuero, la piedra y la arcilla en piezas únicas que respiran la historia del valle.
                </p>
                <div className="h-0.5 w-20 bg-earth/20"></div>
                <p className="text-sm text-stone/60 font-body uppercase tracking-widest font-bold">
                  Tejidos • Cerámica • Piedra • Cuero
                </p>
              </div>
            </div>
            <div className="lg:w-2/3 w-full">
              <CraftsCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-dark py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[120px] rounded-full translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-8 shadow-inner shadow-black/20">
                <Music size={32} />
              </div>
              <h2 className="text-4xl font-black font-heading mb-6 tracking-tight">El Espíritu Vallisto: <br /><span className="text-primary-mid">El "Joi-Joi"</span></h2>
              <p className="text-lg text-white/70 font-body leading-relaxed mb-8">
                Coplas acompañadas por cajas que retumban en las soledades del valle, hablando del sentir profundo de nuestra gente. No faltan nunca el violín, el bandoneón y la guitarra para completar la banda sonora de Tafí.
              </p>
              <div className="flex gap-4">
                <div className="h-12 w-1 bg-primary/40 rounded-full"></div>
                <p className="text-sm italic text-white/50 font-body">"La música nace en las cumbres y baja hecha copla por los ríos del valle."</p>
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-6">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-2xl font-black font-heading text-primary-light">Cajas</p>
                <p className="text-xs text-white/60 uppercase font-bold tracking-widest mt-1">Ritmo Ancestral</p>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors translate-y-8">
                <p className="text-2xl font-black font-heading text-primary-light">Violín</p>
                <p className="text-xs text-white/60 uppercase font-bold tracking-widest mt-1">Sentir Criollo</p>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-2xl font-black font-heading text-primary-light">Bandoneón</p>
                <p className="text-xs text-white/60 uppercase font-bold tracking-widest mt-1">Legado Social</p>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors translate-y-8">
                <p className="text-2xl font-black font-heading text-primary-light">Guitarra</p>
                <p className="text-xs text-white/60 uppercase font-bold tracking-widest mt-1">Voz del Pueblo</p>
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
              Viví Nuestras Fiestas
            </h2>
            <p className="text-stone font-body max-w-2xl mx-auto text-lg">
              Un recorrido visual por las celebraciones que marcan el ritmo del valle. Tradición, color y fe en cada encuentro.
            </p>
          </div>
          
          <EventsCarousel />
        </div>
      </section>

      {/* Calendario de Fiestas */}
      <section className="py-24 px-4 bg-stone-100 rounded-[3rem] mx-4 sm:mx-8 shadow-inner shadow-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black font-heading text-stone-dark mb-4 tracking-tighter uppercase">Calendario de Fiestas</h2>
            <p className="text-stone font-body">Celebraciones que mantienen viva nuestra esencia durante todo el año.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fiestas.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-stone-light flex items-center gap-4 hover:shadow-md transition-shadow cursor-default group">
                <div className="w-10 h-10 rounded-xl bg-earth/5 flex items-center justify-center text-earth group-hover:bg-earth group-hover:text-white transition-colors">
                  <Star size={20} />
                </div>
                <p className="font-bold text-stone-dark font-body">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gastronomía */}
      <section className="py-24 px-4 bg-white-warm text-center mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <Utensils className="mx-auto mb-6 text-earth/40" size={48} />
            <h2 className="text-4xl sm:text-6xl font-black font-heading text-stone-dark mb-6 tracking-tight italic">
              Sabores del Valle
            </h2>
            <p className="text-xl text-stone font-body max-w-2xl mx-auto leading-relaxed">
              Una cocina que fusiona ingredientes locales con técnicas ancestrales para crear platos que alimentan el alma.
            </p>
          </div>

          <GastronomyCarousel />

          <div className="flex flex-wrap justify-center gap-3 mt-16 max-w-3xl mx-auto">
            {["Locro", "Humita", "Empanada", "Chanfaina", "Asado de cordero", "Tamal", "Dulces varios"].map(comida => (
              <span key={comida} className="px-6 py-2 bg-white rounded-full text-sm font-bold border border-stone-light text-stone-dark shadow-sm hover:border-earth/40 transition-colors">
                {comida}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
