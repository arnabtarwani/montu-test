/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul' // or 'v8'
    },
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      name: 'chromium',
    },
  }
})
