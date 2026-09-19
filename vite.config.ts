import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// @ts-expect-error The same JavaScript serverless handler is reused by Vercel and local Vite.
import healthieIntakeHandler from './api/healthie-intake.js'

export default defineConfig(({ mode }) => {
  // Vite exposes only VITE_ variables to the browser. Load the remaining values
  // here so the local development server can safely run the server-side route.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
  plugins: [react(), tailwindcss(), {
    name: 'local-healthie-intake-api',
    configureServer(server) {
      server.middlewares.use('/api/healthie-intake', (req, res) => {
        let rawBody = ''
        req.on('data', (chunk) => { rawBody += chunk })
        req.on('end', async () => {
          try {
            const request = Object.assign(req, { body: JSON.parse(rawBody || '{}') })
            const response = Object.assign(res, {
              status(code: number) { res.statusCode = code; return response },
              json(body: unknown) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)) },
            })
            await healthieIntakeHandler(request, response)
          } catch {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ message: 'Invalid intake request.' }))
          }
        })
      })
    },
  }],
  }
})
