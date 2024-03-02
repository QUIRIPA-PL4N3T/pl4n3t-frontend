<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const companyStore = useCompanyStore()
const emissionSourceStore = useEmissionSourceStore()
const { optionsLocations } = storeToRefs(companyStore)
const { environLocation } = storeToRefs(emissionSourceStore)

watch(() => environLocation.value, () => {
  emissionSourceStore.fetchEmissionSourcesByLocation(environLocation.value)
})
</script>

<template>
  <div class="bg-white dark:bg-slate-800 px-3 rounded">
    <FormKit
      v-model="environLocation"
      type="select"
      input-class="text-sm $remove:pr-8"
      select-icon-class="$remove:mr-2"
      wrapper-class="dark:bg-white"
      :options="optionsLocations"
    />
  </div>
</template>
