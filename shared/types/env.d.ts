declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    ENV_MODE: 'local' | 'production' | 'development'
    API_BASE_ACCOUNT: string
    API_BASE_ACCOUNT_SPA: string
    API_BASE_ACCOUNT_SSR: string
    API_BASE_CDS_SPA: string
    API_BASE_CDS_SSR: string
    API_BASE_KOMPAS_AI: string
    API_BASE_KOMPAS_AI_SSR: string
    API_BASE_KOMPAS_AI_SPA: string
    API_BASE_EPAPER: string
    API_BASE_EPAPER_SPA: string
    API_BASE_EPAPER_SSR: string
    APP_BASE_AUTH: string
    APP_BASE_MNG_ACCOUNT: string
    API_BASE_SUBS: string
    CDN_KOMPAS_ID: string
    // KOMPAS_LOGIN_HOST: string
    API_BASE: string
    KOMPAS_API_ASSETSJSON_HOST: string
    KOMPAS_REDIS_HOST: string
    SELF_HOST: string
    GUEST_EMAIL: string
    KOMPAS_REFRESH_GUEST: string
    KOMPAS_SITE_ACCOUNT: string
    SESSION_DOMAIN: string
    DEV_USER_ID: string
    DEV_USER_GUID: string
    DEV_USER_USERNAME: string
    DEV_USER_FIRST_NAME: string
    DEV_USER_LAST_NAME: string
    DEV_USER_EMAIL: string
    DEV_USER_PASSWORD: string
    DEV_USER_REFRESH_TOKEN: string
    SENTRY_IO_DSN: string
    SENTRY_TRACES_SAMPLE_RATE: number
    GOOGLE_SIGNIN_CLIENT_ID: string
  }
}
export {}
