import { MapPin } from 'lucide-react';

const categoriaColors = {
  naturaleza:   { bg: 'var(--color-primary-light)', text: 'var(--color-primary)' },
  cultura:      { bg: '#EDE8E3', text: 'var(--color-earth)' },
  aventura:     { bg: '#E8EEF7', text: 'var(--color-sky)' },
  gastronomía:  { bg: '#FEF3E2', text: '#C47B20' },
};

export default function AtraccionCard({ nombre, categoria, distancia, descripcion, image }) {
  const colors = categoriaColors[categoria] || categoriaColors.naturaleza;
  return (
    <div
      className="group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 bg-white"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div className="overflow-hidden h-52">
        <img
          src={image}
          alt={nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-2 py-1 rounded-full text-xs font-semibold capitalize font-body"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {categoria}
          </span>
          <span className="flex items-center gap-1 text-xs text-stone font-body">
            <MapPin size={12} /> {distancia}
          </span>
        </div>
        <h3 className="font-bold text-base mb-2 text-stone-dark font-heading">{nombre}</h3>
        <p className="text-sm line-clamp-2 text-stone font-body">{descripcion}</p>
      </div>
    </div>
  );
}
