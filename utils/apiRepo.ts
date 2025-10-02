import { useNuxtApp } from "#app"
/**

centralize useAsyncData calls into something like a repository pattern (e.g. utils/apiRepo.ts) — that’s a clean way to avoid duplicated keys and handlers across components.

Why this works?
- useAsyncData can be wrapped inside functions/composables.
- If you always give each call a stable key + immediate: false, you’re in control of when it runs.
- Components can just import functions from your repo and get a consistent data source.

goals of this repo: to avoid this warning
[nuxt] [useAsyncData] Incompatible options detected for "user-address-GUEST"
(used at http://www.kompas.local:3000/_nuxt/pages/v3/kdp/components/Modal/Koran/AddressForm.vue:70:43):
 - different handler You can use a different key or move the call 
to a composable to ensure the options are shared across calls.

TODO IMPROVEMENT, separate api repository for each module, example:
/koranApiRepository
/productApiRepository
 */

export function fetchUserAddress(userGuid: string, cached = true) {
  const cachedKey = `user-address-${userGuid}-${new Date().getTime()}`
  const defaultKey = `user-address-${userGuid}`
  return useAsyncData<ApiResponse<Address[], null>>(
    `${cached ? defaultKey : cachedKey}`,
    () => useNuxtApp().$apiOrder(`/user-address`),
    { server: false , immediate: false}
  )
}

export function fetchAddressProvinces() {
  return useAsyncData<ApiResponse<Province[], null>>(
    'address-provinces',
    () => $fetch('https://api.kompas.id/account/api/v1/countries/region/id'),
    { immediate: false, server: false }
  )
}

export function insertUserAddress(payload: Partial<Address>) {
  return useAsyncData<ApiResponse<Address, null>>(
    'insert-user-address',
    () => {
      return useNuxtApp().$apiOrder(`/user-address`, { method: 'POST', body: payload })
    },
    { immediate: false, server: false }
  )
}

export function updateUserAddress(address: Address, userGuid: string) {
  return useAsyncData<ApiResponse<Address, null>>(
    `update-user-address-${userGuid}-${new Date().getTime()}`,
    () => {
      return useNuxtApp().$apiOrder(`/user-address`, { method: 'PUT', body: address })
    },
    { immediate: false, server: false }
  )
}

export function setAddressDefault(id: number, guid: string) {
  return useAsyncData<ApiResponse<Address, null>>(
    `set-address-default-${guid}`,
    () => {
      return useNuxtApp().$apiOrder(`/user-address/default`, { method: 'POST', body: { id } })
    },
    { immediate: false, server: false }
  )
}


export function fetchDetailProduct(productId: string) {
  // this is the main api to this site
  // so we want the data to be fetched on server side
  // product api will be fetched after membership api
  // in-case product api has personalised result based on member/guest
  return useAsyncData<ApiResponse<KdpProductDetail, null>>(
    `detail-product-${productId}`,
     () => useNuxtApp().$apiOrder(`/product?id=${productId}`),
    { immediate: false}
  )
}

export function fetchCheckoutJson() {
  const { CHECKOUT_JSON_URL } = useRuntimeConfig().public
  return useAsyncData<CheckoutJsonResponse>(
    'checkout-json', 
    () => $fetch(CHECKOUT_JSON_URL),
    { immediate: false, server: false }
  )
}


