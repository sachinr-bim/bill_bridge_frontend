import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/bill_bridge_frontend/', // Set the base path for GitHub Pages
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
