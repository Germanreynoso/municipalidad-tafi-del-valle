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
import GuiasPage from './features/turismo/GuiasPage.jsx';
import InstitucionalPage from './features/institucional/InstitucionalPage.jsx';

import { useState } from 'react';
import GlobalSearch from './components/common/GlobalSearch.jsx';
import CuriosityPopup from './components/common/CuriosityPopup.jsx';

function Layout() {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white-warm">
      <Navbar onSearchOpen={() => setIsSearchOpen(true)} />
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CuriosityPopup />
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
      { path: '/turismo/guias',       element: <GuiasPage /> },
      { path: '/institucional', element: <InstitucionalPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
