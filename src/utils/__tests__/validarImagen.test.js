import { describe, it, expect } from 'vitest';
import { validarImagen, TIPOS_PERMITIDOS, TAMANO_MAX } from '../validarImagen.js';

const archivo = (type, size) => ({ type, size });

describe('validarImagen', () => {
  it('acepta jpg dentro del límite', () => {
    expect(validarImagen(archivo('image/jpeg', 500_000))).toEqual({ ok: true });
  });
  it('rechaza tipo no permitido', () => {
    const r = validarImagen(archivo('application/pdf', 1000));
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/tipo/i);
  });
  it('rechaza archivo demasiado grande', () => {
    const r = validarImagen(archivo('image/png', TAMANO_MAX + 1));
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/tama/i);
  });
  it('rechaza ausencia de archivo', () => {
    expect(validarImagen(null).ok).toBe(false);
  });
  it('expone tipos permitidos y tamaño máximo', () => {
    expect(TIPOS_PERMITIDOS).toContain('image/webp');
    expect(TAMANO_MAX).toBe(2 * 1024 * 1024);
  });
});
