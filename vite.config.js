import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: path.resolve(__dirname, 'components-html'),
  base: '/map',
  resolve: {
    alias: {
      '@components-html': path.resolve(__dirname, 'components-html')
    }
  },
  server: {
    port: 3002,
    strictPort: true,
    name: 'url',
    open: '/map'
  }
})
