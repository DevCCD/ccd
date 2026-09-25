// ============================================================
// Libro de frases: { "texto en español": "English text" }
// ------------------------------------------------------------
// La clave es el texto EXACTO que aparece en la página, con los espacios
// y saltos de línea colapsados a un solo espacio. Así el contenido que
// viene de src/data/* se traduce sin tocar los componentes.
//
// Un archivo por sección; aquí se combinan. Para ver qué falta:
//   npm run build && node scripts/i18n-missing.mjs <ruta>
//
// Los textos que no se traducen a propósito (nombres propios, siglas,
// redes sociales...) van en keep.js.
// ============================================================
import { capacidades } from "./capacidades.js";
import { industrias } from "./industrias.js";
import { paginas } from "./paginas.js";

export { keep } from "./keep.js";

export const phrases = {
  en: {
    ...capacidades,
    ...industrias,
    ...paginas,
  },
};
