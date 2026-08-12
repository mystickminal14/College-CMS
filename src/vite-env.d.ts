/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_IMAGE_URL?: string;
  readonly VITE_APP_URL?: string;
  readonly VITE_PCPS_BASE_URL?: string;
  readonly VITE_CF_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
