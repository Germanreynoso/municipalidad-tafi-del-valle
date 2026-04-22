import { useState, useMemo } from 'react';
import { guiasTurismo } from './data/guias.js';
import { Search, Phone, Mail, BadgeCheck, Globe, Map as MapIcon, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GuiasPage() {
  const [search, setSearch] = useState('');

  const filtrados = useMemo(() => {
    return guiasTurismo.filter(g => {
      const searchLower = search.toLowerCase();
      return g.nombre.toLowerCase().includes(searchLower) || 
             g.zonas.some(z => z.toLowerCase().includes(searchLower)) ||
             g.categoria.toLowerCase().includes(searchLower);
    });
  }, [search]);

  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      {/* Header / Hero */}
      <div className="relative overflow-hidden pt-32 pb-24 px-4">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-20 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6 shadow-sm border border-sky-200/50">
              Servicios Oficiales
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-stone-900 mb-8 font-heading leading-none tracking-tight">
              Guías <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Habilitados</span>
            </h1>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto mb-12 font-body leading-relaxed">
              Explorá Tafí del Valle y sus alrededores de la mano de expertos certificados provincialmente. Seguridad y conocimiento en cada paso.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto group"
          >
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-sky-500 group-focus-within:scale-110 transition-transform">
              <Search size={22} strokeWidth={2.5} />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por nombre, zona o categoría..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-white border-2 border-stone-100 shadow-2xl shadow-sky-900/5 focus:ring-0 focus:border-sky-500/50 transition-all font-body text-stone-800 text-lg placeholder:text-stone-300"
            />
            <div className="absolute right-4 inset-y-4 px-4 bg-stone-50 rounded-2xl flex items-center text-[10px] font-black text-stone-400 uppercase tracking-widest border border-stone-100">
              {filtrados.length} Resultados
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtrados.map((guia, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                key={guia.credencial}
                className="group relative bg-white rounded-[2.5rem] p-8 border border-stone-100 hover:border-sky-200 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(14,165,233,0.12)] flex flex-col"
              >
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                    <BadgeCheck size={20} />
                  </div>
                </div>

                <div className="mb-8">
                  {/* Category Chip */}
                  <span className="inline-block px-3 py-1 bg-stone-50 text-stone-500 text-[9px] font-black uppercase tracking-widest rounded-lg mb-4 border border-stone-100 group-hover:border-sky-100 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                    {guia.categoria}
                  </span>
                  
                  <h3 className="text-2xl font-black text-stone-900 font-heading leading-[1.1] mb-2 group-hover:text-sky-600 transition-colors">
                    {guia.nombre}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-stone-400 text-xs font-bold font-body">
                    <Globe size={14} className="text-sky-400" />
                    MT: {guia.credencial}
                  </div>
                </div>

                {/* Zonas Tags */}
                <div className="mb-10">
                  <div className="flex flex-wrap gap-2">
                    {guia.zonas.map(zona => (
                      <span 
                        key={zona} 
                        className="px-3 py-1 bg-stone-50 text-stone-600 text-[11px] font-medium rounded-full border border-stone-100/50 hover:bg-white hover:border-sky-200 hover:text-sky-600 transition-all cursor-default"
                      >
                        {zona}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="mt-auto space-y-3">
                  <div className="p-1 bg-stone-50 rounded-2xl border border-stone-100 group-hover:border-sky-100 transition-colors">
                    <a 
                      href={`tel:${guia.telefono}`}
                      className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group/btn"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center group-hover/btn:bg-sky-500 group-hover/btn:text-white transition-colors">
                          <Phone size={18} />
                        </div>
                        <div className="text-left overflow-hidden">
                          <p className="text-[10px] text-stone-400 font-black uppercase tracking-tighter">Llamar Ahora</p>
                          <p className="text-sm font-bold text-stone-700 truncate">{guia.telefono}</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-stone-300 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  <div className="p-1 bg-stone-50 rounded-2xl border border-stone-100 group-hover:border-sky-100 transition-colors">
                    <a 
                      href={`mailto:${guia.email}`}
                      className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group/btn"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center group-hover/btn:bg-sky-500 group-hover/btn:text-white transition-colors">
                          <Mail size={18} />
                        </div>
                        <div className="text-left overflow-hidden">
                          <p className="text-[10px] text-stone-400 font-black uppercase tracking-tighter">Enviar Email</p>
                          <p className="text-sm font-bold text-stone-700 truncate">{guia.email}</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-stone-300 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filtrados.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <div className="w-24 h-24 bg-stone-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-stone-200 border border-stone-100">
              <MapIcon size={40} />
            </div>
            <h4 className="text-2xl font-black text-stone-800 mb-3 font-heading">Sin resultados exactos</h4>
            <p className="text-stone-500 font-body text-lg">Probá buscando una zona específica o el apellido del guía.</p>
            <button 
              onClick={() => setSearch('')}
              className="mt-8 px-8 py-3 bg-stone-900 text-white rounded-2xl font-bold text-sm hover:bg-sky-600 transition-colors"
            >
              Ver todos los guías
            </button>
          </motion.div>
        )}
      </div>

      {/* Trust & Safety Section */}
      <div className="relative py-32 px-4 mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-stone-900 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 bg-sky-500/20 border border-sky-500/30 rounded-3xl flex items-center justify-center mx-auto mb-10 backdrop-blur-sm">
            <BadgeCheck size={40} className="text-sky-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 font-heading">
            Turismo Seguro y <br />
            <span className="text-sky-400">Responsable</span>
          </h2>
          <p className="text-stone-400 font-body text-lg leading-relaxed mb-12">
            La contratación de guías habilitados garantiza que tu experiencia en Tafí del Valle cumpla con los estándares de seguridad exigidos por el Ente de Turismo de Tucumán. No arriesgues tu estadía, elegí siempre prestadores registrados.
          </p>
        </div>
      </div>
    </div>
  );
}
