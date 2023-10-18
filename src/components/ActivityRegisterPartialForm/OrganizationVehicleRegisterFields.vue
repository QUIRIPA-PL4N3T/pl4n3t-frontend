<script setup lang="ts">
import { storeToRefs } from 'pinia'

// Stores
const basicStore = useBasicStore()
const emissionSourceStore = useEmissionSourceStore()
const classificationStore = useClassificationStore()
const selectedFactorTypeId = ref(0)

const { t } = useI18n()

const disabledSourceType = ref<boolean>(false)

const { currentEquipment } = storeToRefs(emissionSourceStore)
// Store to ref
const {
  optionsVehicleTypeList,
  optionsVehicleLoadList,
  optionsVehicleEfficiencyUnitList,
} = storeToRefs(basicStore)

const {
  optionFactorTypes,
  optionsFilteredEmissionFactors,
  optionSourceTypes,
} = storeToRefs(classificationStore)

function filterEmissionFactors() {
  classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value)
}

function emissionFactorLabel(): string {
  return t('equipment.vehicle_fuel')
}

function emissionFactorTypeLabel(): string {
  return t('equipment.vehicle_fuel_type')
}
</script>

<template>
  <div>
    <FormKit
      :label="t('equipment.code')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="text"
      placeholder="..."
      name="code"
    />
    <FormKit
      :label="t('equipment.name')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="text"
      placeholder="..."
      name="name"
    />
  </div>
  <div class="pb-5">
    <FormKit
      :disabled="disabledSourceType"
      :label="t('equipment.source_type')"
      type="select"
      placeholder="..."
      :options="optionSourceTypes"
      name="source_type"
    />
  </div>
  <div
    class="grid grid-cols-1 md:grid-cols-2 gap-x-4"
  >
    <div class="pb-5">
      <FormKit
        :label="t('equipment.vehicle_type')"
        type="select"
        placeholder="..."
        :options="optionsVehicleTypeList"
        name="vehicle_type"
      />
    </div>
    <div class="pb-5">
      <FormKit
        :label="t('equipment.vehicle_load_type')"
        type="select"
        placeholder="..."
        :options="optionsVehicleLoadList"
        name="vehicle_load"
      />
    </div>
    <div class="pb-5 col-span-2">
      <FormKit
        type="number"
        :label="`${t('equipment.vehicle_capacity')} ${currentEquipment.vehicle_load || ''}`"
        number
        name="vehicle_capacity"
      />
    </div>
    <div class="pb-5">
      <FormKit
        type="number"
        :label="t('equipment.vehicle_efficiency')"
        number
        name="vehicle_efficiency"
      />
    </div>
    <div class="pb-5">
      <FormKit
        :label="t('equipment.vehicle_efficiency_unit')"
        type="select"
        placeholder="..."
        :options="optionsVehicleEfficiencyUnitList"
        name="vehicle_efficiency_unit"
      />
    </div>
  </div>
  <!-- Emission factor select -->
  <div class="flex gap-4 pb-5">
    <FormKit
      v-model="selectedFactorTypeId"
      :label="emissionFactorTypeLabel()"
      outer-class="w-full"
      type="select"
      placeholder="..."
      name="factor_type"
      :options="optionFactorTypes"
      @onchange="filterEmissionFactors"
    />
    <FormKit
      :label="emissionFactorLabel()"
      outer-class="w-full"
      type="select"
      placeholder="..."
      name="emission_factor"
      :options="optionsFilteredEmissionFactors"
    />
  </div>
  <!-- End Emission Factor select -->
  <div class="mb-5">
    <FormKit
      :label="t('equipment.description')"
      type="textarea"
      placeholder="..."
      name="description"
    />
  </div>
</template>
