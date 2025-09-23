<template>
  <div
    class="border border-grey-30 p-6 rounded mb-6 flex flex-row justify-between w-full items-start"
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
                @click="() => setAddressToDefault(props.num)"
              >
                <span class="text-sm">Jadikan Alamat Pengiriman</span>
              </UButton>
              <UButton
                variant="outline"
                color="primary"
                @click="handleModalEdit(props.num)" 
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
      variant="ghost"
      @click="handleDelete(props.num)"
    >
      <Icon
        name="fa7-solid:trash"
        class="text-grey-40 text-md m-2 self-center"
      />
    </UButton>
  </div>
</template>

<script lang="ts" setup>
interface CardAddressItem {
  firstName: string
  lastName: string
  phoneNumber: string
  isDefault: boolean
  num?: number
  isLoggedIn: boolean
  addressConcated: string
}

const props = withDefaults(
  defineProps<CardAddressItem>(),  {
    num: 0
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
