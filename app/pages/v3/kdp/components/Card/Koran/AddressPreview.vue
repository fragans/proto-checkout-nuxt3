<template>
  <UModal
    v-if="userAddressList.length >= 1 && detailProduct?.isKoran"
    title="Alamat Pengiriman"
    description="Alamat Pengiriman digunakan untuk keperluan pengiriman produk Harian Kompas."
  >
  <div
    class="flex p-6 mb-2 flex-row w-full shadow-md rounded-md cursor-pointer justify-between text-grey-60"
    :class="[isShippingAddressInvalid ? 'border border-red-30' : 'border border-grey-30',]"
  >
    <div class="flex flex-row gap-3">
      <icon
        name="fa7-solid:map-marked-alt"
        class="text-md text-blue-60 pr-3 pt-1"
      />
      <div>
        <strong>{{ getDefaultAddress?.firstName + ' ' + getDefaultAddress?.lastName }}</strong>
        <p>{{ getDefaultAddress?.phoneNumber }}</p>
        <p>{{ addressStore.getAddressString(getDefaultAddress) }}</p>
      </div>
    </div>
    <Icon
      name="fa7-solid:chevron-right"
      class="text-grey-40 text-md m-2 self-center"
    />
  </div>
    <template #body>
      <div class="flex flex-col gap-4">
        <AddressInfo />
        <div
          v-if="!isAddressFull"
          ref="fullAddressSection"
          class="border border-orange-10 flex flex-row w-full rounded-md justify-left p-4 mb-4 bg-orange-10 gap-3"
        >
          <Icon
            name="fa7-solid:circle-exclamation"
            class="text-md text-orange-50 flex pr-4 pt-2 h-5"
          />
          <div>
            <strong ref="fullAddress" class="flex text-grey-60 text-sm">
              Daftar Alamat Penuh
            </strong>
            <p ref="fullAddressDescription" class="flex text-grey-60 text-sm">
              Ubah atau hapus salah satu untuk menambah alamat baru.
            </p>
          </div>
        </div>

        <div
          v-for="address in userAddressList"
          ref="dataAddress"
          :key="address.id"
          class="border border-grey-30 p-6 rounded mb-6 flex flex-row justify-between w-full"
          :class="address.isDefault ? 'bg-grey-10' : ''"
        >
          <div class="flex flex-col">
            <div>
              <strong 
                v-if="address.isDefault || !isLoggedIn"
                class="bg-blue-10 rounded p-1 text-blue-60 text-xs ml-7"
              >
                Alamat Terpilih
              </strong>
              <div class="flex flex-row w-full">
                <icon
                  name="fa7-solid:map-marked-alt"
                  class="text-md text-blue-60 pr-3 pt-1"
                />
                <div class="flex flex-col">
                  <strong>{{ address.firstName + ' ' + address.lastName }}</strong>
                  <p>{{ address.phoneNumber }}</p>
                  <p>{{ addressStore.getAddressString(address) }}</p>
                  <div class="flex flex-col md:flex-row md:space-x-4 mt-4">
                    <UButton
                      v-if="!address.isDefault && isLoggedIn"
                      :click="() => setAddressToDefault(address.id)"
                    >
                      <span class="text-sm">Jadikan Alamat Pengiriman</span>
                    </UButton>
                    <UButton
                      class="w-1/2 md:w-auto border border-blue-60 bg-transparent rounded text-blue-60 md:p-2 font-bold mt-2 md:mt-0 py-2 text-sm"
                      @click="() => handleModalEdit(address)"
                    >
                    <span>Ubah Alamat</span>
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <UButton
            v-if="isLoggedIn && !address.isDefault"
            :click="() => handleDelete(address.id)"
          >
            <Icon
              name="fa7-solid:trash"
              class="text-grey-40 text-md m-2 self-center"
            />
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const addressStore = useAddressStore()
const checkoutStore = useCheckoutStore()
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
const { userAddressList, getDefaultAddress } = storeToRefs(addressStore)
const { detailProduct } = storeToRefs(checkoutStore)
const isShippingAddressInvalid = ref(false)



const isAddressFull = computed(() => {
  return userAddressList.value.length >= 5
})
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
