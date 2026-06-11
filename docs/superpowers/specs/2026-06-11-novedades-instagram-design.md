# Sección "Últimas novedades" con reels de Instagram — Diseño

**Fecha:** 2026-06-11 · **Estado:** Aprobado por el usuario

## Objetivo

Mostrar en la Home una sección de últimas noticias/actualizaciones de la municipalidad
basada en los reels que publica Prensa en Instagram (@turismoentafidelvalle), con un
flujo de actualización trivial: pegar el link nuevo en un archivo de datos.

## Decisiones

- **Ubicación:** Home, después de la barra de estadísticas.
- **Formato:** embed oficial de Instagram (`blockquote.instagram-media` + `embed.js`),
  el reel se reproduce dentro del sitio. Sin API ni tokens.
- **Actualización frecuente:** archivo `src/data/novedades.js` con un array; el más
  nuevo va primero y la sección muestra los últimos 3.
- **Perfil:** botón "Ver más en Instagram" → https://www.instagram.com/turismoentafidelvalle

## Componentes

1. `src/data/novedades.js` — `export const novedades = [{ id, url }]`. Solo se pega
   el link del reel (los query params tipo `?igsh=` se normalizan en el componente).
2. `src/components/common/InstagramEmbed.jsx` — renderiza el blockquote oficial,
   carga `https://www.instagram.com/embed.js` una sola vez y llama a
   `window.instgrm.Embeds.process()` al montar (necesario en SPA). Fallback: si el
   script no carga, el blockquote muestra el link al reel.
3. `src/components/NovedadesSection.jsx` — título i18n ("Últimas novedades" /
   "Latest updates"), grilla responsive (1 col mobile → 3 cols desktop) con los
   últimos 3 reels, animaciones fadeUp/stagger existentes, botón al perfil.
4. `src/pages/Home.jsx` — inserta la sección después de Stats Bar.
5. i18n: claves `home:news.*` en `es/home.json` y `en/home.json`.

## Riesgos aceptados

- `embed.js` es un script de terceros (~peso extra en Home); se carga solo cuando
  la sección se monta. Si Instagram está bloqueado/lento, queda el link como fallback.

## Cómo agregar un reel nuevo

Editar `src/data/novedades.js` y agregar una línea al principio del array:

```js
{ id: <siguiente>, url: 'https://www.instagram.com/reel/XXXX/' },
```
