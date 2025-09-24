/* eslint-disable @typescript-eslint/no-unused-vars */
import { getActivePinia } from "pinia"
import { fetchDetailProduct } from '~~/utils/apiRepo';

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.client) return

    const $route = useRoute()

    const pinia = getActivePinia()
    const checkoutStore = useCheckoutStore(pinia)
    const addressStore = useAddressStore(pinia)

    const { execute: executeFetchDetailProduct, data: dataDetailProduct } = fetchDetailProduct($route.query.productId as string)
    await executeFetchDetailProduct()
    if (dataDetailProduct.value?.data) {
      checkoutStore.setDetailProduct(dataDetailProduct.value?.data)
      addressStore.setDetailProduct(dataDetailProduct.value?.data)
    }
})
