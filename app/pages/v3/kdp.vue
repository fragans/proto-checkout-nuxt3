<template>
  <div>
    <div v-if="isLoggedIn">
      <KdpFlowSubscriber v-if="authStore.getIsSubscriber" />
      <KdpFlowRegon v-else />
    </div>
    <KdpFlowGuest v-else />
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const $route = useRoute()
const authStore = useAuthStore()
const checkoutStore = useCheckoutStore()

const { isLoggedIn } = storeToRefs(authStore)
const { CHECKOUT_JSON_URL } = useRuntimeConfig().public

useAsyncData(
  computed(() => `detail-product-${$route.query.productId}`),
  async () => {
    const response = await nuxtApp.$apiOrder<ApiResponse<KdpProductDetail, null>>(`/product?id=${$route.query.productId}`)
    if (response.data) { checkoutStore.setDetailProduct(response.data) }
    return response
  }
)

useAsyncData(
  'checkout-json',
  async () => {
    const response = await $fetch<CheckoutJsonResponse>(CHECKOUT_JSON_URL)
    if (response.data) { checkoutStore.setCheckoutJson(response.data) }
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

useHead({
  title: 'Checkout Page v3'
})
</script>
