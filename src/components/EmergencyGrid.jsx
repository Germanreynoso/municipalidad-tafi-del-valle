const emergencias = [
  { id: 1, nombre: 'Hospital del Valle', telefono: '(0867) 421-000', icono: '🏥', area: 'Salud' },
  { id: 2, nombre: 'Comisaría Tafí del Valle', telefono: '(0867) 421-111', icono: '🚔', area: 'Seguridad' },
  { id: 3, nombre: 'Bomberos Voluntarios', telefono: '100', icono: '🚒', area: 'Bomberos' },
];

export default function EmergencyGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 bg-stone-dark">
      {emergencias.map((item, idx) => (
        <a
          key={item.id}
          href={`tel:${item.telefono.replace(/\D/g, '')}`}
          className="group flex items-center gap-4 px-8 py-6 transition-all duration-300 border-b md:border-b-0 border-white/10 last:border-b-0"
          style={{
            borderRight: idx < emergencias.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
          }}
        >
          <span className="text-3xl">{item.icono}</span>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-1 text-emergency transition-colors duration-300 group-hover:text-red-400 font-body">
              {item.area}
            </p>
            <p className="text-lg font-bold text-white/90 transition-colors duration-300 group-hover:text-white font-heading">
              {item.nombre}
            </p>
            <p className="text-xl font-black text-white/70 mt-1 transition-colors duration-300 group-hover:text-red-300 font-heading">
              {item.telefono}
            </p>
          </div>
          <div className="ml-auto w-0 group-hover:w-1 h-12 rounded-full transition-all duration-300 bg-emergency" />
        </a>
      ))}
    </div>
  );
}
