export function slugify(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita diacríticos (combining marks)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')     // no alfanumérico -> guion
    .replace(/-+/g, '-')             // colapsa guiones
    .replace(/^-|-$/g, '');          // recorta extremos
}
