import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
  declaration: true,
})
