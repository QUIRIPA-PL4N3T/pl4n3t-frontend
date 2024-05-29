<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import BasicLoader from '../Loader/BasicLoader.vue'
import ItemTemplate from './ItemTemplate.vue'
import { type ActionEmits, DEFAULT_REPORT_DETAIL } from '~/api/modelsDefaults'
import type { CompanyTemplateList, ReportTemplateList } from '~/api-client/models'

interface Edit {
  active: boolean
  route: string
}

const { templates = [], edit, branch = false } = defineProps<{
  templates: ReportTemplateList[] | CompanyTemplateList[]
  edit?: Edit
  branch?: boolean
}>()

const { t } = useI18n()

const reportsStore = useReportsStore()
const companyStore = useCompanyStore()
const { templateCompany } = storeToRefs(reportsStore)
const { company } = storeToRefs(companyStore)

const confirmModal = ref<any>(null)
let templateReferenceBranch = $ref<number>(0)
let processingBranch = $ref<boolean>(false)
let preview = $ref<boolean>(false)
let previewTemplate = $ref<CompanyTemplateList | ReportTemplateList>(DEFAULT_REPORT_DETAIL)
let deleteTemplate = $ref<number>(0)

const toast = useToast()

const router = useRouter()

function toggleDrawer() {
  preview = !preview
}

function closeModal() {
  if (confirmModal.value)
    confirmModal.value.closeModal()
}

function onAction(value: ActionEmits<CompanyTemplateList | ReportTemplateList>) {
  switch (value.action) {
    case 'edit':
      router.push({
        name: 'template',
        params: {
          id: value.value.id,
        },
      })
      break
    case 'preview':
      previewTemplate = value.value
      toggleDrawer()
      break
    case 'delete':
      confirmModal.value.openModal()
      deleteTemplate = value.value.id
      break
    case 'branch':
      confirmModal.value.openModal()
      templateReferenceBranch = value.value.id
      break
    default:
      break
  }
}

function deleteTemplateCompany() {
  reportsStore.deleteCompanyTemplate(deleteTemplate).then(() => {
    confirmModal.value.closeModal()
    toast.success(t('reports.delete_success'))
  }).catch(() => {
    toast.error(t('reports.delete_error'))
  })
}
function generateBranchTemplate() {
  processingBranch = true
  reportsStore.generateBranchTemplate(templateReferenceBranch, company.value.id).then(() => {
    processingBranch = false
    router.push({
      name: 'template',
      params: {
        id: templateCompany.value.id,
      },
    })
  }).catch(() => {
    processingBranch = false
    toast.error(t('reports.branch_error'))
  })
}
</script>

<template>
  <div>
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
        <ReportManager :template-prop="previewTemplate" />
      </template>
    </Drawer>
    <Modal
      ref="confirmModal"
      :title="deleteTemplate ? t('reports.delete_title') : t('reports.branch_title')"
      :label="t('branch')"
      label-class="hidden"
    >
      <div v-if="processingBranch" class="w-full flex flex-wrap">
        <BasicLoader />
      </div>
      <div v-else class="text-base text-slate-600 dark:text-slate-300">
        {{ deleteTemplate ? t('reports.delete_message') : t('reports.branch_message') }}
      </div>
      <template #footer>
        <Button
          :text="t('cancel')"
          btn-class="btn-dark"
          @click="closeModal"
        />
        <Button
          :text="t('Accept')"
          btn-class="btn-danger"
          @click="deleteTemplate ? deleteTemplateCompany() : generateBranchTemplate()"
        />
      </template>
    </Modal>
    <ul>
      <li v-for="(item, i) in templates" :key="i" class="opacity-80 hover:opacity-100 cursor-pointer block py-[4px] ">
        <ItemTemplate :template="item" :branch="company ? branch : false" :edit="edit?.active" @on-action="value => onAction(value)" />
      </li>
    </ul>
  </div>
</template>
