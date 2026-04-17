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

  // Simple local detection
  const isLocal = typeof window !== 'undefined' && 
                  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  const getCdnUrl = (originalSrc, w) => {
    if (!originalSrc || originalSrc.startsWith('http') || isLocal) return originalSrc;
    return `/.netlify/images?url=${encodeURIComponent(originalSrc)}&w=${w}&q=80`;
  };

  const srcSet = !isLocal && src && !src.startsWith('http') ? [
    `${getCdnUrl(src, 400)} 400w`,
    `${getCdnUrl(src, 800)} 800w`,
    `${getCdnUrl(src, 1200)} 1200w`
  ].join(', ') : undefined;

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
        src={getCdnUrl(src, 1200)}
        srcSet={srcSet}
        sizes="(max-width: 640px) 100vw, 50vw"
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
