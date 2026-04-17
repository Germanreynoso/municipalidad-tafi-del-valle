import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const eventImages = [
  '/assets/eventos/evento-1.jpeg',
  '/assets/eventos/evento-2.jpeg',
  '/assets/eventos/evento-3.jpeg',
  '/assets/eventos/evento-4.jpeg',
  '/assets/eventos/evento-5.jpeg',
  '/assets/eventos/evento-6.jpeg',
  '/assets/eventos/evento-7.jpeg',
  '/assets/eventos/evento-8.jpeg',
  '/assets/eventos/evento-9.jpeg',
  '/assets/eventos/evento-10.jpeg',
  '/assets/eventos/evento-11.jpeg',
  '/assets/eventos/evento-12.jpeg',
  '/assets/eventos/evento-13.jpeg',
  '/assets/eventos/evento-14.jpeg',
  '/assets/eventos/evento-15.jpeg',
  '/assets/eventos/evento-16.jpeg',
  '/assets/eventos/evento-17.jpeg',
  '/assets/eventos/evento-18.jpeg',
  '/assets/eventos/evento-19.jpeg',
  '/assets/eventos/evento-20.jpeg',
  '/assets/eventos/evento-21.jpeg',
  '/assets/eventos/evento-22.jpeg',
  '/assets/eventos/evento-23.jpeg',
  '/assets/eventos/evento-24.jpeg',
];

export default function EventsCarousel() {
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
    setCurrentIndex((prev) => (prev === eventImages.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? eventImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextStep, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      <div className="relative h-[400px] sm:h-[600px] overflow-hidden rounded-[3rem] shadow-2xl bg-stone-900 border-4 border-white/10 group">
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
            <img
              src={eventImages[currentIndex]}
              className="w-full h-full object-cover"
              alt={`Evento cultural ${currentIndex + 1}`}
            />
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

        {/* Decorative Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 mt-8">
        {eventImages.map((_, i) => (
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
