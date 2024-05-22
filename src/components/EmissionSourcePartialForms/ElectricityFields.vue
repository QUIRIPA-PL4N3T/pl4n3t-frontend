<script setup lang="ts">
import { storeToRefs } from 'pinia'

const selectedFactorTypeId = ref(0)
const sourceTypeId = ref(0)
const classificationStore = useClassificationStore()
const basicStorage = useBasicStore()
const emissionSourceStore = useEmissionSourceStore()

const { t } = useI18n()

const {
  optionsElectricitySourceList,
  optionUnitOfMeasure,
  optionYesNo,
} = storeToRefs(basicStorage)

const {
  optionFactorTypes,
  optionsFilteredEmissionFactors,
  optionSourceTypes,
} = storeToRefs(classificationStore)

const { currentEmissionSource } = storeToRefs(emissionSourceStore)

function load() {
  if (optionFactorTypes.value.length === 1) {
    selectedFactorTypeId.value = optionFactorTypes.value[0].value
    filterEmissionFactors()
  }
}

function filterEmissionFactors() {
  classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value, sourceTypeId.value)
}

watch(() => selectedFactorTypeId.value, () => {
  filterEmissionFactors()
})

watch(() => optionFactorTypes.value, () => {
  load()
})

watch(() => sourceTypeId.value, () => {
  filterEmissionFactors()
})

load()
</script>

<template>
  <div class="flex flex-row md:grid md:grid-cols-4 md:gap-4">
    <FormKit
      :label="t('emissionSource.electricity_supplier_label')"
      outer-class="md:col-span-2"
      inner-class="max-w-xl"
      type="text"
      name="electricity_supplier"
      required
      :help="t('emissionSource.electricity_supplier_help')"
    />
    <FormKit
      v-model="sourceTypeId"
      :label="t('emissionSource.source_type')"
      outer-class="md:col-span-2"
      type="select"
      :options="optionSourceTypes"
      name="source_type"
      :help="t('emissionSource.source_type_help')"
    />
    <!-- Enable or disable electricity_source field -->
    <FormKit
      type="radio"
      outer-class="md:col-start-1 md:col-span-2"
      :label="t('emissionSource.know_electricity_source')"
      :options="optionYesNo"
      :help="t('emissionSource.know_electricity_source_help')"
      fieldset-class="$remove:max-w-md pt-2"
      name="know_type_electricity_generation_source"
      :classes="{
        fieldset: 'max-w-full',
      }
      "
    />
    <FormKit
      :disabled="!currentEmissionSource.know_type_electricity_generation_source"
      outer-class="md:col-span-2"
      :label="t('emissionSource.electricity_source_label')"
      type="select"
      :options="optionsElectricitySourceList"
      name="electricity_source"
    />
    <div class="grid grid-cols-subgrid gap-4 col-span-4 bg-neutral-100 p-4 rounded mb-5">
      <FormKit
        v-model="selectedFactorTypeId"
        :label="t('emissionSource.factor_type')"
        outer-class="md:col-span-1"
        type="select"
        name="factor_type"
        :options="optionFactorTypes"
        validation="required"
        @onchange="filterEmissionFactors"
      />
      <FormKit
        :label="t('emissionSource.electricity_type')"
        outer-class="md:col-span-2"
        type="select"
        validation="required"
        name="emission_factor"
        :options="optionsFilteredEmissionFactors"
      />
      <FormKit
        :label="t('emissionSource.unit')"
        outer-class="md:col-span-1"
        type="select"
        validation="required"
        name="emission_factor_unit"
        :options="optionUnitOfMeasure"
      />
    </div>
    <!-- Enable or disable electricity_efficiency and units field -->
    <FormKit
      type="radio"
      :label="t('emissionSource.electricity_generation_question')"
      outer-class="md:col-span-4"
      name="exist_steam_specific_factor"
      :options="optionYesNo"
      fieldset-class="$remove:max-w-md pt-2"
      :classes="{
        fieldset: 'max-w-full',
      }
      "
    />
    <FormKit
      :disabled="!currentEmissionSource.exist_steam_specific_factor"
      type="number"
      outer-class="w-full"
      :label="t('emissionSource.specific_factor_label')"
      :help="t('emissionSource.efficiency_help')"
      value="0"
      step="any"
      name="electricity_efficiency"
    />
    <FormKit
      :disabled="!currentEmissionSource.exist_steam_specific_factor"
      outer-class="w-full"
      :label="t('emissionSource.specific_factor_unit_label')"
      type="text"
      name="electricity_efficiency_unit"
    />
    <FormKit
      :label="t('emissionSource.description')"
      type="textarea"
      outer-class="md:col-span-4"
      :help="t('emissionSource.description_help')"
      name="description"
    />
  </div>
</template>
