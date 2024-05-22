<script setup lang="ts">
import { storeToRefs } from 'pinia'

const selectedFactorTypeId = ref(0)
const sourceTypeId = ref(0)
const classificationStore = useClassificationStore()
const basicStorage = useBasicStore()
const emissionSourceStore = useEmissionSourceStore()

const { t } = useI18n()

const {
  optionsFuelStorageManagementList,
  optionsFuelStorageList,
  optionDurationList,
  optionYesNo,
  optionUnitOfMeasure,
} = storeToRefs(basicStorage)

const {
  optionFactorTypes,
  optionsFilteredEmissionFactors,
  optionSourceTypes,
} = storeToRefs(classificationStore)
const { currentEmissionSource } = storeToRefs(emissionSourceStore)

function filterEmissionFactors() {
  classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value)
}

watch(() => selectedFactorTypeId.value, () => {
  classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value, sourceTypeId.value)
})
</script>

<template>
  <div class="flex flex-col md:grid md:grid-cols-4 md:gap-4">
    <FormKit
      :label="t('emissionSource.code')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="text"
      name="code"
    />
    <FormKit
      :label="t('emissionSource.investment.name')"
      outer-class="w-full md:col-span-2"
      type="text"
      name="name"
    />
    <InvestmentSearch
      v-model="currentEmissionSource.investment_type"
      :label="t('emissionSource.investment_type_label')"
      classes="md:col-start-1 col-span-2"
    />
    <FormKit
      type="number"
      :label="t('emissionSource.shelf_life_label')"
      outer-class="w-full md:col-start-1"
      number
      name="service_life"
    />
    <FormKit
      :label="t('emissionSource.shelf_life_unit_label')"
      type="select"
      :options="optionDurationList"
      name="service_life_unit"
    />
    <FormKit
      v-model="sourceTypeId"
      :label="t('emissionSource.source_type')"
      outer-class="md:col-start-4"
      type="select"
      placeholder=""
      :options="optionSourceTypes"
      name="source_type"
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
        :label="t('emissionSource.emission_factor')"
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
    <CheckBoxMultiple
      v-model=" currentEmissionSource.fuel_store"
      :label="t('emissionSource.fuel_storage_label')"
      :options="optionsFuelStorageList"
      outer-class="md:col-span-2"
      name="fuel_store"
    />
    <CheckBoxMultiple
      v-model="currentEmissionSource.fuel_management"
      :label="t('emissionSource.fuel_storage_management_label')"
      outer-class="md:col-span-2"
      :options="optionsFuelStorageManagementList"
      name="fuel_management"
    />
    <FormKit
      type="radio"
      :label="t('emissionSource.vapor_generation_question')"
      :options="optionYesNo"
      name="exist_steam_specific_factor"
      outer-class="md:col-span-4"
      fieldset-class="$remove:max-w-md"
      :classes="{
        fieldset: 'w-full',
      }
      "
    />
    <FormKit
      type="number"
      :label="t('emissionSource.efficiency_label')"
      outer-class="md:col-start-1 md:col-span-2"
      number="float"
      step="any"
      name="vehicle_efficiency"
    />
    <FormKit
      :label="t('emissionSource.efficiency_unit_label')"
      type="text"
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
