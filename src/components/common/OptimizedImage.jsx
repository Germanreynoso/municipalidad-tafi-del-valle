import { useState } from 'react';
import { motion } from 'framer-motion';

export default function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "",
  width, 
  height,
  priority = false 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden ${containerClassName}`}
      style={{ aspectRatio: width && height ? `${width}/${height}` : 'auto' }}
    >
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse" />
      )}

      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          console.error("OptimizedImage error:", src);
          setError(true);
        }}
      />
    </div>
  );
}
