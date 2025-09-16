import { defineStore } from 'pinia'
import type { Coupons } from '#shared/types/product'

type ICouponStatus = 'initial' | 'failed' | 'active'

export const useCouponStore = defineStore('coupon', {
  state: () => ({
    initialState: true,
    normalPrice: 0,
    tempDiscountPrice: 0,
    couponStatus: 'initial' as ICouponStatus,
    discountPrice: 0,
    tempCouponActive: null as Coupons | null,
    couponActive: null as Coupons | null,
    isCouponLoading: false
  }),
  getters: {
    dataInitialState: (state): boolean => state.initialState,
    dataNormalPrice: (state): number => state.normalPrice,
    dataTempDiscountPrice: (state): number => state.tempDiscountPrice,
    dataDiscountPrice: (state): number => state.discountPrice,
    dataCouponStatus: (state): ICouponStatus => state.couponStatus,
    dataTempCouponActive: (state): Coupons | null => state.tempCouponActive,
    dataCouponActive: (state): Coupons | null => state.couponActive,
    dataCouponLoading: (state): boolean => state.isCouponLoading,
  },
  actions: {
    reset() {
      this.initialState = true
      this.normalPrice = 0
      this.tempDiscountPrice = 0
      this.couponStatus = 'initial'
      this.discountPrice = 0
      this.tempCouponActive = null
      this.couponActive = null
    },
    setCouponLoading(payload: boolean) {
      this.isCouponLoading = payload
    },
    setInitialState(payload: boolean) {
      this.initialState = payload
    },
    setNormalPrice(payload: number) {
      this.normalPrice = payload
    },
    setForceDiscountPrice(payload: number) {
      this.tempDiscountPrice = payload
    },
    setTempDiscountPrice(payload: Coupons | null) {
      if (payload && payload.type === 'percentage') {
        const tempPrice = Math.round(this.normalPrice * (payload.typeValue / 100))
        const price = tempPrice > payload.maximumDiscount ? payload.maximumDiscount : tempPrice
        this.tempDiscountPrice = payload.maximumDiscount === 0 ? tempPrice : price
      } else if (payload && payload.type === 'pricecut') {
        this.tempDiscountPrice = payload.typeValue
      } else {
        this.tempDiscountPrice = 0
      }
    },
    setDiscountPrice(payload: number) {
      this.discountPrice = payload
    },
    setCouponStatus(payload: ICouponStatus) {
      this.couponStatus = payload
    },
    setTempCouponActive(payload: Coupons | null) {
      this.tempCouponActive = payload
    },
    setCouponActive(payload: Coupons | null) {
      this.couponActive = payload
    }
  }
})
