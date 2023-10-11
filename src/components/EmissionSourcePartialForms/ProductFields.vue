<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Multiselect from '@vueform/multiselect'

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

const activities = [
  'Actividad 1',
  'Actividad 2',
  'Actividad 3',
]

const equipments = [
  'Equipo 1',
  'Equipo 2',
  'Equipo 3',
]
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
        name="code"
      />
    </div>
    <div class="mb-5">
      <label for="multiselect" class="mb-5">{{ t('equipment.product_name') }}</label>
      <Multiselect
        v-model="activityValue"
        mode="tags"
        :close-on-select="true"
        :searchable="true"
        :create-option="true"
        :options="activities"
        :max="1"
      />
    </div>
    <div class="mb-5 flex gap-4">
      <FormKit
        type="number"
        :label="t('equipment.shelf_life_label')"
        number
        name="shelf_life"
      />
      <FormKit
        :label="t('equipment.shelf_life_unit_label')"
        type="select"
        :options="optionDurationList"
        placeholder="..."
        name="shelf_life_unit"
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
        :label="t('equipment.emission_factor')"
        outer-class="w-full"
        type="select"
        placeholder="..."
        name="emission_factor"
        :options="optionsFilteredEmissionFactors"
      />
    </div>
    <div class="mb-5 flex w-full gap-5">
      <FormKit
        v-if="[1, 2, 3].includes(selectedFactorTypeId)"
        type="checkbox"
        :label="t('equipment.fuel_storage_label')"
        :options="optionsFuelStorageList"
        name="fuel_storage"
        outer-class="flex-1"
        fieldset-class="p-3"
      />

      <FormKit
        v-if="[1, 2, 3].includes(selectedFactorTypeId)"
        type="checkbox"
        :label="t('equipment.fuel_storage_management_label')"
        :options="optionsFuelStorageManagementList"
        outer-class="flex-1"
        fieldset-class="p-3"
        name="fuel_storage_management"
      />
    </div>
    <div class="mb-5">
      <FormKit
        type="radio"
        :label="t('equipment.vapor_generation_question')"
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
        name="fuel_efficiency"
      />
    </div>
    <div class="mb-5">
      <FormKit
        :label="t('equipment.efficiency_unit_label')"
        type="text"
        placeholder="..."
        name="fuel_efficiency_unit"
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
  <!-- End Emission Factor select -->
  </div>
</template>
