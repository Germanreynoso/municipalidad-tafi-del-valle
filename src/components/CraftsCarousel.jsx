import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from './common/OptimizedImage';

const craftImages = [
// ...
  '/assets/artesanias/artesania-1.jpeg',
  '/assets/artesanias/artesania-2.jpeg',
  '/assets/artesanias/artesania-3.jpeg',
  '/assets/artesanias/artesania-4.jpeg',
  '/assets/artesanias/artesania-5.jpeg',
  '/assets/artesanias/artesania-6.jpeg',
  '/assets/artesanias/artesania-7.jpeg',
  '/assets/artesanias/artesania-8.jpeg',
  '/assets/artesanias/artesania-9.jpeg',
  '/assets/artesanias/artesania-10.jpeg',
  '/assets/artesanias/artesania-11.jpeg',
  '/assets/artesanias/artesania-12.jpeg',
  '/assets/artesanias/artesania-13.jpeg',
  '/assets/artesanias/artesania-14.jpeg',
  '/assets/artesanias/artesania-15.jpeg',
  '/assets/artesanias/artesania-16.jpeg',
  '/assets/artesanias/artesania-17.jpeg',
  '/assets/artesanias/artesania-18.jpeg',
  '/assets/artesanias/artesania-19.jpeg',
  '/assets/artesanias/artesania-20.jpeg',
];

export default function CraftsCarousel() {
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
    setCurrentIndex((prev) => (prev === craftImages.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? craftImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextStep, 5000);
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
            <OptimizedImage
              src={craftImages[currentIndex]}
              className="w-full h-full object-cover"
              alt={`Artesanía ${currentIndex + 1}`}
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
        {craftImages.map((_, i) => (
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
