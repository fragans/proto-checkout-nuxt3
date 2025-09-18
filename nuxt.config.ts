// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-09-18',
  devtools: { enabled: true },
  devServer: { host: '0.0.0.0', port: 3000 },
  fonts: {
    priority: ['google'],
    families: [
      { name: 'PT+Sans', provider: 'google' },
      { name: 'Lora', provider: 'google' }
    ]
  },
  modules: [
    [
      '@nuxtjs/tailwindcss',
      { cssPath: ['~/assets/styles/tailwind.css', { injectPosition: 'last' }] },
    ],
    // '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@pinia/nuxt',
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
      KOMPAS_BERLANGGANAN_HOST: process.env.KOMPAS_BERLANGGANAN_HOST,
      ENV_MODE: process.env.ENV_MODE,
      SESSION_DOMAIN: process.env.SESSION_DOMAIN,
      API_BASE_ACCOUNT: process.env.API_BASE_ACCOUNT,
      KOMPAS_REFRESH_GUEST: process.env.KOMPAS_REFRESH_GUEST,
      KOMPAS_GTM_ID: process.env.KOMPAS_GTM_ID,
      CHECKOUT_JSON_URL: process.env.CHECKOUT_JSON_URL 
    }
  }
})