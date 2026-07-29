import { atracciones, eventoDestacado } from '../features/turismo/data/atracciones';
import { gastronomia } from '../features/turismo/data/gastronomia';
import { alojamientos } from '../features/turismo/data/alojamiento';
import { actividades } from '../features/turismo/data/cosasHacer';
import { relatos } from '../data/relatos';

export const searchIndex = [
  // Páginas Estáticas
  { title: 'Inicio', category: 'Página', to: '/', description: 'Página principal del portal municipal.' },
  { title: 'Historia de Tafí', category: 'Municipio', to: '/historia', description: 'Orígenes, cultura diaguita y jesuitas.' },
  { title: 'Autoridades', category: 'Municipio', to: '/autoridades', description: 'Cuerpo ejecutivo y legislativo de la municipalidad.' },
  { title: 'Perfil del Valle', category: 'Municipio', to: '/perfil-valle', description: 'Geografía, clima y datos del valle.' },
  { title: 'Fiestas y Tradiciones', category: 'Cultura', to: '/tradiciones', description: 'Calendario de eventos, Fiesta del Queso y más.' },
  { title: 'Relatos del Valle', category: 'Cultura', to: '/relatos', description: 'Cuentos, mitos y leyendas de Tafí del Valle.' },
  { title: 'Guía de Alojamiento', category: 'Turismo', to: '/turismo/alojamiento', description: 'Hoteles, cabañas y hosterías.' },
  { title: 'Guía de Gastronomía', category: 'Turismo', to: '/turismo/gastronomia', description: 'Restaurantes, peñas y bares.' },
  { title: 'Qué hacer en Tafí', category: 'Turismo', to: '/turismo/que-hacer', description: 'Actividades, trekking y excursiones.' },
  { title: 'Tafí nevado', category: 'Turismo', to: '/turismo', description: 'Galería de fotos de la nieve en invierno: cerros, pinares, rutas y calles del valle.' },
  
  // Atracciones
  ...atracciones.map(a => ({
    title: a.nombre,
    description: a.description || a.descripcion,
    category: 'Atracción',
    to: `/turismo`,
    type: 'atraccion',
    id: a.id
  })),

  // Actividades (Qué hacer)
  ...actividades.map(act => {
    const actTitles = {
      'elpuesto': 'El Puesto Actividades Outdoor',
      'cerrosycoplas': 'Cerros y Coplas',
      'pinosport': 'Aventura Pinosport',
      'yungasadventure': 'EVT Yungas Adventure and Travel (La Cumbre)',
      'rutadelqueso': 'La Ruta del Queso'
    };
    const actDescriptions = {
      'elpuesto': 'Turismo aventura, cabalgatas y experiencias premium en el valle.',
      'cerrosycoplas': 'Excursiones guiadas, trekking, cabalgatas y vivencias culturales en la montaña.',
      'pinosport': 'Alquiler de bicicletas, mountain bike guiado y turismo aventura deportivo.',
      'yungasadventure': 'Excursiones en 4x4, Trekking, Mountain Bike y Kayak por los rincones más impactantes.',
      'rutadelqueso': 'Circuito por las estancias queseras más antiguas del valle, descubriendo el proceso artesanal con IG.'
    };
    
    return {
      title: actTitles[act.id] || act.id,
      description: actDescriptions[act.id] || 'Turismo aventura, excursiones y actividades outdoor.',
      category: 'Actividad',
      to: '/turismo/que-hacer',
      type: 'aventura'
    };
  }),

  // Gastronomía
  ...gastronomia.map(g => ({
    title: g.nombre,
    description: 'Establecimiento gastronómico destacado en Tafí del Valle.',
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

  // Relatos del Valle
  ...relatos.map(r => ({
    title: r.titulo,
    description: r.extracto,
    category: 'Relatos',
    to: '/relatos',
    type: 'relato'
  })),

  // Emergencias
  { title: 'Hospital del Valle', category: 'Emergencias', to: '#', description: 'Tel: (03867) 421031 / 427034. Atención 24hs.' },
  { title: 'Comisaría Tafí del Valle', category: 'Emergencias', to: '#', description: 'Tel: 03867 421322. Seguridad ciudadana.' },
  { title: 'Bomberos Voluntarios', category: 'Emergencias', to: '#', description: 'Tel: 100. Emergencias y rescates.' }
];
