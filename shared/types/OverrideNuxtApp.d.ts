/**
 * makes ts doesnt complain when using injected plugin
 */
import type * as Sentry from '@sentry/vue'

declare module '#app' {
  interface NuxtApp {
    $apiCds: ReturnType<typeof $fetch.create>
    $apiAccount: ReturnType<typeof $fetch.create>
    $apiEpaper: ReturnType<typeof $fetch.create>
    $sentry: typeof Sentry
    $isNuxtLink (permalink: string): boolean | undefined
    $convertToNuxtLink (permalink: string): string
    $decodeSpecialChars (str: string): string
    $cleanPath (str: string): string
  }
  interface PageMeta {
    inSubcategory?: string
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $apiCds: ReturnType<typeof $fetch.create>
    $apiAccount: ReturnType<typeof $fetch.create>
    $apiEpaper: ReturnType<typeof $fetch.create>
    $isNuxtLink (permalink: string): boolean | undefined
    $convertToNuxtLink (permalink: string): string
    $decodeSpecialChars (str: string): string
  }
}
// this is important!
export {}
