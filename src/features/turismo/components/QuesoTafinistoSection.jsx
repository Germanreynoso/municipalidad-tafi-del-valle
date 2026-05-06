import { motion } from 'framer-motion';
import { Award, BookOpen, Utensils, History, MapPin, CheckCircle2, FlaskConical, TrendingUp, Calendar, Globe, ShieldCheck, Quote, Landmark } from 'lucide-react';

export default function QuesoTafinistoSection() {
  const highlights = [
    {
      icon: <Award className="text-amber-500" />,
      title: "Primera IG Láctea",
      desc: "El Queso de Tafí es el primer lácteo argentino en obtener la Indicación Geográfica (Resolución N° 31/2026)."
    },
    {
      icon: <History className="text-amber-500" />,
      title: "Tradición Centenaria",
      desc: "Fabricados desde el siglo XVIII, su prestigio ya era reconocido en la época colonial e incluso premiados en Europa."
    },
    {
      icon: <Utensils className="text-amber-500" />,
      title: "Identidad Única",
      desc: "Su peculiar gustito proviene de elementos autóctonos como el pasto algarrobillo y los lamederos de las montañas."
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
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.2em]">Sello Oficial de Origen</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-stone-900 mb-8 font-heading leading-tight">
              El Corazón <br />
              del <span className="text-amber-600">Valle</span>
            </h2>
            
            <p className="text-stone-600 text-lg font-body leading-relaxed mb-8">
              Auténtico, ancestral y ahora con <strong className="text-stone-900 font-black tracking-tight">Indicación Geográfica (Resolución N° 31/2026)</strong>. El Queso de Tafí del Valle es el primer queso argentino en obtener un sello oficial de origen. Protegiendo su nombre y certificando su vínculo con el territorio bajo la Ley 25.380.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-amber-100 rounded-lg">
                  <CheckCircle2 size={16} className="text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Maduración Natural</h4>
                  <p className="text-xs text-stone-500">Mínimo de 30 días para una textura firme.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-amber-100 rounded-lg">
                  <CheckCircle2 size={16} className="text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Origen Exclusivo</h4>
                  <p className="text-xs text-stone-500">Tafí del Valle y El Mollar.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100 flex items-center gap-6">
              <div className="flex-1">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Impacto Global</p>
                <div className="flex items-center gap-2">
                  <Globe size={24} className="text-amber-600" />
                  <p className="text-sm font-bold text-stone-900 leading-tight">Abre mercados y fortalece la competitividad internacional.</p>
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
                src="/assets/queso-tafi/queso-ig-hero.jpg" 
                alt="Queso Tafinisto Artesanal" 
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/10 to-transparent" />
              
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-amber-500 flex items-center justify-center bg-white/10 backdrop-blur-md">
                    <ShieldCheck size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">Sello IG Aprobado</p>
                    <p className="text-white/60 text-sm italic">Secretaría de Agricultura, Ganadería y Pesca</p>
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
                  <span className="block text-xs font-bold text-stone-800">Láctico</span>
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

        {/* Texto Literal de Historia y Sello de Origen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-stone-50 rounded-[3rem] p-10 md:p-16 border border-stone-100"
        >
          <div className="prose prose-lg prose-stone max-w-4xl mx-auto font-body text-stone-700 space-y-6">
            <h3 className="text-3xl font-black text-stone-900 font-heading mb-6">Historia de los Quesos de Tafí</h3>
            <p>
              Los primeros datos de nuestro producto lo podemos encontrar en el diario tucumano “La Razón”, del 23 de diciembre de 1877. Este medio nformaba que había sido llevado a Buenos Aires un singular queso de Tafí, que sería embarcado a Europa, para participar en la Exposición de Paris, el queso de que hablamos media “ 155 cm de diámetro y 15 cm de altura”, precisaba.
            </p>
            <p>
              En realidad, enviar a Paris el queso gigante, no hacia más que reconocer el prestigio, ya más que centenario entonces, que tenía esa artesanía alimenticia del valle de Tafí. Antiguos informes de la época colonial, ya mencionaban reiteradamente los quesos, fabricados desde el siglo XVIII, tarea que proseguía sin interrupción hasta hoy en esos idílicos parajes tucumanos.
            </p>
            <p>
              En setiembre de 1818, don José Manuel Silva, poderoso estanciero de Tafí, escribía a su apoderado Miguel Ambrosio Gutierrez, de Buenos Aires, congratulándose de haber podido ubicar 1000 quesos en ese mercado. “Amigo, hemos puesto una pica en Flandes con esta venta”, le decía.
            </p>
            <p>
              Los quesos eran considerados un regalo sumamente apreciado. Domingo Faustino Sarmiento los estimaba muchísimo. En 1871, su amigo tucumano Jose Posse le prometía: “Los quesos de Tafí te irán oportunamente, allá por abril, que es la estación en que se hacen buenos”. Sin embargo, recién se los pudo enviar en julio, según revela otra carta al sanjuanino: “junto con esta carta te serán entregados dos quesos de Tafí forrados en lata, que te mando por conducto de mi yerno Ledesma. Que te salgan buenos y los devores en buena compañía, son los deseos de tu amigo”. En la posdata, le encargaba alcanzarle “una tajadita” a Dalmacio Velez Sarsfield.
            </p>
            <p>
              Por noviembre, Sarmiento contesto: “No sé si te he escrito que recibí los quesos, uno era exquisito, y el otro … a fuerza de mezquinarlo se desmejoro”.
            </p>
            <p>
              Se sabe que en las últimas décadas del siglo, se consumían copiosamente en Buenos Aires los quesos de Tafí. La “Memoria descriptiva” de 1882 asegura que Tucumán enviaba el producto, por un valor cercano a los 30.000 pesos, toda una suma para la época.
            </p>
            <p>
              Los expertos califican al Queso Tafí como un especial tipo de “fontina suave”. Pero la verdad es que no se sabe a que se debe ese peculiar gustito que fascinaba a Sarmiento. Muchos dicen que se trata de un pasto – el algarrobillo – que crece en la zona y que las vacas ingieren. Otros dicen que la clave esta en varios otros elementos autóctonos: por ejemplo, los “lamederos” de las laderas montañosas, por donde las vacas pasan la lengua para obtener sal.
            </p>
            <p className="italic font-medium text-stone-500">
              Datos aportados por Jacinto E. Moreno
            </p>

            <div className="my-16 border-t border-stone-200"></div>

            <h3 className="text-3xl font-black text-stone-900 font-heading mb-6">Nuestro Queso de Tafí tiene sello de origen.</h3>
            <p>
              La Secretaría de Agricultura, Ganadería y Pesca del Ministerio de Economía de la Nación aprobó, mediante la Resolución N° 31/2026, la Indicación Geográfica “Queso de Tafí del Valle”, un reconocimiento que convierte a este producto tucumano en el primer queso argentino en obtener un sello oficial de origen.
            </p>
            <p>
              La medida protege el nombre del producto, certifica su vínculo con el territorio y habilita el uso del sello IG, una herramienta clave para diferenciar alimentos y agregar valor en origen.
            </p>
            <p>
              El nuevo reconocimiento incorpora al queso producido en Tafí del Valle y El Mollar al sistema nacional de indicaciones geográficas y denominaciones de origen, Ley 25.380, que ya distingue a productos como la yerba mate, el cordero patagónico, el salame de Tandil, el aceite de oliva de Mendoza y de San Juan y el té argentino, entre muchos otros.
            </p>
            <p>
              En este marco, el Queso de Tafí del Valle se destaca por su perfil sensorial equilibrado, con notas lácticas, matices de manteca y oliva, y una textura firme lograda a partir de un proceso de maduración mínimo de 30 días. Se comercializa en hormas cilíndricas de entre 0,5 y 3 kilos, con corteza natural y masa compacta.
            </p>
            <p>
              Se trata de un sello con impacto global. A nivel mundial, las indicaciones geográficas se consolidan como una de las herramientas más relevantes para proteger y valorizar alimentos vinculados a su origen. Además de resguardar la reputación de los productos, estos sellos forman parte de acuerdos comerciales entre países y bloques, donde su reconocimiento mutuo facilita el acceso a mercados y fortalece la competitividad.
            </p>
            <p>
              En ese contexto, la nueva incorporación del Queso de Tafí del Valle no solo representa un avance para Tucumán, sino también un paso más en la estrategia de Argentina para posicionar alimentos con identidad en el escenario internacional.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[1, 2, 3].map((num) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: num * 0.1 }}
                  className="rounded-3xl overflow-hidden shadow-lg aspect-square"
                >
                  <img 
                    src={`/assets/queso-tafi/queso-ig-${num}.jpg`} 
                    alt={`Queso Tafinisto detalle ${num}`} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
