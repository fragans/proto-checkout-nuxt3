<template>
  <div
    v-if="detailProduct?.isKoran"
    class="relative pb-16 pt-10"
  >
    <AddressShipping role="section"/>
    <DateShipping role="section"/>
    
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()

const authStore = useAuthStore()
const address = useAddressStore()
const checkoutStore = useCheckoutStore()
const { detailProduct } = storeToRefs(checkoutStore)
const { userGuid } = storeToRefs(authStore)

useAsyncData(
  computed(() => `user-address-${userGuid.value}`),
  async () => {
    const response = await nuxtApp.$apiOrder<ApiResponse<Address[], null>>(`/user-address`)
    if (response.data) { address.setUserAddressList(response.data) }
    return response
  },
  {
    server: false
  }
)
</script>