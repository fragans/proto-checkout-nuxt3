<template>
  <div class="relative">
    <HeaderDefault />
    <div class="pt-12 min-h-screen">
      <div class="relative max-w-screen-sm lg:max-w-screen-md mx-4 md:mx-auto lg:px-7">
        <h4 class="text-xl md:text-2xl pb-2 mt-8 font-bold">
          Rincian Pembayaran
        </h4>
        <slot />
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
// const authStore = useAuthStore()
// const { isLoggedIn } = storeToRefs(authStore)
</script>
