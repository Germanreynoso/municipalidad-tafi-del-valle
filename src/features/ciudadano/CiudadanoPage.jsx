import { Link } from 'react-router-dom';
import { tramites, servicios } from './data/tramites.js';
import TramiteCard from './components/TramiteCard.jsx';
import ServiciosList from './components/ServiciosList.jsx';

export default function CiudadanoPage() {
  return (
    <div>
      {/* Hero */}
      <div
        className="relative py-24 px-4"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-mid) 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70 font-body">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            {' / '}Portal Ciudadano
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight font-heading">
            Soy Residente
          </h1>
          <p className="text-lg text-white/80 max-w-xl font-body">
            Accedé a trámites, pagos y servicios municipales sin salir de casa.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black mb-8 text-stone-dark font-heading">Trámites disponibles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tramites.map((t) => <TramiteCard key={t.id} {...t} />)}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black mb-8 text-stone-dark font-heading">Servicios</h2>
            <ServiciosList servicios={servicios} />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-4 text-center bg-primary-light">
        <h3 className="text-2xl font-black mb-3 text-primary font-heading">¿No encontrás lo que buscás?</h3>
        <p className="text-sm mb-6 text-stone font-body">Contactá directamente a la municipalidad por teléfono o en persona.</p>
        <a href="#" className="inline-block px-8 py-3 rounded-xl font-bold text-white bg-primary transition-all duration-200 hover:scale-105 font-body">
          Contacto
        </a>
      </div>
    </div>
  );
}
