export default defineNuxtPlugin(() => {
  const { KOMPAS_GTM_ID } = useRuntimeConfig().public
  if (import.meta.env.PROD) {
    const w = window as typeof window & { dataLayer?: Record<string, unknown>[] }

    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    })

    const scriptEl = document.createElement('script')
    scriptEl.async = true
    scriptEl.src = `https://www.googletagmanager.com/gtm.js?id=${KOMPAS_GTM_ID}`
    document.head.appendChild(scriptEl)
  }

})
