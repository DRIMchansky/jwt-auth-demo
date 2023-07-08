import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': 'http://localhost:4400'
      }
    }
  }
})
