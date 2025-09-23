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
import { fetchUserAddress } from '~~/utils/apiRepo';

const address = useAddressStore()

const checkoutStore = useCheckoutStore()
const { detailProduct } = storeToRefs(checkoutStore)

const authStore = useAuthStore()
const { userGuid } = storeToRefs(authStore)

const { execute: executeFetchUserAddress, data: dataFetchUserAddress } = fetchUserAddress(userGuid.value)
await executeFetchUserAddress()
if (dataFetchUserAddress.value?.data) {
  address.setUserAddressList(dataFetchUserAddress.value.data)
}
</script>
