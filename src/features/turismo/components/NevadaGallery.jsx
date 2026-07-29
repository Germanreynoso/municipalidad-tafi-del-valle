import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const BASE = '/nieve';

// La foto del cerro abre la sección: es la única tomada por encima de las nubes.
const PORTADA = { id: 'cerroNubes', src: `${BASE}/cerro-nubes.webp` };

// El mosaico baja de la altura al pueblo: pinares, ruta y calles de la Villa.
// Los `span` teselan exacto: 2 columnas en mobile, 12 desde md.
const MOSAICO = [
  { id: 'pinarCerro',     src: `${BASE}/pinar-cerro.jpg`,      span: 'col-span-2 md:col-span-7' },
  { id: 'caminoPinar',    src: `${BASE}/camino-pinar.webp`,    span: 'col-span-1 row-span-2 md:col-span-5' },
  { id: 'mojones',        src: `${BASE}/mojones.webp`,         span: 'col-span-1 md:col-span-4' },
  { id: 'rutaValle',      src: `${BASE}/ruta-valle.webp`,      span: 'col-span-1 md:col-span-3' },
  { id: 'calleVilla',     src: `${BASE}/calle-villa.webp`,     span: 'col-span-1 row-span-2 md:col-span-5' },
  { id: 'pastizalNiebla', src: `${BASE}/pastizal-niebla.webp`, span: 'col-span-1 md:col-span-7' },
  { id: 'avenidaArboles', src: `${BASE}/avenida-arboles.webp`, span: 'col-span-1 md:col-span-4' },
  { id: 'portonEstancia', src: `${BASE}/porton-estancia.webp`, span: 'col-span-2 md:col-span-3' },
];

const FOTOS = [PORTADA, ...MOSAICO];

export default function NevadaGallery() {
  const { t } = useTranslation('tourism');
  const reduceMotion = useReducedMotion();
  const [abierta, setAbierta] = useState(null);
  const disparador = useRef(null);

  const pie = (id) => t(`snow.photos.${id}`);

  const abrir = (indice, elemento) => {
    disparador.current = elemento;
    setAbierta(indice);
  };

  const cerrar = useCallback(() => {
    setAbierta(null);
    disparador.current?.focus();
  }, []);

  const mover = useCallback((paso) => {
    setAbierta((actual) => (actual + paso + FOTOS.length) % FOTOS.length);
  }, []);

  // Teclado y bloqueo de scroll mientras el visor está abierto.
  useEffect(() => {
    if (abierta === null) return undefined;

    const onKeyDown = (evento) => {
      if (evento.key === 'Escape') cerrar();
      if (evento.key === 'ArrowRight') mover(1);
      if (evento.key === 'ArrowLeft') mover(-1);
    };

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [abierta, cerrar, mover]);

  const entrada = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
      };

  return (
    <section
      id="tafi-nevado"
      className="relative overflow-hidden bg-[#0B1622]"
      aria-labelledby="nevada-titulo"
    >
      {/* Luz fría entrando desde arriba a la izquierda */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_75%_at_12%_0%,rgba(37,99,168,0.32),transparent_62%)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Apertura: el texto a la izquierda, la foto del cerro a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          <Motion.div
            className="lg:col-span-5"
            variants={entrada}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="flex items-center gap-4 mb-7">
              <span aria-hidden="true" className="block h-px w-10 bg-[#8FC4E8]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8FC4E8] font-body">
                {t('snow.kicker')}
              </p>
            </div>

            <h2 id="nevada-titulo" className="mb-7">
              <span className="block font-body text-2xl sm:text-3xl font-light tracking-tight text-[#DCE9F2]/70">
                {t('snow.titleLine1')}
              </span>
              <span className="block font-heading text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight bg-gradient-to-br from-white via-[#E8F2F8] to-[#7FB6DE] bg-clip-text text-transparent">
                {t('snow.titleLine2')}
              </span>
            </h2>

            <p className="font-body text-base sm:text-lg leading-relaxed text-[#A9BECD] max-w-md">
              {t('snow.lead')}
            </p>
          </Motion.div>

          <Motion.div
            className="lg:col-span-7"
            variants={entrada}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <Foto
              foto={PORTADA}
              pie={pie(PORTADA.id)}
              indice={0}
              onAbrir={abrir}
              reduceMotion={reduceMotion}
              etiquetaAbrir={t('snow.openPhoto')}
              className="aspect-[3/2] rounded-[1.75rem] ring-1 ring-white/10 shadow-[0_40px_90px_-40px_rgba(127,182,222,0.55)]"
            />
          </Motion.div>
        </div>

        {/* Mosaico */}
        <Motion.div
          className="grid grid-cols-2 md:grid-cols-12 gap-2 sm:gap-3 auto-rows-[7.5rem] sm:auto-rows-[9.5rem] md:auto-rows-[12rem] lg:auto-rows-[16rem]"
          variants={
            reduceMotion ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }
          }
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {MOSAICO.map((foto, i) => (
            <Motion.div key={foto.id} className={foto.span} variants={entrada}>
              <Foto
                foto={foto}
                pie={pie(foto.id)}
                indice={i + 1}
                onAbrir={abrir}
                reduceMotion={reduceMotion}
                etiquetaAbrir={t('snow.openPhoto')}
                className="h-full rounded-xl sm:rounded-2xl ring-1 ring-white/5"
              />
            </Motion.div>
          ))}
        </Motion.div>
      </div>

      <AnimatePresence>
        {abierta !== null && (
          <Visor
            foto={FOTOS[abierta]}
            pie={pie(FOTOS[abierta].id)}
            onCerrar={cerrar}
            onMover={mover}
            reduceMotion={reduceMotion}
            textos={{
              close: t('snow.close'),
              prev: t('snow.prev'),
              next: t('snow.next'),
              counter: t('snow.counter', { current: abierta + 1, total: FOTOS.length }),
              dialog: t('snow.viewer'),
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Foto({ foto, pie, indice, onAbrir, reduceMotion, etiquetaAbrir, className = '' }) {
  return (
    <button
      type="button"
      onClick={(evento) => onAbrir(indice, evento.currentTarget)}
      aria-label={`${etiquetaAbrir}: ${pie}`}
      className={`group relative w-full overflow-hidden bg-[#16202B] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FC4E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1622] ${className}`}
    >
      <img
        src={foto.src}
        alt={pie}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover ${
          reduceMotion ? '' : 'transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]'
        }`}
      />

      {/* El pie aparece al pasar el mouse o al enfocar con teclado */}
      <span
        className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-left bg-gradient-to-t from-[#050B12]/90 via-[#050B12]/45 to-transparent opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
      >
        <span className="block font-body text-xs sm:text-sm leading-snug text-[#E8F2F8]">{pie}</span>
      </span>
    </button>
  );
}

function Visor({ foto, pie, onCerrar, onMover, reduceMotion, textos }) {
  const contenido = (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={textos.dialog}
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-5 bg-[#070E16]/95 backdrop-blur-xl px-14 py-6 sm:px-24 sm:py-10"
      onClick={onCerrar}
    >
      <button
        type="button"
        onClick={onCerrar}
        aria-label={textos.close}
        autoFocus
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full text-[#E8F2F8] bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FC4E8]"
      >
        <X size={22} />
      </button>

      <button
        type="button"
        onClick={(evento) => {
          evento.stopPropagation();
          onMover(-1);
        }}
        aria-label={textos.prev}
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full text-[#E8F2F8] bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FC4E8]"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        onClick={(evento) => {
          evento.stopPropagation();
          onMover(1);
        }}
        aria-label={textos.next}
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full text-[#E8F2F8] bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FC4E8]"
      >
        <ChevronRight size={22} />
      </button>

      <Motion.img
        key={foto.src}
        src={foto.src}
        alt={pie}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(evento) => evento.stopPropagation()}
        className="max-h-[74vh] max-w-full w-auto object-contain rounded-xl cursor-default"
      />

      <div className="max-w-xl text-center" onClick={(evento) => evento.stopPropagation()}>
        <p className="font-body text-sm sm:text-base text-[#E8F2F8] leading-snug">{pie}</p>
        <p className="mt-1.5 font-body text-[11px] uppercase tracking-[0.28em] text-[#8FC4E8]">
          {textos.counter}
        </p>
      </div>
    </Motion.div>
  );

  // Fuera del árbol de la página: el visor no debe heredar transforms ni overflow.
  return createPortal(contenido, document.body);
}
