<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'confirm', confirm: boolean): void
}>()

const { t } = useI18n()
const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)
const deleteAccount = $ref<any>(null)

function confirm(value: boolean = false) {
  emit('confirm', value)
  deleteAccount.closeModal()
}
</script>

<template>
  <Modal
    ref="deleteAccount"
    :title="t('profile.button_delete')"
    :label="t('profile.button_delete')"
    label-class="btn-outline-danger btn-sm mt-2"
    centered
  >
    <h3 class="text-red-500 text-xl my-2">
      {{ t('profile.titles.delete_title') }}
    </h3>
    <h4 class="text-gray-500 text-sm">
      {{ t('profile.titles.delete_subtitle') }} <span class="font-bold">{{ company.name }}</span>
    </h4>
    <div class="text-base text-slate-600 dark:text-slate-300 mt-4">
      {{ t('profile.titles.delete_summary') }}
    </div>
    <template #footer>
      <Button
        :text="t"
        btn-class="btn-dark "
        @click="confirm()"
      >
        {{ t('profile.button_cancel') }}
      </Button>
      <Button
        btn-class="btn-danger "
        @click="confirm(true)"
      >
        {{ t('profile.titles.delete_title') }}
      </Button>
    </template>
  </Modal>
</template>
