import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, MapPin, Utensils, Hotel, Calendar, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { searchIndex } from '../../data/searchIndex';

export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose ? onClose() : null;
      }
      if (!isOpen) return;

      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
      }
      if (e.key === 'Enter' && results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    // Nota: El searchIndex por ahora es estático y está en español.
    // Una mejora futura sería que el searchIndex use claves I18N.
    const filtered = searchIndex.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item) => {
    if (item.external) {
      window.open(item.external, '_blank');
    } else if (item.type === 'atraccion') {
      navigate(item.to, { state: { openAttrId: item.id } });
    } else if (item.category === 'Emergencias') {
      const phone = item.description.match(/\d+/g)?.join('');
      if (phone) window.location.href = `tel:${phone}`;
    } else {
      navigate(item.to);
    }
    onClose ? onClose() : null;
  };

  const getIcon = (category) => {
    switch (category) {
      case 'Turismo':
      case 'Tourism': return <MapPin size={18} />;
      case 'Gastronomía':
      case 'Gastronomy': return <Utensils size={18} />;
      case 'Alojamiento':
      case 'Accommodation': return <Hotel size={18} />;
      case 'Cultura':
      case 'Culture': return <Calendar size={18} />;
      default: return <Search size={18} />;
    }
  };

  const mapCategory = (category) => {
    const catMap = {
      'Página': 'page',
      'Municipio': 'municipality',
      'Cultura': 'culture',
      'Turismo': 'tourism',
      'Atracción': 'attraction',
      'Gastronomía': 'gastronomy',
      'Alojamiento': 'accommodation',
      'Emergencias': 'emergencies'
    };
    const key = catMap[category] || category.toLowerCase();
    return t(`search.categories.${key}`, { defaultValue: category });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200"
          >
            {/* Search Input Area */}
            <div className="flex items-center px-6 py-5 border-b border-stone-100 bg-stone-50/50">
              <Search className="text-primary mr-4" size={24} />
              <input
                ref={inputRef}
                type="text"
                placeholder={t('search.placeholderDetailed')}
                className="flex-1 bg-transparent border-none outline-none text-xl text-stone-dark font-body placeholder:text-stone/40"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <span className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-stone-200 text-[10px] font-bold text-stone uppercase tracking-tighter">
                  <Command size={10} /> K
                </span>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-stone-200 rounded-full transition-colors"
                >
                  <X size={20} className="text-stone" />
                </button>
              </div>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.length === 0 ? (
                <div className="py-12 px-6 text-center">
                  <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                    <Search size={32} />
                  </div>
                  <h3 className="text-lg font-black text-stone-dark font-heading">{t('search.smartSearch')}</h3>
                  <p className="text-stone font-body text-sm mt-2 max-w-xs mx-auto">
                    {t('search.smartSearchDesc')}
                  </p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 ${
                        selectedIndex === index ? 'bg-primary text-white' : 'hover:bg-stone-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        selectedIndex === index ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone'
                      }`}>
                        {getIcon(item.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-black font-heading text-lg truncate">{item.title}</span>
                          <span className={`text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded ${
                            selectedIndex === index ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-dark'
                          }`}>
                            {mapCategory(item.category)}
                          </span>
                        </div>
                        <p className={`text-xs font-body truncate ${
                          selectedIndex === index ? 'text-white/80' : 'text-stone'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                      <ArrowRight size={18} className={selectedIndex === index ? 'opacity-100' : 'opacity-0'} />
                    </button>
                  ))}
                </div>
              ) : query.length >= 2 ? (
                <div className="py-12 text-center text-stone">
                  <p className="font-body">{t('search.noResults')} "<span className="font-bold">{query}</span>"</p>
                  <p className="text-sm mt-1">{t('search.noResultsDesc')}</p>
                </div>
              ) : null}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone font-bold uppercase tracking-widest">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">↑↓ {t('search.navigation')}</span>
                <span className="flex items-center gap-1">↲ {t('search.select')}</span>
              </div>
              <span>{t('search.close')}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
