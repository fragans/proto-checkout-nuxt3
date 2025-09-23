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

const { data: userAddress } = await fetchUserAddress()
if (userAddress.value?.data) {
  address.setUserAddressList(userAddress.value.data)
}
</script>
