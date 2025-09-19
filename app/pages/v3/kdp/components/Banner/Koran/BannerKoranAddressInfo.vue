<template>
  <UAccordion :items="items" variant="warning">
    <template #warning>
      <div class="text-sm px-5 pb-4">
        <ul class="list-disc pl-7 ">
          <li>Kab. Jembrana - Bali</li>
          <li>Kab. Karangasem - Bali</li>
          <li>Kab. Kepulauan Seribu - DKI Jakarta</li>
          <li>Kab. Pacitan - Jawa Timur</li>
          <li>Kab. Pasuruan - Jawa Timur</li>
          <li>Kab. Probolinggo - Jawa Timur</li>
          <li>Kab. Prabumulih - Sumatera Selatan</li>
        </ul>
        <p>
          Pastikan keterjangkauan alamat Anda dengan menghubungi 
          <a
            ref="addressInfoHotline"
            href="https://api.whatsapp.com/send/?phone=6281290050800&text=Halo,%20saya%20perlu%20informasi%20mengenai%20kompas.id"
            target="_blank"
            class="underline cursor-pointer"
          >
            Layanan Pelanggan
          </a>.
        </p>
      </div>
    </template>
    <template #leading>
      <Icon name="fa7-solid:circle-info" class="text-orange-40 text-[12.5px]" />
      <span> Saat ini pengiriman koran cetak tidak melayani area berikut. </span>
    </template>
  </UAccordion>
</template>

<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
const items = [ { slot: 'warning' as const }
] satisfies AccordionItem[]
</script>
