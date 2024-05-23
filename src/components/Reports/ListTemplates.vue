<script setup lang="ts">
import ItemTemplate from './ItemTemplate.vue'
import { type ActionEmits, DEFAULT_REPORT, type ReportConfig } from '~/api/modelsDefaults'

interface Edit {
  active: boolean
  route: string
}

const { templates, edit } = defineProps<{
  templates: ReportConfig[]
  edit?: Edit
}>()

let preview = $ref<boolean>(false)
// let previewTemplate = $ref<boolean>(false)

// let templateCompany = $ref<ReportConfig>(DEFAULT_REPORT)
let template = $ref<ReportConfig>(DEFAULT_REPORT)
const router = useRouter()

function tooggleDrawer() {
  preview = !preview
}
function onAction(value: ActionEmits<ReportConfig>) {
  switch (value.action) {
    case 'edit':
      router.push({
        name: 'memberships',
        params: { id: value.value.id },
      })
      break
    case 'preview':
      template = value.value
      tooggleDrawer()
      break
    default:
      break
  }
}
</script>

<template>
  <Drawer
    :open="preview"
    :close-icon="true"
    direction="right"
    title="Preview"
    class-button="hidden"
    size="md"
    @close="value => preview = value"
  >
    <template #body>
      <ReportManager :template="template" />
    </template>
  </Drawer>
  <ul>
    <li v-for="(item, i) in templates" :key="i" class="opacity-80 hover:opacity-100 cursor-pointer block py-[4px] ">
      <ItemTemplate :template="item" :edit="edit?.active" @on-action="value => onAction(value)" />
    </li>
  </ul>
</template>
