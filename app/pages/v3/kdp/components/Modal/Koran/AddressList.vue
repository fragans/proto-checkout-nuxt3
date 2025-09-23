<template>
  <UModal
    v-model:open="openModalListAddress"
    title="Alamat Pengiriman"
    description="Alamat Pengiriman digunakan untuk keperluan pengiriman produk Harian Kompas."
  >
    <template #body>
      <div class="flex flex-col gap-4">
        <AddressFull v-if="isAddressFull" role="banner"/>
        <div
          v-for="address in userAddressList"
          :key="address.id"
          
        >
          <AddressItem
            role="card"
            :num="address.id"
            :address-concated="addressStore.getAddressString(address)"
            :is-default="address.isDefault"
            :phone-number="address.phoneNumber"
            :first-name="address.firstName"
            :last-name="address.lastName"
            :is-logged-in="isLoggedIn"
            @delete="handleDelete(address.id)"
            @edit="handleModalEdit(address)"
            @set-default="setAddressToDefault(address.id)"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const addressStore = useAddressStore()
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
const { userAddressList, isAddressFull, openModalListAddress } = storeToRefs(addressStore)



function handleDelete(id: number | undefined) {
  console.log({id});  
}
function handleModalEdit(address: Address) {
  console.log({address});
}
function setAddressToDefault (id: number | undefined) {
  console.log({id});
  
}
// onMounted(async () => {
//   addressStore.setUserDefaultAddress(first)
//   addressStore.setProvince(defaultAddress.province)
//   addressStore.setUserDefaultAddress(defaultAddress)
// })
</script>