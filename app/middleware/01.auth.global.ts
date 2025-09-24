/* eslint-disable @typescript-eslint/no-unused-vars */
import { getActivePinia } from "pinia"

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) return
  const { KOMPAS_REFRESH_GUEST, SESSION_DOMAIN } = useRuntimeConfig().public
  const pinia = getActivePinia()
  const authStore = useAuthStore(pinia)
  const { accessToken } = storeToRefs(authStore)
  
  const cookieOptions = { domain: SESSION_DOMAIN }
  const cookieToken = useCookie<string>('kompas._token', cookieOptions)
  const cookieRefresh = useCookie<string>('kompas._token_refresh', cookieOptions)
  const cookieKantormu = useCookie<CookieKantormu>('kantormu', cookieOptions)
  
  async function fetchAccessToken(refreshToken: string): Promise<string | null> {
      const isGuest = refreshToken === KOMPAS_REFRESH_GUEST
      console.log({isGuest});
      
      if (isGuest) console.log('using guest refresh')
      try {
        const url = `/api/account/tokens/refresh`
        const { data } = await $fetch<ApiAuthRefreshToken>(
          url,
          {
            method: 'POST',
            body: {
              refreshToken,
            },
          },
        )
        console.log('new accessToken length=', data.accessToken.length );
        
        if (data) {
          authStore.setAccessToken(data.accessToken)
          accessToken.value = data.accessToken
          cookieToken.value = data.accessToken
          return data.accessToken
        }
        return null
      }
      catch (error) {
        if (isGuest) {
          console.error('fetch guest token gagal', error)
        }else{
          await setAsGuest()
          console.error('fetch new token gagal', error)
        }
      }
      return null
  }

  async function setAsGuest() {
    console.log('setAsGuest');
    cookieRefresh.value = KOMPAS_REFRESH_GUEST
    // await fetchAccessToken(KOMPAS_REFRESH_GUEST as string)
    authStore.setUserGuid('GUEST')
    authStore.setRefreshToken(KOMPAS_REFRESH_GUEST)
    authStore.setLoggedIn(false)
  }
  console.log('has cookies?');
  console.log(cookieKantormu.value && cookieRefresh.value ? 'yes' : 'no')
  
  if (cookieKantormu.value && cookieRefresh.value) {
    console.log('has kantormu & refresh');
    authStore.setUserGuid(cookieKantormu.value.user.guid)
    authStore.setRefreshToken(cookieRefresh.value)
    
    // if (!accessToken.value) {
    //   console.log('no token, then fetchAccessToken');
    //   await callOnce(() => {
    //     fetchAccessToken(cookieRefresh.value)
    //   })
    // }
    authStore.setLoggedIn(true)
  } else {
    await setAsGuest()
  }
  return
  /**
   * - if there's no refresh & kantormu it sets to guest
   * - settings auth to guest requires generating guest token after set refresh to guest value
   * - if there refresh & kantormu then, must check if refresh is valid
   * - to set guest as guest is when there's no refresh & kantormu or,
   * - when refresh is invalid
   * - the main goal of this middleware is to:
   *  - prepare these cookie: kantormu, refresh, access
   */
})
