import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Landmark, ExternalLink, Search, PlusCircle } from 'lucide-react';

export default function OportunidadesList() {
  const categorias = [
    {
      titulo: 'Financiamiento',
      icono: <Landmark className="text-emerald-500" size={24} />,
      color: 'bg-emerald-50 text-emerald-900 border-emerald-100',
      links: [
        { name: 'IDEP: Fondo para Fomento Turístico', url: 'https://idep.gov.ar/fondo-para-el-fomento-turistico/' },
        { name: 'CFI: Créditos', url: 'https://cfi.org.ar/creditos' },
        { name: 'Subsecretaría MiPyME', url: 'https://guiadetramites.tucuman.gob.ar/organismo/2296/subsecretaria-mipyme.html' }
      ]
    },
    {
      titulo: 'Capacitación',
      icono: <GraduationCap className="text-sky-500" size={24} />,
      color: 'bg-sky-50 text-sky-900 border-sky-100',
      links: [
        { name: 'IDEP: Aula Virtual y Cursos', url: 'https://idep.gov.ar/aulavirtual/cursos/' },
        { name: 'Fundación América', url: 'https://www.facebook.com/fundacionamerica' },
        { name: 'Portal de Empleo Tucumán', url: 'http://portal.empleotucuman.gob.ar/Portal/?page_id=21' },
        { name: 'Capacitaciones Adicionales', url: 'https://www.facebook.com/profile.php?id=100086521234452' }
      ]
    }
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-stone-900 font-heading mb-4">Desarrollo Local y Oportunidades</h2>
          <div className="w-20 h-1.5 bg-primary rounded-full" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {categorias.map((cat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`p-6 rounded-3xl border shadow-sm ${cat.color}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white p-3 rounded-2xl shadow-sm">
                {cat.icono}
              </div>
              <h3 className="text-xl font-bold font-heading">{cat.titulo}</h3>
            </div>
            
            {cat.desc && (
              <p className="text-sm opacity-80 mb-6 font-body">
                {cat.desc}
              </p>
            )}

            <div className="space-y-3">
              {cat.links.map((link, linkIdx) => (
                <a 
                  key={linkIdx}
                  href={link.url}
                  target={link.isInternal ? '_self' : '_blank'}
                  rel="noreferrer"
                  className="group flex flex-col p-3 bg-white/60 hover:bg-white rounded-xl transition-all"
                >
                  <span className="text-sm font-bold flex items-center justify-between">
                    {link.name}
                    {link.icon ? link.icon : <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
