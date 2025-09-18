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
      <button
        v-else-if="detailProduct?.isKoran"
        id="shipping-address"
        class="flex flex-row gap-4 w-full rounded justify-center items-center p-4 mb-2 shadow-md"
        :class="[isShippingAddressEmpty ? 'border border-red-30' : 'border border-grey-30']"
        @click="openModalFirstUpdateAddress()"
      >
        <Icon
          name="fa7-solid:circle-plus"
          class="text-md text-blue-60 flex pr-4 pt-1"
        />
        <strong class="flex text-blue-60">
          Buat Alamat Pengiriman
        </strong>
      </button>

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
    </div>
    <Teleport to="body">
      <ModalKoranAddress />
    </Teleport>
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
function openModalFirstUpdateAddress () {
  console.log('openModalFirstUpdateAddress');
  
}
</script>

<style>

</style>