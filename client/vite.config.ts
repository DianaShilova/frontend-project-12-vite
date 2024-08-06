import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/frontend-project-12-vite',
  server: {
    proxy: {
      '/api': 'http://localhost:5001',
    },
  },
});
