import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, Download, Archive, Search } from 'lucide-react';

export default function Ordenanzas() {
  const { t } = useTranslation(['municipality', 'common']);

  const ordenanzas = [
    { range: "2016 a 2021", url: "https://drive.google.com/file/d/1TsOi6HfnearwMf99hIEpz7IvwglUP25v/view?usp=drive_link" },
    { range: "2011 a 2016", url: "https://drive.google.com/file/d/1eIya92ENoNwZl2TkyGL-y0tBhnLGiUF7/view?usp=drive_link" },
    { range: "2007 a 2011", url: "https://drive.google.com/file/d/17vqrpgfUr0IszY8IOPeNur7ebNbxlWdC/view?usp=drive_link" },
    { range: "2003 a 2007", url: "https://drive.google.com/file/d/1xHbzqB6bacmyioIhBSSQS0DsCXF7yiaw/view?usp=drive_link" },
    { range: "1996 a 2003", url: "https://drive.google.com/file/d/1ztDCkYTeiF-HI69OtsbB9o7N6C9ySz4c/view?usp=drive_link" },
    { range: "1980 a 1990", url: "https://drive.google.com/file/d/1jh1b7DSEnqt0zhInqv3i6f_isw38UU2c/view?usp=drive_link" },
  ];

  return (
    <div className="bg-white-warm min-h-screen">
      {/* Hero */}
      <div className="relative py-24 px-4 bg-stone-dark text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70 font-body">
            <Link to="/" className="hover:text-white transition-colors">{t('common:nav.home')}</Link>
            {' / '}{t('common:nav.municipality')}
          </p>
          <h1 className="text-5xl sm:text-6xl font-black mb-6 font-heading">
            Ordenanzas Históricas
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-body">
            Acceso público a los compendios de ordenanzas municipales de Tafí del Valle, ordenados por período.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-stone-100">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Archive size={24} />
             </div>
             <div>
               <h2 className="text-2xl font-black text-stone-dark font-heading">Archivos Digitalizados</h2>
               <p className="text-sm text-stone-500 font-body">Descarga los PDF completos por rango de años</p>
             </div>
          </div>

          <div className="grid gap-4">
            {ordenanzas.map((o, i) => (
              <a
                key={i}
                href={o.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-6 py-5 rounded-2xl border border-stone-200 bg-stone-50 transition-all duration-300 hover:shadow-lg hover:border-amber-300 hover:bg-white"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-white shadow-sm group-hover:bg-amber-600 transition-colors duration-300">
                  <FileText size={20} className="text-stone-dark group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-lg text-stone-dark font-heading group-hover:text-amber-700 transition-colors duration-300">Compendio PDF</p>
                  <p className="text-sm mt-1 text-stone-500 font-body">Período: <strong className="text-stone-700">{o.range}</strong></p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-600 group-hover:border-amber-200 group-hover:bg-amber-50 group-hover:text-amber-700 transition-all duration-300">
                  <span>Descargar</span>
                  <Download size={14} />
                </div>
                <Download
                  size={20}
                  className="sm:hidden flex-shrink-0 text-stone-400 group-hover:text-amber-600"
                />
              </a>
            ))}
          </div>

          <div className="mt-12 p-6 bg-sky-50 rounded-2xl border border-sky-100 flex gap-4">
             <div className="mt-1">
                <Search className="text-sky-600" size={20} />
             </div>
             <div>
               <h4 className="font-bold text-sky-900 mb-1">Transparencia Municipal</h4>
               <p className="text-sm text-sky-800/80 leading-relaxed">
                 Estos documentos están alojados en el Google Drive oficial de la municipalidad. 
                 Cualquier ciudadano puede acceder a ellos de forma libre y gratuita para su consulta.
               </p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
