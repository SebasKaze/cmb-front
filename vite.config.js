import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [react()],
    server: isDevelopment
      ? {
          host: true,
          proxy: {
            '/api': {
              target: 'http://localhost:4000', // solo para desarrollo
              changeOrigin: true,
              secure: false
            }
          }
        }
      : undefined, // No configuración de servidor en producción
    build: {
      outDir: 'dist',
      emptyOutDir: true
    }
  };
});
