<script setup lang="ts">
import { storeToRefs } from 'pinia'

const selectedFactorTypeId = ref(0)
const sourceTypeId = ref(0)
const classificationStore = useClassificationStore()
const basicStorage = useBasicStore()

const { t } = useI18n()

const {
  optionsWasteManagementList,
  optionsWasteRegisterList,
  optionsOperationWasteList,
  optionsOperationWasteEmptyLabelList,
} = storeToRefs(basicStorage)

const {
  optionFactorTypes,
  // optionsFilteredEmissionFactors,
  // optionSourceTypes,
} = storeToRefs(classificationStore)

// function filterEmissionFactors() {
//   classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value)
// }

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
    <div class="mb-5 flex w-full gap-5">
      <FormKit
        type="checkbox"
        :label="t('emissionSource.waste_operation_label')"
        :options="optionsWasteRegisterList"
        name="fuel_storage"
        outer-class="flex-1"
        fieldset-class="p-3"
      />

      <FormKit
        type="checkbox"
        :label="t('emissionSource.waste_register_label')"
        :options="optionsOperationWasteList"
        outer-class="flex-1"
        fieldset-class="p-3"
        name="fuel_storage_management"
      />
    </div>
    <div>
      <table>
        <thead>
          <tr width="10%">
            <th v-for="column in optionsWasteManagementList" :key="column.value">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="column in optionsWasteManagementList" :key="column.value">
              <FormKit
                type="checkbox"
                class="flex justify-center"
                on-value="false"
                off-value="true"
                :options="optionsOperationWasteEmptyLabelList"
                outer-class="flex-1"
                fieldset-class="$reset p-3 flex justify-center"
                name="fuel_storage_management"
              />
            </td>
          </tr>
        </tbody>
      </table>
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
  </div>
</template>
