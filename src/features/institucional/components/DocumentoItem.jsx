import { FileText, Download } from 'lucide-react';
import { formatFecha } from '../../../utils/formatFecha.js';

export default function DocumentoItem({ nombre, tipo, fecha, url }) {
  return (
    <a
      href={url}
      className="group flex items-center gap-4 px-5 py-4 rounded-xl border border-stone-light bg-white transition-all duration-200 hover:shadow-md"
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EDE8E3' }}>
        <FileText size={18} style={{ color: 'var(--color-earth)' }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate text-stone-dark font-body">{nombre}</p>
        <p className="text-xs mt-0.5 text-stone font-body">{tipo} · {formatFecha(fecha)}</p>
      </div>
      <Download
        size={16}
        className="flex-shrink-0 transition-transform duration-200 group-hover:translate-y-0.5"
        style={{ color: 'var(--color-earth)' }}
      />
    </a>
  );
}
