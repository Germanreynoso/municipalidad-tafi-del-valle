import { Link } from 'react-router-dom';
import { noticias, documentos } from './data/noticias.js';
import NoticiaCard from './components/NoticiaCard.jsx';
import DocumentoItem from './components/DocumentoItem.jsx';

export default function InstitucionalPage() {
  return (
    <div>
      {/* Hero */}
      <div
        className="relative py-24 px-4"
        style={{ background: 'linear-gradient(135deg, var(--color-earth) 0%, #6B4E2E 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70 font-body">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            {' / '}Portal Institucional
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight font-heading">
            Transparencia
          </h1>
          <p className="text-lg text-white/80 max-w-xl font-body">
            Noticias de gestión, documentos oficiales y gobierno abierto.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black mb-8 text-stone-dark font-heading">Últimas noticias</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {noticias.map((n) => <NoticiaCard key={n.id} {...n} />)}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black mb-8 text-stone-dark font-heading">Documentos</h2>
            <div className="space-y-3">
              {documentos.map((d) => <DocumentoItem key={d.id} {...d} />)}
            </div>

            {/* Official Status Card */}
            <div className="mt-12 p-8 rounded-3xl border border-stone-light bg-stone-light/20">
              <h3 className="text-xl font-black mb-4 text-stone-dark font-heading">Status Institucional</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone mb-1">Declaración Oficial</p>
                  <p className="text-sm font-semibold text-stone-dark">Municipio Turístico (Ley 8.791)</p>
                  <p className="text-xs text-stone">Promulgada el 15 de junio de 2015</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone mb-1">Categorización</p>
                  <p className="text-sm font-semibold text-stone-dark text-primary">Municipio Turístico de Primer Orden</p>
                  <p className="text-xs text-stone">Reconocido por el Ente Tucumán Turismo (Mayo 2018)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-4 text-center" style={{ backgroundColor: '#EDE8E3' }}>
        <h3 className="text-2xl font-black mb-3 font-heading" style={{ color: 'var(--color-earth)' }}>
          Gobierno Abierto
        </h3>
        <p className="text-sm mb-6 text-stone font-body">Toda la información de gestión está disponible para los ciudadanos.</p>
        <a
          href="#"
          className="inline-block px-8 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 font-body"
          style={{ backgroundColor: 'var(--color-earth)' }}
        >
          Ver informe de gestión
        </a>
      </div>
    </div>
  );
}
