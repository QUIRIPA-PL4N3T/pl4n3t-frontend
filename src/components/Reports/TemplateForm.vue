<script setup lang="ts">
import type { ReportConfig } from '~/api/modelsDefaults'
import { DEFAULT_REPORT } from '~/api/modelsDefaults'

const { t } = useI18n()

const model = defineModel<ReportConfig>(DEFAULT_REPORT)
</script>

<template>
  <FormKit
    v-model="model.name"
    :label="t('reports.template_form.name')"
    outer-class="w-full"
    inner-class="max-w-xl"
    type="text"
    :placeholder="t('reports.template_form.name')"
    name="name"
    required
  />
  <FormKit
    v-model="model.version"
    :label="t('reports.template_form.version')"
    outer-class="w-full"
    inner-class="max-w-xl"
    type="text"
    :placeholder="t('reports.template_form.version')"
    name="version"
    required
  />
  <FormKit
    v-model="model.tags"
    :label="t('reports.template_form.tags')"
    outer-class="w-full"
    inner-class="max-w-xl"
    type="text"
    :placeholder="t('reports.template_form.tags')"
    name="tags"
    required
  />
  <quill-editor v-model="model.introduction" theme="snow" />
  <quill-editor v-model="model.definitions" theme="snow" />
  <quill-editor v-model="model.company_description" theme="snow" />
  <quill-editor v-model="model.organizational_description" theme="snow" />
  <quill-editor v-model="model.baseline_year_diagnostic" theme="snow" />
  <quill-editor v-model="report_frequency" theme="snow" />
  <quill-editor v-model="intended_use" theme="snow" />
  <quill-editor v-model="diagnostic_scope" theme="snow" />
  <quill-editor v-model="diagnostic_objectives" theme="snow" />
  <quill-editor v-model="quantification_methodology" theme="snow" />
  <quill-editor v-model="emissions_inventory_exclusions" theme="snow" />
  <quill-editor v-model="carbon_footprint_determination" theme="snow" />
  <quill-editor v-model="gei_inventory_boundaries" theme="snow" />
  <quill-editor v-model="report_results" theme="snow" />
  <quill-editor v-model="emissions_inventory" theme="snow" />
  <quill-editor v-model="emissions_consolidation" theme="snow" />
  <quill-editor v-model="emissions_consolidation_year" theme="snow" />
  <quill-editor v-model="carbon_footprint_quantification" theme="snow" />
  <quill-editor v-model="emissions_reduction_recommendations" theme="snow" />
  <quill-editor v-model="conclusions" theme="snow" />
  <quill-editor v-model="annexes" theme="snow" />
</template>
