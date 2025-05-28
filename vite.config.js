// 📄 frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './', // já é a pasta frontend, pois o vite.config.js está dentro dela
  plugins: [react()],
  publicDir: 'public',
});

