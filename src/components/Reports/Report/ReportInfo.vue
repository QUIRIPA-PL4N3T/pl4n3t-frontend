<script setup lang="ts">
import type { Company } from '~/api-client'
import type { ReportConfig } from '~/api/modelsDefaults'

const { template, company } = defineProps<{
  template: ReportConfig
  company: Company
}>()
</script>

<template>
  <div class="overflow-hidden relative w-full max-w-full mx-auto shadow-lg rounded-xl flex items-center gap-6">
    <img
      class="absolute -left-6 w-24 h-24 rounded-full shadow-lg"
      :alt="company.name"
      :src="company?.logo"
    >
    <div class="flex flex-col py-5 pl-24">
      <strong class="text-3xl font-medium">{{ template.name }} #
        {{ template.id }}</strong>
      <div class="flex flex-wrap items-center gap-2 justify-start text-sm font-medium">
        <Icon icon="radix-icons:calendar" />
        <span>{{ template.creation_date }}</span>
      </div>
    </div>
  </div>
</template>
