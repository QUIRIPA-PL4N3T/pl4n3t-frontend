<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useClassificationStore } from '~/stores/classification'

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
  <div class="rounded px-3 py-2 bg-white  dark:bg-slate-800">
    <FormKit
      v-model="selectedEnvironment"
      type="select"
      input-class="text-sm $remove:pr-8"
      select-icon-class="$remove:mr-2"
      wrapper-class="dark:bg-white"
      :options="optionsQuantificationTypes"
    />
  </div>
</template>
