<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { CompanyTemplateList, ReportTemplateList } from '~/api-client/models'

const { report } = defineProps<{
  report: CompanyTemplateList | ReportTemplateList
}>()
const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)

const { t } = useI18n()
</script>

<template>
  <EmptyData
    v-if="!report"
    :title="report ? t('not_found') : t('reports.unselected_company')"
  />
  <div v-else class="flex flex-col gap-1 mx-4">
    <strong class="text-xl font-medium">{{ report.name }} #
      {{ report.id }}</strong>
    <div class="flex flex-wrap items-center gap-1 justify-start text-sm font-medium">
      <Icon icon="radix-icons:calendar" />
      <span>{{ report.creation_date }}</span>
    </div>
    <strong class="text-xl font-medium uppercase">{{ company.name }}</strong>
  </div>
</template>
