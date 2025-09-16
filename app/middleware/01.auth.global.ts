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
  const kantormu = useCookie<CookieKantormu>('kantormu', cookieOptions)
  
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
          accessToken.value = data.accessToken
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
    const token = await fetchAccessToken(KOMPAS_REFRESH_GUEST as string)
    if (!token) {
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
