<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const companyStore = useCompanyStore()
const { optionsLocations } = storeToRefs(companyStore)
const selectedLocation = $ref(null)
</script>

<template>
  <div class="bg-white px-2 rounded">
    <FormKit
      v-model="selectedLocation"
      type="select"
      :label="`${t('general.location')}:`"
      :options="optionsLocations"
    />
  </div>
</template>
