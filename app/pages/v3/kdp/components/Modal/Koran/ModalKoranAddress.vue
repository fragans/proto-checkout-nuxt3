<template>
  <UModal
    v-model:open="openModalKoranAddress"
    title="Alamat Pengiriman"
    description="Alamat Pengiriman digunakan untuk keperluan pengiriman produk Harian Kompas."
    :ui="{ footer: 'justify-start' }">
      <UButton
        block
        variant="outline"
        color="primary"
        size="xl"
      >
        <Icon
          name="fa7-solid:circle-plus"
          class="text-md text-blue-60 flex pr-4 pt-1"
        />
        <strong class="flex text-blue-60">
          Buat Alamat Pengiriman
        </strong>
      </UButton>

      <template #body>
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-2 gap-4 w-full">
            <UFormField label="Nama Depan*" name="firstName">
              <UInput v-model="formState.firstName" required/>
            </UFormField>
            <UFormField label="Nama Belakang*" name="lastName">
              <UInput v-model="formState.lastName" required/>
            </UFormField>
          </div>
          <UFormField label="Provinsi*" name="province">
            <UInputMenu v-model="formState.province" :items="provinceList" value-key="province" label-key="province" required open-on-focus/>
          </UFormField>
          <UFormField label="Kabupaten/Kota*" name="city">
            <UInputMenu v-model="formState.city" :items="getCityList" value-key="city" label-key="city" required open-on-focus/>
          </UFormField>
          <UFormField label="Kecamatan*" name="disctrict">
            <UInputMenu v-model="formState.district" :items="getDistrictList" value-key="district" label-key="district" required open-on-focus/>
          </UFormField>
          
        </div>
      </template>

      <template #footer="{ close }">
        <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
        <UButton label="Submit" color="neutral" />
      </template>
    </UModal>
</template>

<script lang="ts" setup>
const adddressStore = useAddressStore()
const { openModalKoranAddress, provinceList } = storeToRefs(adddressStore)
const formState = reactive({
  email: '',
  firstName: '',
  lastName: '',
  province: '',
  city: '',
  district: '',
  state: '',
  zip: '',
  country: ''
})
const getCityList = computed<City[]>(()=>{
  const selectedProvince = provinceList.value.find(province => province.province === formState.province)
  if (selectedProvince) {
    return selectedProvince?.cities
  }
  return []
})

const getDistrictList = computed<District[]>(()=>{
  const selectedCity = getCityList.value.find(city => city.city === formState.city)
  if (selectedCity) {
    return selectedCity?.districts
  }
  return []
})
</script>

<style>

</style>