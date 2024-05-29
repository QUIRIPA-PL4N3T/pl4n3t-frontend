<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ReportInfo from './Report/ReportInfo.vue'
import type { CompanyTemplateList, ReportTemplateList } from '~/api-client/models'

const { templateProp } = defineProps<{
  templateProp: CompanyTemplateList | ReportTemplateList
}>()

const reportsStore = useReportsStore()

const { template, templateCompany } = storeToRefs(reportsStore)
let loading = $ref<boolean>(true)
let content = $ref<string[]>([])

function isCompanyTemplateDetail(object: any): object is CompanyTemplateList {
  return 'company' in object
}
function isReportTemplateDetail(object: any): object is ReportTemplateList {
  return 'id' in object
}

watch(() => templateProp, () => {
  getStateByType(templateProp)
})

function getStateByType(temp: CompanyTemplateList | ReportTemplateList) {
  if (isCompanyTemplateDetail(temp)) {
    reportsStore.getCompanyTemplate(templateProp?.id).then(() => {
      content = [templateCompany.value?.introduction]
      loading = false
    }).catch((error) => {
      console.error(error)
    })
  }
  else if (isReportTemplateDetail(temp)) {
    reportsStore.getTemplate(templateProp?.id).then(() => {
      content = [template.value?.introduction]
      loading = false
    }).catch((error) => {
      console.error(error)
    })
  }
  loading = false
}
</script>

<template>
  <div class="w-full mx-auto max-w-[800px] m-8">
    <div class="flex flex-col gap-4">
      <ReportInfo
        :report="templateProp"
      />
      <BasicLoader v-if="loading" />
      <div v-else>
        <vue-document-editor v-model:content="content" />
      </div>
    </div>
  </div>
</template>
