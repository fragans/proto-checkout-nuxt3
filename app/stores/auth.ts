import { defineStore } from 'pinia'
import type { UserMembership, SubscriptionItem, Membership } from '#shared/types/ApiAccountMembership'

interface Subscription {
  user: { status: string };
  startDate: string;
  endDate: string;
}

export const useAuthStore = defineStore(
  'auth',
  {
    state: () => ({
      userSubscriptionStatus: {} as UserMembership,
      userGuid: '',
      accessToken: useCookie<string>('kompas._token').value,
      refreshToken: useCookie<string>('kompas._token_refresh').value,
      isLoggedIn: false,
      subscription: {
        user: { status: '' },
        startDate: '',
        endDate: '',
      } as Subscription,
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
      latestMembershipEndDate(state): Date | null {
        if (!state.userSubscriptionStatus.active || state.userSubscriptionStatus.active.length === 0) {
          return null
        }
        return [...state.userSubscriptionStatus.active]
          .map(item => new Date(item.endDate))
          .reduce((latest, current) => current > latest ? current : latest)
      },
      userStatus(state): string {
        return state.subscription.user.status
      },
      userMembership(state): Membership {
        return {
          gracePeriod: state.userSubscriptionStatus.gracePeriod || []
        }
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
      setSubscription(payload: Subscription) {
        this.subscription = payload;
      }
    }
  }
)
