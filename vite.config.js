import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/meezan/',
  server: {
    host: true, // Makes the server accessible externally
    port: 5173, // Ensure it's set to the correct port
  },
});
