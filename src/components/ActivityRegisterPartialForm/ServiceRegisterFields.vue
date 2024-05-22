<script setup lang="ts">
import { storeToRefs } from 'pinia'

const goodAndServiceSelected = ref('')
const selectedFactorTypeId = ref(0)
const sourceTypeId = ref(0)
const classificationStore = useClassificationStore()
const basicStorage = useBasicStore()

const { t } = useI18n()

const {
  optionsGoodsAndServiceOriginList,
  optionsServiceAcquiredList,
  optionsGoodsAcquiredList,
  optionsGoodsAndServiceList,
  optionSupplierActionImplementationList,
} = storeToRefs(basicStorage)

const {
  optionFactorTypes,
  optionsFilteredEmissionFactors,
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
        v-model="goodAndServiceSelected"
        :label="t('emissionSource.good_and_service_label')"
        type="select"
        :options="optionsGoodsAndServiceList"
        placeholder="..."
        name="efficiency_unit"
      />
    </div>
    <div class="mb-5">
      <FormKit
        v-if="goodAndServiceSelected === 'Bienes'"
        :label="t('emissionSource.service_label')"
        type="select"
        :options="optionsServiceAcquiredList"
        placeholder="..."
        name="efficiency_unit"
      />
      <FormKit
        v-else-if="goodAndServiceSelected === 'Servicios'"
        :label="t('emissionSource.goods_label')"
        type="select"
        :options="optionsGoodsAcquiredList"
        placeholder="..."
        name="efficiency_unit"
      />
    </div>
    <div class="mb-5">
      <FormKit
        :label="t('emissionSource.supplier_name')"
        outer-class="w-full"
        inner-class="max-w-xl"
        type="text"
        placeholder="..."
        name="electricity_supplier"
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
        :label="t('emissionSource.emission_factor_type')"
        outer-class="w-full"
        type="select"
        placeholder="..."
        name="emission_factor"
        :options="optionsFilteredEmissionFactors"
      />
    </div>
    <!-- End Emission Factor select -->
  </div>
  <div class="mb-5">
    <FormKit
      type="radio"
      :label="t('emissionSource.goods_and_service_monitoring_label')"
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
      v-model="goodAndServiceSelected"
      :label="t('emissionSource.goods_and_service_origin_label')"
      type="select"
      :options="optionsGoodsAndServiceOriginList"
      placeholder="..."
      name="efficiency_unit"
    />
  </div>
  <div class="mb-5">
    <FormKit
      type="checkbox"
      :label="t('emissionSource.fuel_storage_label')"
      :options="optionSupplierActionImplementationList"
      name="fuel_storage"
      outer-class="flex-1"
      fieldset-class="p-3"
    />
  </div>
  <div class="mb-5">
    <FormKit
      :label="t('emissionSource.description')"
      type="textarea"
      placeholder="..."
      name="description"
      :help="t('emissionSource.description_help')"
    />
  </div>
</template>
