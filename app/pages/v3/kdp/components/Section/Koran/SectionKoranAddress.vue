<template>
  <div class="mx-auto text-grey-60">
    <div>
      <strong class="text-lg md:text-xl font-bold mb-2">
        Alamat Pengiriman
      </strong>
      <p class="text-grey-40 mb-6">
        Alamat pengiriman digunakan untuk keperluan pengiriman produk Harian Kompas
      </p>
    </div>

    <div :class="detailProduct?.isKoran ? 'w-full' : ''">
      <div v-if="userAddressList.length >= 1 && detailProduct?.isKoran && isLoggedIn"> customer address</div>
      <ModalKoranAddress />

      <div v-if="isShippingAddressEmpty" ref="errorAddressEmptyText" class="flex space-x-1 mt-2">
        <span class="text-red-40 text-xs">Alamat harus diisi.</span>
      </div>
      <div v-else-if="isShippingAddressInvalid" ref="errorAddressInvalidText" class="flex space-x-1 mt-2">
        <span class="text-red-40 text-xs">
          Paket langganan ini hanya berlaku untuk pengiriman wilayah <strong>{{ validArea }}</strong>.
          Silakan <span class="cursor-pointer" @click="openModalAddress"><strong><u>ubah alamat pengiriman</u></strong></span> ke wilayah {{ validArea }}
          atau ganti ke <strong><u><span class="cursor-pointer" @click="redirectToBerlangganan">paket lainnya</span></u></strong>.
        </span>
      </div>
      <div class="bg-orange-10">
        <BannerKoranAddressInfo v-if="detailProduct?.isKoran" class="mt-5 bg-orange-10 px-2 rounded-md" />
      </div>

    </div>
    
    
    
  </div>
</template>

<script lang="ts" setup>


const checkoutStore = useCheckoutStore()
const { detailProduct } = storeToRefs(checkoutStore)

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

const addressStore = useAddressStore()
const { userAddressList } = storeToRefs(addressStore)

const isShippingAddressInvalid = ref(false)
const isShippingAddressEmpty = ref(true)
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
  console.log('openModalAddress');
  
}
const url = 'https://api.kompas.id/account/api/v1/countries/region/id'
useAsyncData(
  computed(() => `address-provinces`),
  async () => {
    const response = await $fetch<ApiResponse<Province[], null>>(url)
    if (response.data) addressStore.setProvinceList(response.data) 
    return response
  },
  {
    server: false
  }
)
</script>

<style>

</style>