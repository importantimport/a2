import { defineConfig, mergeConfig } from 'vite'
import minifyHTML from 'rollup-plugin-minify-html-literals'
import { VitePWA } from 'vite-plugin-pwa'

export const baseConfig = defineConfig({
  build: { target: 'es2022' },
  esbuild: { legalComments: 'external' },
  plugins: [(minifyHTML as any).default()],
})

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [VitePWA({ injectRegister: 'inline' })],
  })
)
