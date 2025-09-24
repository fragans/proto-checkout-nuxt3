<template>
  <ClientOnly>
    <SectionPaymentHeader />
    <SubscriptionSummary role="card"/>
    <div
      v-if="detailProduct?.isKoran"
      class="relative pb-16 pt-10"
    >
      <AddressShipping role="section"/>
      <DateShipping role="section"/>
      
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { fetchUserAddress } from '~~/utils/apiRepo';

const authStore = useAuthStore()
const { userGuid } = storeToRefs(authStore)

const checkoutStore = useCheckoutStore()
const { detailProduct } = storeToRefs(checkoutStore)

const addressStore = useAddressStore()

useAsyncData(
  'main-api',
  async() => {
    const { execute: executeFetchUserAddress, data: dataFetchUserAddress } = fetchUserAddress(userGuid.value)

    await executeFetchUserAddress()
    if (dataFetchUserAddress.value?.data) {
      addressStore.setUserAddressList(dataFetchUserAddress.value.data)
    }
    return null
  }
)
  

useHead({
  title: 'Checkout Page v3'
})
</script>
