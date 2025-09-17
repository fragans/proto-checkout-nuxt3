<template>
  <div class="relative pb-16" :class="detailProduct.isKoran ? 'pt-10' : 'pt-2'">
    <SectionKoranAddress />
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()

const authStore = useAuthStore()
const checkoutStore = useCheckoutStore()
const { detailProduct } = storeToRefs(checkoutStore)
const { userGuid } = storeToRefs(authStore)

useAsyncData(
  computed(() => `user-address-${userGuid.value}`),
  async () => {
    const response = await nuxtApp.$apiOrder<ApiResponse<Address[], null>>(`/user-address`)
    if (response.data) { authStore.setAddress(response.data) }
    return response
  },
  {
    server: false
  }
)
</script>