// ref: https://gist.github.com/mazay33/de0e965e15de61c5a1df4304c09b3937

/**
 * Nuxt 3 plugins run:
 * - Once per SSR render on the server.
 * - Once on client boot (hydration).
 *
 * this plugin used for,
 * api fetch that uses credentials
 * when return 401 it will auto retry with new jwt from refresh()
 */
import type { Pinia } from 'pinia'
import { storeToRefs } from 'pinia'

export default defineNuxtPlugin(({ $pinia }) => {
  const {
    API_BASE_CDS_SSR,
    API_BASE_CDS_SPA,
    API_BASE_EPAPER_SPA,
    API_BASE_EPAPER_SSR,
    API_BASE_KOMPAS_AI_SSR,
    API_BASE_KOMPAS_AI_SPA,
    API_BASE_ACCOUNT,
    API_BASE_SUBS,
    KOMPAS_REFRESH_GUEST,
    SESSION_DOMAIN
  } = useRuntimeConfig().public
  const cookieOptions = {
    domain: SESSION_DOMAIN
  }
  // here are settings for SPA & SSR base URL
  const baseAccount = '/api/account'
  const baseEpaper = import.meta.server ? API_BASE_EPAPER_SSR : API_BASE_EPAPER_SPA
  const baseCds = import.meta.server ? API_BASE_CDS_SSR : API_BASE_CDS_SPA
  const baseAi = import.meta.server ? API_BASE_KOMPAS_AI_SSR : API_BASE_KOMPAS_AI_SPA
  const baseSubs = API_BASE_SUBS
  const baseOrder = '/api/order'
  const _pinia = $pinia as Pinia
  const authStore = useAuthStore(_pinia)
  const { accessToken: token, isLoggedIn } = storeToRefs(authStore)

  const refreshToken = useCookie<string>('kompas._token_refresh', cookieOptions)
  const accessToken = useCookie<string>('kompas._token', cookieOptions)
  const kantormu = useCookie<CookieKantormu>('kantormu', cookieOptions)

  let refreshTokenPromise: Promise<ApiAuthRefreshToken | null> | null = null

  async function refresh() {
    // Ambil token refresh dengan sesuai skenario
    const pickRefreshToken = isLoggedIn.value && refreshToken.value ? refreshToken.value : KOMPAS_REFRESH_GUEST
    if (!refreshTokenPromise) {
      refreshTokenPromise = (async () => {
        console.log('refreshTokenPromise')
        try {
          // Using $fetch instead of useFetch to avoid composable context issues
          const response = await $fetch<ApiAuthRefreshToken>(
            `/api/account/tokens/refresh`,
            {
              method: 'POST',
              body: { refreshToken: pickRefreshToken },
            },
          )
          console.log('success refresh the token')
          token.value = response.data.accessToken
          accessToken.value = response.data.accessToken
          if (response) {
            return response
          }
          else {
            throw new Error('Token refresh gagal')
          }
        }
        catch (error) {
          console.error('Token refresh gagal:', error)
          throw error
        }
        finally {
          refreshTokenPromise = null
        }
      })()
    }

    return refreshTokenPromise
  }
  /**
	 * this custom api client will handle
	 * - authenticated req with jwt with API_BASE
	 * - cached req then handles when 401 occurs
	 * - retry request will only hapend once
	 */
  function createApiClient(baseURL: string) {
    return $fetch.create({
      baseURL,
      retry: 1,
      retryStatusCodes: [401],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onRequest({ request, options }) {
        // console.log('fetch on server ', import.meta.server)
        // console.log(`base url= ${options.baseURL}`, request.toString())

        // Create or modify the Headers instance
        const headers = new Headers(options.headers || {})
        if (token.value) {
          headers.set('Authorization', `Bearer ${token.value}`)
        }
        options.headers = headers
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onResponse: async ({ response, options }) => {

      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onResponseError: async ({ response, options, error }) => {
        // const { $sentry } = useNuxtApp()
        console.log(`tring to fetch`)
        console.log(response);
        
        
        console.log(` onResponseError=`, response.status)
        console.log({response});

        if (response.status === 401) {
          try {
            const newToken = await refresh()
            accessToken.value = newToken?.data.accessToken as string
            const headers = new Headers(options.headers || {})
            headers.set('Authorization', `Bearer ${token.value}`)
            options.headers = headers
          }
          catch (error) {
            options.retry = false
            console.error('Token refresh failed:', error)
            console.log('dont navigateTo', `${API_BASE_ACCOUNT}/logout`)
            // await navigateTo(`${API_BASE_ACCOUNT}/logout`, {
            //   external: true,
            // })
          }
          return
        }

        if (response.status === 410) {
          throw createError({ statusCode: 410, fatal: true })
        }
        else if (response.status === 404) {
          // const msg = `[APICALL ${response.status}] - ${response.url}`
          // $sentry.captureException(error)
          // $sentry.captureMessage(msg)
          throw createError({ statusCode: 404, fatal: true })
        }
        else {
          // const msg = `[APICALL ${response.status}] - ${response.url}`
          // $sentry.captureException(error)
          // $sentry.captureMessage(msg)
          throw createError({ statusCode: response.status, statusMessage: response.statusText, fatal: true })
        }
      },
    })
  }

  /**
   * only define api s that use jwt credentials!!
   * such as cds, account.
   * for cdn fetch doesnt need this apiClient,
   * such as KOMPAS_API_ASSETSJSON_HOST
   *  */
  const $apiAccount = createApiClient(baseAccount as string)
  const $apiCds = createApiClient(baseCds as string)
  const $apiEpaper = createApiClient(baseEpaper as string)
  const $apiAI = createApiClient(baseAi as string)
  const $apiSubs = createApiClient(baseSubs as string)
  const $apiOrder = createApiClient(baseOrder as string)

  // Expose to useNuxtApp().$api
  return {
    provide: {
      apiAi: $apiAI,
      apiAccount: $apiAccount,
      apiCds: $apiCds,
      apiEpaper: $apiEpaper,
      apiSubs: $apiSubs,
      apiOrder: $apiOrder,
      refreshToken,
      accessToken,
      kantormu,
    },
  }
})
