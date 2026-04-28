import { motion } from 'framer-motion';
import { MapPin, Car, Bus, Info, ArrowRight } from 'lucide-react';

export default function LocationSection() {
  const travelOptions = [
    {
      icon: <Car className="text-sky-500" />,
      title: "En Auto",
      desc: "Desde San Miguel de Tucumán por RP 307. Son 107 km de un recorrido sinuoso e impactante a través de la selva y la montaña.",
      duration: "2h aprox."
    },
    {
      icon: <Bus className="text-sky-500" />,
      title: "En Ómnibus",
      desc: "Empresa Aconquija ofrece salidas diarias desde la Terminal de San Miguel de Tucumán.",
      duration: "3h aprox.",
      link: { url: "https://transporteaconquija.com.ar/", text: "Ver horarios y pasajes" }
    }
  ];

  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Info Side */}
          <div className="flex-1 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 font-heading leading-tight">
                Ubicación y <br />
                <span className="text-sky-600">Cómo Llegar</span>
              </h2>
              <p className="text-stone-600 font-body text-lg leading-relaxed mb-12">
                Tafí del Valle se encuentra en el centro de los Valles Calchaquíes tucumanos, 
                un oasis de montaña que te espera a 107 km de la capital provincial.
              </p>

              <div className="space-y-8">
                {travelOptions.map((option, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 p-6 bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center shrink-0">
                      {option.icon}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-stone-900">{option.title}</h4>
                        <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest bg-sky-50 px-2 py-1 rounded-md">
                          {option.duration}
                        </span>
                      </div>
                      <p className="text-sm text-stone-500 font-body leading-relaxed">{option.desc}</p>
                      {option.link && (
                        <a 
                          href={option.link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors uppercase tracking-wider"
                        >
                          {option.link.text} <ArrowRight size={14} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-sky-900 rounded-[2.5rem] text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Info size={20} className="text-sky-400" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Recomendación</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4 font-heading leading-tight">Camino de Alta Montaña</h4>
                  <p className="text-sky-100/70 text-sm font-body leading-relaxed mb-6">
                    La RP 307 es un camino de cornisa. Se recomienda circular con precaución, 
                    respetando las velocidades y disfrutando de paradas obligatorias como el Monumento al Indio.
                  </p>
                  <a 
                    href="https://www.google.com/maps/dir//Taf%C3%AD+del+Valle,+Tucum%C3%A1n/@-26.8517904,-65.7335787,13z"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-bold text-sm text-sky-400 hover:text-white transition-colors"
                  >
                    Abrir en Google Maps <ArrowRight size={16} />
                  </a>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              </div>
            </motion.div>
          </div>

          {/* Map Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="relative bg-white p-4 rounded-[3rem] shadow-2xl shadow-stone-900/10 border border-stone-200">
              <div className="overflow-hidden rounded-[2.5rem] h-[600px] lg:h-[750px] relative">
                <iframe
                  title="Google Maps Tafí del Valle"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28477.622178814876!2d-65.70862289999998!3d-26.849404449999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94221877e80d28cf%3A0x7cf806901072e845!2zVGFmw60gZGVsIFZhbGxlLCBUdWN1bcOhbg!5e0!3m2!1ses!2sar!4v1777294335847!5m2!1ses!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-all duration-700"
                ></iframe>
                
                {/* Overlay with small card */}
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-between border border-white/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-stone-400 tracking-widest uppercase">Destino</p>
                        <p className="font-bold text-stone-900">Villa de Tafí del Valle</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
