<template>
  <div ref="rootHeader" class="sticky z-50" :style="{ top: '-' + defaultHeightIklan + 'px' }">
    <div ref="header-default" :class="{ 'w-full z-40': true }">

      <div class="relative w-full">
        <UiKompasBar
          ref="headerbar"
          color="#FFFFFF"
          dark
          flat
          tag="header"
          top
          class="flex flex-col z-40 absolute"
        >
          <div class="flex max-w-3xl mx-auto py-2 text-sm w-full">
            <!-- <HeaderButtons />
            <HeaderLogo />
            <HeaderAuthBar :top-size="getHeightScollTop" /> -->
          </div>
        </UiKompasBar>

        <!-- start: search bar -->
        <div class="absolute left-0 top-0 -z-10 w-full">
          <ClientOnly>
            <!-- <LazyHeaderSearchBar /> -->
          </ClientOnly>
        </div>
        <!-- start: search bar -->

        <!-- start: side nav  -->
        <ClientOnly>
          <!-- <LazyHeaderSidebar /> -->
        </ClientOnly>
        <!-- end: side nav  -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UiKompasBar } from '#components'

const rootHeader = ref()
const defaultHeightIklan = ref(0)
const getScrollTop = ref(0)

const headerbar = ref<InstanceType<typeof UiKompasBar> | null>(null)
const getWidth = () => {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth,
  )
}

const handleScrollHeader = () => {
  const headerEl = headerbar.value?.$el as HTMLElement | null
  if (!headerEl) return // 🔥 Cegah error jika headerEl masih null
  getScrollTop.value = document.documentElement.scrollTop
  if (getWidth() > 300) {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
      headerEl.classList?.add('border-b', 'border-grey-30')
    }
    else {
      headerEl.classList?.remove('border-b', 'border-grey-30')
    }
  }
}

onMounted(async () => {
  await nextTick() //
  window.addEventListener('scroll', handleScrollHeader)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScrollHeader)
})
</script>
