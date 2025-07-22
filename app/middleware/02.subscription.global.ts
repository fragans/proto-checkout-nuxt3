import { getActivePinia } from "pinia" 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware( async (to, from) => {
  if (import.meta.server) return
  const { ENV_MODE, SESSION_DOMAIN } = useRuntimeConfig().public
  const cookieOptions = {
    domain: SESSION_DOMAIN
  }

  const pinia = getActivePinia()
  const authStore = useAuthStore(pinia)
  const nuxtApp = useNuxtApp()
  const token = useCookie('kompas._token', cookieOptions)
  const kantormu = useCookie('kantormu', cookieOptions)
  const refresh = useCookie('kompas._token_refresh', cookieOptions)
  
  async function getUserMembership (): Promise<void> {
    
    try {
      const url = `/api/account/users/membership`
      const { data } = await nuxtApp.$apiAccount<ApiUserMembership>(
        url,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      )
      
      if (data) {
        authStore.setUserSubscriptionStatus(data.result)
        const cookieSubscription = {
          domain: SESSION_DOMAIN || (ENV_MODE === 'production' ? '.kompas.id' : '.kompas.cloud'),
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
          httpOnly: false,
        }
        useCookie('kompas._subscriptionStatus', cookieSubscription)
      }
    } catch (error) {
      console.log(error)
    }
    

  }
  if (kantormu.value && refresh.value) {
    await getUserMembership()
  }
})
