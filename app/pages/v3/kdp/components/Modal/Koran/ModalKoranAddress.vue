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

      <template #body="{ close }">
        <UForm :state="formState" :schema="schema" @submit="onSubmit">
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
            <UFormField label="Kode Pos*" name="postalCode">
              <UInput v-model="formState.postalCode" required/>
            </UFormField>
            <div class="grid grid-cols-2 gap-4 w-full">
              <UFormField label="Normor Ponsel*" name="phone">
                <UInput v-model="formState.phoneNumber" type="phone" required/>
              </UFormField>
              <UFormField label="Email*" name="email">
                <UInput v-model="formState.email" type="email" required/>
              </UFormField>
            </div>
            
          </div>
          <div class="gap-4 flex pt-4">
            <UButton
              variant="solid"
              color="success"
              type="submit"
              size="lg"
            >
              <span class="font-bold text-md">Simpan Alamat</span>
            </UButton>
            <UButton
              color="success"
              variant="outline"
              size="lg"
              @click="close"
            >
              <span class="font-bold text-md">Batal</span>
            </UButton>
          </div>
          
        </UForm>
      </template>
    </UModal>
</template>

<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
const nuxtApp = useNuxtApp()
const addressStore = useAddressStore()
const { isGuestAddress, openModalKoranAddress, provinceList } = storeToRefs(addressStore)
const authStore = useAuthStore()
const { isLoggedIn, userGuid } = storeToRefs(authStore)
const formState = reactive<Partial<Schema>>({
  firstName: undefined,
  lastName: undefined,
  province: undefined,
  city: undefined, // kota/kabupaten
  district: undefined, // Kecamatan
  village: undefined, // Kelurahan
  address: undefined,
  postalCode: undefined,
  phoneNumber: undefined,
  email: undefined,
})
const schema = z.object({
  firstName: z.string("Nama depan harus diisi").min(1, "Nama depan harus diisi"),
  lastName: z.string("Name belakang harus diisi").min(1, "Nama belakang harus diisi"),
  province: z.string("Provinsi harus diisi").min(1, "Provinsi harus diisi"),
  city: z.string("Kabupaten harus diisi").min(1, "Kota/Kabupaten harus diisi"),
  district: z.string("Kecamatan harus diisi").min(1, "Kecamatan harus diisi"),
  village: z.string("Keluarahan harus diisi").min(1, "Keluarahan harus diisi"),
  address: z.string("Alamat harus diisi").min(1, "Alamat harus diisi"),
  postalCode: z.string("Kode pos harus diisi").regex(/^\d{5}$/, "Kode pos harus 5 digit"),
  phoneNumber: z.string("Nomor ponsel harus diisi").regex(/^\+?\d{8,15}$/, "Nomor ponsel tidak valid"),
  email: z.email("alamat email tidak valid"),
});
type Schema = z.output<typeof schema>
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

const {execute: fetchUserAddress} = useAsyncData(
  computed(() => `user-address-${userGuid.value}`),
  async () => {
    const response = await nuxtApp.$apiOrder<ApiResponse<Address[], null>>(`/user-address`)
    if (response.data) { addressStore.setUserAddressList(response.data) }
    return response
  },
  {
    server: false,
    immediate: false
  }
)

const { execute: insertAddress, status: statusInsertAddress } = useAsyncData(
  computed(() => `add-address-${new Date().toISOString()}`),
  async () => {
    const response= await useNuxtApp().$apiOrder<ApiResponse<Province[], null>>(`/user-address`, { method: 'POST', body: formState })
    return response
  },
  {
    immediate: false,
    server: false
  }
)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
  if (!isLoggedIn.value) {
    isGuestAddress.value = true
    addressStore.setUserAddressList([event.data])
    addressStore.setFakturAddress(event.data)
  } else {
    try {
      await insertAddress()
      if (statusInsertAddress.value === 'success') {
        await fetchUserAddress()
        // this.resetFormData()
      }
    } catch (error) {
      console.log(error);
    }
  }
  close()
}


</script>

<style>

</style>