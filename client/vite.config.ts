import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import 'dotenv/config'

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': process.env.API_URI
      }
    }
  }
})
