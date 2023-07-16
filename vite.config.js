
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/config': 'https://ikone-server.onrender.com/',
      '/checkout-session': 'https://ikone-server.onrender.com/',
      '/create-checkout-session': 'https://ikone-server.onrender.com/',
      '/webhook': 'https://ikone-server.onrender.com/',
    },
  },
  base: "/",
  plugins: [react()],
});
