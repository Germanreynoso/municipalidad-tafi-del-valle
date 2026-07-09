# Diseño: Sección de Noticias autogestionable con Supabase

**Fecha:** 2026-06-05
**Estado:** Aprobado, pendiente de plan de implementación

## Objetivo

Permitir que el personal de prensa de la Municipalidad de Tafí del Valle gestione
noticias de forma autónoma (crear, editar, borrar, publicar) desde un panel de
administración, sin intervención de desarrollo. Las noticias se almacenan en
Supabase y se muestran públicamente en el sitio.

## Contexto del proyecto

- SPA **Vite + React 19** (`react-router-dom` v7), 100% cliente, sin backend propio.
- i18n con `react-i18next` (ES/EN) para el resto del sitio.
- Hoy las noticias son datos hardcodeados (`src/features/institucional/data/noticias.js`)
  + claves i18n, renderizadas en `InstitucionalPage` y `Home`.
- Estilos con Tailwind v4; animaciones con `framer-motion`.

## Decisiones tomadas (brainstorming)

1. **Idioma:** noticias solo en **español** (el resto del sitio sigue bilingüe).
2. **Imágenes:** subida de archivos a **Supabase Storage** desde el panel.
3. **Usuarios de prensa:** **alta manual** en el dashboard de Supabase (sin registro abierto).
4. **Vistas públicas:** **listado + detalle** (`/noticias` y `/noticias/:slug`),
   reemplazando las noticias hardcodeadas.
5. **Editor:** **WYSIWYG enriquecido** (Tiptap).
6. **Flujo editorial:** estado **borrador / publicado** + **categorías fijas**.

## Enfoque técnico elegido

`@supabase/supabase-js` + un módulo API delgado (`api/noticias.js`) + hooks propios
(`useNoticias`, `useNoticia`) con `useState`/`useEffect`. Sin librería de estado
adicional. Ruta de upgrade futura: TanStack Query si crece el volumen.

## Modelo de datos

### Tabla `noticias`

| campo | tipo | nota |
|---|---|---|
| `id` | uuid PK | default `gen_random_uuid()` |
| `slug` | text UNIQUE NOT NULL | generado del título; usado en `/noticias/:slug` |
| `titulo` | text NOT NULL | |
| `extracto` | text | resumen corto para la tarjeta |
| `contenido` | text | HTML producido por el editor Tiptap |
| `categoria` | text NOT NULL | CHECK contra lista fija |
| `imagen_url` | text | URL pública del archivo en Storage |
| `estado` | text NOT NULL | `'borrador'` \| `'publicado'`, default `'borrador'`, CHECK |
| `published_at` | timestamptz | se setea al pasar a publicado |
| `created_at` | timestamptz | default `now()` |
| `updated_at` | timestamptz | default `now()`, actualizado por trigger |
| `author_id` | uuid | FK a `auth.users(id)` |

### Categorías fijas

Lista única definida en el frontend (`data/categorias.js`) y replicada como CHECK
constraint en la DB:

`Gobierno`, `Cultura`, `Turismo`, `Obras`, `Comunidad`, `Eventos`

(Lista final a confirmar en implementación; cambiarla implica migración del CHECK.)

### Slug

Generado del título: minúsculas, sin acentos, espacios→`-`, sin caracteres
especiales. Si colisiona, se agrega sufijo incremental (`-2`, `-3`, ...).

## Seguridad (Row Level Security)

RLS es el mecanismo central de protección: la `anon key` es pública por diseño y se
envía al cliente. **Nunca** se usa la `service_role key` en el frontend.

### Políticas tabla `noticias`
- **SELECT (anon):** solo filas con `estado = 'publicado'`.
- **SELECT (authenticated):** todas las filas (para gestionar borradores en el panel).
- **INSERT / UPDATE / DELETE:** solo `authenticated`.

### Storage (bucket `noticias`)
- Bucket con **lectura pública**.
- **INSERT / UPDATE / DELETE** de objetos: solo `authenticated`.
- Ruta de archivos: `noticias/{uuid}.{ext}`.

## Estructura frontend

```
src/lib/supabase.js                      # init cliente desde env VITE_SUPABASE_*
src/features/noticias/
  data/categorias.js                     # lista fija de categorías
  api/noticias.js                        # CRUD + uploadImagen + generación de slug
  hooks/useNoticias.js                   # listado (público o admin según sesión)
  hooks/useNoticia.js                    # una noticia por slug/id
  NoticiasPage.jsx                       # /noticias — listado público (solo publicadas)
  NoticiaDetallePage.jsx                 # /noticias/:slug — render HTML sanitizado
  components/NoticiaCard.jsx             # adaptado: recibe datos de Supabase (no i18n)
src/features/admin/
  auth/AuthContext.jsx                   # provee sesión + login/logout
  auth/useAuth.js
  ProtectedRoute.jsx                     # guard de sesión
  LoginPage.jsx                          # /admin/login
  AdminLayout.jsx                        # layout del panel
  NoticiasAdminPage.jsx                  # /admin — tabla: listar, editar, borrar, publicar
  NoticiaEditorPage.jsx                  # /admin/noticias/nueva y /:id/editar
  components/EditorWYSIWYG.jsx           # Tiptap
  components/ImageUploader.jsx           # sube a Storage + valida
```

## Dependencias nuevas

- `@supabase/supabase-js`
- `@tiptap/react` + `@tiptap/starter-kit`
- `dompurify` (sanitizar HTML al renderizar el detalle)

> Verificar APIs actualizadas vía context7 antes de implementar Supabase JS y Tiptap.

## Rutas (App.jsx)

**Públicas:** `/noticias`, `/noticias/:slug`
**Admin:** `/admin/login`, `/admin` (protegida), `/admin/noticias/nueva`,
`/admin/noticias/:id/editar`

El layout/guard de admin queda fuera del `Layout` público (sin Navbar/Footer del sitio),
o con un layout propio, a definir en implementación.

## Migración de lo existente

- `InstitucionalPage` y `Home` pasan a leer las últimas noticias **publicadas** desde
  Supabase en lugar de `noticias.js` + claves i18n.
- Se elimina el array hardcodeado de noticias y sus claves i18n asociadas.
- `documentos` (en el mismo archivo `noticias.js`) queda fuera de alcance de este spec;
  no se toca.
- Opcional: seed inicial con 2-3 noticias de ejemplo.

## Manejo de errores

- Hooks exponen estados `loading` / `error`.
- Validación de imagen antes de subir: tipo permitido (jpg/png/webp) y tamaño máx (~2MB).
- Slug duplicado: sufijo incremental.
- Sesión expirada en el panel: redirect a `/admin/login`.
- Errores de red/Supabase: mensaje al usuario, sin romper la vista.

## Testing

No hay runner de tests hoy. Se agrega **Vitest** solo para lógica pura:
generación de slug y validadores de imagen. Los flujos de UI se prueban manualmente
(y opcionalmente con Playwright). Enfoque pragmático, sin sobreinvertir.

## Trabajo previo del usuario (fuera de código, bloquea implementación)

1. Crear proyecto en Supabase y obtener `URL` + `anon key`.
2. Ejecutar el SQL: tabla `noticias`, CHECK constraints, trigger `updated_at`, políticas RLS.
3. Crear el bucket `noticias` (lectura pública) y sus políticas de Storage.
4. Dar de alta los usuarios de prensa (email/contraseña) en el dashboard.
5. Configurar variables de entorno: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   (en `.env` local y en el hosting de producción).

## Fuera de alcance

- Noticias bilingües (solo español por ahora).
- Gestión de documentos/ordenanzas.
- Gestión de categorías desde el panel (son fijas).
- Registro/invitación de usuarios (alta manual).
- Comentarios, etiquetas, búsqueda dentro de noticias, paginación avanzada
  (puede agregarse luego).
