import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { fadeUp, stagger } from '../styles/motion.js';
import InstagramEmbed from './common/InstagramEmbed.jsx';
import { novedades, INSTAGRAM_PROFILE } from '../data/novedades.js';

// lucide-react ya no incluye íconos de marcas; glifo de Instagram inline.
function InstagramIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function NovedadesSection() {
  const { t } = useTranslation('home');
  const ultimas = novedades.slice(0, 3);

  if (ultimas.length === 0) return null;

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-stone font-body">
            {t('news.kicker')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-stone-dark font-heading">
            {t('news.title')}
          </h2>
        </Motion.div>

        <Motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {ultimas.map((novedad) => (
            <Motion.div key={novedad.id} variants={fadeUp} className="w-full flex justify-center">
              <InstagramEmbed url={novedad.url} />
            </Motion.div>
          ))}
        </Motion.div>

        <Motion.div
          className="mt-12 flex justify-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <a
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl font-bold text-white flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:opacity-90 bg-primary font-body"
          >
            <InstagramIcon size={18} /> {t('news.cta')}
          </a>
        </Motion.div>
      </div>
    </section>
  );
}
