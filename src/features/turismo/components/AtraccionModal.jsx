import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Info } from 'lucide-react';

export default function AtraccionModal({ isOpen, onClose, attraccion }) {
  if (!attraccion) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none p-4"
          >
            <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] shadow-2xl pointer-events-auto flex flex-col">
              <div className="relative h-64 sm:h-80 shrink-0">
                <img
                  src={attraccion.image}
                  alt={attraccion.nombre}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white mb-2 bg-sky-500/50 backdrop-blur-md">
                    {attraccion.categoria}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                    {attraccion.nombre}
                  </h2>
                </div>
              </div>

              <div className="p-6 overflow-y-auto font-body text-stone-700 space-y-6 text-balance">
                <div className="flex items-center gap-4 text-sm text-stone-500 border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-sky-500" />
                    <span>{attraccion.distancia}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Info size={16} className="text-sky-500" />
                    <span className="capitalize">{attraccion.categoria}</span>
                  </div>
                </div>

                <div className="prose prose-stone max-w-none">
                  {attraccion.descripcionLarga?.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 leading-relaxed whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl font-bold bg-sky-500 text-white hover:bg-sky-600 transition-colors shadow-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
