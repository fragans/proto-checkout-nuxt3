<template>
  <div
    class="border border-grey-30 p-6 rounded mb-6 flex flex-row justify-between w-full"
    :class="props.isDefault ? 'bg-grey-10' : ''"
  >
    <div class="flex flex-col">
      <div>
        <strong 
          v-if="props.isDefault || !props.isLoggedIn"
          class="bg-blue-10 rounded p-1 text-blue-60 text-xs ml-7"
        >
          Alamat Terpilih
        </strong>
        <div class="flex flex-row w-full gap-3">
          <icon
            name="fa7-solid:map-marked-alt"
            class="text-md text-blue-60 pr-3 pt-1"
          />
          <div class="flex flex-col">
            <strong>{{ props.firstName + ' ' + props.lastName }}</strong>
            <p>{{ props.phoneNumber }}</p>
            <p>{{ props.addressConcated }}</p>
            <div class="flex flex-col md:flex-row md:space-x-4 mt-4">
              <UButton
                v-if="!props.isDefault && props.isLoggedIn"
                :click="() => setAddressToDefault(props.num)"
              >
                <span class="text-sm">Jadikan Alamat Pengiriman</span>
              </UButton>
              <UButton
                class="w-1/2 md:w-auto border border-blue-60 bg-transparent rounded text-blue-60 md:p-2 font-bold mt-2 md:mt-0 py-2 text-sm"
                @click="() => handleModalEdit(props.num)"
              >
                <span>Ubah Alamat</span>
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <UButton
      v-if="props.isLoggedIn && !props.isDefault"
      :click="() => handleDelete(props.num)"
    >
      <Icon
        name="fa7-solid:trash"
        class="text-grey-40 text-md m-2 self-center"
      />
    </UButton>
  </div>
</template>

<script lang="ts" setup>
type CardAddressItem = Pick<Address, 'firstName' | 'lastName' | 'phoneNumber' | 'isDefault'> & {
  num?: Address['id']   // reuse the type of Address.id, but renamed to num
  isLoggedIn?: boolean
  addressConcated?: string
}
const props = withDefaults(
  defineProps<CardAddressItem>(), 
  {
    num: 0,
    isLoggedIn: false,
    addressConcated: ''
  }
)
const emit = defineEmits<{
  delete: [id: number|undefined]
  edit: [id: number|undefined]
  setDefault: [id: number|undefined]
}>()

function handleDelete(id: number | undefined) {
  emit('delete', id)
}
function handleModalEdit(id: number | undefined) {
  emit('edit', id)
}
function setAddressToDefault (id: number | undefined) {
  emit('setDefault', id)
}
</script>
