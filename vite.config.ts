import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Stands in for the `location = /immich/album` block in nginx.conf.template: the album id is
 * configuration, not something the browser should have to ask Immich for.
 */
function albumId(id: string): Plugin {
  return {
    name: 'immich-album-id',
    configureServer(server) {
      server.middlewares.use('/immich/album', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ albumId: id }))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const immich = env.VITE_IMMICH_URL
  const key = env.VITE_IMMICH_SHARE_KEY ?? ''

  return {
    plugins: [react(), albumId(env.VITE_IMMICH_ALBUM_ID ?? '')],
    server: {
      // Mirrors the /immich routes in nginx.conf.template, so dev and production speak to Immich
      // the same way. Without it the browser would hit Immich cross-origin, which fails: Immich
      // only enables CORS in its own dev mode.
      proxy: immich
        ? {
            '^/immich/(search|thumb/.*)$': {
              target: immich,
              changeOrigin: true,
              rewrite: (path) => {
                const [route, query] = path.replace(/^\/immich/, '').split('?')
                const size = new URLSearchParams(query).get('size') === 'preview' ? 'preview' : 'thumbnail'

                if (route === '/search') return `/api/search/metadata?key=${key}`

                const asset = route.match(/^\/thumb\/([\da-fA-F-]{36})$/)
                if (asset) return `/api/assets/${asset[1]}/thumbnail?key=${key}&size=${size}`

                return route
              },
            },
          }
        : undefined,
    },
  }
})
