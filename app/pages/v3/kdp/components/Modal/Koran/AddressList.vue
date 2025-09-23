<template>
  <UModal
    v-model:open="openModalListAddress"
    title="Alamat Pengiriman"
    description="Alamat Pengiriman digunakan untuk keperluan pengiriman produk Harian Kompas."
  >
    <template #body>
      <div class="flex flex-col gap-4">
        <UButton
          v-if="isLoggedIn && !isAddressFull"
          block
          variant="outline"
          color="primary"
          size="xl"
          @click="handleModalInputAddress"
        >
          <Icon
            name="fa7-solid:circle-plus"
            class="text-md text-blue-60 flex pr-4 pt-1"
          />
          <strong class="flex text-blue-60">
            Buat Alamat Pengiriman
          </strong>
        </UButton>
        <AddressFullWarning v-if="isAddressFull" role="banner"/>
        <div
          v-for="address in userAddressList"
          :key="address.id"
        >
          <AddressItem
            role="card"
            :num="address.id"
            :address-concated="addressStore.getAddressString(address)"
            :is-default="address.isDefault ?? false"
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
import { setAddressDefault, fetchUserAddress } from '~~/utils/apiRepo'
const addressStore = useAddressStore()
const authStore = useAuthStore()
const { isLoggedIn, userGuid } = storeToRefs(authStore)
const { userAddressList, isAddressFull, openModalListAddress, openModalInputAddress } = storeToRefs(addressStore)
const toast = useToast()


const { execute: executeFetchUserAddress, data: dataFetchUserAddress } = fetchUserAddress(userGuid.value)

function handleDelete(id: number | undefined) {
  console.log({id});  
}
function handleModalEdit(address: Address) {
  console.log({address});
}
async function setAddressToDefault (id: number | undefined) {
  console.log('setAddressToDefault');
  
  if (!isLoggedIn.value && !id) return
  const { 
    execute: executeSetAddressDefault,
    status: statusSetAddressDefault 
  } = setAddressDefault(id as number, userGuid.value)

  await executeSetAddressDefault()

  if (statusSetAddressDefault.value === 'success') {
    await executeFetchUserAddress()
    if (dataFetchUserAddress.value?.data) {
      addressStore.setUserAddressList(dataFetchUserAddress.value.data)
      openModalListAddress.value = false
      toast.add({
        title: 'Alamat Utama Diperbarui',
        description: 'Alamat utama pengguna berhasil diperbarui dan akan digunakan sebagai alamat pengiriman default.',
      })
    }
  }
}

function handleModalInputAddress(){
  openModalInputAddress.value = true
}
// onMounted(async () => {
//   addressStore.setUserDefaultAddress(first)
//   addressStore.setProvince(defaultAddress.province)
//   addressStore.setUserDefaultAddress(defaultAddress)
// })
</script>