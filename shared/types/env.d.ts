declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    ENV_MODE: 'local' | 'production' | 'development'
    SESSION_DOMAIN: string
    // api
    API_BASE_ACCOUNT: string
    API_BASE_PROMOTION: string
    API_BASE_ORDER: string
    // json
    CHECKOUT_JSON_URL: string

    SELF_HOST: string
    GUEST_EMAIL: string
    KOMPAS_REFRESH_GUEST: string
    
    KOMPAS_GTM_ID: string
    
  }
}
export {}
