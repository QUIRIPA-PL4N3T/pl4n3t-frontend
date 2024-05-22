<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { _RouterTyped } from 'unplugin-vue-router'
import type { ReportConfig } from '~/api/modelsDefaults'

const { template, edit } = defineProps<{
  template: ReportConfig
  edit?: boolean
}>()

const { t } = useI18n()
</script>

<template>
  <div class="ml-2 flex space-x-2 rtl:space-x-reverse">
    <div class="flex-1 flex space-x-2 rtl:space-x-reverse">
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
    <div class="flex flex-wrap gap-1">
      <Tooltip placement="top" arrow theme="dark">
        <template #button>
          <div class="action-btn hover:scale-110">
            <Icon icon="heroicons-outline:eye" class="size-4" />
          </div>
        </template>
        <span> {{ t('preview') }}</span>
      </Tooltip>
      <Tooltip v-if="edit" placement="top" arrow theme="dark">
        <template #button>
          <router-link to="" class="action-btn hover:scale-110">
            <Icon icon="heroicons-outline:pencil" class="size-4" />
          </router-link>
        </template>
        <span> {{ t('edit') }}</span>
      </Tooltip>
    </div>
  </div>
</template>
