import { ArrowRight, FileCheck, Receipt, Heart, HardHat, MessageSquare, CalendarCheck } from 'lucide-react';

const iconMap = { FileCheck, Receipt, Heart, HardHat, MessageSquare, CalendarCheck };

export default function TramiteCard({ titulo, descripcion, icono, link }) {
  const Icon = iconMap[icono] || FileCheck;
  return (
    <a
      href={link}
      className="group flex items-start gap-4 p-6 rounded-2xl border border-stone-light bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary-light transition-colors duration-300">
        <Icon size={22} className="text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-base mb-1 text-stone-dark font-heading">{titulo}</h3>
        <p className="text-sm leading-relaxed text-stone font-body">{descripcion}</p>
      </div>
      <ArrowRight
        size={18}
        className="flex-shrink-0 mt-1 text-primary transition-transform duration-300 group-hover:translate-x-1"
      />
    </a>
  );
}
