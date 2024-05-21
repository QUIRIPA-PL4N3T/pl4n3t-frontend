<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)
</script>

<template>
  <Modal
    ref="deleteAccount"
    title="Vertically center"
    label="Vertically center"
    label-class="btn-outline-danger"
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
        :text="t('profile.button_cancel')"
        btn-class="btn-dark "
        @click="$refs.deleteAccount.closeModal()"
      />
      <Button
        :text="t('profile.titles.delete_title')"
        btn-class="btn-danger "
        @click="$refs.deleteAccount.closeModal()"
      />
    </template>
  </Modal>
</template>
