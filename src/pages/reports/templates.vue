<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { ReportConfig } from '~/api/modelsDefaults'
import ListTemplates from '~/components/Reports/ListTemplates.vue'

const { t } = useI18n()
const reportsStore = useReportStore()

const { templates, templatesCompany } = storeToRefs(reportsStore)
</script>

<template>
  <div class="grid grid-rows-3 grid-flow-col gap-4">
    <div class="row-span-3">
      <Card class-name="min-h-[500px]" :title="t('reports.enable_templates')">
        <ListTemplates :templates="templates" />
      </Card>
    </div>
    <div class="row-span-3 col-span-2">
      <Card class-name="min-h-[500px]" :title="t('reports.company_templates')">
        <ListTemplates :edit="{ active: true, route: '' }" :templates="templatesCompany" />
      </Card>
    </div>
  </div>
</template>

<route lang="yaml">
  name: templates
  meta:
    layout: sidebar
    requiresAuth: true
</route>
