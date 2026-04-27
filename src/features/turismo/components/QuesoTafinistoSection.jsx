import { motion } from 'framer-motion';
import { Award, BookOpen, Utensils, History, MapPin, CheckCircle2, FlaskConical, TrendingUp } from 'lucide-react';

export default function QuesoTafinistoSection() {
  const highlights = [
    {
      icon: <Award className="text-amber-500" />,
      title: "Primera IG Láctea",
      desc: "El Queso de Tafí es el primer lácteo argentino en obtener la Indicación Geográfica (Resolución N° 31/2026)."
    },
    {
      icon: <History className="text-amber-500" />,
      title: "Historia Jesuítica",
      desc: "Una tradición que nació en 1718 con los monjes jesuíticos y se preservó inalterable por tres siglos."
    },
    {
      icon: <Utensils className="text-amber-500" />,
      title: "Identidad Única",
      desc: "Su sabor equilibra notas lácticas, manteca y oliva, reflejando la flora y microbiota única del valle."
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header con Badge de IG */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-8 border border-amber-100">
              <Award size={18} className="text-amber-600" />
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.2em]">Indicación Geográfica Registrada</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-stone-900 mb-8 font-heading leading-tight">
              El Corazón <br />
              del <span className="text-amber-600">Valle</span>
            </h2>
            
            <p className="text-stone-600 text-lg font-body leading-relaxed mb-8">
              Auténtico, ancestral y ahora con <strong className="text-stone-900 font-black tracking-tight">Reconocimiento Nacional</strong>. El Queso de Tafí del Valle es más que un alimento; es un <strong className="text-stone-900 font-black tracking-tight">Patrimonio Cultural</strong> que sintetiza tradición, territorio y un microclima excepcional situado entre los 2000 y 3000 msnm.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-amber-100 rounded-lg">
                  <CheckCircle2 size={16} className="text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Maduración Natural</h4>
                  <p className="text-xs text-stone-500">Mínimo de 30 días en el clima seco del valle.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-amber-100 rounded-lg">
                  <CheckCircle2 size={16} className="text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Origen Identificado</h4>
                  <p className="text-xs text-stone-500">Exclusividad de Tafí del Valle y El Mollar.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100 flex items-center gap-6">
              <div className="flex-1">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Producción Actual</p>
                <p className="text-2xl font-black text-stone-900">~6.000 <span className="text-sm font-bold text-stone-500">kg/mes</span></p>
              </div>
              <div className="w-px h-12 bg-stone-200" />
              <div className="flex-1">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Proyección Anual</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-black text-amber-600">146k</p>
                  <TrendingUp size={20} className="text-emerald-500" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual Showcase - Main Product Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="/assets/queso-tafi/producto.png" 
                alt="Queso Tafinisto Artesanal" 
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/10 to-transparent" />
              
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-amber-500 flex items-center justify-center bg-white/10 backdrop-blur-md">
                    <MapPin size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">Camino del Queso</p>
                    <p className="text-white/60 text-sm italic">Recorré las estancias productoras</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-200 rounded-full blur-[100px] opacity-30 -z-10" />
            <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-orange-200 rounded-full blur-[120px] opacity-20 -z-10" />
            
            {/* Floating Info Tag */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-8 top-1/2 z-20 px-6 py-4 bg-white rounded-2xl shadow-xl border border-amber-100 hidden md:block"
            >
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1 text-center">Perfil Sensorial</p>
              <div className="flex gap-4 items-center">
                <div className="text-center">
                  <span className="block text-xs font-bold text-stone-800">Suave</span>
                  <div className="w-8 h-1 bg-amber-500 rounded-full mx-auto" />
                </div>
                <div className="text-center">
                  <span className="block text-xs font-bold text-stone-800">Frutal</span>
                  <div className="w-8 h-1 bg-amber-400 rounded-full mx-auto" />
                </div>
                <div className="text-center">
                  <span className="block text-xs font-bold text-stone-800">Firme</span>
                  <div className="w-8 h-1 bg-amber-600 rounded-full mx-auto" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-stone-50 border border-stone-100 hover:border-amber-300 hover:bg-white hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-8 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                {h.icon}
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4 font-heading">{h.title}</h3>
              <p className="text-stone-500 font-body leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Technical/History Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img src="/assets/queso-tafi/paisaje.png" alt="Tafí del Valle" className="rounded-3xl shadow-xl w-full h-80 object-cover" />
                <div className="p-8 bg-amber-600 rounded-3xl text-white">
                  <FlaskConical size={32} className="mb-4 opacity-50" />
                  <h5 className="text-4xl font-black mb-2 font-heading">2800</h5>
                  <p className="text-sm font-body opacity-90 leading-tight">msnm: El tambo robotizado más alto del mundo.</p>
                </div>
              </div>
              <div className="space-y-4">
                <img src="/assets/queso-tafi/tabla.png" alt="Tabla de Quesos" className="rounded-3xl shadow-xl w-full h-[400px] object-cover" />
                <div className="px-6 py-4 bg-stone-900 rounded-2xl text-white text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-1">Tradición Viva</p>
                  <p className="text-lg font-black font-heading">56 Años</p>
                  <p className="text-[10px] text-white/50">Fiesta Nacional del Queso</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-12"
          >
            <div>
              <div className="flex items-center gap-2 text-amber-600 mb-6">
                <BookOpen size={20} />
                <span className="font-bold text-xs uppercase tracking-widest">Garantía de Calidad</span>
              </div>
              <h4 className="text-4xl font-black text-stone-900 mb-6 font-heading leading-tight">
                El Estándar <br />del Queso de Tafí
              </h4>
              <p className="text-stone-600 font-body text-lg leading-relaxed mb-6">
                Cada pieza es una horma cilíndrica de entre <strong className="text-stone-900">0,5 y 3 kilos</strong>, con corteza natural y masa compacta. Su color blanco-amarillento revela una dieta basada en pasturas naturales de montaña.
              </p>
              <ul className="space-y-4">
                {[
                  "Notas lácticas con matices de manteca y oliva",
                  "Textura firme, entre semidura y dura",
                  "Salado intermedio con ligeros tonos ácidos",
                  "Microbiota autóctona que garantiza la tipicidad"
                ].map((item, id) => (
                  <li key={id} className="flex items-center gap-3 text-stone-700 font-medium">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-stone-100">
              <div className="flex items-center gap-2 text-stone-400 mb-6 font-body text-xs italic">
                <History size={16} />
                "Uno de los quesos recibidos se ha pasado de tanto mezquinarlo" 
                <span className="text-stone-900 font-bold not-italic">— D. F. Sarmiento</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
