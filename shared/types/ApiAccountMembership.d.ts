export interface SubscriptionItem {
    membershipTitle: string
    membershipSlug: string,
    startDate: string,
    endDate: string
 }

interface UserMembership {
  user: {
      firstName: string,
      lastName: string,
      email: string,
      expired: string,
      gracePeriod: boolean,
      isActive: string,
      startDate: string,
      endDate: string,
      updateMembership: null
  },
  active: SubscriptionItem[],
  gracePeriod: SubscriptionItem[],
  expired: SubscriptionItem[],
}

export type SubscriptionStatus = UserMembership

export interface Membership {
  gracePeriod: SubscriptionItem[]
}

export interface ApiUserMembership {
  code: KnownResponseCodes
  data: {
    result: UserMembership
  },
  message: string // "Berhasil mendapatkan data membership",
  success: boolean,
  meta: { cache: boolean, time: number }
}
