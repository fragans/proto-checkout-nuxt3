<template>
  <div class="pb-6">
    <p class="font-bold">
      <span v-if="isLoggedIn"><span class="text-blue-60">{{ authStore.getFullName }}</span>, berikut paket pilihan Anda</span>
      <span v-if="!isLoggedIn">Berikut paket pilihan Anda</span>
    </p>
  </div>

</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
</script>

<style>

</style>