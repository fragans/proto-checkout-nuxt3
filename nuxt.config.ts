// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: { host: '0.0.0.0', port: 3000 },
  modules: [
    [
      '@nuxtjs/tailwindcss',
      { cssPath: ['~/assets/styles/tailwind.css', { injectPosition: 'last' }] },
    ],
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@pinia/nuxt'
  ],
  components: [
    '~/components', {
      path: '~/pages',
      pattern: '**/components/**',
      pathPrefix: false,
    },
  ],
  pages: {
    pattern: ['**/*.vue', '!**/components/**'],
  },
  runtimeConfig: {
    public: {
      ENV_MODE: process.env.ENV_MODE,
      SESSION_DOMAIN: process.env.SESSION_DOMAIN,
      API_BASE_ACCOUNT_SSR: process.env.API_BASE_ACCOUNT_SSR,
      API_BASE_ACCOUNT_SPA: process.env.API_BASE_ACCOUNT_SPA,
      KOMPAS_REFRESH_GUEST: process.env.KOMPAS_REFRESH_GUEST
    }
  }
})