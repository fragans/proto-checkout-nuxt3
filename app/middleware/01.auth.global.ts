import { getActivePinia } from "pinia"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) return
  const { KOMPAS_REFRESH_GUEST, SESSION_DOMAIN } = useRuntimeConfig().public
  const pinia = getActivePinia()
  const authStore = useAuthStore(pinia)
  const { accessToken, refreshToken } = storeToRefs(authStore)
  const cookieOptions = {
    domain: SESSION_DOMAIN,
  }
  const cookieToken = useCookie<string>('kompas._token', cookieOptions)
  const cookieRefresh = useCookie<string>('kompas._token_refresh', cookieOptions)
  const kantormu = useCookie<CookieKantormu>('kantormu', cookieOptions)
  
  async function fetchAccessToken(refreshToken: string): Promise<string | null> {
      const isGuest = refreshToken === KOMPAS_REFRESH_GUEST
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
          cookieRefresh.value = refreshToken 
          return data.accessToken
        }
        return null
      }
      catch (error) {
        if (isGuest) {
          console.error('fetch guest token gagal', error)
        }else{
          console.error('fetch new token gagal', error)
        }
      }
      return null
  }
  async function setAsGuest() {
    console.log('setAsGuest');
    
    const token = await fetchAccessToken(KOMPAS_REFRESH_GUEST as string)
    if (!token) {
      authStore.setUserGuid('GUEST')
      authStore.setRefreshToken(KOMPAS_REFRESH_GUEST as string)
    }
    authStore.setLoggedIn(false)
  }

  if (kantormu.value && refreshToken.value) {
    console.log('has kantormu & refresh');
    
    authStore.setUserGuid(kantormu.value.user.guid)
    authStore.setRefreshToken(refreshToken.value)
    
    if (!accessToken.value) {
      console.log('no token, then fetchAccessToken');
      await fetchAccessToken(refreshToken.value)
    }
    authStore.setLoggedIn(true)
  } else {
    await setAsGuest()
  }
  return
})
