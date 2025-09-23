<template>
  <ClientOnly>
    <SectionPaymentHeader />
    <SubscriptionSummary role="card"/>
    <SectionKoran />
  </ClientOnly>
</template>

<script setup lang="ts">
import { fetchDetailProduct, fetchCheckoutJson } from '~~/utils/apiRepo';
const $route = useRoute()
const { execute: executeFetchDetailProduct, data: dataDetailProduct } = fetchDetailProduct($route.query.productId as string)
const { execute: executeFetchCheckoutJson, data: dataCheckoutJson} = fetchCheckoutJson()
const checkoutStore = useCheckoutStore()


useAsyncData(
  'main-api',
  async() => {
    await executeFetchDetailProduct()
    if (dataDetailProduct.value?.data) checkoutStore.setDetailProduct(dataDetailProduct.value?.data)
    await executeFetchCheckoutJson()
    if (dataCheckoutJson.value?.data) checkoutStore.setCheckoutJson(dataCheckoutJson.value?.data)
  }
)
  

useHead({
  title: 'Checkout Page v3'
})
</script>
