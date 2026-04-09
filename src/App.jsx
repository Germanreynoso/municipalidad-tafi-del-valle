import React, { useState } from 'react';
import { Search, Megaphone, FileText, Mountain, ChevronDown, Map, Newspaper } from 'lucide-react';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('inicio');

  const menuItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'municipio', label: 'Municipio', hasSubmenu: true },
    { id: 'turismo', label: 'Turismo', hasSubmenu: true },
    { id: 'tramites', label: 'Trámites', hasSubmenu: true },
    { id: 'contacto', label: 'Contacto' },
  ];

  const services = [
    {
      id: 1,
      title: 'Novedades',
      description: 'Últimas noticias y novedades del municipio',
      link: 'Ver más',
      icon: <Megaphone size={32} className="text-[#8B4513]" />,
      color: 'bg-[#FDF8E1]',
    },
    {
      id: 2,
      title: 'Servicios al Vecino',
      description: 'Trámites y servicios para los ciudadanos',
      link: 'Más info',
      icon: <FileText size={32} className="text-[#5D4037]" />,
      color: 'bg-[#F5F5F5]',
    },
    {
      id: 3,
      title: 'Descubrí Tafí',
      description: 'Lugares y actividades para visitar',
      link: 'Explorar',
      icon: <Mountain size={32} className="text-[#2E7D32]" />,
      color: 'bg-[#E8F5E9]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#2E7D32] rounded flex items-center justify-center">
                   <Mountain className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-[10px] leading-tight font-bold tracking-widest text-gray-500">LOGO</p>
                  <p className="text-sm font-black text-[#4A4A4A] tracking-tighter">MUNICIPALIDAD</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="hidden md:flex items-center gap-10">
              {menuItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => setActiveMenu(item.id)}
                    className={`flex items-center gap-1 text-sm font-semibold transition-all duration-200 border-b-2 ${
                      activeMenu === item.id
                        ? 'text-gray-900 border-[#8B4513]'
                        : 'text-gray-600 border-transparent hover:text-gray-900'
                    } pb-1`}
                  >
                    {item.label}
                    {item.hasSubmenu && <ChevronDown size={14} className="opacity-50" />}
                  </button>

                  {item.hasSubmenu && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">Submenú 1</a>
                      <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">Submenú 2</a>
                    </div>
                  )}
                </div>
              ))}
              <Search size={20} className="text-gray-400 cursor-pointer hover:text-gray-600 ml-4" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[550px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] tracking-tight">
            Bienvenidos a Tafí del Valle
          </h1>

          <div className="flex flex-col sm:flex-row gap-6">
            <button className="px-10 py-5 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white rounded-md font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-lg">
              Guía Turística
              <span className="text-xl">›</span>
            </button>

            <button className="px-10 py-5 bg-[#EDE9DD] text-[#5D4037] rounded-md font-bold flex items-center gap-3 hover:bg-[#E5DDC8] transition-all shadow-md border border-gray-300">
              Boletín Oficial
              <span className="text-xl">›</span>
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="relative z-10 -mt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-500 p-8 flex flex-col items-start transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="mb-6 p-4 rounded-full bg-opacity-10" style={{ backgroundColor: service.color }}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#333333] mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-base mb-8 leading-relaxed">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="flex items-center gap-2 text-[#2E7D32] font-bold hover:gap-4 transition-all"
                >
                  {service.link}
                  <span className="text-xl leading-none">›</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-[#F9F9F7] py-24 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                     <h2 className="text-4xl font-black text-[#5D4037] mb-6">Comprometidos con el desarrollo local</h2>
                     <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        Trabajamos día a día para mejorar la calidad de vida de nuestros habitantes, preservando la belleza natural que nos rodea y promoviendo un turismo sustentable.
                     </p>
                     <div className="flex gap-4">
                        <div className="flex flex-col">
                            <span className="text-3xl font-black text-[#2E7D32]">100%</span>
                            <span className="text-sm text-gray-500">Transparencia</span>
                        </div>
                        <div className="w-px h-12 bg-gray-200"></div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black text-[#2E7D32]">+10k</span>
                            <span className="text-sm text-gray-500">Vecinos beneficiados</span>
                        </div>
                     </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        alt="Tafi del Valle" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#333333] text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>© 2026 Municipalidad de Tafí del Valle. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
