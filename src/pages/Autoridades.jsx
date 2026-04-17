import { Link } from 'react-router-dom';
import { autoridades } from '../features/institucional/data/autoridades.js';
import { ShieldCheck, Briefcase, User } from 'lucide-react';
import intendentePhoto from '../assets/intendente.jpeg';

export default function Autoridades() {
  return (
    <div className="bg-white-warm min-h-screen">
      {/* Header Section */}
      <div 
        className="relative py-24 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-earth) 0%, #6B4E2E 100%)' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70 font-body">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            {' / '}Municipio
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-tight font-heading">
            Autoridades <br />
            <span className="text-white/60">Municipales</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl font-body">
            Conozca a los responsables de las distintas áreas de la gestión municipal, 
            trabajando por el bienestar de Tafí del Valle.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full border-l-[1px] border-white transform skew-x-12"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Intendente Card */}
        <div className="mb-24">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-light group hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 relative h-80 md:h-auto bg-stone-light overflow-hidden">
                <img 
                  src={intendentePhoto} 
                  alt={autoridades.intendente.nombre} 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
                <p className="text-earth font-bold uppercase tracking-widest text-sm mb-2 font-body">Intendente Municipal</p>
                <h2 className="text-3xl md:text-4xl font-black text-stone-dark mb-4 font-heading">{autoridades.intendente.nombre}</h2>
                <p className="text-stone leading-relaxed font-body">
                  Responsable de la conducción política y administrativa del municipio, 
                  liderando proyectos estratégicos para el desarrollo de nuestra comunidad.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Secretarias Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[2px] w-12 bg-earth opacity-30"></div>
            <h3 className="text-3xl font-black text-stone-dark font-heading">Gabinete Municipal</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {autoridades.secretarias.map((sec, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-2xl border border-stone-light hover:border-earth/30 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-earth/5 flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-earth" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-stone-dark mb-1 font-heading">{sec.nombre}</h4>
                    <p className="text-earth font-semibold text-sm uppercase tracking-wide font-body">{sec.cargo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direcciones Section */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[2px] w-12 bg-earth opacity-30"></div>
            <h3 className="text-3xl font-black text-stone-dark font-heading">Direcciones y Áreas</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {autoridades.direcciones.map((dir, idx) => (
              <div 
                key={idx} 
                className="bg-white/50 p-6 rounded-xl border border-stone-light/50 hover:bg-white transition-all duration-200 group"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-lg bg-stone-light flex items-center justify-center shrink-0 group-hover:bg-earth/10 group-hover:text-earth transition-colors">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-stone-dark leading-tight font-heading group-hover:text-earth transition-colors">{dir.nombre}</h5>
                    <p className="text-stone text-xs font-medium uppercase tracking-wider mt-1 font-body">{dir.cargo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer CTA */}
      <div className="py-20 bg-stone-dark text-white text-center px-4">
        <h3 className="text-3xl font-black mb-6 font-heading">¿Necesita contactarse con alguna área?</h3>
        <p className="text-white/60 mb-8 max-w-xl mx-auto font-body">
          Estamos a su disposición para resolver cualquier duda o consulta sobre los servicios municipales.
        </p>
        <Link 
          to="/contacto"
          className="inline-block px-10 py-4 bg-white text-stone-dark font-black rounded-xl hover:scale-105 transition-transform duration-200 font-body"
        >
          Ir a Contacto
        </Link>
      </div>
    </div>
  );
}
