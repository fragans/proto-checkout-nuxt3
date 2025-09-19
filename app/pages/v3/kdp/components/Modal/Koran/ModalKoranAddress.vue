<template>
  <UModal
    v-model:open="openModalKoranAddress"
    title="Alamat Pengiriman"
    description="Alamat Pengiriman digunakan untuk keperluan pengiriman produk Harian Kompas."
    >
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
          <UFormField label="Kelurahan*" name="village">
            <UInputMenu v-model="formState.village" :items="getVillageList" value-key="village" label-key="village" required open-on-focus/>
          </UFormField>
          <UFormField label="Alamat*" name="village">
            <UTextarea v-model="formState.address" />
          </UFormField>
          <UFormField label="Kode Pos*" name="zipCode">
            <UInput v-model="formState.zipCode" required/>
          </UFormField>
          <div class="grid grid-cols-2 gap-4 w-full">
            <UFormField label="Normor Ponsel*" name="phone">
              <UInput v-model="formState.phone" type="phone" required/>
            </UFormField>
            <UFormField label="Email*" name="email">
              <UInput v-model="formState.email" type="email" required/>
            </UFormField>
          </div>
          
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
  firstName: '',
  lastName: '',
  province: '',
  city: '', // kota/kabupaten
  district: '', // Kecamatan
  village: '', // Kelurahan
  address: '',
  zipCode: '',
  phone: '',
  email: '',
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

const getVillageList = computed<Village[]>(()=>{
  const selectedDistrict = getDistrictList.value.find(dis => dis.district === formState.district)
  if (selectedDistrict) {
    return selectedDistrict?.villages
  }
  return []
})
</script>

<style>

</style>