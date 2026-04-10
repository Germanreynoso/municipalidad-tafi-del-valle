# Municipalidad de Tafí del Valle — Plan de Implementación

> **Para workers agénticos:** SUB-SKILL REQUERIDO: Usar superpowers:subagent-driven-development (recomendado) o superpowers:executing-plans para implementar este plan tarea por tarea. Los pasos usan sintaxis de checkbox (`- [ ]`) para tracking.

**Goal:** Construir la web municipal "Modern Mountain" de Tafí del Valle con 3 portales (Ciudadano, Turístico, Institucional), design system propio, navegación con React Router v6 y micro-interacciones con Framer Motion.

**Architecture:** Feature-based con React Router v6. Cada portal es una feature independiente (`src/features/`). Componentes shared en `src/components/`. Datos estáticos en archivos `.js` por feature. Design system vía `@theme` de Tailwind v4 en `index.css`.

**Tech Stack:** React 19, Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`), React Router v6, Framer Motion v11, Lucide React, Google Fonts (Montserrat + Inter).

---

## Mapa de archivos

### Crear (nuevos)
```
src/styles/tokens.css
src/components/Navbar.jsx
src/components/Footer.jsx
src/components/EmergencyGrid.jsx
src/components/PortalCard.jsx
src/pages/Home.jsx
src/features/ciudadano/data/tramites.js
src/features/ciudadano/components/TramiteCard.jsx
src/features/ciudadano/components/ServiciosList.jsx
src/features/ciudadano/CiudadanoPage.jsx
src/features/turismo/data/atracciones.js
src/features/turismo/components/AtraccionCard.jsx
src/features/turismo/components/EventosBanner.jsx
src/features/turismo/TurismoPage.jsx
src/features/institucional/data/noticias.js
src/features/institucional/components/NoticiaCard.jsx
src/features/institucional/components/DocumentoItem.jsx
src/features/institucional/InstitucionalPage.jsx
```

### Modificar (existentes)
```
src/index.css       — agregar @import Google Fonts + @theme tokens + @layer utilities
src/App.jsx         — reemplazar por router shell con AnimatePresence
```

### Eliminar
```
src/App.css         — reemplazado por sistema de tokens
```

---

## Task 1: Foundation — Design System y Router Shell

**Files:**
- Modify: `src/index.css`
- Create: `src/styles/tokens.css`
- Modify: `src/App.jsx`
- Delete: `src/App.css`

- [ ] **Step 1.1: Instalar dependencias**

```bash
cd municipalidad-tafi-del-valle
npm install react-router-dom framer-motion
```

Verificar output esperado:
```
added 2 packages
```

- [ ] **Step 1.2: Reemplazar `src/index.css` completo**

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Inter:wght@400;600&display=swap');
@import "tailwindcss";

@theme {
  /* Colores */
  --color-primary:        #2D5016;
  --color-primary-mid:    #4A7C2F;
  --color-primary-light:  #E8F0E0;
  --color-stone-dark:     #3A3A3A;
  --color-stone:          #6B6B6B;
  --color-stone-light:    #F0EEEA;
  --color-earth:          #8C6A3F;
  --color-sky:            #2563A8;
  --color-white-warm:     #FAFAF7;
  --color-emergency:      #C0392B;

  /* Tipografía */
  --font-heading: "Montserrat", system-ui, sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;

  /* Sombras */
  --shadow-card:  0 4px 24px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.14);
  --shadow-nav:   0 1px 8px rgba(0, 0, 0, 0.06);
}

@layer base {
  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    font-family: var(--font-body);
    background-color: var(--color-white-warm);
    color: var(--color-stone-dark);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
  }
}
```

- [ ] **Step 1.3: Eliminar `src/App.css`**

```bash
rm src/App.css
```

- [ ] **Step 1.4: Reemplazar `src/App.jsx` por router shell**

```jsx
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
```

- [ ] **Step 1.5: Crear stubs vacíos para que el router no rompa**

Crear `src/pages/Home.jsx`:
```jsx
export default function Home() {
  return <div className="p-8 text-2xl font-heading">Home — en construcción</div>;
}
```

Crear `src/features/ciudadano/CiudadanoPage.jsx`:
```jsx
export default function CiudadanoPage() {
  return <div className="p-8 text-2xl font-heading">Portal Ciudadano — en construcción</div>;
}
```

Crear `src/features/turismo/TurismoPage.jsx`:
```jsx
export default function TurismoPage() {
  return <div className="p-8 text-2xl font-heading">Portal Turístico — en construcción</div>;
}
```

Crear `src/features/institucional/InstitucionalPage.jsx`:
```jsx
export default function InstitucionalPage() {
  return <div className="p-8 text-2xl font-heading">Portal Institucional — en construcción</div>;
}
```

Crear `src/components/Navbar.jsx` (stub):
```jsx
export default function Navbar() {
  return <nav className="h-20 bg-white" style={{ boxShadow: 'var(--shadow-nav)' }} />;
}
```

Crear `src/components/Footer.jsx` (stub):
```jsx
export default function Footer() {
  return <footer className="h-16 bg-stone-dark" />;
}
```

- [ ] **Step 1.6: Verificar que compila sin errores**

```bash
npm run dev
```

Abrir `http://localhost:5173`. Esperado: página en blanco con navbar vacía, sin errores en consola.

- [ ] **Step 1.7: Commit**

```bash
git add src/index.css src/App.jsx src/pages/ src/features/ src/components/
git rm src/App.css
git commit -m "feat: setup design system tokens, router shell and page stubs"
```

---

## Task 2: Datos Estáticos

**Files:**
- Create: `src/features/ciudadano/data/tramites.js`
- Create: `src/features/turismo/data/atracciones.js`
- Create: `src/features/institucional/data/noticias.js`

- [ ] **Step 2.1: Crear `src/features/ciudadano/data/tramites.js`**

```js
export const tramites = [
  {
    id: 1,
    titulo: 'Habilitación Comercial',
    descripcion: 'Obtené el permiso para abrir o renovar tu comercio en el municipio.',
    icono: 'FileCheck',
    link: '#',
  },
  {
    id: 2,
    titulo: 'Libre Deuda Municipal',
    descripcion: 'Solicitá el certificado de libre deuda de tasas municipales.',
    icono: 'Receipt',
    link: '#',
  },
  {
    id: 3,
    titulo: 'Registro de Mascotas',
    descripcion: 'Registrá a tu mascota y obtené el certificado de vacunación.',
    icono: 'Heart',
    link: '#',
  },
  {
    id: 4,
    titulo: 'Permiso de Edificación',
    descripcion: 'Gestioná el permiso para obras nuevas o reformas en tu propiedad.',
    icono: 'HardHat',
    link: '#',
  },
  {
    id: 5,
    titulo: 'Reclamos y Sugerencias',
    descripcion: 'Enviá tu reclamo o sugerencia a la municipalidad.',
    icono: 'MessageSquare',
    link: '#',
  },
  {
    id: 6,
    titulo: 'Turno en Oficina de Rentas',
    descripcion: 'Sacá turno online para ser atendido en Rentas Municipales.',
    icono: 'CalendarCheck',
    link: '#',
  },
];

export const servicios = [
  { id: 1, titulo: 'Emergencias', descripcion: 'Servicios de atención de emergencias 24hs.', icono: 'AlertTriangle' },
  { id: 2, titulo: 'Agua y Saneamiento', descripcion: 'Gestión del servicio de agua potable.', icono: 'Droplets' },
  { id: 3, titulo: 'Recolección de Residuos', descripcion: 'Cronograma y puntos de reciclaje.', icono: 'Trash2' },
];
```

- [ ] **Step 2.2: Crear `src/features/turismo/data/atracciones.js`**

```js
export const atracciones = [
  {
    id: 1,
    nombre: 'Laguna del Indio',
    categoria: 'naturaleza',
    distancia: '12 km del centro',
    descripcion: 'Laguna de altura rodeada de cardones y paisaje andino único.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?w=800&q=80',
  },
  {
    id: 4,
    nombre: 'Sendero del Cerro Muñano',
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
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  },
  {
    id: 6,
    nombre: 'Quesos de Tafí',
    categoria: 'gastronomía',
    distancia: 'Rutas cercanas',
    descripcion: 'Visitas guiadas a tambos y degustación del famoso queso de Tafí con denominación de origen.',
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&q=80',
  },
];

export const eventoDestacado = {
  id: 1,
  nombre: 'Fiesta Nacional del Queso',
  fecha: 'Febrero 2027',
  descripcion: 'La celebración más importante del Valle con música, gastronomía y artesanías.',
  image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80',
};
```

- [ ] **Step 2.3: Crear `src/features/institucional/data/noticias.js`**

```js
export const noticias = [
  {
    id: 1,
    titulo: 'Pavimentación de calles en el sector norte del municipio',
    fecha: '2026-04-08',
    categoria: 'Obras Públicas',
    extracto: 'La municipalidad avanza con el plan de pavimentación de 6 cuadras en el sector norte, beneficiando a más de 200 familias.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    id: 2,
    titulo: 'Nueva plaza pública inaugurada en El Mollar',
    fecha: '2026-03-25',
    categoria: 'Infraestructura',
    extracto: 'Se inauguró el nuevo espacio verde con juegos infantiles, luminaria LED y bancos de madera local.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 3,
    titulo: 'Programa de becas para estudiantes universitarios 2026',
    fecha: '2026-03-10',
    categoria: 'Educación',
    extracto: 'El municipio abre el período de inscripción para las 30 becas universitarias anuales destinadas a jóvenes del valle.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
  },
  {
    id: 4,
    titulo: 'Balance de gestión: primer trimestre 2026',
    fecha: '2026-04-01',
    categoria: 'Transparencia',
    extracto: 'El intendente presentó el informe de ejecución presupuestaria y obras completadas en el primer trimestre del año.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
  },
];

export const documentos = [
  { id: 1, nombre: 'Presupuesto Municipal 2026', tipo: 'PDF', fecha: '2026-01-15', url: '#' },
  { id: 2, nombre: 'Ordenanzas Vigentes', tipo: 'PDF', fecha: '2026-03-01', url: '#' },
  { id: 3, nombre: 'Declaración Jurada de Bienes — Intendente', tipo: 'PDF', fecha: '2026-02-28', url: '#' },
  { id: 4, nombre: 'Contrataciones y Licitaciones Q1 2026', tipo: 'PDF', fecha: '2026-04-01', url: '#' },
];
```

- [ ] **Step 2.4: Commit**

```bash
git add src/features/
git commit -m "feat: add static data for all three portals"
```

---

## Task 3: EmergencyGrid

**Files:**
- Modify: `src/components/EmergencyGrid.jsx`

- [ ] **Step 3.1: Implementar `src/components/EmergencyGrid.jsx`**

```jsx
const emergencias = [
  { id: 1, nombre: 'Hospital del Valle', telefono: '(0867) 421-000', icono: '🏥', area: 'Salud' },
  { id: 2, nombre: 'Comisaría Tafí del Valle', telefono: '(0867) 421-111', icono: '🚔', area: 'Seguridad' },
  { id: 3, nombre: 'Bomberos Voluntarios', telefono: '100', icono: '🚒', area: 'Bomberos' },
];

export default function EmergencyGrid() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3"
      style={{ backgroundColor: 'var(--color-stone-dark)' }}
    >
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
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-1 transition-colors duration-300 group-hover:text-red-400"
              style={{ color: 'var(--color-emergency)', fontFamily: 'var(--font-body)' }}
            >
              {item.area}
            </p>
            <p
              className="text-lg font-bold transition-colors duration-300 group-hover:text-white"
              style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-heading)' }}
            >
              {item.nombre}
            </p>
            <p
              className="text-xl font-black mt-1 transition-colors duration-300 group-hover:text-red-300"
              style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-heading)' }}
            >
              {item.telefono}
            </p>
          </div>
          <div
            className="ml-auto w-0 group-hover:w-1 h-12 rounded-full transition-all duration-300"
            style={{ backgroundColor: 'var(--color-emergency)' }}
          />
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 3.2: Verificar en browser**

Con `npm run dev` corriendo, navegar a `/`. El stub de Footer está vacío — la EmergencyGrid se usará en el Task 5. Por ahora solo confirmar que el archivo no tiene errores de sintaxis en la consola.

- [ ] **Step 3.3: Commit**

```bash
git add src/components/EmergencyGrid.jsx
git commit -m "feat: add EmergencyGrid component with 3 emergency contacts"
```

---

## Task 4: Navbar

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 4.1: Implementar `src/components/Navbar.jsx`**

```jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mountain, Search, ChevronDown, X, Menu } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', to: '/' },
  {
    label: 'Municipio',
    submenu: [
      { label: 'Autoridades', to: '#' },
      { label: 'Historia', to: '#' },
      { label: 'Ordenanzas', to: '#' },
    ],
  },
  { label: 'Turismo', to: '/turismo' },
  { label: 'Trámites', to: '/ciudadano' },
  { label: 'Transparencia', to: '/institucional' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,1)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? 'var(--shadow-nav)' : '0 1px 0 rgba(0,0,0,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <Mountain className="text-white" size={22} />
              </div>
              <div>
                <p
                  className="text-[10px] font-semibold tracking-widest uppercase"
                  style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
                >
                  Municipalidad
                </p>
                <p
                  className="text-sm font-black tracking-tight leading-none"
                  style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-heading)' }}
                >
                  Tafí del Valle
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((item) =>
                item.submenu ? (
                  <div key={item.label} className="relative group">
                    <button
                      className="flex items-center gap-1 text-sm font-semibold pb-1 border-b-2 border-transparent transition-all duration-200 hover:border-current"
                      style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-body)' }}
                    >
                      {item.label}
                      <ChevronDown size={14} className="opacity-60" />
                    </button>
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.to}
                          className="block px-4 py-3 text-sm transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                          style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-body)' }}
                          onMouseEnter={(e) => (e.target.style.backgroundColor = 'var(--color-primary-light)')}
                          onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="text-sm font-semibold pb-1 border-b-2 transition-all duration-200"
                    style={{
                      color: 'var(--color-stone-dark)',
                      fontFamily: 'var(--font-body)',
                      borderColor: location.pathname === item.to ? 'var(--color-primary)' : 'transparent',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              )}

              <Link
                to="/ciudadano"
                className="ml-4 px-5 py-2 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
              >
                Trámites Online
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={24} style={{ color: 'var(--color-stone-dark)' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col p-6">
            <div className="flex justify-between items-center mb-8">
              <p className="font-black text-lg" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-stone-dark)' }}>
                Menú
              </p>
              <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
                <X size={24} style={{ color: 'var(--color-stone)' }} />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((item) =>
                item.submenu ? (
                  <div key={item.label}>
                    <p className="text-xs font-semibold uppercase tracking-widest px-3 py-2" style={{ color: 'var(--color-stone)' }}>
                      {item.label}
                    </p>
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.to}
                        className="block px-6 py-2 text-sm rounded-lg"
                        style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-body)' }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="px-3 py-3 rounded-lg text-sm font-semibold transition-colors duration-150"
                    style={{
                      color: 'var(--color-stone-dark)',
                      backgroundColor: location.pathname === item.to ? 'var(--color-primary-light)' : 'transparent',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
            <Link
              to="/ciudadano"
              className="mt-auto px-5 py-3 rounded-lg text-sm font-bold text-white text-center"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Trámites Online
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 4.2: Verificar navegación**

Con `npm run dev`, navegar entre `/`, `/ciudadano`, `/turismo`, `/institucional`. El navbar debe:
- Mostrar el item activo con borde verde
- En mobile: abrir/cerrar el drawer
- Al hacer scroll 40px: aplicar blur

- [ ] **Step 4.3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add Navbar with sticky scroll effect, dropdowns and mobile drawer"
```

---

## Task 5: Footer

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 5.1: Implementar `src/components/Footer.jsx`**

```jsx
import { Link } from 'react-router-dom';
import { Mountain, Facebook, Instagram, Twitter } from 'lucide-react';
import EmergencyGrid from './EmergencyGrid.jsx';

const footerLinks = [
  {
    titulo: 'Municipio',
    links: [
      { label: 'Autoridades', to: '#' },
      { label: 'Historia de Tafí', to: '#' },
      { label: 'Ordenanzas', to: '#' },
      { label: 'Concejo Deliberante', to: '#' },
    ],
  },
  {
    titulo: 'Servicios',
    links: [
      { label: 'Trámites Online', to: '/ciudadano' },
      { label: 'Portal Turístico', to: '/turismo' },
      { label: 'Transparencia', to: '/institucional' },
      { label: 'Contacto', to: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <EmergencyGrid />

      <div style={{ backgroundColor: '#2A2A2A' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary-mid)' }}
                >
                  <Mountain className="text-white" size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
                    Municipalidad de
                  </p>
                  <p className="text-base font-black" style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>
                    Tafí del Valle
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
                Comprometidos con el desarrollo sustentable y la calidad de vida de los habitantes del Valle Sagrado.
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    aria-label="Red social"
                  >
                    <Icon size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {footerLinks.map((col) => (
              <div key={col.titulo}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>
                  {col.titulo}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm transition-colors duration-150 hover:text-white"
                        style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div
          className="border-t py-6"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
              © 2026 Municipalidad de Tafí del Valle — Provincia de Tucumán, Argentina
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5.2: Verificar en browser**

Ir a `http://localhost:5173`. El footer debe mostrar la EmergencyGrid oscura con 3 bloques, luego las columnas de links.

- [ ] **Step 5.3: Commit**

```bash
git add src/components/Footer.jsx src/components/EmergencyGrid.jsx
git commit -m "feat: add Footer with column links and integrated EmergencyGrid"
```

---

## Task 6: PortalCard

**Files:**
- Create: `src/components/PortalCard.jsx`

- [ ] **Step 6.1: Crear `src/components/PortalCard.jsx`**

```jsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PortalCard({ title, subtitle, description, image, to, accentColor }) {
  return (
    <Link
      to={to}
      className="group relative block overflow-hidden rounded-2xl"
      style={{ height: '480px' }}
      aria-label={`Ir al ${subtitle}`}
    >
      {/* Imagen con zoom en hover */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay gradient — se intensifica en hover */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.1) 100%)',
        }}
      />

      {/* Línea de color en el borde inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl"
        style={{ backgroundColor: `var(${accentColor})` }}
      />

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 transition-transform duration-500 group-hover:-translate-y-2">
        {/* Label badge */}
        <span
          className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-3 transition-all duration-300"
          style={{
            backgroundColor: `var(${accentColor})`,
            color: 'white',
            fontFamily: 'var(--font-body)',
          }}
        >
          {subtitle}
        </span>

        {/* Título */}
        <h3
          className="text-3xl font-black text-white mb-2 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h3>

        {/* Descripción — aparece en hover */}
        <p
          className="text-sm text-white/80 mb-4 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-xs"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {description}
        </p>

        {/* CTA */}
        <div
          className="flex items-center gap-2 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Ingresar
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 6.2: Confirmar que no hay errores**

El componente no se renderiza aún en ninguna página — se usa en el Task 7. Verificar que el archivo no arroja errores de eslint:

```bash
npm run lint
```

Esperado: sin errores.

- [ ] **Step 6.3: Commit**

```bash
git add src/components/PortalCard.jsx
git commit -m "feat: add PortalCard with hover zoom, overlay and animated CTA"
```

---

## Task 7: Home — Landing Page

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 7.1: Reemplazar `src/pages/Home.jsx` completo**

```jsx
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Mountain, Camera } from 'lucide-react';
import PortalCard from '../components/PortalCard.jsx';
import { noticias } from '../features/institucional/data/noticias.js';

const portals = [
  {
    title: 'Soy Residente',
    subtitle: 'Portal Ciudadano',
    description: 'Trámites, pagos de tasas, reclamos y servicios municipales para vecinos.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
    to: '/ciudadano',
    accentColor: '--color-primary',
  },
  {
    title: 'Soy Turista',
    subtitle: 'Portal Turístico',
    description: 'Descubrí los paisajes, la cultura y la gastronomía del Valle Sagrado de Tafí.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    to: '/turismo',
    accentColor: '--color-sky',
  },
  {
    title: 'Transparencia',
    subtitle: 'Portal Institucional',
    description: 'Noticias de gestión, presupuesto, ordenanzas y gobierno abierto.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
    to: '/institucional',
    accentColor: '--color-earth',
  },
];

const stats = [
  { valor: '12.000', label: 'Habitantes', icono: <Users size={20} /> },
  { valor: '2.000m', label: 'Altura sobre el mar', icono: <Mountain size={20} /> },
  { valor: '6', label: 'Atracciones destacadas', icono: <Camera size={20} /> },
  { valor: '150km', label: 'Desde Tucumán capital', icono: <MapPin size={20} /> },
];

function formatFecha(isoDate) {
  return new Date(isoDate).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Home() {
  const noticiasRecientes = noticias.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: 'calc(100vh - 80px)', minHeight: '560px' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=2000&q=80")',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(45,80,22,0.6) 0%, rgba(0,0,0,0.3) 100%)',
            }}
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Provincia de Tucumán — Argentina
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-none"
            style={{
              fontFamily: 'var(--font-heading)',
              textShadow: '0 2px 24px rgba(0,0,0,0.4)',
            }}
          >
            Tafí del Valle
          </h1>
          <p
            className="text-lg sm:text-xl text-white/85 mb-10 max-w-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            El valle sagrado de los Calchaquíes, a 2.000 metros sobre el mar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/turismo"
              className="px-8 py-4 rounded-xl font-bold text-white flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
            >
              Guía Turística <ArrowRight size={18} />
            </Link>
            <Link
              to="/ciudadano"
              className="px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                fontFamily: 'var(--font-body)',
              }}
            >
              Trámites Online <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Portal Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
          >
            Accesos directos
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black"
            style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-heading)' }}
          >
            ¿Qué necesitás?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portals.map((portal) => (
            <PortalCard key={portal.to} {...portal} />
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ backgroundColor: 'var(--color-stone-light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
                >
                  {stat.icono}
                </div>
                <p
                  className="text-3xl font-black"
                  style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
                >
                  {stat.valor}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
            >
              Últimas novedades
            </p>
            <h2
              className="text-4xl font-black"
              style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-heading)' }}
            >
              Noticias del municipio
            </h2>
          </div>
          <Link
            to="/institucional"
            className="hidden md:flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
          >
            Ver todas <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {noticiasRecientes.map((noticia) => (
            <article
              key={noticia.id}
              className="group overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg cursor-pointer"
              style={{ borderColor: 'var(--color-stone-light)', boxShadow: 'var(--shadow-card)' }}
            >
              <div className="overflow-hidden h-48">
                <img
                  src={noticia.image}
                  alt={noticia.titulo}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                  style={{
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {noticia.categoria}
                </span>
                <h3
                  className="font-bold text-base mb-2 line-clamp-2 leading-snug"
                  style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-heading)' }}
                >
                  {noticia.titulo}
                </h3>
                <p
                  className="text-sm mb-4 line-clamp-2"
                  style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
                >
                  {noticia.extracto}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
                >
                  {formatFecha(noticia.fecha)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/institucional"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
          >
            Ver todas las noticias <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 7.2: Verificar la landing en browser**

Ir a `http://localhost:5173`. Confirmar:
- Hero ocupa el viewport completo (menos navbar)
- Los 3 PortalCards aparecen en grid de 3 columnas
- Hover en PortalCard: imagen hace zoom, aparece descripción y CTA
- StatsBar con los 4 números
- 3 noticias en grid
- Footer con EmergencyGrid visible

- [ ] **Step 7.3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: build landing page with hero, portal grid, stats and news preview"
```

---

## Task 8: Portal Ciudadano

**Files:**
- Create: `src/features/ciudadano/components/TramiteCard.jsx`
- Create: `src/features/ciudadano/components/ServiciosList.jsx`
- Modify: `src/features/ciudadano/CiudadanoPage.jsx`

- [ ] **Step 8.1: Crear `src/features/ciudadano/components/TramiteCard.jsx`**

```jsx
import { ArrowRight, FileCheck, Receipt, Heart, HardHat, MessageSquare, CalendarCheck } from 'lucide-react';

const iconMap = {
  FileCheck, Receipt, Heart, HardHat, MessageSquare, CalendarCheck,
};

export default function TramiteCard({ titulo, descripcion, icono, link }) {
  const Icon = iconMap[icono] || FileCheck;
  return (
    <a
      href={link}
      className="group flex items-start gap-4 p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{
        borderColor: 'var(--color-stone-light)',
        backgroundColor: 'white',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-primary-light"
        style={{ backgroundColor: 'var(--color-primary-light)' }}
      >
        <Icon size={22} style={{ color: 'var(--color-primary)' }} />
      </div>
      <div className="flex-1">
        <h3
          className="font-bold text-base mb-1"
          style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-heading)' }}
        >
          {titulo}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
        >
          {descripcion}
        </p>
      </div>
      <ArrowRight
        size={18}
        className="flex-shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-1"
        style={{ color: 'var(--color-primary)' }}
      />
    </a>
  );
}
```

- [ ] **Step 8.2: Crear `src/features/ciudadano/components/ServiciosList.jsx`**

```jsx
import { AlertTriangle, Droplets, Trash2 } from 'lucide-react';

const iconMap = { AlertTriangle, Droplets, Trash2 };

export default function ServiciosList({ servicios }) {
  return (
    <ul className="space-y-4">
      {servicios.map((s) => {
        const Icon = iconMap[s.icono] || AlertTriangle;
        return (
          <li
            key={s.id}
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{ backgroundColor: 'var(--color-stone-light)' }}
          >
            <Icon size={20} style={{ color: 'var(--color-primary)' }} />
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-body)' }}>
                {s.titulo}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}>
                {s.descripcion}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
```

- [ ] **Step 8.3: Reemplazar `src/features/ciudadano/CiudadanoPage.jsx`**

```jsx
import { Link } from 'react-router-dom';
import { tramites, servicios } from './data/tramites.js';
import TramiteCard from './components/TramiteCard.jsx';
import ServiciosList from './components/ServiciosList.jsx';

export default function CiudadanoPage() {
  return (
    <div>
      {/* Portal Hero */}
      <div
        className="relative py-24 px-4"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-mid) 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            {' / '}Portal Ciudadano
          </p>
          <h1
            className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Soy Residente
          </h1>
          <p
            className="text-lg text-white/80 max-w-xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Accedé a trámites, pagos y servicios municipales sin salir de casa.
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Trámites — 2/3 */}
          <div className="lg:col-span-2">
            <h2
              className="text-3xl font-black mb-8"
              style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-heading)' }}
            >
              Trámites disponibles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tramites.map((t) => (
                <TramiteCard key={t.id} {...t} />
              ))}
            </div>
          </div>

          {/* Servicios — 1/3 */}
          <div>
            <h2
              className="text-3xl font-black mb-8"
              style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-heading)' }}
            >
              Servicios
            </h2>
            <ServiciosList servicios={servicios} />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className="py-16 px-4 text-center"
        style={{ backgroundColor: 'var(--color-primary-light)' }}
      >
        <h3
          className="text-2xl font-black mb-3"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
        >
          ¿No encontrás lo que buscás?
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}>
          Contactá directamente a la municipalidad por teléfono o en persona.
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
        >
          Contacto
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 8.4: Verificar portal**

Navegar a `http://localhost:5173/ciudadano`. Confirmar: hero verde, 6 TramiteCards en grid 2-col, lista de servicios a la derecha, CTA al final.

- [ ] **Step 8.5: Commit**

```bash
git add src/features/ciudadano/
git commit -m "feat: build Portal Ciudadano with tramite cards and services list"
```

---

## Task 9: Portal Turístico

**Files:**
- Create: `src/features/turismo/components/AtraccionCard.jsx`
- Create: `src/features/turismo/components/EventosBanner.jsx`
- Modify: `src/features/turismo/TurismoPage.jsx`

- [ ] **Step 9.1: Crear `src/features/turismo/components/AtraccionCard.jsx`**

```jsx
import { MapPin } from 'lucide-react';

const categoriaColors = {
  naturaleza: { bg: 'var(--color-primary-light)', text: 'var(--color-primary)' },
  cultura:    { bg: '#EDE8E3', text: 'var(--color-earth)' },
  aventura:   { bg: '#E8EEF7', text: 'var(--color-sky)' },
  gastronomía: { bg: '#FEF3E2', text: '#C47B20' },
};

export default function AtraccionCard({ nombre, categoria, distancia, descripcion, image }) {
  const colors = categoriaColors[categoria] || categoriaColors.naturaleza;
  return (
    <div
      className="group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{ boxShadow: 'var(--shadow-card)', backgroundColor: 'white' }}
    >
      <div className="overflow-hidden h-52">
        <img
          src={image}
          alt={nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-2 py-1 rounded-full text-xs font-semibold capitalize"
            style={{ backgroundColor: colors.bg, color: colors.text, fontFamily: 'var(--font-body)' }}
          >
            {categoria}
          </span>
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
          >
            <MapPin size={12} /> {distancia}
          </span>
        </div>
        <h3
          className="font-bold text-base mb-2"
          style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-heading)' }}
        >
          {nombre}
        </h3>
        <p
          className="text-sm line-clamp-2"
          style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
        >
          {descripcion}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 9.2: Crear `src/features/turismo/components/EventosBanner.jsx`**

```jsx
import { Calendar, ArrowRight } from 'lucide-react';

export default function EventosBanner({ evento }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl flex items-center justify-between gap-8 px-8 py-10"
      style={{ minHeight: '200px' }}
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${evento.image})` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(37,99,168,0.85) 0%, rgba(37,99,168,0.5) 100%)' }}
      />

      {/* Contenido */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Calendar size={16} className="text-white/80" />
          <span
            className="text-sm font-semibold text-white/80"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {evento.fecha}
          </span>
        </div>
        <h3
          className="text-3xl font-black text-white mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {evento.nombre}
        </h3>
        <p
          className="text-white/80 text-sm max-w-md"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {evento.descripcion}
        </p>
      </div>
      <a
        href="#"
        className="relative flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 whitespace-nowrap"
        style={{ backgroundColor: 'white', color: 'var(--color-sky)', fontFamily: 'var(--font-body)' }}
      >
        Ver programa <ArrowRight size={16} />
      </a>
    </div>
  );
}
```

- [ ] **Step 9.3: Reemplazar `src/features/turismo/TurismoPage.jsx`**

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { atracciones, eventoDestacado } from './data/atracciones.js';
import AtraccionCard from './components/AtraccionCard.jsx';
import EventosBanner from './components/EventosBanner.jsx';

const categorias = ['todos', 'naturaleza', 'cultura', 'aventura', 'gastronomía'];

export default function TurismoPage() {
  const [filtro, setFiltro] = useState('todos');
  const filtradas = filtro === 'todos' ? atracciones : atracciones.filter((a) => a.categoria === filtro);

  return (
    <div>
      {/* Portal Hero */}
      <div
        className="relative py-24 px-4"
        style={{ background: 'linear-gradient(135deg, var(--color-sky) 0%, #1A4F8E 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            {' / '}Portal Turístico
          </p>
          <h1
            className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Soy Turista
          </h1>
          <p
            className="text-lg text-white/80 max-w-xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Descubrí los paisajes, la cultura y la gastronomía del Valle Sagrado.
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Evento destacado */}
        <div className="mb-16">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
          >
            Evento destacado
          </p>
          <EventosBanner evento={eventoDestacado} />
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-3 mb-10 flex-wrap">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className="px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200"
              style={{
                backgroundColor: filtro === cat ? 'var(--color-sky)' : 'var(--color-stone-light)',
                color: filtro === cat ? 'white' : 'var(--color-stone-dark)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de atracciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtradas.map((a) => (
            <AtraccionCard key={a.id} {...a} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="py-16 px-4 text-center"
        style={{ backgroundColor: '#E8EEF7' }}
      >
        <h3
          className="text-2xl font-black mb-3"
          style={{ color: 'var(--color-sky)', fontFamily: 'var(--font-heading)' }}
        >
          ¿Necesitás información turística?
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}>
          La oficina de turismo te espera en el centro de Tafí del Valle.
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: 'var(--color-sky)', fontFamily: 'var(--font-body)' }}
        >
          Contactar
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 9.4: Verificar portal**

Navegar a `http://localhost:5173/turismo`. Confirmar: hero azul, EventosBanner, filtros por categoría funcionales, 6 AtraccionCards.

- [ ] **Step 9.5: Commit**

```bash
git add src/features/turismo/
git commit -m "feat: build Portal Turístico with filterable attraction cards and events banner"
```

---

## Task 10: Portal Institucional

**Files:**
- Create: `src/features/institucional/components/NoticiaCard.jsx`
- Create: `src/features/institucional/components/DocumentoItem.jsx`
- Modify: `src/features/institucional/InstitucionalPage.jsx`

- [ ] **Step 10.1: Crear `src/features/institucional/components/NoticiaCard.jsx`**

```jsx
import { ArrowRight } from 'lucide-react';

function formatFecha(isoDate) {
  return new Date(isoDate).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function NoticiaCard({ titulo, fecha, categoria, extracto, image }) {
  return (
    <article
      className="group overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      style={{ borderColor: 'var(--color-stone-light)', backgroundColor: 'white', boxShadow: 'var(--shadow-card)' }}
    >
      <div className="overflow-hidden h-48">
        <img
          src={image}
          alt={titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: '#EDE8E3', color: 'var(--color-earth)', fontFamily: 'var(--font-body)' }}
          >
            {categoria}
          </span>
          <span
            className="text-xs"
            style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
          >
            {formatFecha(fecha)}
          </span>
        </div>
        <h3
          className="font-bold text-base mb-2 line-clamp-2 leading-snug"
          style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-heading)' }}
        >
          {titulo}
        </h3>
        <p
          className="text-sm mb-4 line-clamp-3"
          style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
        >
          {extracto}
        </p>
        <div
          className="flex items-center gap-1 text-sm font-semibold transition-colors duration-200"
          style={{ color: 'var(--color-earth)', fontFamily: 'var(--font-body)' }}
        >
          Leer más <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 10.2: Crear `src/features/institucional/components/DocumentoItem.jsx`**

```jsx
import { FileText, Download } from 'lucide-react';

function formatFecha(isoDate) {
  return new Date(isoDate).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function DocumentoItem({ nombre, tipo, fecha, url }) {
  return (
    <a
      href={url}
      className="group flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-200 hover:shadow-md hover:border-earth"
      style={{
        borderColor: 'var(--color-stone-light)',
        backgroundColor: 'white',
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: '#EDE8E3' }}
      >
        <FileText size={18} style={{ color: 'var(--color-earth)' }} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold text-sm truncate"
          style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-body)' }}
        >
          {nombre}
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
        >
          {tipo} · {formatFecha(fecha)}
        </p>
      </div>
      <Download
        size={16}
        className="flex-shrink-0 transition-transform duration-200 group-hover:translate-y-0.5"
        style={{ color: 'var(--color-earth)' }}
      />
    </a>
  );
}
```

- [ ] **Step 10.3: Reemplazar `src/features/institucional/InstitucionalPage.jsx`**

```jsx
import { Link } from 'react-router-dom';
import { noticias, documentos } from './data/noticias.js';
import NoticiaCard from './components/NoticiaCard.jsx';
import DocumentoItem from './components/DocumentoItem.jsx';

export default function InstitucionalPage() {
  return (
    <div>
      {/* Portal Hero */}
      <div
        className="relative py-24 px-4"
        style={{ background: 'linear-gradient(135deg, var(--color-earth) 0%, #6B4E2E 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/70"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            {' / '}Portal Institucional
          </p>
          <h1
            className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Transparencia
          </h1>
          <p
            className="text-lg text-white/80 max-w-xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Noticias de gestión, documentos oficiales y gobierno abierto.
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Noticias — 2/3 */}
          <div className="lg:col-span-2">
            <h2
              className="text-3xl font-black mb-8"
              style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-heading)' }}
            >
              Últimas noticias
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {noticias.map((n) => (
                <NoticiaCard key={n.id} {...n} />
              ))}
            </div>
          </div>

          {/* Documentos — 1/3 */}
          <div>
            <h2
              className="text-3xl font-black mb-8"
              style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-heading)' }}
            >
              Documentos
            </h2>
            <div className="space-y-3">
              {documentos.map((d) => (
                <DocumentoItem key={d.id} {...d} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className="py-16 px-4 text-center"
        style={{ backgroundColor: '#EDE8E3' }}
      >
        <h3
          className="text-2xl font-black mb-3"
          style={{ color: 'var(--color-earth)', fontFamily: 'var(--font-heading)' }}
        >
          Gobierno Abierto
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}>
          Toda la información de gestión está disponible para los ciudadanos.
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: 'var(--color-earth)', fontFamily: 'var(--font-body)' }}
        >
          Ver informe de gestión
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 10.4: Verificar portal**

Navegar a `http://localhost:5173/institucional`. Confirmar: hero tierra, 4 NoticiaCards, 4 DocumentoItems, CTA al final.

- [ ] **Step 10.5: Commit**

```bash
git add src/features/institucional/
git commit -m "feat: build Portal Institucional with news cards and document downloads"
```

---

## Task 11: Micro-interacciones con Framer Motion

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/pages/Home.jsx`
- Modify: `src/features/ciudadano/CiudadanoPage.jsx`
- Modify: `src/features/turismo/TurismoPage.jsx`
- Modify: `src/features/institucional/InstitucionalPage.jsx`

- [ ] **Step 11.1: Crear utilidad de variantes compartidas**

Crear `src/styles/motion.js`:

```js
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const slideLeft = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0,       transition: { duration: 0.2 } },
};
```

- [ ] **Step 11.2: Agregar transición de página en `src/App.jsx`**

Reemplazar el `<Outlet key={location.pathname} />` por:

```jsx
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from './styles/motion.js';

// Dentro de Layout(), reemplazar el Outlet:
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
```

El `App.jsx` completo con el cambio:

```jsx
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { pageVariants } from './styles/motion.js';
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
      { path: '/ciudadano',     element: <CiudadanoPage /> },
      { path: '/turismo',       element: <TurismoPage /> },
      { path: '/institucional', element: <InstitucionalPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

- [ ] **Step 11.3: Agregar scroll reveals en `src/pages/Home.jsx`**

Agregar al inicio del archivo:
```jsx
import { motion } from 'framer-motion';
import { fadeUp, stagger, slideLeft } from '../styles/motion.js';
```

Envolver `PortalGrid` con motion:
```jsx
{/* Portal Grid — reemplazar la sección entera */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
  <motion.div
    className="text-center mb-16"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
  >
    <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}>
      Accesos directos
    </p>
    <h2 className="text-4xl sm:text-5xl font-black" style={{ color: 'var(--color-stone-dark)', fontFamily: 'var(--font-heading)' }}>
      ¿Qué necesitás?
    </h2>
  </motion.div>
  <motion.div
    className="grid grid-cols-1 md:grid-cols-3 gap-6"
    variants={stagger}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
  >
    {portals.map((portal) => (
      <motion.div key={portal.to} variants={fadeUp}>
        <PortalCard {...portal} />
      </motion.div>
    ))}
  </motion.div>
</section>
```

Envolver `StatsBar` con motion:
```jsx
{/* Stats Bar — reemplazar la sección entera */}
<section style={{ backgroundColor: 'var(--color-stone-light)' }}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-8"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={slideLeft} className="flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
            {stat.icono}
          </div>
          <p className="text-3xl font-black" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>{stat.valor}</p>
          <p className="text-sm" style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}>{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
```

Envolver `NewsPreview` cards con stagger:
```jsx
{/* En la sección de noticias, reemplazar el grid */}
<motion.div
  className="grid grid-cols-1 md:grid-cols-3 gap-8"
  variants={stagger}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
>
  {noticiasRecientes.map((noticia) => (
    <motion.div key={noticia.id} variants={fadeUp}>
      <article ...>
        {/* mismo contenido que antes */}
      </article>
    </motion.div>
  ))}
</motion.div>
```

- [ ] **Step 11.4: Verificar micro-interacciones**

Con `npm run dev`:
1. Navegar entre páginas → fade suave de 300ms
2. Scrollear en Home → PortalCards, StatsBar y noticias entran en cascada
3. Confirmar que no hay jank ni flashes en la animación de salida

- [ ] **Step 11.5: Commit**

```bash
git add src/styles/motion.js src/App.jsx src/pages/Home.jsx
git commit -m "feat: add Framer Motion page transitions and scroll-reveal animations"
```

---

## Task 12: Responsive y Polish Final

**Files:**
- Modify: `src/components/PortalCard.jsx`
- Modify: `src/pages/Home.jsx`

- [ ] **Step 12.1: Ajustar PortalCard para mobile**

En `src/components/PortalCard.jsx`, cambiar la altura fija por una responsiva:

```jsx
// Reemplazar style={{ height: '480px' }} por:
style={{ height: 'clamp(320px, 50vw, 480px)' }}
```

- [ ] **Step 12.2: Agregar aria-labels faltantes en Navbar**

En `src/components/Navbar.jsx`, confirmar que el botón hamburger y el botón de cierre del drawer tienen `aria-label`. Ya están en el código de Task 4 — verificar visualmente que aparecen en el DOM inspeccionando con DevTools.

- [ ] **Step 12.3: Verificar contraste de color**

Verificar en DevTools → Accessibility que los textos cumplen WCAG AA (ratio ≥ 4.5:1):
- Texto body `#6B6B6B` sobre `#FAFAF7` → ratio ≈ 4.7 ✓
- Texto blanco sobre verde `#2D5016` → ratio ≈ 9.2 ✓
- Badge verde `#2D5016` sobre `#E8F0E0` → ratio ≈ 5.1 ✓

Si alguno falla, oscurecer el color de fondo del badge 10%.

- [ ] **Step 12.4: Build de producción**

```bash
npm run build
```

Esperado: sin errores. Output:
```
dist/index.html         x.xx kB
dist/assets/index-xxx.js   xxx kB
```

- [ ] **Step 12.5: Preview de producción**

```bash
npm run preview
```

Abrir `http://localhost:4173`. Verificar que todas las rutas funcionan en el build de producción.

- [ ] **Step 12.6: Commit final**

```bash
git add -A
git commit -m "feat: responsive polish, a11y improvements and production build verified"
```

---

## Checklist de criterios de éxito

- [ ] Los 3 portales son accesibles desde la landing en ≤ 1 click
- [ ] `npm run build` sin errores ni warnings
- [ ] Navbar sticky con blur funciona en scroll
- [ ] EmergencyGrid visible en todas las páginas
- [ ] Filtros de turismo filtran correctamente
- [ ] Transiciones de página suaves al navegar
- [ ] Mobile: drawer abre y cierra, PortalCards en 1 columna
- [ ] Todas las imágenes tienen `alt` descriptivo
