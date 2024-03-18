import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/work-projects-lbg/multi-web-app-tool/',
  plugins: [react()],
});
