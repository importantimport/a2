import { defineConfig, mergeConfig } from 'vite'
import UnheadVite from '@unhead/addons/vite'
import minifyHTML from 'rollup-plugin-minify-html-literals-v3'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export const baseConfig = defineConfig({
  envPrefix: ['A2Z_', 'VITE_'],
  build: { target: 'es2022' },
  esbuild: { legalComments: 'external' },
  plugins: [
    UnheadVite(),
    minifyHTML(),
    tsconfigPaths(),
  ],
})

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [VitePWA({ injectRegister: 'inline' })],
  })
)
