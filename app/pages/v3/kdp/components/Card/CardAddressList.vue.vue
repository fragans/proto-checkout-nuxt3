<template>
  <div
    id="shipping-address"
    ref="cardBody"
    :class="[
      'border',
      isShippingAddressInvalid ? 'border-red-30' : 'border-grey-30',
      'p-6',
      'mb-2',
      'flex',
      'flex-row',
      'w-full',
      'shadow-md',
      'rounded-md',
      'cursor-pointer',
      'justify-between',
      'text-grey-60'
    ]"
    @click="openModalAddress"
  >
    <div class="flex flex-row">
      <icon
        name="fa7-solid:map-marked-alt"
        class="text-md text-blue-60 pr-3 pt-1"
      />
      <div>
        <!-- <strong>{{ defaultAddress.firstName + ' ' + defaultAddress.lastName }}</strong>
        <p>{{ defaultAddress.phoneNumber }}</p>
        <p>{{ getAddressString(defaultAddress) }}</p> -->
      </div>
    </div>
    <Icon
      name="fa7-solid:chevron-right"
      class="text-grey-40 text-md m-2 self-center"
    />
  </div>
</template>

<script setup lang="ts">
const isShippingAddressInvalid = ref(false)
function openModalAddress() {

}
</script>
