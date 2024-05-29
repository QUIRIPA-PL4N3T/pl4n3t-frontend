<script setup lang="ts">
import { storeToRefs } from 'pinia'

const reportsStore = useReportsStore()
const { templateCompany } = storeToRefs(reportsStore)
const router = useRouter()
type Timer = ReturnType<typeof setTimeout>
const id = Number(router.currentRoute.value.params?.id)
const { t } = useI18n()

let loading = $ref<boolean>(true)
let saving = $ref<'saving' | 'complete' | 'time'>('time')
let time = $ref<Date>(new Date())
let tick = $ref<number>(0)
let timeout = $ref<Timer>()

reportsStore.getCompanyTemplate(id).then(() => {
  loading = false
}).catch(() => {
  loading = false
})

function saveChange() {
  saving = 'saving'
  reportsStore.updateCompanyTemplate(templateCompany.value.id, templateCompany.value).then(() => {
    saving = 'complete'
    time = new Date()
    setTimeout(() => {
      saving = 'time'
    }, 5000)
  }).catch(() => {
    loading = false
  })
}

function preSave(val: string) {
  templateCompany.value.introduction = val
  if (saving === 'time') {
    tick++
    saveChange()
  }
  else if ((saving === 'saving' || saving === 'complete') && (tick === 0)) {
    tick++
    timeout = setTimeout(() => {
      tick = 0
      saveChange()
      clearTimeout(timeout)
    }, 5000)
  }
}

watch(() => templateCompany.value, (newVal) => {
  if (templateCompany.value !== newVal)
    preSave(templateCompany.value.introduction)
})
</script>

<template>
  <div class="fw-full lex flex-wrap space-y-2">
    <Card>
      <SkeletonForm v-if="loading" />
      <FormKit
        v-else
        id="update_template_company"
        type="form"
        :actions="false"
        outer-class="p-4"
        :incomplete-message="false"
        @submit="saveChange"
      >
        <TemplateForm />
        <Button
          type="submit" btn-class="btn-dark" class="w-full mt-4"
        >
          {{ t('update') }}
        </Button>
      </FormKit>
    </Card>
    <Card v-if="templateCompany.introduction" class-name="overflow-auto">
      <Editor
        :content="templateCompany.introduction"
        :saving="{
          type: saving,
          time: time.toDateString(),
        }"
        @on-change="(val) => preSave(val)"
      />
    </Card>
  </div>
</template>

<route lang="yaml">
    path: '/template/:id'
    name: template
    meta:
      layout: simple
      requiresAuth: true
</route>
