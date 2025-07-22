<template>
  <div class="flex-1">
    <!-- hidden -->
    <div
      ref="logo"
      class="flex h-8 items-center justify-center"
    >
      <NuxtLink
        ref="headerBarLogo"
        to="https://www.kompas.id"
        :class="['flex', 'h-6', 'w-auto', 'items-center',gtmClass]"
        title="Kompas.id"
      >
        <img
          src="https://cdn-www.kompas.id/assets/kompas-logo-masthead.svg"
          class="mx-auto"
          alt="logo Kompas.id"
          height="32"
          width="96"
          loading="lazy"
        >
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const logo = ref<HTMLElement | null>(null)

const gtmClass = 'gtm-home-app-header'

const getWidth = () => {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth,
  )
}

const handleScroll = () => {
  const visibleThreshold = 200 // 600
  if (getWidth() > 300) {
    if (document.body.scrollTop > visibleThreshold || document.documentElement.scrollTop > visibleThreshold) {
      if (logo.value) {
        logo.value.classList.add('md:flex')
      }
    }
    else {
      if (logo.value) {
        logo.value.classList.remove('md:flex')
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
