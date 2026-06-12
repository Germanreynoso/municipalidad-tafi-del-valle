import { createClient } from '@supabase/supabase-js';

let url = import.meta.env.VITE_SUPABASE_URL;
let anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Sin throw a nivel de módulo: un throw acá hace que el optimizador del build
// elimine la app entera como código muerto y la página quede en blanco.
// Con placeholders el sitio estático sigue funcionando y solo fallan
// (con error visible en consola) las secciones que dependen de Supabase.
if (!url || !anonKey) {
  console.error(
    'Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Configurá el archivo .env'
  );
  url = url || 'https://placeholder.supabase.co';
  anonKey = anonKey || 'placeholder-anon-key';
}

export const supabase = createClient(url, anonKey);
