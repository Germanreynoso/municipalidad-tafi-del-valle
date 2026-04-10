import { Link } from 'react-router-dom';
import { Mountain, Mail, Share2, Globe } from 'lucide-react';
import EmergencyGrid from './EmergencyGrid.jsx';

const footerLinks = [
  {
    titulo: 'Municipio',
    links: [
      { label: 'Autoridades', to: '#' },
      { label: 'Historia de Tafí', to: '#' },
      { label: 'Ordenanzas', to: '#' },
      { label: 'Concejo Deliberante', to: '#' },
    ],
  },
  {
    titulo: 'Servicios',
    links: [
      { label: 'Trámites Online', to: '/ciudadano' },
      { label: 'Portal Turístico', to: '/turismo' },
      { label: 'Transparencia', to: '/institucional' },
      { label: 'Contacto', to: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <EmergencyGrid />

      <div style={{ backgroundColor: '#2A2A2A' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-mid">
                  <Mountain className="text-white" size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase font-body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Municipalidad de
                  </p>
                  <p className="text-base font-black text-white font-heading">
                    Tafí del Valle
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6 font-body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Comprometidos con el desarrollo sustentable y la calidad de vida de los habitantes del Valle Sagrado.
              </p>
              <div className="flex gap-3">
                {[Mail, Share2, Globe].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    aria-label="Red social"
                  >
                    <Icon size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links columns */}
            {footerLinks.map((col) => (
              <div key={col.titulo}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4 font-body" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {col.titulo}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm transition-colors duration-150 hover:text-white font-body"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t py-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs text-center font-body" style={{ color: 'rgba(255,255,255,0.3)' }}>
              © 2026 Municipalidad de Tafí del Valle — Provincia de Tucumán, Argentina
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
