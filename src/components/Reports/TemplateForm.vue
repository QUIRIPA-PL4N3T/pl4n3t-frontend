<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const reportsStore = useReportsStore()
const { templateCompany } = storeToRefs(reportsStore)
</script>

<template>
  <div class="grid grid-cols-6 gap-4">
    <div class="col-span-4">
      <FormKit
        v-model="templateCompany.name"
        :label="t('reports.template_form.name')"
        outer-class="w-full"
        type="text"
        :placeholder="t('reports.template_form.name')"
        name="name"
        required
      />
    </div>
    <div class="col-span-1">
      <FormKit
        v-model="templateCompany.version"
        :label="t('reports.template_form.version')"
        type="text"
        :placeholder="t('reports.template_form.version')"
        name="version"
        required
      />
    </div>
    <div class="col-span-1">
      <FormKit
        v-model="templateCompany.creation_date"
        :label="t('reports.template_form.creation_date')"
        type="date"
        name="creation_date"
        required
        :disabled="true"
      />
    </div>
  </div>
</template>
