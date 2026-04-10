import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PortalCard({ title, subtitle, description, image, to, accentColor }) {
  return (
    <Link
      to={to}
      className="group relative block overflow-hidden rounded-2xl"
      style={{ height: 'clamp(320px, 50vw, 480px)' }}
      aria-label={`Ir al ${subtitle}`}
    >
      {/* Imagen con zoom en hover */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)',
        }}
      />
      {/* Overlay hover — intensifica al 0→1 */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.1) 100%)',
        }}
      />

      {/* Línea de color del portal en borde inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl"
        style={{ backgroundColor: `var(${accentColor})` }}
      />

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 transition-transform duration-500 group-hover:-translate-y-2">
        {/* Label badge */}
        <span
          className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-3 text-white font-body"
          style={{ backgroundColor: `var(${accentColor})` }}
        >
          {subtitle}
        </span>

        {/* Título */}
        <h3 className="text-3xl font-black text-white mb-2 leading-tight font-heading">
          {title}
        </h3>

        {/* Descripción — visible en hover */}
        <p className="text-sm text-white/80 mb-4 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-xs font-body">
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 font-body">
          Ingresar
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
