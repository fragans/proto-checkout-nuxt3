<template>
  <div class="relative">
    <HeaderDefault />
    <div class="pt-12 min-h-screen">
      <slot />
    </div>

    <!-- <lazy-kid-snackbar-email-verification /> -->
    <!-- <lazy-kid-snackbar-global /> -->
    <SnackbarGlobal />
    <kompasid-footer />
  </div>
</template>

<script setup lang="ts">

</script>
