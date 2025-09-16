import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    checkoutJson: {
      warning: {
        membershipAvailable: {
          title: '',
          description: {
            primary: '',
            secondary: ''
          }
        },
        gracePeriod: {
          title: '',
          description: ''
        },
        koran: {
          title: '',
          description: ''
        },
        voucher: {
          title: '',
          description: {
            loggedIn: '',
            guest: ''
          }
        },
        partner: {
          title: '',
          description: {
            loggedIn: '',
            guest: ''
          }
        }
      },
      auto_apply_renewal: {
        coupon_uuid: '',
        promotion_desc: {
          default: '',
          applied: ''
        }
      },
      next_payment: {
        gopay: '',
        credit_card: ''
      },
      payment_options: [],
      payment_limit: {
        autorenewal: []
      }
    } as CheckoutJsonData,
    detailProduct: {} as KdpProductDetail,
    coupon: {} as CouponData,
    isLoading: true,
    isShowAutoRenewal: false,
  }),
  getters: {
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
      console.log('setCheckoutJson');
      
      console.log({payload});
      this.checkoutJson = payload
    },
    setDetailProduct(payload: KdpProductDetail) {
      this.detailProduct = payload
    }
  }
})
