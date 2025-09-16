<template>
  <div class="bg-grey-50 text-white text-center h-screen">
    <div v-if="authStore.isLoggedIn">
      <KdpFlowSubscriber v-if="isSubscriber" />
      <KdpFlowRegon v-else />
    </div>
    <KdpFlowGuest v-else />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const { userSubscriptionStatus } = storeToRefs(authStore)
const isSubscriber = computed(() => userSubscriptionStatus.value.active.length > 0)
</script>