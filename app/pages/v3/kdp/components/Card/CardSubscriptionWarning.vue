<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-if="isMembershipAvailable || detailProduct.isKoran || detailProduct.isProductVoucher || isGracePeriod || detailProduct.isPartnerSubs" ref="warningBody">
    <div
      class="flex flex-row justify-between rounded-md"
      :class="[(isMembershipAvailable || isGracePeriod) ? 'bg-[#FFEECC]' : 'bg-[#E1F0FF]']"
    >
      <div class="flex">
        <div class="flex flex-col p-3">
          <div class="flex flex-row items-center">
            <Icon
              name="fa6-solid:circle-info"
              :class="[(isMembershipAvailable || isGracePeriod) ? 'text-orange-40' : 'text-blue-60']"
            />
            <h4 class="text-xs md:text-sm font-bold ml-3">
              Informasi Penting
            </h4>
          </div>
          
          <ul v-if="isLoadedCheckoutJson" class="list-disc ml-5 md:ml-10">
            <li v-if="isGracePeriod" ref="gracePeriodWarning" class="text-xs md:text-sm pb-1 ml-3 mr-5 pt-2 leading-relaxed text-bold space-y-1">
              <div v-html="checkoutJson.warning.gracePeriod.title" />
              <div v-html="useRenderTemplate(checkoutJson.warning.gracePeriod.description, { gp_end_date: endDate })" />
            </li>
            <li v-if="isMembershipAvailable && isLoggedIn" ref="membershipWarning" class="text-xs md:text-sm pb-1 ml-3 mr-5 pt-2 leading-relaxed text-bold space-y-1">
              <div v-html="checkoutJson.warning.membershipAvailable.title" />
              <div v-html="useRenderTemplate(checkoutJson.warning.membershipAvailable.description.secondary, { start_date: startDate, end_date: useDateFormat(getLatestMembershipEndDate.toISOString(), true) })" />
            </li>
            <li v-if="detailProduct.isKoran" ref="koranWarning" class="text-xs md:text-sm pb-1 ml-3 mr-5 pt-2 leading-relaxed text-bold space-y-1">
              <div >3 {{ checkoutJson.warning.koran.title }} </div>
              <div v-html="checkoutJson.warning.koran.description" />
            </li>
            <li v-if="detailProduct.isProductVoucher && detailProduct.isProductVoucherAvailable" ref="voucherWarning" class="text-xs md:text-sm pb-1 ml-3 mr-5 pt-2 leading-relaxed text-bold space-y-1">
              <div >4 {{ checkoutJson.warning.voucher.title }} </div>
              <div v-if="isLoggedIn" v-html="useRenderTemplate(checkoutJson.warning.voucher.description.loggedIn, { user_email: userSubscriptionStatus.user.email })" />
              <div v-else v-html="checkoutJson.warning.voucher.description.guest" />
            </li>
            <li v-if="detailProduct.isPartnerSubs" ref="membershipWarning" class="text-xs md:text-sm pb-1 ml-3 mr-5 pt-2 leading-relaxed text-bold space-y-1">
              <div >5 {{ checkoutJson.warning.partner.title }} </div>
              <div v-if="isLoggedIn" v-html="useRenderTemplate(checkoutJson.warning.partner.description.loggedIn, { user_email: userSubscriptionStatus.user.email })" />
              <div v-else v-html="checkoutJson.warning.partner.description.guest" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useCheckoutStore } from '~/stores/checkout'
import { useRenderTemplate } from '~/composables/useRenderTemplate'
import { useDateFormat } from '~/composables/useDateFormatter'
const authStore = useAuthStore()
const { isMembershipAvailable,
  isGracePeriod,
  isLoggedIn,
  getLatestMembershipEndDate,
  userSubscriptionStatus
} = storeToRefs(authStore)

const checkoutStore = useCheckoutStore()
const { detailProduct, checkoutJson, isLoadedCheckoutJson } = storeToRefs(checkoutStore)

const endDate = computed(() => {
  const [ first ] = userSubscriptionStatus.value.gracePeriod ?? []
  if (first) {
    const end = new Date(first.endDate)
    return useDateFormat(end.toISOString(), false)
  }
  return ''
})


const startDate = computed(() => {
  const [ first ] = userSubscriptionStatus.value.active ?? []
  if (first) {
    const start =  new Date(first.startDate)
    return useDateFormat(new Date(start).toISOString(), true)
  }
  const nowDate = new Date().toISOString()
  return useDateFormat(nowDate, true)
})
</script>

<style scoped>
strong {
  @apply font-bold;
}
</style>
