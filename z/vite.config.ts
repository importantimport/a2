import { defineConfig, mergeConfig } from 'vite'
// import babelPlugin from 'vite-plugin-babel'
// import civetPlugin from 'vite-plugin-civet'
import UnheadVite from '@unhead/addons/vite'
import template from 'rollup-plugin-html-literals'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export const baseConfig = defineConfig({
  envPrefix: ['A2Z_', 'VITE_'],
  build: { target: 'es2022' },
  esbuild: { legalComments: 'external' },
  plugins: [
    // babelPlugin({
    //   apply: 'serve',
    //   babelConfig: {
    //     assumptions: { setPublicClassFields: true },
    //     presets: ['@babel/preset-typescript'],
    //     plugins: [
    //       [
    //         '@babel/plugin-proposal-decorators',
    //         {
    //           version: '2018-09',
    //           decoratorsBeforeExport: true,
    //         },
    //       ],
    //       ['@babel/plugin-proposal-class-properties'],
    //     ],
    //   },
    // }),
    // civetPlugin({
    //   stripTypes: true,
    //   outputExtension: 'js',
    //   outputTransformerPlugin: { serve: 'babel-plugin' },
    // }),
    UnheadVite(),
    template(),
    tsconfigPaths(),
  ],
})

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [VitePWA({ injectRegister: 'inline' })],
  })
)
