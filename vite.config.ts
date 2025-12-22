import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),],
 server: {
    host: true,   // exposes to local network
    port: 5173
  }}
)
