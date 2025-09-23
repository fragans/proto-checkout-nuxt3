<template>
  <div class="pt-10">
    <strong class="block mb-1 text-lg" for="first-delivery-date">
      Tanggal Pertama Kirim Koran<span class="text-red-50">*</span>
    </strong>
    <p class="text-grey-40 pb-4">
      Hari pertama koran diterima menentukan waktu langganan dan waktu perpanjang otomatis
    </p>
    <!-- <button
      class="w-full md:w-1/2 border flex items-center justify-between p-4"
      :class="[isDateKoranEmpty ? 'border-red-30 shadow-sm shadow-red-30' : 'border-grey-30', dataDateKoran ? 'text-grey-60' : 'text-grey-40']"
      @click="handleCalendar"
    >
      <span>{{ dataDateKoran ? dataDateKoran : 'dd/mm/yyyy' }}</span>
      <span>
        <nuxt-img src="/assets/img/icons/calendar.svg" alt="" />
      </span>
    </button> -->

    <!-- <div v-if="isDateKoranEmpty" ref="errorCalendarText" class="flex space-x-1 mt-2">
      <nuxt-img
        src="/assets/img/icons/red-warning.svg"
        alt="warning"
      />
      <span class="text-red-40 text-xs">Tanggal pertama kirim koran harus diisi.</span>
    </div> -->
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>