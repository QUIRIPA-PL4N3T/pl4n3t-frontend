<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ActionEmits, ReportConfig } from '~/api/modelsDefaults'

const { template, edit } = defineProps<{
  template: ReportConfig
  edit?: boolean
}>()

const emit = defineEmits<{
  (event: 'onAction', value: ActionEmits<ReportConfig>): void
}>()

const { t } = useI18n()
</script>

<template>
  <div :class="template?.using ? 'border-purple-500' : 'border-primary-500'" class="flex space-x-2 rtl:space-x-reverse border-l-2">
    <div class="flex-1 flex space-x-2 ml-2 rtl:space-x-reverse">
      <div class="flex flex-wrap justify-center items-center">
        <span
          class="block text-slate-600 text-sm dark:text-slate-300 mr-2"
        >{{ t('reports.template_form.version') }}{{ template.version }}</span>
      </div>
      <div class="flex-1">
        <span
          class="block text-slate-600 text-sm dark:text-slate-300"
        >{{ template.name }}</span>
        <span
          class="block font-normal text-xs text-slate-500 mt-1"
        >{{ template.creation_date }}</span>
      </div>
    </div>
    <div class="flex flex-wrap justify-center items-center gap-1">
      <Tooltip placement="top" arrow theme="dark">
        <template #button>
          <div
            class="hover:scale-110" @click="emit('onAction', {
              action: 'preview',
              value: template,
            })"
          >
            <Icon icon="heroicons-outline:eye" class="size-4" />
          </div>
        </template>
        <span> {{ t('preview') }}</span>
      </Tooltip>
      <Tooltip v-if="edit" placement="top" arrow theme="dark">
        <template #button>
          <div
            class="hover:scale-110" @click="emit('onAction', {
              action: 'edit',
              value: template,
            })"
          >
            <Icon icon="heroicons-outline:pencil" class="size-4" />
          </div>
        </template>
        <span> {{ t('edit') }}</span>
      </Tooltip>
    </div>
  </div>
</template>
