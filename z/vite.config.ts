import { compileLitTemplates } from '@lit-labs/compiler'
import typescript from '@rollup/plugin-typescript'
import UnheadVite from '@unhead/addons/vite'
import minifyHTML from 'rollup-plugin-minify-html-literals-v3'
import { type Plugin, defineConfig, mergeConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export const baseConfig = defineConfig({
  envPrefix: ['A2Z_', 'VITE_'],
  build: { target: 'es2022' },
  esbuild: { legalComments: 'external' },
  plugins: [
    typescript({
      declaration: false,
      outDir: 'dist',
      transformers: {
        before: [compileLitTemplates()]
      },
    }) as unknown as Plugin,
    UnheadVite(),
    tsconfigPaths(),
  ],
})

export default defineConfig(({ mode }) => mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      ...(mode === 'prod' ? [minifyHTML()] : []),
      VitePWA({ injectRegister: 'inline' })
    ],
  })
))
