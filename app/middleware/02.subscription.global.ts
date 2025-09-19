import { getActivePinia } from "pinia" 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware( async (to, from) => {
  if (import.meta.client) return
  const { SESSION_DOMAIN } = useRuntimeConfig().public
  const cookieOptions = { domain: SESSION_DOMAIN }

  const pinia = getActivePinia()
  const authStore = useAuthStore(pinia)
  const { isLoggedIn } = storeToRefs(authStore)

  const nuxtApp = useNuxtApp()
  const cookieToken = useCookie('kompas._token', cookieOptions)
  const cookieKantormu = useCookie('kantormu', cookieOptions)
  const cookieRefresh = useCookie('kompas._token_refresh', cookieOptions)
  
  async function getUserMembership (): Promise<void> {
    
    try {
      const url = `/users/membership`
      const { data } = await nuxtApp.$apiAccount<ApiUserMembership>(
        url,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookieToken.value}`,
          },
        }
      )
      
      if (data) {
        authStore.setUserSubscriptionStatus(data.result)
        // const cookieSubsOpt = {
        //   domain: SESSION_DOMAIN,
        //   path: '/',
        //   maxAge: 60 * 60 * 24 * 365,
        //   httpOnly: false,
        // }
        // const cookieSubs = useCookie<UserMembership>('kompas._subscriptionStatus', cookieSubsOpt)
        // cookieSubs.value = data.result
      }
    } catch (error) {
      console.error('getUserMembership error', error)
      authStore.setLoggedIn(false)
    }
    

  }
  if (cookieKantormu.value && cookieRefresh.value && isLoggedIn.value) {
    await callOnce(() => {
      getUserMembership()
    })
  }
})
