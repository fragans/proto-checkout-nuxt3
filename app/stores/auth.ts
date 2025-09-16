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
        grace_period: [] as SubscriptionItem[],
        expired: [] as SubscriptionItem[]
      } as UserMembership,
      userGuid: '',
      accessToken: '',
      refreshToken: '',
      isLoggedIn: false,
      subscription: {
        user: { status: '' },
        startDate: '',
        endDate: '',
      } as Subscription,
    }),
    getters: {
      userActiveSorted(state): SubscriptionItem[] {
        return [...state.userSubscriptionStatus.active].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      },
      isMembershipAvailable(state): boolean {
        return state.userSubscriptionStatus.active.length !== 0
      },
      isGracePeriod(state): boolean {
        return state.userSubscriptionStatus.grace_period?.length !== 0
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
          gracePeriod: state.userSubscriptionStatus.grace_period || []
        }
      },
      getIsSubscriber(state): boolean {
        return state.userSubscriptionStatus.active.length > 0
      },
      getFullName (state): string  {
        return `${state.userSubscriptionStatus.user.firstName} ${this.userSubscriptionStatus.user.lastName}`.trim()
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
      },
      reset() {
        this.userGuid = ''
        this.isLoggedIn = false
        this.refreshToken = ''
        this.accessToken = ''
        this.userSubscriptionStatus = {
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
          active: [],
          grace_period: [],
          expired: []
        }
      }
    }
  }
)
