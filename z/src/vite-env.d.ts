/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly A2Z_RPC_URL?: string
  readonly A2Z_RPC_SECRET?: string
  readonly A2Z_THEME_COLOR?: string
}
