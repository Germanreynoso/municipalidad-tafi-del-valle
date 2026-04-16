import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, X, Menu } from 'lucide-react';
import institutionalLogo from '../assets/MUNICIPALIDAD INSTITUCIONAL COLOR.png';

const navLinks = [
  { label: 'Inicio', to: '/' },
  {
    label: 'Municipio',
    submenu: [
      { label: 'Autoridades', to: '#' },
      { label: 'Historia', to: '/historia' },
      { label: 'Perfil del Valle', to: '/perfil-valle' },
      { label: 'Fiestas y Tradiciones', to: '/tradiciones' },
      { label: 'Ordenanzas', to: '#' },
    ],
  },
  { label: 'Turismo', to: '/turismo' },
  { label: 'Transparencia', to: '/institucional' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,1)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? 'var(--shadow-nav)' : '0 1px 0 rgba(0,0,0,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-40">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={institutionalLogo} 
                alt="Municipalidad de Tafí del Valle" 
                className="h-32 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((item) =>
                item.submenu ? (
                  <div key={item.label} className="relative group">
                    <button
                      className="flex items-center gap-1 text-sm font-semibold pb-1 border-b-2 border-transparent transition-all duration-200 hover:border-stone-dark text-stone-dark font-body"
                    >
                      {item.label}
                      <ChevronDown size={14} className="opacity-60" />
                    </button>
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.to}
                          className="block px-4 py-3 text-sm text-stone-dark font-body hover:bg-primary-light first:rounded-t-xl last:rounded-b-xl transition-colors duration-150"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="text-sm font-semibold pb-1 border-b-2 transition-all duration-200 text-stone-dark font-body"
                    style={{
                      borderColor: location.pathname === item.to ? 'var(--color-primary)' : 'transparent',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-stone-dark"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col p-6">
            <div className="flex justify-between items-center mb-8">
              <p className="font-black text-lg text-stone-dark font-heading">Menú</p>
              <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
                <X size={24} className="text-stone" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((item) =>
                item.submenu ? (
                  <div key={item.label}>
                    <p className="text-xs font-semibold uppercase tracking-widest px-3 py-2 text-stone font-body">
                      {item.label}
                    </p>
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.to}
                        className="block px-6 py-2 text-sm text-stone-dark font-body rounded-lg hover:bg-primary-light transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="px-3 py-3 rounded-lg text-sm font-semibold text-stone-dark font-body transition-colors duration-150"
                    style={{
                      backgroundColor: location.pathname === item.to ? 'var(--color-primary-light)' : 'transparent',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
