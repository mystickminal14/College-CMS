import { spawn } from 'node:child_process'
import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Must match PASS_SMS_URL in src/constants.tsx, which this config is not set up
// to import (it is JSX). Keep the two in step if the endpoint is ever renamed.
const PASS_SMS_PATH = '/api/send-pass-sms.php'
// The same endpoint on disk. public/ is copied verbatim into dist/, so the two
// differ only by that prefix.
const PASS_SMS_FILE = 'public/api/send-pass-sms.php'

/**
 * Runs the pass-SMS endpoint through the php binary during `npm run dev`.
 *
 * In production Apache executes public/api/send-pass-sms.php directly. Vite
 * serves public/ as static files, so without this the dev server would hand
 * back the PHP source as text instead of running it. This executes the very
 * same file that gets uploaded — not a reimplementation — so what is tested
 * locally is what ships.
 *
 * `apply: 'serve'` keeps it out of `vite build` entirely. The token is read
 * here, in the Node process, and passed to PHP through the environment; it
 * never reaches the browser, since SMS_TOKEN has no VITE_ prefix and nothing
 * inlines it into the bundle.
 */
const passSmsDevEndpoint = (mode: string): Plugin => {
  // The empty prefix is the point: loadEnv only returns VITE_* by default, and
  // the whole reason SMS_TOKEN is spelled without one is to stay out of the
  // client bundle.
  const env = loadEnv(mode, process.cwd(), '')

  const phpEnv = (): NodeJS.ProcessEnv => ({
    ...process.env,
    REQUEST_METHOD: 'POST',
    SMS_TOKEN: env.SMS_TOKEN ?? '',
    // Defaults to the local PHP API, which is where the visitor being
    // registered actually lives while developing.
    VISITOR_API_BASE_URL: env.VISITOR_API_BASE_URL ?? 'https://edusysapi.lbef.info/',
    ...(env.SMS_ORG_NAME ? { SMS_ORG_NAME: env.SMS_ORG_NAME } : {}),
    ...(env.WIFI_SSID ? { WIFI_SSID: env.WIFI_SSID } : {}),
    ...(env.WIFI_USERNAME ? { WIFI_USERNAME: env.WIFI_USERNAME } : {}),
    ...(env.WIFI_PASSWORD ? { WIFI_PASSWORD: env.WIFI_PASSWORD } : {}),
  })

  return {
    name: 'pass-sms-dev-endpoint',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(PASS_SMS_PATH, async (req, res) => {
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)

        const php = spawn('php', [PASS_SMS_FILE], {
          cwd: process.cwd(),
          env: { ...phpEnv(), REQUEST_METHOD: req.method ?? 'POST' },
        })

        let out = ''
        let err = ''
        php.stdout.on('data', (d) => (out += d))
        php.stderr.on('data', (d) => (err += d))
        php.stdin.end(Buffer.concat(chunks))

        php.on('error', () => {
          // No php binary on PATH — say so plainly rather than letting the
          // kiosk report a generic "could not reach the SMS service".
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ sent: false, reason: 'php is not installed on this machine.' }))
        })

        php.on('close', () => {
          // Logged because a dev has no server error log to read, and every one
          // of these costs real SMS balance — worth seeing each attempt.
          if (err.trim()) console.error(`[pass-sms] ${err.trim()}`)

          res.setHeader('Content-Type', 'application/json')

          // If the endpoint ever stops being valid PHP — a stripped opening
          // tag, a fatal, a stray warning printed before the body — php echoes
          // the source or the error instead of JSON. Labelling that
          // application/json and returning 200 made a broken endpoint look
          // like a working one, so it is caught here and named.
          try {
            JSON.parse(out)
          } catch {
            const head = out.trim().slice(0, 200) || '(no output)'
            console.error(`[pass-sms] php did not return JSON: ${head}`)
            res.statusCode = 500
            res.end(JSON.stringify({
              sent: false,
              reason: `${PASS_SMS_FILE} did not return JSON — check it is valid PHP.`,
            }))
            return
          }

          console.log(`[pass-sms] ${out.trim()}`)
          res.statusCode = 200
          res.end(out)
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss(),
    react(),
    passSmsDevEndpoint(mode),
  ],
  optimizeDeps: {
    force: true,
  },
  server: {
    host: true,   // exposes to local network
    port: 5173
  }
}))
