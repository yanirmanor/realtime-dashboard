/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOCKET_MODE?: 'real' | 'mock'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
