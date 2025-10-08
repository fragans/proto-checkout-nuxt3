import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-09-18',
  css: [
    "~/assets/styles/tailwind.css"
  ],
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  devServer: { host: '0.0.0.0', port: 3000 },
  fonts: {
    priority: ['google'],
    families: [
      { name: 'PT+Sans', provider: 'google' },
      { name: 'Lora', provider: 'google' }
    ]
  },
  modules: [
    '@nuxt/ui',
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
      API_BASE_ACCOUNT: process.env.API_BASE_ACCOUNT,
      CHECKOUT_JSON_URL: process.env.CHECKOUT_JSON_URL,
      ENV_MODE: process.env.ENV_MODE,
      KOMPAS_BERLANGGANAN_HOST: process.env.KOMPAS_BERLANGGANAN_HOST,
      KOMPAS_REFRESH_GUEST: process.env.KOMPAS_REFRESH_GUEST,
      KOMPAS_GTM_ID: process.env.KOMPAS_GTM_ID,
      SESSION_DOMAIN: process.env.SESSION_DOMAIN,
    }
  },
  ui: {
    colorMode: false,
    theme: {
      colors: ['primary', 'error', 'success', 'info', 'warning']
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
})