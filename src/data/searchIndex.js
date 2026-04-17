import { atracciones } from '../features/turismo/data/atracciones';
import { gastronomia } from '../features/turismo/data/gastronomia';
import { alojamientos } from '../features/turismo/data/alojamiento';

export const searchIndex = [
  // Páginas Estáticas
  { title: 'Inicio', category: 'Página', to: '/', description: 'Página principal del portal municipal.' },
  { title: 'Historia de Tafí', category: 'Municipio', to: '/historia', description: 'Orígenes, cultura diaguita y jesuitas.' },
  { title: 'Autoridades', category: 'Municipio', to: '/autoridades', description: 'Cuerpo ejecutivo y legislativo de la municipalidad.' },
  { title: 'Perfil del Valle', category: 'Municipio', to: '/perfil-valle', description: 'Geografía, clima y datos del valle.' },
  { title: 'Fiestas y Tradiciones', category: 'Cultura', to: '/tradiciones', description: 'Calendario de eventos, Fiesta del Queso y más.' },
  { title: 'Guía de Alojamiento', category: 'Turismo', to: '/turismo/alojamiento', description: 'Hoteles, cabañas y hosterías.' },
  { title: 'Guía de Gastronomía', category: 'Turismo', to: '/turismo/gastronomia', description: 'Restaurantes, peñas y bares.' },
  { title: 'Qué hacer en Tafí', category: 'Turismo', to: '/turismo/que-hacer', description: 'Actividades, trekking y excursiones.' },
  
  // Atracciones
  ...atracciones.map(a => ({
    title: a.nombre,
    description: a.descripcion,
    category: 'Atracción',
    to: `/turismo`, // Podríamos extender esto para abrir el modal automáticamente
    type: 'atraccion',
    id: a.id
  })),

  // Gastronomía
  ...gastronomia.map(g => ({
    title: g.nombre,
    description: g.descripcion,
    category: 'Gastronomía',
    external: g.link,
    type: 'restaurante'
  })),

  // Alojamiento
  ...alojamientos.map(al => ({
    title: al.nombre,
    description: `Alojamiento en ${al.direccion || 'Tafí del Valle'}`,
    category: 'Alojamiento',
    to: '/turismo/alojamiento',
    type: 'hotel'
  })),

  // Emergencias
  { title: 'Hospital del Valle', category: 'Emergencias', to: '#', description: 'Tel: (03867) 421031 / 427034. Atención 24hs.' },
  { title: 'Comisaría Tafí del Valle', category: 'Emergencias', to: '#', description: 'Tel: 03867 421322. Seguridad ciudadana.' },
  { title: 'Bomberos Voluntarios', category: 'Emergencias', to: '#', description: 'Tel: 100. Emergencias y rescates.' }
];
