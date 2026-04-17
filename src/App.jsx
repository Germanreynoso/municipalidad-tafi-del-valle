import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from './styles/motion.js';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Historia from './pages/Historia.jsx';
import PerfilValle from './pages/PerfilValle.jsx';
import Tradiciones from './pages/Tradiciones.jsx';
import Autoridades from './pages/Autoridades.jsx';
import CiudadanoPage from './features/ciudadano/CiudadanoPage.jsx';
import TurismoPage from './features/turismo/TurismoPage.jsx';
import AlojamientoPage from './features/turismo/AlojamientoPage.jsx';
import CosasHacerPage from './features/turismo/CosasHacerPage.jsx';
import GastronomiaPage from './features/turismo/GastronomiaPage.jsx';
import InstitucionalPage from './features/institucional/InstitucionalPage.jsx';

function Layout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-white-warm">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/',              element: <Home /> },
      { path: '/historia',      element: <Historia /> },
      { path: '/perfil-valle',  element: <PerfilValle /> },
      { path: '/tradiciones',   element: <Tradiciones /> },
      { path: '/autoridades',   element: <Autoridades /> },
      { path: '/ciudadano',     element: <CiudadanoPage /> },
      { path: '/turismo',       element: <TurismoPage /> },
      { path: '/turismo/alojamiento', element: <AlojamientoPage /> },
      { path: '/turismo/que-hacer',   element: <CosasHacerPage /> },
      { path: '/turismo/gastronomia', element: <GastronomiaPage /> },
      { path: '/institucional', element: <InstitucionalPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
