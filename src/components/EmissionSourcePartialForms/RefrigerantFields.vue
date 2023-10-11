<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Multiselect from '@vueform/multiselect'

const selectedFactorTypeId = ref(0)
const sourceTypeId = ref(0)
const classificationStore = useClassificationStore()
const basicStorage = useBasicStore()

const { t } = useI18n()

const {
  optionsRefrigerantSourceList,
  optionsRefrigerantDisposalList,
  optionsRefrigerantMaintenanceAndRepairList,
  optionsRefrigerantCapacityUnitList,
} = storeToRefs(basicStorage)

const {
  optionFactorTypes,
  optionsFilteredEmissionFactors,
  optionSourceTypes,
} = storeToRefs(classificationStore)

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
  <div>
    <div class="mb-5">
      <FormKit
        :label="t('equipment.code')"
        outer-class="w-full"
        inner-class="max-w-xl"
        type="text"
        placeholder="..."
        name="electricity_supplier"
      />
    </div>
    <div class="pb-5">
      <FormKit
        v-model="sourceTypeId"
        :label="t('equipment.source_type')"
        type="select"
        placeholder="..."
        :options="optionSourceTypes"
        name="source_type"
      />
    </div>
    <div class="mb-5">
      <label for="multiselect" class="mb-5">{{ t('equipment.type') }}</label>
      <Multiselect
        mode="tags"
        :close-on-select="true"
        :searchable="true"
        :create-option="true"
        :options="optionsRefrigerantSourceList"
        :max="1"
      />
    </div>
    <!-- Emission factor select -->
    <div class="flex gap-4 pb-5">
      <FormKit
        v-model="selectedFactorTypeId"
        :label="t('equipment.factor_type')"
        outer-class="w-full"
        type="select"
        placeholder="..."
        name="factor_type"
        :options="optionFactorTypes"
        @onchange="filterEmissionFactors"
      />
      <FormKit
        :label="t('equipment.refrigerant_type')"
        outer-class="w-full"
        type="select"
        placeholder="..."
        name="emission_factor"
        :options="optionsFilteredEmissionFactors"
      />
    </div>
    <!-- End Emission Factor select -->
    <div class="mb-5 flex gap-4">
      <FormKit
        type="number"
        :label="t('equipment.refrigerant_capacity_label')"
        number
        name="efficiency"
      />

      <FormKit
        :label="t('equipment.efficiency_unit_label')"
        type="select"
        :options="optionsRefrigerantCapacityUnitList"
        placeholder="..."
        name="efficiency_unit"
      />
    </div>
    <div class="mb-5">
      <FormKit
        type="radio"
        :label="t('equipment.refrigerant_leaks_label')"
        :options="{ yes: t('yes'), no: t('no') }"
        fieldset-class="$remove:max-w-md"
        name="refrigerant_leaks"
        :classes="{
          fieldset: 'max-w-full',
        }
        "
      />
    </div>
    <div class="mb-5">
      <FormKit
        type="radio"
        :label="t('equipment.refrigerant_convert_label')"
        :options="{ yes: t('yes'), no: t('no') }"
        fieldset-class="$remove:max-w-md"
        name="refrigerant_convert"
        :classes="{
          fieldset: 'max-w-full',
        }
        "
      />
    </div>
    <div class="mb-5 flex w-full gap-5">
      <FormKit
        type="checkbox"
        :label="t('equipment.fuel_storage_label')"
        :options="optionsRefrigerantDisposalList"
        name="fuel_storage"
        outer-class="flex-1"
        fieldset-class="p-3"
      />

      <FormKit
        type="checkbox"
        :label="t('equipment.fuel_storage_management_label')"
        :options="optionsRefrigerantMaintenanceAndRepairList"
        outer-class="flex-1"
        fieldset-class="p-3"
        name="fuel_storage_management"
      />
    </div>
    <div class="mb-5">
      <FormKit
        :label="t('equipment.description')"
        type="textarea"
        placeholder="..."
        name="description"
        :help="t('equipment.description_help')"
      />
    </div>
  </div>
</template>
