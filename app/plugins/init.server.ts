import type { Pinia } from 'pinia'
import { fetchCheckoutJson } from '~~/utils/apiRepo';

export default defineNuxtPlugin(async ({ $pinia }) => {

const _pinia = $pinia as Pinia
const checkoutStore = useCheckoutStore(_pinia)

const { execute: executeFetchCheckoutJson, data: dataCheckoutJson} = fetchCheckoutJson()
await executeFetchCheckoutJson()
if (dataCheckoutJson.value?.data) checkoutStore.setCheckoutJson(dataCheckoutJson.value?.data)

})
