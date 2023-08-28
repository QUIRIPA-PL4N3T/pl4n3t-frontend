<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useClassificationStore } from '~/store/classification'

const { t } = useI18n()
const selectedEnvironment = ref(null)
const classificationStore = useClassificationStore()
const { optionsQuantificationTypes, quantificationTypes } = storeToRefs(classificationStore)

watch(selectedEnvironment, (newVal) => {
  const environment = quantificationTypes.value.find(env => env.id === newVal!)
  if (environment)
    classificationStore.setEnvironment(environment!)
})
</script>

<template>
  <div class="bg-white px-2 rounded">
    <FormKit
      v-model="selectedEnvironment"
      type="select"
      :label="t('general.manage')"
      :options="optionsQuantificationTypes"
    />
  </div>
</template>
