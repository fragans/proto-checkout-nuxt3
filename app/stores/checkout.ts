import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    checkoutJson: null as null | CheckoutJsonData,
    detailProduct: null as null | KdpProductDetail,
    coupon: null as null | CouponData,
    isLoading: true,
    isShowAutoRenewal: false,
    isAutoRenewal: false
  }),
  getters: {
    getValidArea(state): number[] {
      if (!state.detailProduct) return []
      if (!state.detailProduct.variants) return []
      return state.detailProduct.variants.map(variant => variant.area)
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
