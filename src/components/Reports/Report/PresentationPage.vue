<script setup lang="ts">
import type { ReportConfig } from '~/api/modelsDefaults'

const { template } = defineProps<{
  template: ReportConfig
}>()
</script>

<template>
  <div class="flex flex-col mt-4 border border-spacing-0 justify-start items-center drop-shadow-lg">
    <div class="my-16 px-3">
      <h1 class="text-4xl font-bold uppercase text-center">
        {{ template.name }}
      </h1>
    </div>
    <div class="mb-2 px-3">
      <h2 class="text-5xl font-bold text-red-700 uppercase text-center">
        {{ template.name }}
      </h2>
    </div>
    <div class="mb-8 px-3">
      <h3 class="text-3xl font-bold text-gray-400 uppercase text-center">
        {{ template.creation_date }}
      </h3>
    </div>
    <div class="mb-8 px-3 bg-red-700 p-4">
      <h4 class="text-3xl font-bold text-gray-200 uppercase text-center">
        PL4N3T.COM
      </h4>
      <p class="text-gray-200 text-xl font-semibold text-center">
        Amanecer en el Palmar EAT, bajo la marca PL4N3T.COM, es
        responsable de la cuantificación de Inventarios de GEI y Carbono
      </p>
    </div>
    <div class="p-8 px-3">
      <h6 class="text-xl uppercase text-center">
        28 de Octubre de 2022
      </h6>
    </div>
  </div>
</template>
