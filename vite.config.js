import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Esto es un ejemplo, cambia el endpoint según sea necesario
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
