<template>
  <div
    ref="fullAddressSection"
    class="border border-orange-10 flex flex-row w-full rounded-md justify-left p-4 mb-4 bg-orange-10 gap-3"
  >
    <Icon
      name="fa7-solid:circle-exclamation"
      class="text-[12.5px] text-orange-50 flex pr-4 pt-2 h-5"
    />
    <div>
      <strong ref="fullAddress" class="flex text-grey-60 text-sm">
        Daftar Alamat Penuh
      </strong>
      <p ref="fullAddressDescription" class="flex text-grey-60 text-sm">
        Ubah atau hapus salah satu untuk menambah alamat baru.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style>

</style>