<script setup lang="ts">
import ItemTemplate from './ItemTemplate.vue'
import type { ReportConfig } from '~/api/modelsDefaults'

interface Edit {
  active: boolean
  route: string
}

const { templates, edit } = defineProps<{
  templates: ReportConfig[]
  edit?: Edit
}>()
</script>

<template>
  <ul>
    <li v-for="(template, i) in templates" :key="i" class="opacity-80 hover:opacity-100 cursor-pointer block mt-2 py-[8px] border-l-2 border-primary-500">
      <ItemTemplate :template="template" :edit="edit?.active" />
    </li>
  </ul>
</template>
