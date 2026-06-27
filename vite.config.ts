// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// --- Despliegue en GitHub Pages -------------------------------------------
// Se activa SOLO cuando la variable de entorno GITHUB_PAGES === "true"
// (la define el workflow .github/workflows/deploy.yml). En el entorno normal
// de Lovable esa variable no existe, así que el preview y el build SSR de
// Lovable se comportan exactamente igual que antes (Cloudflare, sin base path).
//
// GitHub Pages sirve el proyecto bajo el subdirectorio del repositorio, por eso
// el base path. Si algún día migras a un dominio propio, cámbialo a "/".
const isGithubPages = process.env.GITHUB_PAGES === "true";
const BASE_PATH = "/LIAwebsite/";

export default defineConfig({
  // Prefijo de los assets (JS/CSS/imágenes) cuando se sirve bajo /LIAwebsite/.
  vite: isGithubPages ? { base: BASE_PATH } : {},
  // Fuera de Lovable desactivamos la capa Nitro (Cloudflare) para que TanStack
  // genere su salida estática nativa, que es la que el prerender necesita.
  nitro: isGithubPages ? false : undefined,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isGithubPages
      ? {
          // El router y los assets cuelgan del subdirectorio del repo.
          router: { basepath: BASE_PATH },
          client: { base: BASE_PATH },
          // Genera el HTML real de cada página en el build (no un shell vacío),
          // para que Google la indexe y cargue al instante. El JavaScript se
          // hidrata encima: animaciones e interactividad intactas.
          prerender: { enabled: true, crawlLinks: false },
          pages: [{ path: BASE_PATH, prerender: { enabled: true } }],
        }
      : {}),
  },
});
