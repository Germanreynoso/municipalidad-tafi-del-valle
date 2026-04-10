import { useState } from 'react';
import { Link } from 'react-router-dom';
import { atracciones, eventoDestacado } from './data/atracciones.js';
import AtraccionCard from './components/AtraccionCard.jsx';
import EventosBanner from './components/EventosBanner.jsx';

const categorias = ['todos', 'naturaleza', 'cultura', 'aventura', 'gastronomía'];

export default function TurismoPage() {
  const [filtro, setFiltro] = useState('todos');
  const filtradas = filtro === 'todos' ? atracciones : atracciones.filter((a) => a.categoria === filtro);

  return (
    <div>
      {/* Hero */}
      <div
        className="relative py-24 px-4"
        style={{ background: 'linear-gradient(135deg, var(--color-sky) 0%, #1A4F8E 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70 font-body">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            {' / '}Portal Turístico
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight font-heading">
            Soy Turista
          </h1>
          <p className="text-lg text-white/80 max-w-xl font-body">
            Descubrí los paisajes, la cultura y la gastronomía del Valle Sagrado.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4 text-stone font-body">
            Evento destacado
          </p>
          <EventosBanner evento={eventoDestacado} />
        </div>

        <div className="flex items-center gap-3 mb-10 flex-wrap">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className="px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200 font-body"
              style={{
                backgroundColor: filtro === cat ? 'var(--color-sky)' : 'var(--color-stone-light)',
                color: filtro === cat ? 'white' : 'var(--color-stone-dark)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtradas.map((a) => <AtraccionCard key={a.id} {...a} />)}
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-4 text-center" style={{ backgroundColor: '#E8EEF7' }}>
        <h3 className="text-2xl font-black mb-3 font-heading" style={{ color: 'var(--color-sky)' }}>
          ¿Necesitás información turística?
        </h3>
        <p className="text-sm mb-6 text-stone font-body">La oficina de turismo te espera en el centro de Tafí del Valle.</p>
        <a
          href="#"
          className="inline-block px-8 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 font-body"
          style={{ backgroundColor: 'var(--color-sky)' }}
        >
          Contactar
        </a>
      </div>
    </div>
  );
}
