<script setup lang="ts">
import { storeToRefs } from 'pinia'

const showTable = ref(false)

const emissionFactorStore = useEmissionFactorStore()
const { optionsMonths } = storeToRefs(emissionFactorStore)
const emissionSourceStore = useEmissionSourceStore()
const { currentGlobalLocationId } = storeToRefs(emissionSourceStore)
const { t } = useI18n()

function submitForm() {

}
</script>

<template>
  <div class="w-full h-full">
    <div class="lg:col-span-4 col-span-12 space-y-5">
      <Card
        v-if="currentGlobalLocationId"
        :title="t('liquidation.form')"
      >
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <Select
              :label="t('activities.modal.month')"
              :options="optionsMonths"
              type="text"
              placeholder="..."
              name="month"
              @change="showTable = false"
            />
          </div>

          <div class="flex justify-end mt-4">
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg"
              @click.prevent="showTable = true"
            >
              Liquidar
            </button>
          </div>
        </form>
      </Card>
      <NoLocationSelected v-else />
    </div>
  </div>

  <div class="mt-4 bg-white rounded">
    <EmissionSourcesTable v-if="showTable" />
  </div>
</template>

  <route lang="yaml">
name: liquidations
meta:
  layout: sidebar
  requiresAuth: true
  </route>
