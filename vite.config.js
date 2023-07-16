
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/create-checkout-session': 'https://theikone.netlify.app/',
    },
  },
  base: "/",
  plugins: [react()],
});
