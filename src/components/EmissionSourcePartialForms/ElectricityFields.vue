<script setup lang="ts">
import { storeToRefs } from 'pinia'

const selectedFactorTypeId = ref(0)
const sourceTypeId = ref(0)
const classificationStore = useClassificationStore()
const basicStorage = useBasicStore()

const { t } = useI18n()

const {
  optionsElectricitySourceList,
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
        :label="t('equipment.electricity_supplier_label')"
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
    <div class="pb-5">
      <FormKit
        v-model="sourceTypeId"
        :label="t('equipment.electricity_source_label')"
        type="select"
        placeholder="..."
        :options="optionsElectricitySourceList"
        name="electricity_source"
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
        :label="t('equipment.electricity_type')"
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
        type="radio"
        :label="t('equipment.electricity_generation_question')"
        :options="{ yes: t('yes'), no: t('no') }"
        fieldset-class="$remove:max-w-md"
        :classes="{
          fieldset: 'max-w-full',
        }
        "
      />
    </div>
    <div class="mb-5">
      <FormKit
        type="number"
        :label="t('equipment.efficiency_label')"
        number
        name="efficiency"
      />
    </div>
    <div class="mb-5">
      <FormKit
        :label="t('equipment.efficiency_unit_label')"
        type="text"
        placeholder="..."
        name="efficiency_unit"
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
