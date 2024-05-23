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

let preview = ref<boolean>(false)
const template = ref<ReportConfig>(null)
const router = useRouter()

function onAction(value: ActionEmits) {
  preview = false
  switch (value.action) {
    case 'edit':
      router.push({
        name: 'memberships',
        params: { id: value.value.id },
      })
      break
    case 'preview':
      preview = true
      template = value.value
      break
    default:
      break
  }
}
</script>

<template>
  <Drawer :open="preview" direction="right" title="Preview" class-button="hidden">
    <template #body>
      <TemplateForm v-if="template" v-model="template" />
    </template>
  </Drawer>
  <ul>
    <li v-for="(item, i) in templates" :key="i" class="opacity-80 hover:opacity-100 cursor-pointer block py-[4px] ">
      <ItemTemplate :template="item" :edit="edit?.active" @on-action="value => onAction(value)" />
    </li>
  </ul>
</template>
