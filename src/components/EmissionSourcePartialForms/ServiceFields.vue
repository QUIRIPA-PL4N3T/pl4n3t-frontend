<script setup lang="ts">
import { storeToRefs } from 'pinia'

const goodAndServiceSelected = ref('')
const selectedFactorTypeId = ref(0)
const sourceTypeId = ref(0)
const classificationStore = useClassificationStore()
const basicStorage = useBasicStore()
const emissionSourceStore = useEmissionSourceStore()

const { t } = useI18n()

const {
  optionsGoodsAndServiceOriginList,
  optionsServiceAcquiredList,
  optionsGoodsAcquiredList,
  optionsGoodsAndServiceList,
  optionSupplierActionImplementationList,
  optionUnitOfMeasure,
  optionYesNo,
} = storeToRefs(basicStorage)

const {
  optionFactorTypes,
  optionsFilteredEmissionFactors,
  // optionSourceTypes,
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
  <div class="flex flex-col md:grid md:grid-cols-4 gap-4">
    <FormKit
      v-model="goodAndServiceSelected"
      :label="t('emissionSource.goodAndServiceType')"
      type="select"
      :options="optionsGoodsAndServiceList"
      name="good_and_service_acquired_type"
    />

    <FormKit
      v-if="goodAndServiceSelected === 'Servicios'"
      :label="t('emissionSource.service_label')"
      type="select"
      :options="optionsServiceAcquiredList"
      name="acquired_service"
    />
    <FormKit
      v-else-if="goodAndServiceSelected === 'Bienes'"
      :label="t('emissionSource.goods_label')"
      type="select"
      :options="optionsGoodsAcquiredList"
      name="acquired_service"
    />
    <FormKit
      :label="t('emissionSource.supplier_name')"
      outer-class="w-full md:col-span-2 md:col-start-3"
      inner-class="max-w-xl"
      type="text"
      name="supplier_name"
    />
    <FormKit
      :label="t('emissionSource.goods_and_service_origin_label')"
      outer-class="w-full md:col-start-1"
      type="select"
      :options="optionsGoodsAndServiceOriginList"
      name="origin"
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
      type="radio"
      :label="t('emissionSource.goods_and_service_monitoring_label')"
      outer-class="md:col-span-4"
      :options="optionYesNo"
      fieldset-class="$remove:max-w-md"
      name="ghg_emission_are_recorded"
      :classes="{
        fieldset: 'max-w-full',
      }
      "
    />

    <CheckBoxMultiple
      v-model="currentEmissionSource.fuel_store"
      type="checkbox"
      :label="t('emissionSource.fuel_storage_label')"
      :options="optionSupplierActionImplementationList"
      outer-class="md:col-span-3"
      name="fuel_store"
      fieldset-class="p-3"
    />

    <FormKit
      :label="t('emissionSource.description')"
      type="textarea"
      outer-class="md:col-span-4"
      name="description"
      :help="t('emissionSource.description_help')"
    />
  </div>
</template>
