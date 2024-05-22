<script setup lang="ts">
import type { ReportConfig } from '~/api/modelsDefaults'
import ListTemplates from '~/components/Reports/ListTemplates.vue'

// import { storeToRefs } from 'pinia'
// import { MembershipTypeEnum } from '~/api-client'

const { t } = useI18n()
// const membershipsStore = useMembershipsStore()
// const companyStore = useCompanyStore()

// const { company } = storeToRefs(companyStore)

const templates = ref<ReportConfig[]>([
  {
    name: 'Dashboard.fig',
    version: 1.0,
    tags: 'tags, tags, tags',
    creation_date: '06 June 2021 / 155MB',
  },
  {
    name: 'Ecommerce.pdf',
    version: 1.0,
    tags: 'tags, tags, tags',
    creation_date: '06 June 2021 / 155MB',
  },
  {
    name: 'Job portal_app.zip',
    version: 1.0,
    tags: 'tags, tags, tags',
    creation_date: '06 June 2021 / 155MB',
  },
  {
    name: 'Ecommerce.pdf',
    version: 1.0,
    tags: 'tags, tags, tags',
    creation_date: '06 June 2021 / 155MB',
  },
  {
    name: 'Screenshot.jpg',
    version: 1.0,
    tags: 'tags, tags, tags',
    creation_date: '06 June 2021 / 155MB',
  },
])
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
        <ListTemplates :edit="{ active: true, route: '' }" :templates="templates" />
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
