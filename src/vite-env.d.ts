/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_GIPHY_API_KEY: string
    readonly VITE_GIPHY_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}