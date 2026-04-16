import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Utensils } from 'lucide-react';

const images = [
  { url: '/assets/gastronomia/comida-1.jpeg', title: '', desc: '' },
  { url: '/assets/gastronomia/comida-2.jpeg', title: '', desc: '' },
  { url: '/assets/gastronomia/comida-3.jpeg', title: '', desc: '' },
  { url: '/assets/gastronomia/comida-4.jpeg', title: '', desc: '' },
  { url: '/assets/gastronomia/comida-5.jpeg', title: '', desc: '' },
  { url: '/assets/gastronomia/comida-6.jpeg', title: '', desc: '' },
  { url: '/assets/gastronomia/comida-7.jpeg', title: '', desc: '' },
  { url: '/assets/gastronomia/comida-8.jpeg', title: '', desc: '' },
  { url: '/assets/gastronomia/comida-9.jpeg', title: '', desc: '' },
  { url: '/assets/gastronomia/comida-10.jpeg', title: '', desc: '' },
  { url: '/assets/gastronomia/comida-11.jpeg', title: '', desc: '' },
  { url: '/assets/gastronomia/comida-12.jpeg', title: '', desc: '' },
];

export default function GastronomyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5
      }
    })
  };

  const nextStep = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextStep();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-12">
      <div className="relative overflow-hidden aspect-[16/9] rounded-[2.5rem] shadow-2xl bg-stone-900 border-4 border-white/10 group">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay text removed temporarily per user request */}
            {/*
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 z-20 text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-12 bg-primary-light" />
                <span className="text-primary-light font-bold uppercase tracking-widest text-xs">Gastronomía Vallista</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white mb-4 italic font-heading">
                {images[currentIndex].title}
              </h3>
              <p className="text-lg text-white/70 font-body max-w-xl">
                {images[currentIndex].desc}
              </p>
            </motion.div>
            */}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); prevStep(); }}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextStep(); }}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-30 overflow-hidden">
          <motion.div 
            key={currentIndex}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-primary-light origin-left"
          />
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 mt-8">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === currentIndex ? 'w-12 bg-primary' : 'w-2 bg-stone-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
