<template>
  <div
    v-if="userAddressList.length >= 1"
    class="flex p-6 mb-2 flex-row w-full shadow-md rounded-md cursor-pointer justify-between text-grey-60"
    :class="[isShippingAddressInvalid ? 'border border-red-30' : 'border border-grey-30',]"
    @click="handleCardClick"
  >
    <div class="flex flex-row gap-3 items-center">
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
</template>

<script lang="ts" setup>
const addressStore = useAddressStore()
const { getDefaultAddress, userAddressList, isShippingAddressInvalid, openModalListAddress } = storeToRefs(addressStore)
function handleCardClick () {
  openModalListAddress.value = true
}
</script>

<style>

</style>