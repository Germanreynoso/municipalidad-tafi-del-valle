import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Feather, Clock, MapPin, X, Sparkles } from 'lucide-react';
import { relatos, tiposRelato } from '../data/relatos';

const colorClasses = {
  sky: { badge: 'bg-sky/10 text-sky', dot: 'bg-sky' },
  earth: { badge: 'bg-earth/10 text-earth', dot: 'bg-earth' },
  primary: { badge: 'bg-primary/10 text-primary', dot: 'bg-primary' },
};

function RelatoModal({ relato, onClose }) {
  const tipo = tiposRelato[relato.tipo] || tiposRelato.cuento;
  const colors = colorClasses[tipo.color] || colorClasses.primary;

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-stone-dark/70 backdrop-blur-sm" onClick={onClose} />

      <motion.article
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        className="relative z-10 w-full max-w-3xl my-4 bg-white-warm rounded-[2rem] shadow-2xl overflow-hidden border border-stone-light"
      >
        {/* Header */}
        <header className="relative px-8 sm:px-12 pt-12 pb-8 bg-stone-dark text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[100px] rounded-full translate-x-1/3" />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Cerrar relato"
          >
            <X size={20} />
          </button>
          <div className="relative z-10">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-5 bg-white/10 text-white`}>
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
              {tipo.label}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-heading leading-tight mb-5 italic">
              {relato.titulo}
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/60 font-body uppercase tracking-widest">
              {relato.lugar && (
                <span className="flex items-center gap-1.5"><MapPin size={13} /> {relato.lugar}</span>
              )}
              {relato.tiempoLectura && (
                <span className="flex items-center gap-1.5"><Clock size={13} /> {relato.tiempoLectura} min de lectura</span>
              )}
              {relato.autor && (
                <span className="flex items-center gap-1.5"><Feather size={13} /> {relato.autor}</span>
              )}
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="px-8 sm:px-12 py-12">
          <div className="prose prose-lg max-w-none space-y-5">
            {relato.parrafos.map((p, i) => (
              <p
                key={i}
                className={`font-body leading-relaxed ${
                  p.trimStart().startsWith('—')
                    ? 'text-stone-dark pl-4 border-l-2 border-stone-light italic'
                    : i === 0
                    ? 'text-xl text-stone-dark first-letter:text-6xl first-letter:font-black first-letter:font-heading first-letter:text-earth first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]'
                    : 'text-lg text-stone'
                }`}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-stone-light text-right">
            {relato.autor && (
              <p className="text-lg font-black font-heading text-stone-dark italic">
                {relato.autor}
              </p>
            )}
            {relato.fecha && (
              <p className="text-sm text-stone/60 font-body italic mt-1">
                {relato.fecha}
              </p>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Relatos() {
  const { t } = useTranslation(['municipality', 'common']);
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white-warm min-h-screen">
      {/* Hero */}
      <div className="relative py-28 px-4 overflow-hidden bg-stone-dark">
        <div className="absolute inset-0 z-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, var(--color-primary) 0%, transparent 45%), radial-gradient(circle at 80% 70%, var(--color-earth) 0%, transparent 45%)',
        }} />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/60 font-body">
            <Link to="/" className="hover:text-white transition-colors">{t('common:nav.home')}</Link>
            {' / '} {t('municipality:tales.breadcrumb')}
          </p>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
            <BookOpen size={32} className="text-white" />
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 font-heading italic">
            {t('municipality:tales.title')}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-body leading-relaxed">
            {t('municipality:tales.subtitle')}
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <Sparkles className="mx-auto mb-5 text-earth/40" size={36} />
        <p className="text-lg text-stone font-body leading-relaxed">
          {t('municipality:tales.intro')}
        </p>
      </section>

      {/* Grilla de relatos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatos.map((relato, idx) => {
            const tipo = tiposRelato[relato.tipo] || tiposRelato.cuento;
            const colors = colorClasses[tipo.color] || colorClasses.primary;
            return (
              <motion.button
                key={relato.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelected(relato)}
                className="group text-left bg-white rounded-[2rem] p-8 shadow-card border border-stone-light hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${colors.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    {tipo.label}
                  </span>
                  <Feather size={20} className="text-stone/30 group-hover:text-earth transition-colors" />
                </div>

                <h3 className="text-2xl font-black text-stone-dark font-heading leading-tight mb-4 group-hover:text-earth transition-colors italic">
                  {relato.titulo}
                </h3>
                <p className="text-stone font-body leading-relaxed mb-8 flex-grow">
                  {relato.extracto}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-stone-light">
                  <div className="flex flex-col gap-1 text-[11px] text-stone/60 font-body uppercase tracking-widest">
                    {relato.lugar && (
                      <span className="flex items-center gap-1.5"><MapPin size={12} /> {relato.lugar}</span>
                    )}
                    {relato.tiempoLectura && (
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {relato.tiempoLectura} min</span>
                    )}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-earth group-hover:translate-x-1 transition-transform">
                    {t('municipality:tales.read')} →
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {selected && <RelatoModal relato={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
