<template>
  <UModal
    v-model:open="openModalInputAddress"
    :dismissible="false"
    title="Alamat Pengiriman"
    description="Alamat Pengiriman digunakan untuk keperluan pengiriman produk Harian Kompas."
    >
      <template #body>
        <div ref="addressForm">
          <UForm :state="formState" :schema="schema" aria-autocomplete="none" autocomplete="off" @submit="onSubmit">
            <div class="flex flex-col gap-4">
              <div class="grid grid-cols-2 gap-4 w-full">
                <UFormField label="Nama Depan*" name="firstName">
                  <UInput v-model="formState.firstName" required placeholder="Nama Depan Penerima"/>
                </UFormField>
                <UFormField label="Nama Belakang*" name="lastName">
                  <UInput v-model="formState.lastName" required placeholder="Nama Belakang Penerima"/>
                </UFormField>
              </div>
              <UFormField label="Provinsi*" name="province">
                <UInputMenu
                  v-model="formState.province"
                  :items="provinceList"
                  value-key="province"
                  label-key="province"
                  required
                  placeholder="Pilih Provinsi"
                  @focus="refreshKey++"
                  @change="addressStore.handleProvinceChange(formState.province)"
                />
              </UFormField>
              <UFormField label="Kabupaten/Kota*" name="city">
                <UInputMenu
                  v-model="formState.city"
                  :items="getCityList"
                  value-key="city"
                  label-key="city"
                  required
                  placeholder="Pilih Kabupaten/Kota"
                  @focus="refreshKey++"
                />
              </UFormField>
              <UFormField label="Kecamatan*" name="disctrict">
                <UInputMenu
                  v-model="formState.district"
                  :items="getDistrictList"
                  value-key="district"
                  label-key="district"
                  required
                  placeholder="Pilih Kecamatan"
                  @focus="refreshKey++"
                />
              </UFormField>
              <UFormField label="Kelurahan*" name="village">
                <UInputMenu
                  v-model="formState.village"
                  :items="getVillageList"
                  value-key="village"
                  label-key="village"
                  required
                  placeholder="Pilih Kelurahan"
                  @focus="refreshKey++"
                />
              </UFormField>
              <UFormField label="Alamat*" name="address">
                <UTextarea
                  v-model="formState.address"
                  placeholder="Detail Alamat"
                />
              </UFormField>
              <UFormField label="Kode Pos*" name="postalCode">
                <UInput
                  v-model="formState.postalCode"
                  required
                />
              </UFormField>
              <div class="grid grid-cols-2 gap-4 w-full">
                <UFormField label="Normor Ponsel*" name="phone">
                  <UInput
                    v-model="formState.phoneNumber"
                    type="phone"
                    required
                    placeholder="Contoh: 081234567890"
                  />
                </UFormField>
                <UFormField label="Email*" name="email">
                  <UInput
                    v-model="formState.email"
                    type="email"
                    required
                    placeholder="Contoh: alamat@email.com"
                  />
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
                @click="handleClose"
              >
                <span class="font-bold text-md">Batal</span>
              </UButton>
            </div>
            
          </UForm>
        </div>
      </template>
    </UModal>
</template>

<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { fetchUserAddress, insertUserAddress } from '~~/utils/apiRepo'

const addressStore = useAddressStore()
const { isGuestAddress, openModalInputAddress, provinceList } = storeToRefs(addressStore)
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
  village: z.string("Kelurahan harus diisi").min(1, "Kelurahan harus diisi"),
  address: z.string("Alamat harus diisi").min(1, "Alamat harus diisi"),
  postalCode: z.string("Kode pos harus diisi").regex(/^\d{5}$/, "Kode pos harus 5 digit"),
  phoneNumber: z.string("Nomor ponsel harus diisi").regex(/^\+?\d{8,15}$/, "Nomor ponsel tidak valid"),
  email: z.email("alamat email tidak valid"),
});
type Schema = z.output<typeof schema>

const refreshKey = ref(0)

const { 
  execute: executeInsertUserAddress, // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data: dataInsertAddress, 
  status: statusInsertAddress } = insertUserAddress(formState)

const { 
  execute: executeFetchUserAddress,
  data: dataFetchUserAddress, // eslint-disable-next-line @typescript-eslint/no-unused-vars
  status: statusFetchUserAddress } = fetchUserAddress(userGuid.value, false)

const getCityList = computed<City[]>(()=>{
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  refreshKey.value
  const selectedProvince = provinceList.value.find(province => province.province === formState.province)
  // console.log('selectedProvince', selectedProvince);
  if (selectedProvince) return selectedProvince?.cities
  return []
})

const getDistrictList = computed<District[]>(()=>{
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  refreshKey.value
  const selectedCity = getCityList.value.find(city => city.city === formState.city)
  if (selectedCity) return selectedCity?.districts
  return []
})

const getVillageList = computed<Village[]>(()=>{
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  refreshKey.value
  const selectedDistrict = getDistrictList.value.find(dis => dis.district === formState.district)
  if (selectedDistrict) return selectedDistrict?.villages
  return []
})

// function reloadCityList() {
//   const cities = getCityList.value
// }
// function reloadDistrictList() {
//   const districts = getDistrictList.value
// }
// function reloadVillageList() {
//   const villages = getVillageList.value
// }

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!isLoggedIn.value) {
    isGuestAddress.value = true
    addressStore.setUserAddressList([event.data])
    addressStore.setFakturAddress(event.data)
  } else {
    try {
      await executeInsertUserAddress()
      if (statusInsertAddress.value === 'success') {
        await executeFetchUserAddress()
        if (dataFetchUserAddress.value?.data) {
          addressStore.setUserAddressList(dataFetchUserAddress.value.data)
        }
        // this.resetFormData()
      }
    } catch (error) {
      console.log(error);
    }
  }
  openModalInputAddress.value = false
}

watch(
  () => formState.province,
  () => {
    formState.city = undefined
    formState.district = undefined
    formState.village = undefined
  }
)

watch(
  () => formState.city,
  () => {
    if (formState.district || formState.village) {
      formState.district = undefined
      formState.village = undefined
    }
  }
)

watch(
  () => formState.district,
  () => {
    if (formState.village) {
      formState.village = undefined
    }
  }
)

watch(
  () => openModalInputAddress,
  (value) => {
    if (!value) {
      resetFormData()
    }
  }
)

function resetFormData() {
  formState.firstName = undefined
  formState.lastName = undefined
  formState.province = undefined
  formState.city = undefined
  formState.district = undefined
  formState.village = undefined
  formState.address = undefined
  formState.postalCode = undefined
  formState.phoneNumber = undefined
  formState.email = undefined
}

async function setFieldsValue (address: Address) {
  console.log('setFieldsValue', address);
  formState.firstName = address.firstName // 1
  formState.lastName = address.lastName // 2
  formState.province = address.province // 3
  formState.address = address.address // 7
  formState.postalCode = address.postalCode // 8
  formState.phoneNumber = address.phoneNumber // 9
  formState.email = address.email // 10

  await nextTick()
  refreshKey.value++
  formState.city = address.city // 4

  await nextTick()
  refreshKey.value++
  formState.district = address.district // 5

  await nextTick()
  refreshKey.value++
  formState.village = address.village // 6
  // watch(
  //   targetIsVisible,
  //   async (value) => {
  //     console.log('targetIsVisible', value);
      
  //     // if (!value) return
      

  //   }
  // )
}

function handleClose() {
  resetFormData()
  openModalInputAddress.value = false
}

defineExpose({
  setFieldsValue
})
</script>
