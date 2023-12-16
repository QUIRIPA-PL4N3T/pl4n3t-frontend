<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const companyStore = useCompanyStore()
const emissionSourceStore = useEmissionSourceStore()
const { optionsLocations } = storeToRefs(companyStore)
const { environLocation } = storeToRefs(emissionSourceStore)

watch(() => environLocation.value, () => {
  emissionSourceStore.fetchEmissionSourcesByLocation(environLocation.value)
})
</script>

<template>
  <div class="bg-white px-2 rounded">
    <FormKit
      v-model="environLocation"
      type="select"
      :label="`${t('general.location')}:`"
      :options="optionsLocations"
    />
  </div>
</template>
