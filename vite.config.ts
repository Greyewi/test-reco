import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://79c8-37-214-70-154.ngrok-free.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
