import { getActivePinia } from "pinia"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) return
  const { KOMPAS_REFRESH_GUEST, SESSION_DOMAIN } = useRuntimeConfig().public
  const pinia = getActivePinia()
  const authStore = useAuthStore(pinia)
  const cookieOptions = {
    domain: SESSION_DOMAIN,
  }
  const token = useCookie<string>('kompas._token', cookieOptions)
  const kantormu = useCookie<CookieKantormu>('kantormu', cookieOptions)
  const refresh = useCookie<string>('kompas._token_refresh', cookieOptions)
  
  async function fetchAccessToken(refreshToken: string): Promise<string | null> {
    console.log('async fetchAccessToken');
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
        console.log('data fetchAccessToken=', data.accessToken.length );
        
        if (data) {
          authStore.setAccessToken(data.accessToken)
          token.value = data.accessToken
          return data.accessToken
        }
        return null
      }
      catch (error) {
        if (refreshToken === KOMPAS_REFRESH_GUEST) {
          console.error('fetch guest token gagal', error)
        }else{
          console.error('fetch new token gagal', error)
        }
      }
      return null
  }
  async function setAsGuest() {
    authStore.setGuest()
    const token = await fetchAccessToken(KOMPAS_REFRESH_GUEST as string)
    if (!token) {
      authStore.setRefreshToken(KOMPAS_REFRESH_GUEST as string)
    }
    authStore.setIsLogin(false)
  }

  if (kantormu.value && refresh.value) {
    console.log('has kantormu & refresh');
    
    authStore.setUserGuid(kantormu.value.user.guid)
    authStore.setRefreshToken(refresh.value)
    
    if (!token.value) {
      console.log('no token, then fetchAccessToken');
      await fetchAccessToken(refresh.value)
    }
    authStore.setIsLogin(true)
    authStore.setGuest(false)
  } else {
    await setAsGuest()
  }
  return
})
