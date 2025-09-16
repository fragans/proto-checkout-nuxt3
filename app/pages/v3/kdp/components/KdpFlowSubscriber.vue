<template>
  <div>
    <span class="text-grey-40">Subscriber Flow</span>
    <CardPaymentHeader />
    <CardSubscriptionSummary />
  </div>
</template>

<script setup lang="ts">
const checkoutStore = useCheckoutStore()
useAsyncData(
  'checkout-json',
  async () => {
    const CHECKOUT_JSON_URL = 'https://cdn-dev-www.kompas.id/checkout-page/checkout.json'
    const response = await $fetch<CheckoutJsonResponse>(CHECKOUT_JSON_URL)
    console.log('response=', response);
    
    if (!response.data) {
      checkoutStore.setCheckoutJson(response.data)
    }
    return response
  }
)
</script>
