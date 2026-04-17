import { motion } from 'framer-motion';
import { X, MapPin, Info } from 'lucide-react';

export default function AtraccionModal({ onClose, atraccion }) {
  if (!atraccion) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 cursor-pointer"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-none p-4"
      >
        <div className="bg-white rounded-[2.5rem] overflow-hidden max-w-3xl w-full max-h-[90vh] shadow-2xl pointer-events-auto flex flex-col border border-stone-200">
          <div className="relative h-72 sm:h-96 shrink-0">
            <img
              src={atraccion.image}
              alt={atraccion.nombre}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all hover:scale-110 active:scale-95 z-20"
            >
              <X size={24} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white bg-sky-500/80 backdrop-blur-md shadow-lg shadow-sky-500/20">
                  {atraccion.categoria}
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-heading leading-tight drop-shadow-lg">
                {atraccion.nombre}
              </h2>
            </div>
          </div>

          <div className="p-8 overflow-y-auto font-body text-stone-700 space-y-8 custom-scrollbar">
            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-stone-500 border-b border-stone-100 pb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
                  <MapPin size={18} className="text-sky-500" />
                </div>
                <span>{atraccion.distancia}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Info size={18} className="text-emerald-500" />
                </div>
                <span className="capitalize">{atraccion.categoria}</span>
              </div>
            </div>

            <div className="prose prose-stone max-w-none prose-p:leading-relaxed prose-p:text-lg prose-p:text-stone-600">
              {atraccion.descripcionLarga?.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="p-6 bg-stone-50/50 border-t border-stone-100 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-stone-900 text-white hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 hover:-translate-y-1 active:translate-y-0"
            >
              Entendido
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
