<template>
  <div>
    <div class="w-full relative flex">
      <div v-if="!detailProduct.isProductVoucher && detailProduct.isProductVoucherAvailable" class="w-full h-full absolute z-10">
        <img
          v-if="detailProduct.durationType === 4"
          class="w-full h-full rounded-t-lg"
          src="https://checkoutv2.kompas.cloud/assets/img/banner/bannerGray.png"
          alt="Kompas-Digital-Monthly-Package"
          loading="lazy"
        >
        <img
          v-else
          class="w-full h-full rounded-t-lg"
          src="https://checkoutv2.kompas.cloud/assets/img/banner/bannerLight.png"
          alt="Kompas-Digital-Monthly-Package"
          loading="lazy"
        >
      </div>
      <div v-else class="w-full h-full absolute z-10">
        <img
          class="w-full h-full rounded-t-lg"
          src="https://checkoutv2.kompas.cloud/assets/img/banner/bannerGray.png"
          alt="Kompas-Digital-Monthly-Package"
          format="webp"
          preload
        >
      </div>
      <div class="w-full rounded-t-md py-6 md:pt-10 md:pb-10 px-6 z-20 text-white">
        <p class="text-lg lg:text-xl font-bold font-lora">
          {{ detailProduct.title }}
        </p>
      </div>
    </div>
    <div class="p-4">
      <p class="font-bold">
        Periode Berlangganan
      </p>
      <div class="flex pt-2 text-sm">
        <div class="pt-0.5 pr-2 pl-2">
          <div class="rounded-full h-2 w-2 flex items-center justify-center bg-green-50 -ml-1" />
          <div class="rounded-full pt-6 mr-1 pl-px  h-7 bg-green-50" />
          <div class="rounded-full h-2 w-2 flex items-center justify-center -ml-1 border border-green-50" />
        </div>
        <div class="flex flex-col w-full">
          <div class="flex justify-between w-full">
            <p class="font-bold text-gray-450 ">
              Tanggal Aktif
            </p>
            
            <p class="font-bold text-gray-450 ">
              {{ startDate }}
            </p>
          </div>
          <div class="flex justify-between w-full pt-2">
            <p class="text-gray-450">
              Tanggal Berakhir
            </p>
            <p class="text-gray-450">
              {{ endDate }}
            </p>
          </div>
        </div>
      </div>
      <CardSubscriptionWarning class="pt-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useCheckoutStore } from '~/stores/checkout'
import { useDateFormat } from '~/composables/useDateFormatter'

const authStore = useAuthStore()
const checkoutStore = useCheckoutStore()

const { userSubscriptionStatus, isGracePeriod } = storeToRefs(authStore)
const { detailProduct } = storeToRefs(checkoutStore)
// const userMembership = computed(() => authStore.userSubscriptionStatus)

// const isGracePeriod = computed(() => userSubscriptionStatus.value.user.gracePeriod)

const startDate = computed(() => {
  if (isGracePeriod.value && userSubscriptionStatus.value.gracePeriod?.[0]?.endDate) {
    return useDateFormat(new Date(userSubscriptionStatus.value.gracePeriod[0].endDate).toISOString(), true)
  }
  const nowDate = new Date().toISOString()
  return useDateFormat(nowDate, true)
})

const endDate = computed(() => {
  const start = (isGracePeriod.value && userSubscriptionStatus.value.gracePeriod?.[0]?.endDate) ? new Date(userSubscriptionStatus.value.gracePeriod[0].endDate) : new Date()
  const end = new Date(start)
  let duration = detailProduct.value.duration ?? 0
  let durationType = detailProduct.value.durationType

  if (durationType === 3 && duration % 12 === 0) {
    durationType = 4
    duration /= 12
  }

  if (durationType === 1) {
    end.setDate(start.getDate() + duration)
  } else if (durationType === 2) {
    end.setDate(start.getDate() + duration * 7)
  } else if (durationType === 3) {
    end.setDate(start.getDate() + duration * 30)
  } else if (durationType === 4) {
    end.setDate(start.getDate() + duration * 365)
  }

  return useDateFormat(end.toISOString(), true)
})
</script>
