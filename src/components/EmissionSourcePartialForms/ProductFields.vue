<script setup lang="ts">
import { storeToRefs } from 'pinia'

const selectedFactorTypeId = ref(0)
const sourceTypeId = ref(0)
const classificationStore = useClassificationStore()
const basicStorage = useBasicStore()
const emissionSourceStore = useEmissionSourceStore()
const productOperationRequirement = ref('')
const { t } = useI18n()

const DEFAULT_FUEL_OPTION = 'combustibles'

const {
  optionsFuelStorageManagementList,
  optionsFuelStorageList,
  optionDurationList,
  optionUnitOfMeasure,
  optionYesNo,
  optionUnitSoldPeriod,
  optionProductOperation,
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

const requiredFuel = computed(() => {
  if (productOperationRequirement.value)
    return productOperationRequirement.value.toLowerCase() === DEFAULT_FUEL_OPTION
  return false
})

onMounted(() => {
  if (optionProductOperation.value.length > 0)
    productOperationRequirement.value = optionProductOperation.value[0].value
})
</script>

<template>
  <div class="flex flex-col md:grid md:grid-cols-4 md:gap-4">
    <FormKit
      :label="t('emissionSource.code')"
      inner-class="max-w-xl"
      type="text"
      name="code"
    />
    <ProductSearch
      v-model="currentEmissionSource.product_name"
      name="product_name"
      :label="t('emissionSource.process_label')"
      classes="col-span-3"
    />
    <FormKit
      type="number"
      :label="t('emissionSource.shelf_life_label')"
      outer-class="md:col-start-1"
      name="service_life"
      number
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
      type="select"
      outer-class="md:col-start-1"
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
    <FormKit
      type="number"
      :label="t('emissionSource.unitsSold')"
      outer-class="md:col-start-1 md:col-span-2"
      number
      name="units_sold"
    />
    <FormKit
      type="select"
      :label="t('emissionSource.unitsSoldPeriod')"
      outer-class="md:col-span-2"
      name="units_sold_period"
      :options="optionUnitSoldPeriod"
    />
    <FormKit
      v-model="productOperationRequirement"
      type="select"
      :label="t('emissionSource.productOperationRequirements')"
      outer-class="md:col-span-2"
      name="product_operation_requirements"
      :options="optionProductOperation"
    />
    <CheckBoxMultiple
      v-if="requiredFuel"
      v-model=" currentEmissionSource.fuel_store"
      :label="t('emissionSource.fuel_storage_label')"
      :options="optionsFuelStorageList"
      outer-class="md:col-start-1 md:col-span-2"
      name="fuel_store"
    />
    <CheckBoxMultiple
      v-if="requiredFuel"
      v-model=" currentEmissionSource.fuel_management"
      type="checkbox"
      :label="t('emissionSource.fuel_storage_management_label')"
      outer-class="md:col-span-2"
      :options="optionsFuelStorageManagementList"
      name="fuel_management"
    />
    <FormKit
      type="radio"
      :label="t('emissionSource.vapor_generation_question')"
      :options="optionYesNo"
      outer-class="md:col-span-4"
      fieldset-class="$remove:max-w-md"
      name="exist_steam_specific_factor"
      :classes="{
        fieldset: 'max-w-full',
      }
      "
    />
    <FormKit
      type="number"
      :label="t('emissionSource.efficiency_label')"
      outer-class="md:col-start-1 md:col-span-2"
      number="float"
      step="any"
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
