<template>
  <div>
    <ClientOnly>
      <div v-if="isLoggedIn">
        <KdpFlowSubscriber v-if="authStore.getIsSubscriber" />
        <KdpFlowRegon v-else />
      </div>
      <KdpFlowGuest v-else />
      <!-- <pre>
        {{ addressData?.data }}
      </pre> -->
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const $route = useRoute()
const authStore = useAuthStore()
const checkoutStore = useCheckoutStore()

const { isLoggedIn } = storeToRefs(authStore)

// const isRenew = ref(false)

// function generateCouponPayload (value: number = 0): CouponPayload {
//   const payload = {
//     productId: $route.query.productId as string,
//     serviceType: 'MBS',
//     autoRenewal: value || isRenew.value ? 1 : 0
//   }
//   return payload
// }


// const { data: addressData } = await useAsyncData(
//   'address-data',
//   () => nuxtApp.$apiAccount<ApiResponse<Address, null>>(`/countries/region/id`)
// )
useAsyncData(
  computed(() => `detail-product-${$route.query.productId}`),
  async () => {
    const response = await nuxtApp.$apiOrder<ApiResponse<KdpProductDetail, null>>(`/product?id=${$route.query.productId}`)
    if (response.data) { checkoutStore.setDetailProduct(response.data) }
    return response
  }
)

// await useAsyncData(
//   "checkout-json",
//   async () => {
//     await checkoutStore.fetchCheckoutJson()
//     const payload = generateCouponPayload()
//     await checkoutStore.fetchAutoApplyCouponRenewal(payload)
//     return null
//   }
// );
</script>
