import { describe, it, expect } from 'vitest';
import { slugify } from '../slug.js';

describe('slugify', () => {
  it('pasa a minúsculas y reemplaza espacios por guiones', () => {
    expect(slugify('Nueva Plaza Central')).toBe('nueva-plaza-central');
  });
  it('quita acentos y eñes', () => {
    expect(slugify('Año de la Educación')).toBe('ano-de-la-educacion');
  });
  it('elimina caracteres especiales', () => {
    expect(slugify('¡Obras! en la Ruta 307 (2026)')).toBe('obras-en-la-ruta-307-2026');
  });
  it('colapsa guiones repetidos y recorta extremos', () => {
    expect(slugify('  Hola   ---  Mundo  ')).toBe('hola-mundo');
  });
});
