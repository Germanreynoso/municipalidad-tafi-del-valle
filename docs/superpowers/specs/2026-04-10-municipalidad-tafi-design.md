# SDD: Municipalidad de Tafí del Valle — Web Municipal "Modern Mountain"

**Fecha:** 2026-04-10  
**Stack:** React 18 + Vite + Tailwind CSS + React Router v6 + Framer Motion  
**Contenido:** Estático (JSON local)  
**Assets:** Placeholders Unsplash hasta recepción de material oficial  
**Referencia estética:** sanjavieryacanto.gob.ar (estructura de portales, minimalismo)

---

## 1. Objetivos

- Crear una web municipal premium con acceso inmediato a los 3 portales principales.
- Transmitir identidad "Modern Mountain": limpia, confiable, con personalidad patagónica/andina.
- Estructura escalable: cada portal es una feature independiente con su propia ruta.
- Mobile-first, accesible, performante desde el lanzamiento.

---

## 2. Arquitectura de Archivos

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── EmergencyGrid.jsx
│
├── features/
│   ├── ciudadano/
│   │   ├── CiudadanoPage.jsx
│   │   ├── components/
│   │   │   ├── TramiteCard.jsx
│   │   │   └── ServiciosList.jsx
│   │   └── data/tramites.js
│   │
│   ├── turismo/
│   │   ├── TurismoPage.jsx
│   │   ├── components/
│   │   │   ├── AtraccionCard.jsx
│   │   │   └── EventosBanner.jsx
│   │   └── data/atracciones.js
│   │
│   └── institucional/
│       ├── InstitucionalPage.jsx
│       ├── components/
│       │   ├── NoticiaCard.jsx
│       │   └── DocumentoItem.jsx
│       └── data/noticias.js
│
├── pages/
│   └── Home.jsx
│
├── styles/
│   └── tokens.css
│
├── App.jsx
└── main.jsx
```

---

## 3. Rutas (React Router v6)

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Home.jsx` | Landing con los 3 Hero Portals |
| `/ciudadano` | `CiudadanoPage.jsx` | Trámites, pagos, servicios al vecino |
| `/turismo` | `TurismoPage.jsx` | Atracciones, eventos, guía local |
| `/institucional` | `InstitucionalPage.jsx` | Noticias de gestión, transparencia |

`App.jsx` actúa como shell de router con `AnimatePresence` para transiciones de página.

---

## 4. Design System "Modern Mountain"

### 4.1 Paleta de Colores

```css
/* tokens.css */
:root {
  /* Verdes monte */
  --color-primary:       #2D5016;  /* Verde oscuro — CTAs principales */
  --color-primary-mid:   #4A7C2F;  /* Verde medio — hovers, íconos activos */
  --color-primary-light: #E8F0E0;  /* Verde suave — fondos cards ciudadano */

  /* Grises piedra/cerro */
  --color-stone-dark:    #3A3A3A;  /* Texto principal, headings */
  --color-stone:         #6B6B6B;  /* Texto secundario, bordes */
  --color-stone-light:   #F0EEEA;  /* Fondos de secciones alternas */

  /* Acentos portales */
  --color-earth:         #8C6A3F;  /* Tierra/adobe — Portal Institucional */
  --color-sky:           #2563A8;  /* Azul cielo serrano — Portal Turístico */

  /* Base */
  --color-white-warm:    #FAFAF7;  /* Background general */
  --color-emergency-red: #C0392B;  /* Emergencias */

  /* Sombras */
  --shadow-card:  0 4px 24px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.14);
  --shadow-nav:   0 1px 8px rgba(0, 0, 0, 0.06);
}
```

### 4.2 Color Coding por Portal

| Portal | Label | Color dominante | Sensación |
|--------|-------|----------------|-----------|
| Ciudadano | "Soy Residente" | Verde `#2D5016` | Confianza, institucional |
| Turístico | "Soy Turista" | Azul `#2563A8` | Aventura, cielo, paisaje |
| Institucional | "Transparencia" | Tierra `#8C6A3F` | Solidez, apertura |

### 4.3 Tipografía

| Rol | Fuente | Peso | Tamaño |
|-----|--------|------|--------|
| Hero titles | Montserrat | Black 900 | 64–80px |
| Section headings | Montserrat | Bold 700 | 32–48px |
| Portal card titles | Montserrat | Bold 700 | 24px |
| Body text | Inter | Regular 400 | 16px |
| Labels / caps | Inter | SemiBold 600 | 12px, letter-spacing: 0.1em |
| Nav items | Inter | SemiBold 600 | 14px |

Carga vía Google Fonts en `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Inter:wght@400;600&display=swap');
```

### 4.4 Espaciado y Ritmo Visual

- **Base unit:** 8px
- **Section padding:** 96px vertical (desktop) / 48px (mobile)
- **Card gap:** 32px
- **Max content width:** 1280px (`max-w-7xl`)
- **Card border-radius:** 16px
- **Whitespace mínimo entre secciones:** 64px

---

## 5. Jerarquía de Componentes

### 5.1 Home.jsx

```
Home
├── Navbar
├── HeroMain              ← Imagen fullscreen calc(100vh - 80px) + título + tagline + 2 CTAs
├── PortalGrid            ← 3 columnas desktop / 1 columna mobile
│   ├── PortalCard (Ciudadano)
│   ├── PortalCard (Turismo)
│   └── PortalCard (Institucional)
├── StatsBar              ← 3-4 métricas rápidas del municipio
├── NewsPreview           ← 3 noticias recientes (data de institucional/data/noticias.js)
└── Footer
    └── EmergencyGrid
```

### 5.2 Navbar.jsx

- Logo SVG placeholder + "Municipalidad de Tafí del Valle"
- Links: Inicio / Municipio / Turismo / Trámites / Contacto
- Submenús en hover (dropdown con `opacity + translateY`)
- Sticky: en scroll > 40px aplica `backdrop-blur-sm bg-white/90`
- CTA derecho: botón "Trámites Online" con color `--color-primary`
- Mobile: hamburger → drawer lateral

### 5.3 PortalCard.jsx

Props:
```js
{
  title: string,        // "Soy Residente"
  subtitle: string,     // "Portal Ciudadano"
  description: string,
  image: string,        // URL Unsplash placeholder
  to: string,           // Ruta React Router ("/ciudadano")
  accentColor: string   // Token CSS ("--color-primary" | "--color-sky" | "--color-earth")
}
```

Comportamiento visual:
- Altura fija: 480px desktop / 360px mobile
- Imagen de fondo con `object-fit: cover`
- Overlay gradient: `rgba(0,0,0,0.1)` → `rgba(0,0,0,0.5)` en hover
- Imagen: `scale(1)` → `scale(1.06)`, `transition: 600ms ease-out`
- Texto: `translateY(0)` → `translateY(-8px)` en hover
- Borde inferior: línea de color del portal, aparece con slide-in 300ms
- CTA: "Ingresar →" aparece en hover con fade-in

### 5.4 EmergencyGrid.jsx

3 bloques horizontales, fondo `--color-stone-dark`:

```
[ 🏥 Hospital  |  🚔 Policía  |  🚒 Bomberos ]
  (154) 421-XXX  (154) 422-XXX  (154) 100
```

- Número en Montserrat Bold 24px
- Color: blanco por defecto, `--color-emergency-red` en hover
- Borde izquierdo de acento en hover (3px solid --color-emergency-red)
- Responsive: se apila en 1 columna en mobile

### 5.5 Componentes secundarios de portales

**`ServiciosList.jsx`** (ciudadano) — Lista vertical de servicios municipales con ícono + título + descripción corta + link externo. Layout de lista en mobile, 2 columnas en desktop.

**`EventosBanner.jsx`** (turismo) — Banner horizontal con imagen de fondo, fecha destacada, nombre del evento y CTA "Ver programa". Máx. 1 evento activo a la vez.

**`DocumentoItem.jsx`** (institucional) — Fila de tabla simplificada: ícono PDF/DOC + nombre del documento + fecha + botón "Descargar". Sin imagen.

**`PortalCTA.jsx`** (shared, recibe props) — Sección de fondo de color sólido (`accentColor`), título centrado, descripción corta y botón principal. Se usa al final de cada página de portal para redirigir a contacto o acción relacionada.

### 5.6 Páginas de portal (estructura común)

```
[PortalPage]
├── PortalHero     ← Banner 400px + imagen + título del portal + breadcrumb
├── PortalContent  ← Grid de cards específico (TramiteCard / AtraccionCard / NoticiaCard)
└── PortalCTA      ← Sección de llamado a acción (componente shared con props de color)
```

---

## 6. Micro-interacciones (Framer Motion)

### 6.1 Scroll Reveals

```js
// Variante reutilizable para todas las secciones
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

// PortalGrid — stagger entre cards
const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } }
}
```

Secciones con scroll reveal:
- `PortalGrid` → stagger 150ms entre cada `PortalCard`
- `StatsBar` → fade-in lateral (`x: -16 → 0`)
- `NewsPreview` → stagger 100ms
- `PortalContent` en páginas de portal → stagger 120ms

### 6.2 Transiciones de Página

```js
// En App.jsx con AnimatePresence
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit:    { opacity: 0,        transition: { duration: 0.2 } }
}
```

### 6.3 Navbar en Scroll

```js
// Estado derivado del scroll
const [scrolled, setScrolled] = useState(false)
// scrollY > 40 → aplica: bg-white/90 backdrop-blur-sm shadow-nav
```

---

## 7. Datos Estáticos (estructura)

### `ciudadano/data/tramites.js`
```js
export const tramites = [
  { id: 1, titulo: 'Habilitación Comercial', descripcion: '...', icono: 'FileCheck', link: '#' },
  { id: 2, titulo: 'Libre Deuda Municipal',  descripcion: '...', icono: 'Receipt',   link: '#' },
  // ...
]
```

### `turismo/data/atracciones.js`
```js
export const atracciones = [
  { id: 1, nombre: 'Laguna del Indio', categoria: 'naturaleza', distancia: '12km', image: 'https://...' },
  { id: 2, nombre: 'Menhires de Tafí',  categoria: 'cultura',    distancia: '5km',  image: 'https://...' },
  // ...
]
```

### `institucional/data/noticias.js`
```js
export const noticias = [
  { id: 1, titulo: '...', fecha: '2026-04-08', categoria: 'Obras', extracto: '...', image: 'https://...' },
  // ...
]
```

---

## 8. Dependencias a Instalar

```bash
npm install react-router-dom framer-motion
```

Dependencias ya instaladas: `react`, `react-dom`, `lucide-react`, `tailwindcss`.

---

## 9. Plan de Fases

| Fase | Contenido | Resultado verificable |
|------|-----------|-----------------------|
| **1 — Foundation** | Instalar Router + Framer Motion, `tokens.css`, config Tailwind extendida, Montserrat en `index.css`, limpiar `App.jsx` como shell | `npm run dev` compila, paleta y fuentes visibles |
| **2 — Shared Components** | `Navbar`, `Footer`, `EmergencyGrid` | Layout global con navegación funcional |
| **3 — Home / Landing** | `HeroMain`, `PortalGrid` + `PortalCard`, `StatsBar`, `NewsPreview` | Landing completa con los 3 portales |
| **4 — Portal Ciudadano** | `CiudadanoPage`, `TramiteCard`, `ServiciosList`, datos, ruta `/ciudadano` | Portal ciudadano navegable |
| **5 — Portal Turístico** | `TurismoPage`, `AtraccionCard`, `EventosBanner`, datos, ruta `/turismo` | Portal turístico navegable |
| **6 — Portal Institucional** | `InstitucionalPage`, `NoticiaCard`, `DocumentoItem`, datos, ruta `/institucional` | Portal institucional navegable |
| **7 — Micro-interacciones** | Framer Motion: scroll-reveals, stagger, transiciones de página, navbar scroll, hover PortalCard | Experiencia fluida premium |
| **8 — Polish & Responsive** | Mobile: hamburger drawer, grid breakpoints, accesibilidad (`aria-label`, contraste WCAG AA) | Listo para revisión de cliente |

---

## 10. Criterios de Éxito

- [ ] Los 3 portales son accesibles desde la landing en ≤ 1 click
- [ ] Lighthouse Performance ≥ 85 en desktop
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Todos los links de navegación funcionan (sin 404)
- [ ] EmergencyGrid visible en todas las páginas (incluido mobile)
- [ ] Imágenes con `alt` descriptivo en todos los casos
- [ ] Sin warnings en consola en producción (`npm run build`)
