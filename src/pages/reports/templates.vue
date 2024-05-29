<script setup lang="ts">
import { storeToRefs } from 'pinia'
import EmptyData from '~/components/EmptyData/EmptyData.vue'
import ListTemplates from '~/components/Reports/ListTemplates.vue'

const { t } = useI18n()
const reportsStore = useReportsStore()
const companyStore = useCompanyStore()

const { templates, templatesCompany } = storeToRefs(reportsStore)
const { company } = storeToRefs(companyStore)

let loadingTemplates = $ref<boolean>(true)
let loadingTemplatesCompanies = $ref<boolean>(true)

reportsStore.fetchTemplates().then(() => loadingTemplates = false)
reportsStore.fetchCompanyTemplates(company.value.id).then(() => loadingTemplatesCompanies = false)
</script>

<template>
  <div class="grid grid-rows-3 grid-flow-col gap-4">
    <div class="row-span-3">
      <Card class-name="min-h-[500px]" :title="t('reports.enable_templates')">
        <EmptyData v-if="!loadingTemplates && templates?.length === 0" />
        <ReportSkeleton v-if="loadingTemplates" />
        <ListTemplates v-else :branch="true" :templates="templates" />
      </Card>
    </div>
    <div class="row-span-3 col-span-2">
      <Card class-name="min-h-[500px]" :title="t('reports.company_templates')">
        <template #header>
          <div class="w-full flex flex-wrap justify-start">
            <Badge :badge-class="company ? 'bg-primary-500 text-white' : 'bg-danger-500'" :label="company ? company.name : t('reports.unselected_company')" />
          </div>
        </template>
        <EmptyData
          v-if="!loadingTemplatesCompanies && templatesCompany?.length === 0"
          :title="company ? t('not_found') : t('reports.unselected_company')"
        />
        <ReportSkeleton v-if="loadingTemplatesCompanies" />
        <ListTemplates v-else :edit="{ active: true, route: '' }" :templates="templatesCompany" />
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
