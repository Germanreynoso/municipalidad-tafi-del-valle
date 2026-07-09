import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from './styles/motion.js';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Historia from './pages/Historia.jsx';
import PerfilValle from './pages/PerfilValle.jsx';
import Tradiciones from './pages/Tradiciones.jsx';
import Relatos from './pages/Relatos.jsx';
import Autoridades from './pages/Autoridades.jsx';
import CiudadanoPage from './features/ciudadano/CiudadanoPage.jsx';
import TurismoPage from './features/turismo/TurismoPage.jsx';
import AlojamientoPage from './features/turismo/AlojamientoPage.jsx';
import CosasHacerPage from './features/turismo/CosasHacerPage.jsx';
import GastronomiaPage from './features/turismo/GastronomiaPage.jsx';
import GuiasPage from './features/turismo/GuiasPage.jsx';
import Ordenanzas from './pages/Ordenanzas.jsx';
import InstitucionalPage from './features/institucional/InstitucionalPage.jsx';
import { AuthProvider } from './features/admin/auth/AuthContext.jsx';
import ProtectedRoute from './features/admin/ProtectedRoute.jsx';
import AdminLayout from './features/admin/AdminLayout.jsx';
import LoginPage from './features/admin/LoginPage.jsx';
import NoticiasAdminPage from './features/admin/NoticiasAdminPage.jsx';
import NoticiaEditorPage from './features/admin/NoticiaEditorPage.jsx';
import ReelsAdminPage from './features/admin/ReelsAdminPage.jsx';
import MencionesAdminPage from './features/admin/MencionesAdminPage.jsx';
import NoticiasPage from './features/noticias/NoticiasPage.jsx';
import NoticiaDetallePage from './features/noticias/NoticiaDetallePage.jsx';

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
      { path: '/relatos',       element: <Relatos /> },
      { path: '/autoridades',   element: <Autoridades /> },
      { path: '/ordenanzas',    element: <Ordenanzas /> },
      { path: '/ciudadano',     element: <CiudadanoPage /> },
      { path: '/turismo',       element: <TurismoPage /> },
      { path: '/turismo/alojamiento', element: <AlojamientoPage /> },
      { path: '/turismo/que-hacer',   element: <CosasHacerPage /> },
      { path: '/turismo/gastronomia', element: <GastronomiaPage /> },
      { path: '/turismo/guias',       element: <GuiasPage /> },
      { path: '/institucional', element: <InstitucionalPage /> },
      { path: '/noticias',       element: <NoticiasPage /> },
      { path: '/noticias/:slug', element: <NoticiaDetallePage /> },
    ],
  },
  {
    path: '/admin/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <NoticiasAdminPage /> },
      { path: 'noticias/nueva', element: <NoticiaEditorPage /> },
      { path: 'noticias/:id/editar', element: <NoticiaEditorPage /> },
      { path: 'reels', element: <ReelsAdminPage /> },
      { path: 'medios', element: <MencionesAdminPage /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
