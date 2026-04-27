import historiaImg from '../assets/historia-hero.png';
import mollarImg from '../assets/el-mollar.jpg';
import diqueImg from '../assets/dique-angostura.jpg';
import quesoImg from '../assets/fiesta-queso.jpg';
import campoImg from '../assets/campo-tafi.jpg';

export const curiosidades = [
  {
    id: 1,
    pregunta: "¿Sabías que Tafí del Valle es uno de los asentamientos más antiguos del país?",
    respuesta: "Su nombre original en cacán es 'Taktillkta', que significa 'Pueblo de la Espléndida Entrada'.",
    link: "/historia",
    imagen: historiaImg
  },
  {
    id: 2,
    pregunta: "¿Sabías que los Menhires pueden llegar a medir más de 3 metros?",
    respuesta: "Estas piedras talladas por la cultura Tafí tienen más de 2000 años de antigüedad y se encuentran en la Reserva Arqueológica Los Menhires.",
    link: "/turismo/que-hacer",
    imagen: mollarImg
  },
  {
    id: 3,
    pregunta: "¿Sabías que el Dique La Angostura es el espejo de agua más alto de la provincia?",
    respuesta: "Se encuentra a 2000 metros sobre el nivel del mar y es ideal para la pesca de pejerrey y deportes náuticos.",
    link: "/turismo/que-hacer",
    imagen: diqueImg
  },
  {
    id: 4,
    pregunta: "¿Sabías que Tafí del Valle es la Capital Nacional del Queso?",
    respuesta: "Cada febrero se celebra la Fiesta Nacional del Queso, honrando una tradición que comenzó con los jesuitas en el siglo XVIII.",
    link: "/tradiciones",
    imagen: quesoImg
  },
  {
    id: 5,
    pregunta: "¿Sabías que el clima en Tafí es un microclima especial?",
    respuesta: "Incluso en verano, las noches son frescas, y en invierno las cumbres suelen cubrirse de nieve, ofreciendo un paisaje alpino único en Tucumán.",
    link: "/perfil-valle",
    imagen: campoImg
  }
];
