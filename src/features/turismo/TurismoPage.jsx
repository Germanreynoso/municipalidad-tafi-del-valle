import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Compass, Utensils } from 'lucide-react';
import { atracciones, eventoDestacado } from './data/atracciones.js';
import AtraccionCard from './components/AtraccionCard.jsx';
import EventosBanner from './components/EventosBanner.jsx';
import AtraccionModal from './components/AtraccionModal.jsx';
import CalendarioEventos from './components/CalendarioEventos.jsx';
import turismoHeroImg from '../../assets/turismo-hero.jpeg';

const categorias = ['todos', 'naturaleza', 'cultura', 'aventura', 'gastronomía'];

export default function TurismoPage() {
  const [filtro, setFiltro] = useState('todos');
  const [selectedAttr, setSelectedAttr] = useState(null);
  
  const filtradas = filtro === 'todos' ? atracciones : atracciones.filter((a) => a.categoria === filtro);

  return (
    <div className="bg-white">
      {/* Hero con Imagen de Fondo */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{ 
            backgroundImage: `url(${turismoHeroImg})`,
          }}
        >
          {/* Overlay gradiente para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4 text-sky-400 font-body">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            {' / '}Portal Turístico
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-tight font-heading max-w-2xl">
            Soy Turista
          </h1>
          <p className="text-xl text-white/90 max-w-xl font-body leading-relaxed">
            Descubrí los paisajes, la cultura y la gastronomía del Valle Sagrado de Tafí.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <Link 
            to="/turismo/alojamiento"
            className="group relative h-48 rounded-3xl overflow-hidden bg-sky-900 shadow-lg shadow-sky-900/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-transparent z-10" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
              <h3 className="text-2xl font-black text-white font-heading group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                <Hotel size={24} /> Alojamiento
              </h3>
              <p className="text-white/70 text-sm font-body">Hoteles, cabañas y más</p>
            </div>
          </Link>

          <Link 
            to="/turismo/gastronomia"
            className="group relative h-48 rounded-3xl overflow-hidden bg-orange-900 shadow-lg shadow-orange-900/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent z-10" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
              <h3 className="text-2xl font-black text-white font-heading group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                <Utensils size={24} /> Gastronomía
              </h3>
              <p className="text-white/70 text-sm font-body">Sabores regionales y parrillas</p>
            </div>
          </Link>

          <Link 
            to="/turismo/que-hacer"
            className="group relative h-48 rounded-3xl overflow-hidden bg-emerald-900 shadow-lg shadow-emerald-900/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent z-10" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
              <h3 className="text-2xl font-black text-white font-heading group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                <Compass size={24} /> Qué hacer
              </h3>
              <p className="text-white/70 text-sm font-body">Aventura y excursiones</p>
            </div>
          </Link>
        </div>

        {/* Sección de Atracciones destacadas */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-black text-stone-900 font-heading mb-4">Imperdibles de Tafí</h2>
              <div className="w-20 h-1.5 bg-sky-500 rounded-full" />
            </div>
            
            {/* Filtros */}
            <div className="flex flex-wrap gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltro(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    filtro === cat 
                      ? 'bg-stone-900 text-white shadow-lg' 
                      : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtradas.map((atract) => (
              <AtraccionCard 
                key={atract.id} 
                atraccion={atract} 
                onClick={() => setSelectedAttr(atract)} 
              />
            ))}
          </div>
        </div>

        {/* Evento Destacado / Banner */}
        <EventosBanner evento={eventoDestacado} />

        {/* Calendario de Eventos */}
        <CalendarioEventos />
      </div>

      {/* Modal de Detalles */}
      <AnimatePresence>
        {selectedAttr && (
          <AtraccionModal 
            atraccion={selectedAttr} 
            onClose={() => setSelectedAttr(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
