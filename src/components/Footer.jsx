import { Link } from 'react-router-dom';
import { Mail, Share2, Globe } from 'lucide-react';
import EmergencyGrid from './EmergencyGrid.jsx';
import institutionalLogo from '../assets/MUNICIPALIDAD INSTITUCIONAL COLOR.png';

const footerLinks = [
  {
    titulo: 'Municipio',
    links: [
      { label: 'Autoridades', to: '/autoridades' },
      { label: 'Historia de Tafí', to: '#' },
      { label: 'Ordenanzas', to: '#' },
      { label: 'Concejo Deliberante', to: '#' },
    ],
  },
  {
    titulo: 'Servicios',
    links: [
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
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src={institutionalLogo} 
                  alt="Municipalidad de Tafí del Valle" 
                  className="h-32 w-auto brightness-0 invert opacity-80"
                />
              </div>
              <p className="text-sm leading-relaxed mb-6 font-body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Comprometidos con el desarrollo sustentable y la calidad de vida de los habitantes del Valle Sagrado.
              </p>
              <div className="flex gap-3">
                {[
                  { 
                    label: 'Facebook', 
                    href: 'https://www.facebook.com/share/1DXwoA8awU/', 
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M9.101 22.511c.49.073.969.11 1.431.11h3.937v-8.312h2.787l.417-3.238h-3.204V8.995c0-.938.26-1.578 1.606-1.578l1.716-.001V4.524c-.296-.039-1.314-.128-2.498-.128-2.47 0-4.16 1.508-4.16 4.276v2.388h-2.787v3.238h2.787v8.312h-.032z"/>
                      </svg>
                    )
                  },
                  { 
                    label: 'Instagram', 
                    href: 'https://www.instagram.com/turismoentafidelvalle', 
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    )
                  },
                  { 
                    label: 'TikTok', 
                    href: 'https://www.tiktok.com/@turismoentafidelvalle', 
                    icon: (
                      <svg viewBox="0 0 448 512" fill="currentColor" width="18" height="18">
                        <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"/>
                      </svg>
                    )
                  }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/10"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    aria-label={social.label}
                  >
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {social.icon}
                    </span>
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
