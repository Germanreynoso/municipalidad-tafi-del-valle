import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { curiosidades } from '../../data/curiosidades';
import mascotImg from '../../assets/mascota.png';
import { X } from 'lucide-react';

export default function CuriosityPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [curiosidad, setCuriosidad] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomFact = curiosidades[Math.floor(Math.random() * curiosidades.length)];
      setCuriosidad(randomFact);
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsVisible(false);

  if (!curiosidad) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Wrapper relativo para poder posicionar la oveja sobre el card */}
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.85 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 190, damping: 24 }}
            className="relative w-[300px] md:w-[340px]"
          >
            {/* Popup Card */}
            <div className="bg-[#00635d] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
              {/* Header Image */}
              {curiosidad.imagen && (
                <div className="h-36 w-full overflow-hidden relative">
                  <img
                    src={curiosidad.imagen}
                    alt="Tafí del Valle"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00635d] via-[#00635d]/10 to-black/20" />
                  <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white text-[#00635d] rounded-full transition-all shadow-md z-10"
                  >
                    <X size={18} strokeWidth={3} />
                  </button>
                </div>
              )}

              {/* Texto */}
              <div className="px-5 pt-3 pb-5 text-white">
                {!curiosidad.imagen && (
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                  >
                    <X size={18} />
                  </button>
                )}
                <h3 className="text-xl font-black leading-[1.15] font-heading">
                  {curiosidad.pregunta}
                </h3>
                <p className="text-white/80 text-sm mt-2 leading-snug font-body font-medium pr-16">
                  {curiosidad.respuesta}
                </p>
              </div>
            </div>

            {/* Mascota superpuesta — esquina inferior derecha del card */}
            <motion.img
              src={mascotImg}
              alt="Mascota"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-10 w-28 md:w-32 h-auto pointer-events-none z-20"
              style={{
                filter:
                  'drop-shadow(0 6px 12px rgba(0,0,0,0.3)) drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white)',
              }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
