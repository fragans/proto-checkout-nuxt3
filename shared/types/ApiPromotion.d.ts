interface CouponData {
  code: number
  message: string
  data: {
    id: number
    code: string
    title: string
    description: string
    status: boolean
    term: string[]
    simpleTerm: string[]
    invalidTerm: string[] | null
    type: string // "percentage"
    typeValue: number
    minimumAmount: number
    maximumDiscount: number
    quotaPercentage: number
    quota: number | null
    startDate: string
    endDate: string
    paymentMethod: string[]
    paymentMethodType: number
  }
  errors: string[] | null
}

interface CouponPayload {
    productId: string
    serviceType: string
    autoRenewal: number
}