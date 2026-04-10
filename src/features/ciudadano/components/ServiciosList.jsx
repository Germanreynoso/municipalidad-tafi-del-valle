import { AlertTriangle, Droplets, Trash2 } from 'lucide-react';

const iconMap = { AlertTriangle, Droplets, Trash2 };

export default function ServiciosList({ servicios }) {
  return (
    <ul className="space-y-4">
      {servicios.map((s) => {
        const Icon = iconMap[s.icono] || AlertTriangle;
        return (
          <li key={s.id} className="flex items-center gap-4 p-4 rounded-xl bg-stone-light">
            <Icon size={20} className="text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm text-stone-dark font-body">{s.titulo}</p>
              <p className="text-xs text-stone font-body">{s.descripcion}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
