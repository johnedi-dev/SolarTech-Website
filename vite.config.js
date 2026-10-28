import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Multi-page build: the Solar Load Calculator ships as a real URL (/solar-calculator/)
// with its own HTML head (title, meta, structured data) so it is fully indexable.
// mpa = no SPA fallback: unknown URLs 404 instead of serving a duplicate home shell.

/**
 * Pretty-URL parity for `vite dev` / `vite preview` only.
 * Real static hosts (Apache, nginx, Netlify, Cloudflare Pages, GitHub Pages)
 * redirect bare directory paths to their trailing-slash form automatically —
 * these middlewares replicate that locally so both URL forms work in dev.
 */
function prettyUrls() {
  const handler = (req, res, next) => {
    const path = req.url.split('?')[0];
    if (path === '/index.html') {
      // Internal rewrite: serve the home page without exposing /index.html
      req.url = '/';
    } else if (path === '/solar-calculator') {
      // Canonical form of the calculator URL (matches hosts' own behavior)
      res.writeHead(301, { Location: '/solar-calculator/' });
      return res.end();
    } else if (path === '/solar-lahore') {
      // Canonical form of the Lahore landing page
      res.writeHead(301, { Location: '/solar-lahore/' });
      return res.end();
    } else if (path === '/solar-faisalabad') {
      // Canonical form of the Faisalabad landing page
      res.writeHead(301, { Location: '/solar-faisalabad/' });
      return res.end();
    }
    next();
  };
  return {
    name: 'pretty-urls',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  appType: 'mpa',
  plugins: [
    react(),
    tailwindcss(),
    prettyUrls(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        calculator: resolve(import.meta.dirname, 'solar-calculator/index.html'),
        lahore: resolve(import.meta.dirname, 'solar-lahore/index.html'),
        faisalabad: resolve(import.meta.dirname, 'solar-faisalabad/index.html'),
      },
    },
  },
})
