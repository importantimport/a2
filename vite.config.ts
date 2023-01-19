import { defineConfig, mergeConfig } from 'vite'
import template from 'rollup-plugin-html-literals'
import { VitePWA } from 'vite-plugin-pwa'

export const baseConfig = defineConfig({
  envPrefix: ['A2Z_', 'VITE_'],
  build: { target: 'es2022' },
  esbuild: { legalComments: 'external' },
  plugins: [template()],
})

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [VitePWA({ injectRegister: 'inline' })],
  })
)
