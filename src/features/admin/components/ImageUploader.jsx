import { useState } from 'react';
import { uploadImagen } from '../../noticias/api/noticias.js';
import { validarImagen } from '../../../utils/validarImagen.js';

export default function ImageUploader({ value, onChange }) {
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState(null);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    setError(null);
    const check = validarImagen(file);
    if (!check.ok) { setError(check.error); return; }
    setSubiendo(true);
    try {
      const url = await uploadImagen(file);
      onChange(url);
    } catch {
      setError('No se pudo subir la imagen.');
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="rounded-lg border border-dashed border-stone-300 bg-stone-50 p-4">
      {value && <img src={value} alt="Imagen de la noticia" className="w-full max-w-sm rounded-lg mb-3 object-cover" />}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={onFile}
        className="block w-full font-body text-sm text-stone file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-primary-light file:text-primary file:font-semibold file:cursor-pointer"
      />
      <p className="text-xs text-stone mt-2 font-body">JPG, PNG o WebP — máximo 2 MB.</p>
      {subiendo && <p className="text-sm text-stone mt-2 font-body">Subiendo…</p>}
      {error && <p className="text-sm text-red-600 mt-2 font-body">{error}</p>}
    </div>
  );
}
