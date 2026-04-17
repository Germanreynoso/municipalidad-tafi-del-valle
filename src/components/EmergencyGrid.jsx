const emergencias = [
  { id: 1, nombre: 'Hospital del Valle', telefono: '(03867) 421031 / 427034', icono: '🏥', area: 'Salud' },
  { id: 2, nombre: 'Comisaría Tafí del Valle', telefono: '03867 421322', icono: '🚔', area: 'Seguridad' },
  { id: 3, nombre: 'Bomberos Voluntarios', telefono: '100', icono: '🚒', area: 'Bomberos' },
];

export default function EmergencyGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 bg-stone-dark">
      {emergencias.map((item, idx) => (
        <a
          key={item.id}
          href={`tel:${item.telefono.replace(/\D/g, '')}`}
          className="group flex items-center gap-4 px-8 py-6 transition-all duration-300 border-b md:border-b-0 border-white/10 last:border-b-0 border-l-4 border-l-transparent group-hover:border-l-emergency"
          style={{
            borderRight: idx < emergencias.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
          }}
        >
          <span className="text-3xl">{item.icono}</span>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-1 text-emergency group-hover:text-emergency font-body transition-colors duration-300">
              {item.area}
            </p>
            <p className="text-lg font-bold text-white/90 transition-colors duration-300 group-hover:text-white font-heading">
              {item.nombre}
            </p>
            <p className="text-xl font-black text-white/70 mt-1 group-hover:text-emergency font-heading transition-colors duration-300">
              {item.telefono}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
