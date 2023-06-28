<script setup lang="ts">
import { storeToRefs } from 'pinia'

const showTable = ref(false)

const emissionFactorStore = useEmissionFactorStore()
const { optionsMonths } = storeToRefs(emissionFactorStore)
const { t } = useI18n()

function submitForm() {

}
</script>

<template>
  <div class="w-full h-full bg-white p-4 mt-4">
    <h2 class="text-xl font-semibold mb-4">
      Formulario de Liquidación
    </h2>
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
  </div>

  <div class="mt-4 bg-white rounded">
    <EquipmentTable v-if="showTable" />
  </div>
</template>

  <route lang="yaml">
name: liquidation
meta:
  layout: sidebar
  requiresAuth: true
  </route>
