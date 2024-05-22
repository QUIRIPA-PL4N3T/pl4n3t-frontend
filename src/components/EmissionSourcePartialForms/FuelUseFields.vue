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
  optionUnitOfMeasure,
  optionYesNo,
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
      v-model="sourceTypeId"
      :label="t('emissionSource.source_type')"
      type="select"
      :options="optionSourceTypes"
      name="source_type"
      validation="required"
    />
    <ActivitySearch
      v-model="currentEmissionSource.activity_name"
      name="activity_name"
      :label="t('emissionSource.process_label')"
      classes="md:col-start-1 col-span-2"
    />
    <EquipmentSearch
      v-model="currentEmissionSource.equipment_name"
      name="equipment_name"
      classes="col-span-2"
      :label="t('emissionSource.type')"
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
      outer-class="md:col-span-4"
      :options="optionYesNo"
      name="exist_steam_specific_factor"
      fieldset-class="$remove:max-w-md"
      :classes="{
        fieldset: 'max-w-full',
      }
      "
    />
    <FormKit
      type="number"
      :label="t('emissionSource.efficiency_label')"
      outer-class="md:col-span-3"
      step="any"
      number
      name="energy_efficiency_value"
    />
    <FormKit
      :label="t('emissionSource.efficiency_unit_label')"
      type="text"
      name="energy_efficiency_unit"
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
