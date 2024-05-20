<script setup lang="ts">
import { storeToRefs } from 'pinia'

const selectedFactorTypeId = ref(0)
const sourceTypeId = ref(0)
const classificationStore = useClassificationStore()
const basicStorage = useBasicStore()

const { t } = useI18n()
const activityValue = ref([])
const equipmentValue = ref([])

const {
  optionsFuelStorageManagementList,
  optionsFuelStorageList,
  optionAssetLeasedList,
  optionDurationList,
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
</script>

<template>
  <div>
    <div class="mb-5">
      <FormKit
        :label="t('emissionSource.asset_leased_label')"
        type="select"
        :options="optionAssetLeasedList"
        placeholder="..."
        name="efficiency_unit"
      />
    </div>
    <div class="mb-5 flex gap-4">
      <FormKit
        type="number"
        :label="t('emissionSource.asset_duration_value_label')"
        number
        name="fuel_efficiency"
      />
      <FormKit
        :label="t('emissionSource.asset_duration_label')"
        type="select"
        :options="optionDurationList"
        placeholder="..."
        name="efficiency_unit"
      />
    </div>
    <div class="mb-5">
      <FormKit
        :label="t('emissionSource.code')"
        outer-class="w-full"
        inner-class="max-w-xl"
        type="text"
        placeholder="..."
        name="code"
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
      />
    </div>
    <div class="mb-5">
      <ActivitySearch
        v-model="activityValue"
        :label="t('emissionSource.process_label')"
      />
    </div>
    <div class="mb-5">
      <EquipmentSearch
        v-model="equipmentValue"
        :label="t('emissionSource.type')"
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
        :label="t('emissionSource.emission_factor')"
        outer-class="w-full"
        type="select"
        placeholder="..."
        name="emission_factor"
        :options="optionsFilteredEmissionFactors"
      />
    </div>
    <div class="mb-5 flex w-full gap-5">
      <FormKit
        type="checkbox"
        :label="t('emissionSource.fuel_storage_label')"
        :options="optionsFuelStorageList"
        name="fuel_storage"
        outer-class="flex-1"
        fieldset-class="p-3"
      />

      <FormKit
        type="checkbox"
        :label="t('emissionSource.fuel_storage_management_label')"
        :options="optionsFuelStorageManagementList"
        outer-class="flex-1"
        fieldset-class="p-3"
        name="fuel_storage_management"
      />
    </div>
    <div class="mb-5">
      <FormKit
        type="radio"
        :label="t('emissionSource.vapor_generation_question')"
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
        :label="t('emissionSource.efficiency_label')"
        number
        name="fuel_efficiency"
      />
    </div>
    <div class="mb-5">
      <FormKit
        :label="t('emissionSource.efficiency_unit_label')"
        type="text"
        placeholder="..."
        name="fuel_efficiency_unit"
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
  <!-- End Emission Factor select -->
  </div>
</template>
