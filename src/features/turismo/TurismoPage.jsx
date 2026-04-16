import { useState } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Evento Destacado */}
        <div className="mb-24">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-stone-300"></span>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 font-body">
              Highlight de Temporada
            </p>
          </div>
          <EventosBanner evento={eventoDestacado} />
        </div>

        {/* Attractions Grid */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 mb-2 font-heading">
                Puntos de Interés
              </h2>
              <p className="text-stone-500 font-body">Explorá los tesoros guardados en el corazón del valle.</p>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltro(cat)}
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold capitalize transition-all duration-300 whitespace-nowrap font-body"
                  style={{
                    backgroundColor: filtro === cat ? 'var(--color-sky)' : 'var(--color-stone-light)',
                    color: filtro === cat ? 'white' : 'var(--color-stone-dark)',
                    boxShadow: filtro === cat ? '0 10px 15px -3px rgba(14, 165, 233, 0.3)' : 'none'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtradas.map((a) => (
              <AtraccionCard 
                key={a.id} 
                {...a} 
                onClick={() => setSelectedAttr(a)}
              />
            ))}
          </div>
        </div>

        {/* Calendar Section */}
        <CalendarioEventos />
      </div>

      {/* Modal View */}
      <AtraccionModal 
        isOpen={!!selectedAttr} 
        onClose={() => setSelectedAttr(null)} 
        attraccion={selectedAttr} 
      />

      {/* Bottom CTA */}
      <div className="py-24 px-4 text-center relative overflow-hidden" style={{ backgroundColor: '#E8EEF7' }}>
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-4 font-heading" style={{ color: 'var(--color-sky)' }}>
            ¿Necesitás información turística?
          </h3>
          <p className="text-base text-stone-600 mb-8 max-w-lg mx-auto font-body">
            Nuestra oficina local te espera con mapas, guías y toda la asistencia para que tu estadía sea inolvidable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-white transition-all duration-300 hover:scale-105 shadow-xl shadow-sky-200 font-body"
              style={{ backgroundColor: 'var(--color-sky)' }}
            >
              Contactar Oficina
            </a>
            <a
              href="#"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl font-bold text-sky-600 bg-white border border-sky-100 transition-all duration-300 hover:bg-sky-50 font-body"
            >
              Ver Mapa Local
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
