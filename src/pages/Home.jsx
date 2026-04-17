import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Mountain, Camera } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { fadeUp, stagger, slideLeft } from '../styles/motion.js';
import PortalCard from '../components/PortalCard.jsx';
import { noticias } from '../features/institucional/data/noticias.js';
import somosTodosLogo from '../assets/SOMOS TODOS COLOR.png';
import heroTafi from '../assets/hero-tafi.jpg';
import residentesImg from '../assets/residentes.jpg';
import turistaImg from '../assets/turista.jpg';
import transparenciaImg from '../assets/transparencia.jpg';

const portals = [
  {
    title: 'Soy Residente',
    subtitle: 'Portal Ciudadano',
    description: 'Trámites, pagos de tasas, reclamos y servicios municipales para vecinos.',
    image: residentesImg,
    to: '/ciudadano',
    accentColor: '--color-primary',
  },
  {
    title: 'Soy Turista',
    subtitle: 'Portal Turístico',
    description: 'Descubrí los paisajes, la cultura y la gastronomía del Valle Sagrado de Tafí.',
    image: turistaImg,
    to: '/turismo',
    accentColor: '--color-sky',
  },
];

const stats = [
  { valor: '12.000', label: 'Habitantes', icono: <Users size={20} /> },
  { valor: '2.000m', label: 'Altura sobre el mar', icono: <Mountain size={20} /> },
  { valor: '6', label: 'Atracciones destacadas', icono: <Camera size={20} /> },
  { valor: '150km', label: 'Desde Tucumán capital', icono: <MapPin size={20} /> },
];

function formatFecha(isoDate) {
  return new Date(isoDate).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Home() {
  const noticiasRecientes = noticias.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: 'calc(100vh - 80px)', minHeight: '560px' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroTafi})`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(45,80,22,0.6) 0%, rgba(0,0,0,0.3) 100%)',
            }}
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4 font-body">
            Provincia de Tucumán — Argentina
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-none font-heading"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.4)' }}
          >
            Tafí del Valle
          </h1>
          <p className="text-lg sm:text-xl text-white/85 mb-10 max-w-xl leading-relaxed font-body">
            El valle sagrado de los Calchaquíes, a 2.000 metros sobre el mar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/turismo"
              className="px-8 py-4 rounded-xl font-bold text-white flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:opacity-90 bg-primary font-body"
            >
              Guía Turística <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Portal Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-stone font-body">
            Accesos directos
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-stone-dark font-heading">
            ¿Qué necesitás?
          </h2>
        </Motion.div>
        <Motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {portals.map((portal) => (
            <Motion.div key={portal.to} variants={fadeUp}>
              <PortalCard {...portal} />
            </Motion.div>
          ))}
        </Motion.div>
      </section>

      {/* Stats Bar */}
      <section className="bg-stone-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat) => (
              <Motion.div key={stat.label} variants={slideLeft} className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-primary-light text-primary">
                  {stat.icono}
                </div>
                <p className="text-3xl font-black text-primary font-heading">{stat.valor}</p>
                <p className="text-sm text-stone font-body">{stat.label}</p>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* Slogan Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <Motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img 
              src={somosTodosLogo} 
              alt="Somos Todos" 
              className="h-32 md:h-48 h-auto object-contain transition-transform duration-500 hover:scale-110"
            />
            <p className="mt-8 text-xl font-body italic text-stone max-w-2xl mx-auto">
              "Una gestión comprometida con el bienestar de cada familia tafinista, 
              trabajando juntos por el presente y el futuro de nuestro valle."
            </p>
          </Motion.div>
        </div>
      </section>

    </div>
  );
}
