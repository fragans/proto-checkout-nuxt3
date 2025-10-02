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
    SESSION_DOMAIN,
    KOMPAS_REFRESH_GUEST,
  } = useRuntimeConfig().public

  const cookieOptions = {
    domain: SESSION_DOMAIN,
  }

  // here is the base url, related to /server/api
  const baseAccount = '/api/account'
  const baseOrder = '/api/order'
  
  // const _pinia = getActivePinia()
  // console.log('_pinia', _pinia);
  const _pinia = $pinia as Pinia
  const authStore = useAuthStore(_pinia)
  const { accessToken, refreshToken, isLoggedIn } = storeToRefs(authStore)

  const cookieRefresh = useCookie<string>('kompas._token_refresh', cookieOptions) 
  const cookieToken = useCookie<string>('kompas._token', cookieOptions)
  let refreshTokenPromise: Promise<ApiAuthRefreshToken | null> | null = null

  async function refresh() {
    // Ambil token refresh dengan sesuai skenario
    const pickRefreshToken = isLoggedIn.value && refreshToken.value ? refreshToken.value : KOMPAS_REFRESH_GUEST
    if (pickRefreshToken === KOMPAS_REFRESH_GUEST) cookieRefresh.value = KOMPAS_REFRESH_GUEST

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
          // renew the token cookie value
          accessToken.value = response.data.accessToken
          cookieToken.value = response.data.accessToken
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
   * - automatic token refresh
   * - automatic retry once
	 * - add authorization header from pinia store
   * - cannot use useCookie inside onRequest or onResponseError
	 */
  function createApiClient(baseURL: string) {
    return $fetch.create({
      baseURL,
      retry: 1,
      retryStatusCodes: [401],
      onRequest({ options }) {
        const headers = new Headers(options.headers || {})
        headers.set('Authorization', `Bearer ${cookieToken.value}`)
        options.headers = headers
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onResponseError: async ({ response, options, error }) => {
        console.log(`tring to fetch = ${options.baseURL}`)
        console.log(` onResponseError=`, response.status)

        if (response.status === 401) {
          try {
            const newToken = await refresh()
            accessToken.value = newToken?.data.accessToken as string
            const headers = new Headers(options.headers || {})
            headers.set('Authorization', `Bearer ${accessToken.value}`)
            options.headers = headers
          }
          catch (error) {
            options.retry = false
            console.error('Token refresh failed:', error)
            // console.log('dont navigateTo', `${API_BASE_ACCOUNT}/logout`)
            // await navigateTo(`${API_BASE_ACCOUNT}/logout`, {
            //   external: true,
            // })
          }
          return
        }

        if (response.status === 410) {
          throw createError({ statusCode: 410, fatal: true })
        }
        else if (response.status === 403) {
          // authStore.setLoggedIn(false)
          // useCookie('kompas._token_refresh', cookieOptions).value = ''
        }
        else if (response.status === 404) {
          // const msg = `[APICALL ${response.status}] - ${response.url}`
          // $sentry.captureException(error)
          // $sentry.captureMessage(msg)
          throw createError({ statusCode: 404, fatal: true })
        }
        else if (response.status >= 500) {
          console.log('SERVICE DOWN');
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
  const $apiAccount = createApiClient(baseAccount)
  const $apiOrder = createApiClient(baseOrder)

  // Expose to useNuxtApp().$api
  return {
    provide: {
      apiAccount: $apiAccount,
      apiOrder: $apiOrder,
      refreshToken,
      accessToken,
    },
  }
})
