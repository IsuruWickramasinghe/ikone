
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/create-checkout-session': 'https://ikone-server.onrender.com',
    },
  },
  base: "/",
  plugins: [react()],
});
