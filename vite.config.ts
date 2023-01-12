import { defineConfig } from 'vite'
import minifyHTML from 'rollup-plugin-minify-html-literals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    (minifyHTML as any).default()
  ]
})
