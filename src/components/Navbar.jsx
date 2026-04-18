import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, X, Menu, Search } from 'lucide-react';
import institutionalLogo from '../assets/MUNICIPALIDAD INSTITUCIONAL COLOR.png';
import LanguageSwitcher from './common/LanguageSwitcher';

export default function Navbar({ onSearchOpen }) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: t('nav.home'), to: '/' },
    {
      label: t('nav.municipality'),
      submenu: [
        { label: t('nav.authorities'), to: '/autoridades' },
        { label: t('nav.history'), to: '/historia' },
        { label: t('nav.valleyProfile'), to: '/perfil-valle' },
        { label: t('nav.traditions'), to: '/tradiciones' },
        { label: t('nav.ordinances'), to: '#' },
      ],
    },
    { 
      label: t('nav.tourism'), 
      submenu: [
        { label: t('nav.mainPortal'), to: '/turismo' },
        { label: t('nav.accommodation'), to: '/turismo/alojamiento' },
        { label: t('nav.gastronomy'), to: '/turismo/gastronomia' },
        { label: t('nav.whatToDo'), to: '/turismo/que-hacer' },
      ]
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onSearchOpen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearchOpen]);

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
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((item) =>
                item.submenu ? (
                  <div key={item.label} className="relative group">
                    <button
                      className="flex items-center gap-1 text-base font-semibold pb-1 border-b-2 border-transparent transition-all duration-200 hover:border-stone-dark text-stone-dark font-body"
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
                    className="text-base font-semibold pb-1 border-b-2 transition-all duration-200 text-stone-dark font-body"
                    style={{
                      borderColor: location.pathname === item.to ? 'var(--color-primary)' : 'transparent',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              )}

              {/* Botón de Búsqueda */}
              <button
                onClick={onSearchOpen}
                className="flex items-center gap-3 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-dark rounded-xl transition-all duration-200 border border-stone-200 group"
              >
                <Search size={18} className="text-primary" />
                <span className="text-sm font-semibold opacity-60 group-hover:opacity-100">{t('search.placeholder')}</span>
                <span className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded bg-white text-[9px] font-bold text-stone/60 border border-stone-200">
                  <span className="text-[11px]">⌘</span>K
                </span>
              </button>
              <LanguageSwitcher />
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-4">
              <LanguageSwitcher />
              <button
                className="p-2 rounded-lg text-stone-dark bg-stone-100"
                onClick={onSearchOpen}
                aria-label="Buscar"
              >
                <Search size={22} />
              </button>
              <button
                className="p-2 rounded-lg text-stone-dark"
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu size={24} />
              </button>
            </div>
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
              <p className="font-black text-lg text-stone-dark font-heading">{t('search.menu')}</p>
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
                        className="block px-6 py-2.5 text-base text-stone-dark font-body rounded-lg hover:bg-primary-light transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="px-4 py-4 rounded-lg text-base font-semibold text-stone-dark font-body transition-colors duration-150"
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
