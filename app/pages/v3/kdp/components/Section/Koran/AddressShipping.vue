<template>
  <div class="text-grey-60">
    <div>
      <strong class="text-lg md:text-xl font-bold mb-2"> Alamat Pengiriman </strong>
      <p class="text-grey-40 mb-6">
        Alamat pengiriman digunakan untuk keperluan pengiriman produk Harian Kompas
      </p>
    </div>

    <div class="w-full">
      <UButton
        v-if="userAddressList.length < 1"
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
      <AddressPreview role="card" />
      <AddressList role="modal" />
      <AddressInput role="modal" />

      <div v-if="!getDefaultAddress" ref="errorAddressEmptyText" class="flex space-x-1 mt-2">
        <span class="text-red-40 text-xs">Alamat harus diisi.</span>
      </div>
      <div v-else-if="!isShippingAddressInvalid" ref="errorAddressInvalidText" class="flex space-x-1 mt-2">
        <span class="text-red-40 text-xs">
          Paket langganan ini hanya berlaku untuk pengiriman wilayah 
          <strong>{{ getValidAreaInfo }}</strong>.

          Silahkan <span class="cursor-pointer font-bold underline" @click="handleModalInputAddress">ubah alamat pengiriman</span> ke wilayah {{ getValidAreaInfo }}
          atau ganti ke 
          <span class="cursor-pointer font-bold underline" @click="redirectToBerlangganan">paket lainnya</span>.
        </span>
      </div>
      <div class="bg-orange-10 rounded-md">
        <AddressInfo class="mt-5 px-4" role="banner"/>
      </div>

    </div>
    
    
    
  </div>
</template>

<script lang="ts" setup>
import { fetchAddressProvinces } from '~~/utils/apiRepo';

const addressStore = useAddressStore()
const { userAddressList, openModalInputAddress, getDefaultAddress, getValidAreaInfo, isShippingAddressInvalid } = storeToRefs(addressStore)

function redirectToBerlangganan () {
  const { KOMPAS_BERLANGGANAN_HOST } = useRuntimeConfig().public
  window.open(KOMPAS_BERLANGGANAN_HOST, '_blank')
}

function handleModalInputAddress () {
  openModalInputAddress.value = true
  
}
const { data:provinces,
  execute:executeFetchAddressProvinces,
  status:statusFetchAddressProvices
} = await fetchAddressProvinces()

await executeFetchAddressProvinces()
if (provinces.value?.data && statusFetchAddressProvices.value === 'success') {
  addressStore.setProvinceList(provinces.value.data)
}
</script>
