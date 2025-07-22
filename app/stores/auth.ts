import { defineStore } from 'pinia'
export const useAuthStore = defineStore(
  'auth',
  {
    state: () => ({ 
      userSubscriptionStatus: {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          expired: '',
          gracePeriod: false,
          isActive: '',
          startDate: '',
          endDate: '',
          updateMembership: null
        },
        active: [] as SubscriptionItem[],
      },
      isGuest: false,
      userGuid: '',
      accessToken: '',
      refreshToken: '',
      isLoggedIn: false,
      subscription: {
        user: { status: '' },
        startDate: '',
        endDate: '',
      },
    }),
    actions: {
      setUserSubscriptionStatus(payload: UserMembership) { //SubscriptionStatus
        console.log({payload});
        
        this.userSubscriptionStatus.user = payload.user
        this.userSubscriptionStatus.active = payload.active;
      },
      setUserGuid(payload: string) {
        this.userGuid = payload;
      },
      setLoggedIn(payload: boolean): void {
        this.isLoggedIn = payload;
      },
      setAccessToken(payload: string): void {
        this.accessToken = payload;
      },
      setRefreshToken(payload: string): void {
        this.refreshToken = payload;
      },
      setGuest(payload = true): void {
        this.isGuest = payload
      },
      setIsLogin(payload: boolean): void {
        this.isLoggedIn = payload
      }
      // setSubscription(payload: Subscription) {
      //   this.subscription = payload;
      // },
    }
  }
)
