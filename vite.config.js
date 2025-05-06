import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [react()],
    server: isDevelopment
      ? {
          host: true,
          proxy: {
            '/api': {
              target: 'http://localhost:4000', // tu backend local
              changeOrigin: true,
              secure: false
            }
          }
        }
      : undefined // No usar configuración del servidor en producción
  };
});
