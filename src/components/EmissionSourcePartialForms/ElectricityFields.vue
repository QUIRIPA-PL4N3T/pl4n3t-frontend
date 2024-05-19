<script setup lang="ts">
import { storeToRefs } from 'pinia'

const selectedFactorTypeId = ref(0)
const sourceTypeId = ref(0)
const knowElectricitySource = ref('yes')
const existElectricityGenerationFactor = ref('no')
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
  <div>
    <div class="mb-5">
      <FormKit
        :label="t('emissionSource.electricity_supplier_label')"
        outer-class="w-full"
        inner-class="max-w-xl"
        type="text"
        placeholder="..."
        name="electricity_supplier"
        required
        :help="t('emissionSource.electricity_supplier_help')"
      />
    </div>
    <div class="pb-5">
      <FormKit
        v-model="sourceTypeId"
        :label="t('emissionSource.source_type')"
        type="select"
        placeholder="..."
        :options="optionSourceTypes"
        name="source_type"
        :help="t('emissionSource.source_type_help')"
      />
    </div>
    <div class="mb-5">
      <!-- Enable or disable electricity_source field -->
      <FormKit
        v-model="knowElectricitySource"
        type="radio"
        :label="t('emissionSource.know_electricity_source')"
        :options="{ yes: t('yes'), no: t('no') }"
        :help="t('emissionSource.know_electricity_source_help')"
        fieldset-class="$remove:max-w-md pt-2"
        :classes="{
          fieldset: 'max-w-full',
        }
        "
      />
    </div>
    <div class="pb-5">
      <FormKit
        v-model="sourceTypeId"
        :disabled="knowElectricitySource !== 'yes'"
        :label="t('emissionSource.electricity_source_label')"
        type="select"
        placeholder="..."
        :options="knowElectricitySource === 'yes' ? optionsElectricitySourceList : []"
        name="electricity_source"
      />
    </div>
    <!-- Emission factor select -->
    <div class="flex gap-4 pb-5">
      <FormKit
        v-model="selectedFactorTypeId"
        :label="t('emissionSource.factor_type')"
        outer-class="w-full"
        type="select"
        placeholder="..."
        name="factor_type"
        :options="optionFactorTypes"
        @onchange="filterEmissionFactors"
      />
      <FormKit
        :label="t('emissionSource.electricity_type')"
        outer-class="w-full"
        type="select"
        placeholder="..."
        name="emission_factor"
        :options="optionsFilteredEmissionFactors"
      />
    </div>
    <!-- End Emission Factor select -->
    <div class="mb-5">
      <!-- Enable or disable electricity_efficiency and units field -->
      <FormKit
        v-model="existElectricityGenerationFactor"
        type="radio"
        :label="t('emissionSource.electricity_generation_question')"
        :options="{ yes: t('yes'), no: t('no') }"
        fieldset-class="$remove:max-w-md pt-2"
        :classes="{
          fieldset: 'max-w-full',
        }
        "
      />
    </div>
    <div class="flex gap-4 mb-5">
      <FormKit
        :disabled="existElectricityGenerationFactor === 'no'"
        type="number"
        outer-class="w-full"
        :label="t('emissionSource.specific_factor_label')"
        :help="t('emissionSource.efficiency_help')"
        value="0"
        name="electricity_efficiency"
      />

      <FormKit
        :disabled="existElectricityGenerationFactor === 'no'"
        outer-class="w-full"
        :label="t('emissionSource.specific_factor_unit_label')"
        type="text"
        placeholder="..."
        name="electricity_efficiency_unit"
      />
    </div>
    <div class="mb-5">
      <FormKit
        :label="t('emissionSource.description')"
        type="textarea"
        placeholder="..."
        :help="t('emissionSource.description_help')"
        name="description"
      />
    </div>
  </div>
</template>
