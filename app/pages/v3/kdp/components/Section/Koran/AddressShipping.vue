<template>
  <div class="text-grey-60">
    <div>
      <strong class="text-lg md:text-xl font-bold mb-2"> Alamat Pengiriman </strong>
      <p class="text-grey-40 mb-6">
        Alamat pengiriman digunakan untuk keperluan pengiriman produk Harian Kompas
      </p>
    </div>

    <div class="w-full">
      <AddressPreview
        role="card"
      />
      <AddressInput
        v-if="!getDefaultAddress"
        role="modal"
      />

      <div v-if="!getDefaultAddress" ref="errorAddressEmptyText" class="flex space-x-1 mt-2">
        <span class="text-red-40 text-xs">Alamat harus diisi.</span>
      </div>
      <div v-else-if="isShippingAddressInvalid" ref="errorAddressInvalidText" class="flex space-x-1 mt-2">
        <span class="text-red-40 text-xs">
          Paket langganan ini hanya berlaku untuk pengiriman wilayah 
          <strong>{{ validArea }}</strong>.
          Silahkan <span class="cursor-pointer" @click="openModalAddress">
          <strong>
          <u>ubah alamat pengiriman</u>
          </strong>
        </span> 
          ke wilayah {{ validArea }} atau ganti ke 
          <strong><u><span class="cursor-pointer" @click="redirectToBerlangganan">paket lainnya</span></u></strong>.
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


const checkoutStore = useCheckoutStore()
const { detailProduct } = storeToRefs(checkoutStore)

const addressStore = useAddressStore()
const { openModalKoranAddress, getDefaultAddress } = storeToRefs(addressStore)

const isShippingAddressInvalid = ref(false)

const validArea = ref('')

function redirectToBerlangganan () {
  const { KOMPAS_BERLANGGANAN_HOST } = useRuntimeConfig().public
  window.open(KOMPAS_BERLANGGANAN_HOST, '_blank')
}

function setValidArea (areas: number[]) {
  let area = ''
  if (areas.includes(1) && areas.includes(2) && areas.includes(3)) {
    area = 'Pulau Jawa, Pulau Bali, Luar Pulau Jawa & Bali'
  } else if (areas.includes(1) && areas.includes(2)) {
    area = 'Pulau Jawa & Bali'
  } else if (areas.includes(1) && areas.includes(3)) {
    area = 'Pulau Jawa, Luar Pulau Jawa & Bali'
  } else if (areas.includes(2) && areas.includes(3)) {
    area = 'Pulau Bali, Luar Pulau Jawa & Bali'
  } else if (areas.includes(1)) {
    area = 'Pulau Jawa'
  } else if (areas.includes(2)) {
    area = 'Pulau Bali'
  } else if (areas.includes(3)) {
    area = 'Luar Pulau Jawa & Bali'
  }

  validArea.value = area
}

onMounted(async () => {
  if (detailProduct.value) {
    if (detailProduct.value?.variants?.length) {
      setValidArea(detailProduct.value.variants.map(variant => variant.area))
    }
  }
})

function openModalAddress () {
  openModalKoranAddress.value = true
  
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
