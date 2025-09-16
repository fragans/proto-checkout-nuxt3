import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    checkoutJson: {} as CheckoutJsonData,
    detailProduct: {} as KdpProductDetail,
    coupon: {} as CouponData,
    isLoading: true,
    isShowAutoRenewal: false,
  }),
  getters: {
    isLoadedCheckoutJson(state): boolean {
      if (
      state.checkoutJson.auto_apply_renewal &&
      state.checkoutJson.payment_options &&
      state.checkoutJson.warning
      ) return true
      return false
    }
    // getPaymentOptionList(state): PaymentOption[] {
    //   return state.checkout.payment_options
    // },
    // getAutoApplyCouponRenewal(state): AutoApplyRenewal {
    //   return state.checkout.auto_apply_renewal
    // },
    // getCouponMaximumDiscount(state): number {
    //   return state.coupon.data.maximumDiscount
    // },
    // getCouponPromoDiscountPercentage(state): number { 
    //   return state.coupon.data.type === 'percentage' ? state.coupon.data.typeValue : 0
    // }
  },
  actions: {

    // async fetchAutoApplyCouponRenewal(payload: CouponPayload) {
    //   const payload = this.generateCouponPayload(1)
    //   const coupons = await $fetch<CouponData>(`/servicePromotion/coupon/search?uuid=${this.checkout.auto_apply_renewal.coupon_uuid}`, {
    //     body: payload
    //   })
    //   this.coupon = coupons
    //   this.couponPromoDiscountPercentage = coupons.data.type === 'percentage' ? coupons.data.typeValue : 0
    //   this.maximumDiscount = coupons.data.maximumDiscount
    //   this.isShowAutoRenewalPromo = true
    // },
    setCheckoutJson(payload: CheckoutJsonData) {
      this.checkoutJson = payload
    },
    setDetailProduct(payload: KdpProductDetail) {
      this.detailProduct = payload
    }
  }
})
