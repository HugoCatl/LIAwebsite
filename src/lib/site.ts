/**
 * Datos canónicos del sitio.
 *
 * Única fuente de verdad para URLs absolutas (canonical, og:url, og:image,
 * sitemap y datos estructurados). Cuando tengas dominio propio, cambia
 * SITE_URL aquí y se actualiza en toda la web.
 */
export const SITE_URL = "https://hugocatl.github.io/LIAwebsite";

export const SITE_NAME = "LIA";
export const SITE_TITLE = "LIA · Tu segundo cerebro de escritorio";
export const SITE_DESCRIPTION =
  "Asistente de escritorio con IA local. Captura ideas desde cualquier app y las convierte en notas que se conectan solas. Tus datos siempre tuyos.";
export const SITE_AUTHOR = "Hugo Catalán";

/** Imagen para previsualizaciones al compartir (Open Graph / Twitter). */
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

/** Une SITE_URL con una ruta relativa garantizando una sola barra. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
