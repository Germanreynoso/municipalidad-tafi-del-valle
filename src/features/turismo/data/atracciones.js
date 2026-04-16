import elMollarImg from '../../../assets/el-mollar.jpg';
import quesosTafiImg from '../../../assets/quesos-tafi.jpg';
import diqueAngosturaImg from '../../../assets/dique-angostura.jpg';
import feriaArtesanalImg from '../../../assets/feria-artesanal.jpg';

export const atracciones = [
  {
    id: 1,
    nombre: 'Dique la Angostura',
    categoria: 'naturaleza',
    distancia: '12 km del centro',
    descripcion: 'Laguna de altura rodeada de cardones y paisaje andino único.',
    image: diqueAngosturaImg,
  },
  {
    id: 2,
    nombre: 'Menhires de Tafí',
    categoria: 'cultura',
    distancia: '5 km del centro',
    descripcion: 'Colección de menhires calchaquíes precolombinos, patrimonio cultural de la provincia.',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80',
  },
  {
    id: 3,
    nombre: 'El Mollar',
    categoria: 'naturaleza',
    distancia: '8 km del centro',
    descripcion: 'Pueblo tranquilo a orillas de la represa La Angostura con gastronomía regional.',
    image: elMollarImg,
  },
  {
    id: 4,
    nombre: 'Sendero ',
    categoria: 'aventura',
    distancia: '3 km del centro',
    descripcion: 'Trekking de nivel moderado con vistas panorámicas al valle y la represa.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  },
  {
    id: 5,
    nombre: 'Feria Artesanal del Valle',
    categoria: 'cultura',
    distancia: 'Centro de Tafí',
    descripcion: 'Artesanías en lana, cuero y cerámica de productores locales todos los fines de semana.',
    image: feriaArtesanalImg,
  },
  {
    id: 6,
    nombre: 'Quesos de Tafí',
    categoria: 'gastronomía',
    distancia: 'Rutas cercanas',
    descripcion: 'Visitas guiadas a tambos y degustación del famoso queso de Tafí con denominación de origen.',
    image: quesosTafiImg,
  },
];

export const eventoDestacado = {
  id: 1,
  nombre: 'Fiesta Nacional del Queso',
  fecha: 'Febrero 2027',
  descripcion: 'La celebración más importante del Valle con música, gastronomía y artesanías.',
  image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80',
  url: '#',
};
