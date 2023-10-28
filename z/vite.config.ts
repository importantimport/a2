import { compileLitTemplates } from '@lit-labs/compiler'
import typescript from '@rollup/plugin-typescript'
import UnheadVite from '@unhead/addons/vite'
import { builtinModules } from 'node:module'
import { type Plugin, defineConfig, mergeConfig, splitVendorChunkPlugin } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export const baseConfig = defineConfig({
  envPrefix: ['A2Z_', 'VITE_'],
  build: {
    target: 'es2022',
    rollupOptions: {
      external: [
        ...builtinModules,
        ...builtinModules.map(module => `node:${module}`)
      ]
    }
  },
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
    splitVendorChunkPlugin(),
    tsconfigPaths(),
  ],
})

export default mergeConfig(baseConfig, { plugins: [VitePWA({ injectRegister: 'inline' })] })
