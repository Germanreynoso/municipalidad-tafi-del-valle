import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

export default function LocationCard() {
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-lg border border-stone-100 flex flex-col bg-white" style={{ height: 'clamp(320px, 50vw, 480px)' }}>
      {/* Interactive Map */}
      <div className="flex-1 relative overflow-hidden">
        <iframe
          title="Mini Map Tafi"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28477.622178814876!2d-65.70862289999998!3d-26.849404449999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94221877e80d28cf%3A0x7cf806901072e845!2zVGFmw60gZGVsIFZhbGxlLCBUdWN1bcOhbg!5e0!3m2!1ses!2sar!4v1777294335847!5m2!1ses!2sar"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="grayscale group-hover:grayscale-0 transition-all duration-700 h-full w-full object-cover"
        ></iframe>
        
        {/* Map Overlay for clickability (optional) */}
        <div className="absolute top-4 left-4 z-10">
          <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center gap-2">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black tracking-widest text-stone-900 uppercase">Ubicación Real</span>
          </div>
        </div>
      </div>

      {/* Info Part */}
      <div className="p-6 bg-white flex items-center justify-between group-hover:bg-sky-50 transition-colors duration-300">
        <div>
          <h4 className="text-xl font-black text-stone-900 font-heading">¿Cómo llegar?</h4>
          <p className="text-xs text-stone-500 font-body">RP 307 - 107km desde Tucumán</p>
        </div>
        <a 
          href="https://www.google.com/maps/dir//Taf%C3%AD+del+Valle,+Tucum%C3%A1n" 
          target="_blank" 
          rel="noreferrer"
          className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-600/20 group-hover:scale-110 transition-transform"
        >
          <ArrowRight size={20} />
        </a>
      </div>
    </div>
  );
}
