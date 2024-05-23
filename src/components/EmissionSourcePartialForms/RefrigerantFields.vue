<script setup lang="ts">
import { storeToRefs } from 'pinia'

const selectedFactorTypeId = ref(0)
const sourceTypeId = ref(0)
const classificationStore = useClassificationStore()
const basicStorage = useBasicStore()
const emissionSourceStore = useEmissionSourceStore()
const { t } = useI18n()
const selectedGroupId = inject('selectedGroupId')

const {
  optionsRefrigerantDisposalList,
  optionsRefrigerantMaintenanceAndRepairList,
  optionsRefrigerantCapacityUnitList,
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

watch(() => optionFactorTypes.value, () => {
  if (optionFactorTypes.value.length === 1)
    selectedFactorTypeId.value = optionFactorTypes.value[0]
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
    />
    <EquipmentSearch
      v-model="currentEmissionSource.equipment_name"
      :label="t('emissionSource.type')"
      :group="Number(selectedGroupId)"
      classes="md:col-start-1 md:col-span-3"
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
        :label="t('emissionSource.refrigerant_type')"
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
    <FormKit
      type="number"
      :label="t('emissionSource.refrigerant_capacity_label')"
      outer-class="md:col-span-2"
      number
      step="any"
      name="refrigerant_capacity"
    />
    <FormKit
      :label="t('emissionSource.efficiency_unit_label')"
      type="select"
      :options="optionsRefrigerantCapacityUnitList"
      name="refrigerant_capacity_unit"
    />
    <FormKit
      type="radio"
      :label="t('emissionSource.refrigerant_leaks_label')"
      :options="optionYesNo"
      outer-class="md:col-span-4"
      name="has_refrigerant_leaks"
      :classes="{
        fieldset: 'max-w-full',
      }
      "
    />
    <FormKit
      type="radio"
      :label="t('emissionSource.refrigerant_convert_label')"
      :options="optionYesNo"
      outer-class="md:col-span-4"
      fieldset-class="$remove:max-w-md"
      name="has_refrigerant_conversions"
      :classes="{
        fieldset: 'max-w-full',
      }
      "
    />
    <CheckBoxMultiple
      v-model="currentEmissionSource.final_disposal_of_refrigerants"
      :label="t('emissionSource.refrigerant_final_disposal')"
      :options="optionsRefrigerantDisposalList"
      name="final_disposal_of_refrigerants"
      outer-class="md:col-start-1 md:col-span-2"
    />
    <CheckBoxMultiple
      v-model="currentEmissionSource.support_actions_refrigerant_equipment"
      :label="t('emissionSource.maintenance_actions')"
      :options="optionsRefrigerantMaintenanceAndRepairList"
      outer-class="md:col-span-2"
      name="support_actions_refrigerant_equipment"
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
