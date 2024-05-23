<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ReportSkeleton from './Report/ReportSkeleton.vue'
import PresentationPage from './Report/PresentationPage.vue'
import ReportInfo from './Report/ReportInfo.vue'
import type { ReportConfig } from '~/api/modelsDefaults'

const { template } = defineProps<{
  template: ReportConfig
}>()

const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)

// const model = defineModel<ReportConfig>('report')
</script>

<template>
  <ReportSkeleton v-if="!template" />
  <div v-else class="w-full mx-auto max-w-[800px] m-8">
    <div class="flex flex-col gap-4">
      <ReportInfo
        :template="template"
        :company="company"
      />
      <PresentationPage :template="template" />
      <PresentationPage :template="template" />
      <PresentationPage :template="template" />
    </div>
  </div>
</template>
