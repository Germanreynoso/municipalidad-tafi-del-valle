import { useState, useMemo } from 'react';
import { alojamientos, tiposAlojamiento } from './data/alojamiento.js';
import { Search, MapPin, Phone, MessageCircle, ShieldCheck, Hotel, Building2, Home, Tent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Instagram Icon to avoid library version issues
const InstagramIcon = ({ size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const getIcon = (cat) => {
  switch (cat) {
    case 'hotel': return <Hotel size={20} />;
    case 'cabañas': return <Home size={20} />;
    case 'camping': return <Tent size={20} />;
    default: return <Building2 size={20} />;
  }
};

export default function AlojamientoPage() {
  const [filtro, setFiltro] = useState('todos');
  const [search, setSearch] = useState('');

  const filtrados = useMemo(() => {
    return alojamientos.filter(a => {
      const matchFiltro = filtro === 'todos' || a.categoria === filtro;
      const matchSearch = a.nombre.toLowerCase().includes(search.toLowerCase()) || 
                          a.direccion.toLowerCase().includes(search.toLowerCase());
      return matchFiltro && matchSearch;
    });
  }, [filtro, search]);

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Header / Hero */}
      <div 
        className="relative pt-32 pb-20 px-4 text-center"
        style={{ background: 'linear-gradient(rgba(14, 165, 233, 0.05), rgba(14, 165, 233, 0))' }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sky-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 font-body">
              Turismo Oficial — Tafí del Valle
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-stone-900 mb-6 font-heading leading-tight">
              Alojamientos <br />
              <span className="text-sky-500">Habilitados</span>
            </h1>
            <p className="text-stone-500 max-w-xl mx-auto mb-12 font-body">
              Garantizá tu seguridad y confort eligiendo prestadores registrados y supervisados por la Municipalidad.
            </p>
          </motion.div>

          {/* Search Bar Container */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-stone-400">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por nombre o zona..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border-none shadow-xl shadow-sky-900/5 focus:ring-2 focus:ring-sky-500 transition-all font-body text-stone-dark"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Filters Grid style */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {tiposAlojamiento.map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltro(tipo)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold capitalize transition-all duration-200 border border-stone-200 font-body"
              style={{
                backgroundColor: filtro === tipo ? 'var(--color-stone-dark)' : 'white',
                color: filtro === tipo ? 'white' : 'var(--color-stone-dark)',
                borderColor: filtro === tipo ? 'var(--color-stone-dark)' : 'transparent',
                boxShadow: filtro === tipo ? '0 10px 15px -5px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {tipo}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 px-2 font-body text-xs text-stone-400 font-bold uppercase tracking-widest">
          <span>{filtrados.length} resultados encontrados</span>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-emerald-600">Registro Municipal Oficial</span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtrados.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-stone-100 hover:border-sky-200 hover:shadow-2xl hover:shadow-sky-900/5 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  {getIcon(item.categoria)}
                </div>

                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-600 text-[9px] font-black uppercase tracking-wider">
                        {item.categoria}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-stone-800 font-heading leading-tight mb-2">
                      {item.nombre}
                    </h3>
                    <div className="flex items-start gap-2 text-stone-500 text-[13px] font-body leading-tight">
                      <MapPin size={14} className="shrink-0 mt-0.5 text-stone-300" />
                      {item.direccion}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 flex flex-col gap-2">
                    {item.whatsapp && (
                      <a 
                        href={item.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 flex items-center justify-center gap-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-200 shadow-lg shadow-emerald-500/20 font-bold text-sm"
                      >
                        <MessageCircle size={18} />
                        Contactar por WhatsApp
                      </a>
                    )}
                    
                    {item.instagram && (
                      <a 
                        href={item.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-pink-500/20 font-bold text-sm"
                      >
                        <InstagramIcon size={18} />
                        Contactar por Instagram
                      </a>
                    )}

                    {!item.whatsapp && !item.instagram && (
                      <div className="w-full py-3 flex items-center justify-center gap-3 rounded-xl bg-stone-100 text-stone-500 font-bold text-sm">
                        <Phone size={18} />
                        {item.telefono}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filtrados.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-stone-300" />
            </div>
            <h4 className="text-xl font-bold text-stone-800 mb-2 font-heading">No encontramos resultados</h4>
            <p className="text-stone-500 font-body">Probá ajustando los filtros o el término de búsqueda.</p>
          </div>
        )}
      </div>

      {/* Advice Section */}
      <div className="bg-white border-t border-stone-100 py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={32} className="text-sky-500" />
          </div>
          <h3 className="text-3xl font-black text-stone-900 mb-6 font-heading">Turismo Responsable</h3>
          <p className="text-stone-500 font-body leading-relaxed mb-10">
            Al elegir alojamientos habilitados, no solo aseguras tu tranquilidad, sino que también 
            apoyas el crecimiento legal y ordenado de nuestra ciudad. Todos los establecimientos 
            en esta lista cumplen con las normativas de seguridad e higiene vigentes.
          </p>
        </div>
      </div>
    </div>
  );
}
