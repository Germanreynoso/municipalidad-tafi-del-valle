import { useState } from 'react';
import { Link } from 'react-router-dom';
import { actividades, categoriasActividades } from './data/cosasHacer.js';
import { Compass, Clock, Activity, ArrowRight } from 'lucide-react';

export default function CosasHacerPage() {
  const [filtro, setFiltro] = useState('todos');

  const filtradas = filtro === 'todos' 
    ? actividades 
    : actividades.filter(a => a.categoria === filtro);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div 
        className="relative py-24 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70 font-body">
            <Link to="/turismo" className="hover:text-white transition-colors">Turismo</Link>
            {' / '}Qué hacer en el valle
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 font-heading">
            Cosas <br />
            <span className="text-white/60">para hacer</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl font-body">
            Aventura, cultura y sabores únicos. Descubrí las mejores experiencias para 
            vivir Tafí del Valle al máximo.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Filters */}
        <div className="flex items-center gap-4 mb-16 border-b border-stone-100 pb-6">
          <span className="text-xs font-black uppercase tracking-widest text-stone-400 mr-4 font-body">Filtrar por:</span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categoriasActividades.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className="px-6 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-200 whitespace-nowrap font-body"
                style={{
                  backgroundColor: filtro === cat ? '#10b981' : 'transparent',
                  color: filtro === cat ? 'white' : '#64748b',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtradas.map((act) => (
            <div 
              key={act.id} 
              className="group cursor-pointer"
            >
              <div className="relative h-80 rounded-3xl overflow-hidden mb-6 shadow-lg shadow-stone-200">
                <div className="absolute inset-0 bg-stone-200 flex items-center justify-center opacity-30">
                  <Compass size={64} className="group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg mb-2">
                    {act.categoria}
                  </span>
                  <h3 className="text-2xl font-bold text-white font-heading">{act.nombre}</h3>
                </div>
              </div>
              
              <div className="px-2">
                <div className="flex items-center gap-6 mb-4 text-xs font-bold text-stone-400 font-body uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-emerald-500" />
                    {act.duracion}
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-emerald-500" />
                    Dificultad: {act.dificultad}
                  </div>
                </div>
                <p className="text-stone-600 font-body leading-relaxed mb-6 line-clamp-2">
                  {act.descripcion}
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-wider group-hover:gap-4 transition-all duration-300">
                  Ver detalles <ArrowRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Activity CTA */}
        <div className="mt-32 relative rounded-3xl overflow-hidden bg-stone-900 py-16 px-8 md:px-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6 font-heading">¿Querés una experiencia personalizada?</h3>
            <p className="text-white/60 mb-10 font-body">
              Contamos con guías registrados y especialistas en turismo activo para diseñar tu itinerario a medida.
            </p>
            <Link 
              to="/contacto"
              className="inline-block px-12 py-4 bg-emerald-500 text-white font-black rounded-2xl hover:bg-emerald-400 transition-colors shadow-xl shadow-emerald-900/40 font-body"
            >
              Contactar con un Guía
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
