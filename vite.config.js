import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    historyApiFallback: true, // Ensure SPA routing works locally
  },
  // Copy _redirects to dist after build
  buildEnd() {
    copyFileSync(resolve(__dirname, '_redirects'), resolve(__dirname, 'dist', '_redirects'));
  },
});