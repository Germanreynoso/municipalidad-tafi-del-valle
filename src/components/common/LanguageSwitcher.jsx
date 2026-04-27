import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLang = i18n.language || 'es';

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100/80 rounded-full border border-stone-200/50 backdrop-blur-sm">
      <Globe size={14} className="text-stone-400 mr-1" />
      <div className="flex items-center gap-1">
        {['es', 'en'].map((lng) => (
          <button
            key={lng}
            onClick={() => changeLanguage(lng)}
            className={`relative px-2 py-0.5 text-[10px] font-black uppercase transition-all duration-300 rounded-md ${
              currentLang.startsWith(lng) ? 'text-primary' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            {lng}
            {currentLang.startsWith(lng) && (
              <Motion.div
                layoutId="activeLang"
                className="absolute inset-0 bg-white shadow-sm rounded-md -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
