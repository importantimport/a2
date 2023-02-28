import { defineConfig, mergeConfig } from 'vite'
import civetPlugin from 'vite-plugin-civet'
import template from 'rollup-plugin-html-literals'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export const baseConfig = defineConfig({
  envPrefix: ['A2Z_', 'VITE_'],
  build: { target: 'es2022' },
  esbuild: { legalComments: 'external' },
  plugins: [civetPlugin({ stripTypes: true }), template(), tsconfigPaths()],
})

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [VitePWA({ injectRegister: 'inline' })],
  })
)
