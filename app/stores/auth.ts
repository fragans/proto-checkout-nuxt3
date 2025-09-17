import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  {
    state: () => ({
      userSubscriptionStatus: {} as UserMembership,
      userGuid: '',
      accessToken: '',
      refreshToken: '',
      isLoggedIn: false,
      address: [] as Address[]
    }),
    getters: {
      userActiveSorted(state): SubscriptionItem[] {
        if (!state.userSubscriptionStatus.active) return []
        return [...state.userSubscriptionStatus.active].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      },
      isMembershipAvailable(state): boolean {
        if (!state.userSubscriptionStatus.active) return false
        return state.userSubscriptionStatus.active.length !== 0
      },
      isGracePeriod(state): boolean {
        if (!state.userSubscriptionStatus.gracePeriod) return false
        return state.userSubscriptionStatus.gracePeriod?.length !== 0
      },
      latestMembershipEndDate(state): Date {
        if (!state.userSubscriptionStatus.active || state.userSubscriptionStatus.active.length === 0) {
          return new Date()
        }
        return [...state.userSubscriptionStatus.active]
          .map(item => new Date(item.endDate))
          .reduce((latest, current) => current > latest ? current : latest)
      },
      getIsSubscriber(state): boolean {
        if (!state.userSubscriptionStatus.active) return false
        return state.userSubscriptionStatus.active.length > 0
      },
      getFullName (state): string  {
        if (!state.userSubscriptionStatus.user) return ''
        return `${state.userSubscriptionStatus.user.firstName} ${this.userSubscriptionStatus.user.lastName}`.trim()
      },
      getLatestMembershipEndDate (state): Date {
        if (!state.userSubscriptionStatus.active) return new Date()
        const latestEndDate = [...state.userSubscriptionStatus.active]
          .map(item => new Date(item.endDate))
          .reduce((latest, current) => current > latest ? current : latest)

        return latestEndDate
      }
    },
    actions: {
      setUserSubscriptionStatus(payload: UserMembership) {
        this.userSubscriptionStatus = payload
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
      setAddress(payload: Address[]) {
        this.address = payload
      }
    }
  }
)
