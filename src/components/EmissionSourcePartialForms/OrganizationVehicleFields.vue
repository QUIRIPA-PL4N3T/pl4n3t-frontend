<script setup lang="ts">
import { storeToRefs } from 'pinia'

// Stores
const basicStore = useBasicStore()
const emissionSourceStore = useEmissionSourceStore()
const classificationStore = useClassificationStore()
const selectedFactorTypeId = ref(0)

// Set default source type to mobile: 1 Fixed, 2 Mobile vehicles always mobile
const SOURCE_TYPE_DEFAULT = 2

const { t } = useI18n()

const { currentEmissionSource } = storeToRefs(emissionSourceStore)
// Store to ref
const {
  optionsVehicleTypeList,
  optionsVehicleLoadList,
  optionsVehicleEfficiencyUnitList,
} = storeToRefs(basicStore)

const {
  optionFactorTypes,
  optionsFilteredEmissionFactors,
} = storeToRefs(classificationStore)

function filterEmissionFactors() {
  classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value)
}

watch(() => selectedFactorTypeId.value, () => {
  classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value, SOURCE_TYPE_DEFAULT)
})
</script>

<template>
  <div class="flex flex-col md:grid md:grid-cols-4 md:gap-4">
    <FormKit
      :label="t('emissionSource.vehicle_code')"
      outer-class="w-full"
      inner-class="max-w-xl"
      validation="required"
      type="text"
      name="code"
    />
    <FormKit
      :label="t('emissionSource.vehicle_name')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="text"
      name="name"
    />
    <FormKit
      type="hidden"
      number
      :value="SOURCE_TYPE_DEFAULT"
      name="source_type"
    />
    <FormKit
      :label="t('emissionSource.vehicle_type')"
      type="select"
      outer-class="md:col-start-1"
      :options="optionsVehicleTypeList"
      name="vehicle_type"
    />
    <FormKit
      :label="t('emissionSource.vehicle_load_type')"
      type="select"
      :options="optionsVehicleLoadList"
      name="vehicle_load"
    />
    <FormKit
      type="number"
      :label="`${t('emissionSource.vehicle_capacity')} ${currentEmissionSource.vehicle_load || ''}`"
      number
      name="vehicle_capacity"
    />
    <div class="grid grid-cols-subgrid gap-4 col-span-4 bg-neutral-100 p-4 rounded mb-5">
      <FormKit
        v-model="selectedFactorTypeId"
        :label="t('emissionSource.vehicle_fuel')"
        outer-class="md:col-span-1"
        type="select"
        name="factor_type"
        :options="optionFactorTypes"
        validation="required"
        @onchange="filterEmissionFactors"
      />
      <FormKit
        :label="t('emissionSource.vehicle_fuel')"
        outer-class="md:col-span-2"
        type="select"
        validation="required"
        name="emission_factor"
        :options="optionsFilteredEmissionFactors"
      />
    </div>
    <FormKit
      type="number"
      :label="t('emissionSource.vehicle_efficiency')"
      step="any"
      number="float"
      name="vehicle_efficiency"
    />
    <FormKit
      :label="t('emissionSource.vehicle_efficiency_unit')"
      type="select"
      :options="optionsVehicleEfficiencyUnitList"
      name="vehicle_efficiency_unit"
    />
    <FormKit
      :label="t('emissionSource.description')"
      outer-class="md:col-start-1 md:col-span-4"
      type="textarea"
      name="description"
      :help="t('emissionSource.description_help')"
    />
  </div>
</template>
