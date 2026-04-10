import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import CiudadanoPage from './features/ciudadano/CiudadanoPage.jsx';
import TurismoPage from './features/turismo/TurismoPage.jsx';
import InstitucionalPage from './features/institucional/InstitucionalPage.jsx';

function Layout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-white-warm)' }}>
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
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
      { path: '/ciudadano',     element: <CiudadanoPage /> },
      { path: '/turismo',       element: <TurismoPage /> },
      { path: '/institucional', element: <InstitucionalPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
