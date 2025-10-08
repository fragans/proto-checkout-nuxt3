<template>
  <div class="pt-10">
    <strong class="block mb-1 text-lg" for="first-delivery-date">
      Tanggal Pertama Kirim Koran<span class="text-red-50">*</span>
    </strong>
    <p class="text-grey-40 pb-4">
      Hari pertama koran diterima menentukan waktu langganan dan waktu perpanjang otomatis
    </p>
     <UModal
      v-model:open="isModalOpen"
      :dismissible="false"
      title="Tanggal Pertama Kirim Koran"
     >
      <button 
        class="w-full md:w-1/2 border flex items-center justify-between p-4 rounded"
        :class="[false ? 'border-red-30 shadow-sm shadow-red-30' : 'border-grey-30']"
        @click="isModalOpen = true"
      >
        <template v-if="selectedDate">
          <span class="text-grey-60">{{ selectedDate.toDate().toLocaleDateString() }}</span>
        </template>
        <template v-else>
          <span class="text-grey-40">dd/mm/yyyy</span>
        </template>
        <Icon name="fa7-regular:calendar" class="text-md text-grey-40"/>
      </button>

      <template #content>
        <div class="p-4">
          <UCalendar v-model="tempDate" class="p-2" />
          <div class="flex justify-end pt-4">
            <UButton variant="outline" color="primary" class="mr-2" @click="isModalOpen = false">
              Batal
            </UButton>
            <UButton color="primary" @click="handleSelectDate">
              Pilih
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
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
import { getLocalTimeZone, now } from '@internationalized/date'
import type { ZonedDateTime } from '@internationalized/date'

const isModalOpen = ref(false)
const selectedDate = ref<ZonedDateTime>()
const tempDate = ref<ZonedDateTime>(now(getLocalTimeZone()))

function handleSelectDate() {
  selectedDate.value = tempDate.value
  isModalOpen.value = false
}
</script>
