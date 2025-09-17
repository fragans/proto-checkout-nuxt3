<template>
  <ClientOnly>
    <div v-if="isLoggedIn">
      <KdpFlowSubscriber v-if="authStore.getIsSubscriber" />
      <KdpFlowRegon v-else />
    </div>
    <KdpFlowGuest v-else />
  </ClientOnly>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const $route = useRoute()
const authStore = useAuthStore()
const checkoutStore = useCheckoutStore()

const { isLoggedIn } = storeToRefs(authStore)
// const { isAutoRenewal } = storeToRefs(checkoutStore)
const { CHECKOUT_JSON_URL } = useRuntimeConfig().public

useAsyncData(
  computed(() => `detail-product-${$route.query.productId}`),
  async () => {
    const response = await nuxtApp.$apiOrder<ApiResponse<KdpProductDetail, null>>(`/product?id=${$route.query.productId}`)
    if (response.data) { checkoutStore.setDetailProduct(response.data) }
    return response
  },
  {
    server: false
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



useHead({
  title: 'Checkout Page v3'
})
</script>
