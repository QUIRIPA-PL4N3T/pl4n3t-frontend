<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const selectedFactorTypeId = ref(0)
const sourceTypeId = ref(0)
const wasteTypeId = ref('')
const wasteOptions = ref<string[]>([t('no_apply')])
const wasteManagementOptions = ref<string[]>([t('no_apply')])
const classificationStore = useClassificationStore()
const basicStorage = useBasicStore()

const {
  optionWasteTypeList,
  optionWasteOrganicList,
  optionWasteInorganicList,
  optionWasteDangerList,
  optionWasteManagementOrganicList,
  optionWasteManagementInorganicList,
  optionWasteManagementDangerList,
} = storeToRefs(basicStorage)

// const {
//   optionFactorTypes,
//   optionsFilteredEmissionFactors,
//   optionSourceTypes,
// } = storeToRefs(classificationStore)

// function filterEmissionFactors() {
//   classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value)
// }

function setWasteOptions(): any {
  switch (wasteTypeId.value.trim()) {
    case 'Residuos orgánicos':
      wasteOptions.value = optionWasteOrganicList.value
      break
    case 'Residuos inorgánicos':
      wasteOptions.value = optionWasteInorganicList.value
      break
    case 'Residuos peligrosos':
      wasteOptions.value = optionWasteDangerList.value
      break
    default:
      wasteOptions.value = [t('no_apply')]
  }
}

function setWasteManagementOptions(): any {
  switch (wasteTypeId.value) {
    case 'Residuos orgánicos':
      wasteManagementOptions.value = optionWasteManagementOrganicList.value
      break
    case 'Residuos inorgánicos':
      wasteManagementOptions.value = optionWasteManagementInorganicList.value
      break
    case 'Residuos peligrosos':
      wasteManagementOptions.value = optionWasteManagementDangerList.value
      break
    default:
      wasteManagementOptions.value = [t('no_apply')]
      break
  }
}

watch(() => wasteTypeId.value, () => {
  setWasteOptions()
  setWasteManagementOptions()
})

watch(() => selectedFactorTypeId.value, () => {
  classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value, sourceTypeId.value)
})

// watch(() => optionFactorTypes.value, () => {
//   if (optionFactorTypes.value.length === 1)
//     selectedFactorTypeId.value = optionFactorTypes.value[0]
// })
</script>

<template>
  <div>
    <div class="mb-5 flex-col w-full gap-5">
      <div class="w-full pb-5">
        <FormKit
          v-model="wasteTypeId"
          :label="t('emissionSource.waste_type_label')"
          type="select"
          placeholder="..."
          :options="optionWasteTypeList"
          name="electricity_source"
        />
      </div>
      <div class="flex flex-col md:flex-row gap-4">
        <FormKit
          v-model="sourceTypeId"
          :label="t('emissionSource.waste_type_label')"
          type="select"
          placeholder="..."
          :options="wasteOptions"
          name="electricity_source"
        />

        <FormKit
          type="checkbox"
          :label="t('emissionSource.waste_register_label')"
          :options="wasteManagementOptions"
          outer-class="flex-1"
          fieldset-class="p-3"
          name="fuel_storage_management"
        />
      </div>
    </div>
    <div />
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
