export const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp'];
export const TAMANO_MAX = 2 * 1024 * 1024; // 2 MB

export function validarImagen(file) {
  if (!file) return { ok: false, error: 'No se seleccionó ningún archivo.' };
  if (!TIPOS_PERMITIDOS.includes(file.type)) {
    return { ok: false, error: 'Tipo de archivo no permitido (usá JPG, PNG o WebP).' };
  }
  if (file.size > TAMANO_MAX) {
    return { ok: false, error: 'La imagen supera el tamaño máximo de 2 MB.' };
  }
  return { ok: true };
}
