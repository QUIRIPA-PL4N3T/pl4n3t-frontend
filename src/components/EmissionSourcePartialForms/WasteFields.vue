<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const selectedFactorTypeId = ref(0)
const sourceTypeId = ref<number>(0)
const wasteTypeId = ref('')
const wasteOptions = ref<string[]>([t('no_apply')])
const wasteManagementOptions = ref<string[]>([t('no_apply')])
const classificationStore = useClassificationStore()
const basicStorage = useBasicStore()
const wasteData = ref<string>('')

const {
  optionWasteTypeList,
  optionWasteOrganicList,
  optionWasteInorganicList,
  optionWasteDangerList,
  optionWasteManagementInorganicList,
  optionWasteManagementDangerList,
  getWasteCategoriesList,
  getWasteManagementOrganicList,
} = storeToRefs(basicStorage)
const initialData = ref('')

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

async function saveData(data: string) {
  initialData.value = data
  // Aquí puedes realizar una petición para guardar `data` en la base de datos
  await fetch('/api/save-waste-management', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  })
}

// watch(() => optionFactorTypes.value, () => {
//   if (optionFactorTypes.value.length === 1)
//     selectedFactorTypeId.value = optionFactorTypes.value[0]
// })
</script>

<template>
  <div>
    <div class="flex flex-col md:grid md:grid-cols-4 gap-4">
      <FormKit
        :label="t('emissionSource.wasteName')"
        outer-class="w-full md:col-span-2"
        type="text"
        name="name"
      />

      <FormKit
        v-model="wasteTypeId"
        :label="t('emissionSource.wasteType')"
        outer-class="w-full md:col-span-2"
        type="select"
        :options="optionWasteTypeList"
        name="waste_type"
      />

      <FormKit
        v-model="sourceTypeId"
        :label="t('emissionSource.wasteManagement')"
        type="select"
        outer-class="md:col-span-"
        :options="wasteOptions"
        name="waste_classification"
      />

      <FormKit
        type="checkbox"
        :label="t('emissionSource.wasteRegister')"
        :options="wasteManagementOptions"
        outer-class="md:col-span-2"
        fieldset-class="p-3"
        name="fuel_storage_management"
      />
      <div class="overflow-auto md:col-span-4">
        <CheckboxTable
          v-model="wasteData"
          :label="t('emissionSource.wasteManagement')"
          :rows="getWasteCategoriesList"
          :columns="getWasteManagementOrganicList"
          @update:data="saveData"
        />
      </div>
      <FormKit
        :label="t('emissionSource.description')"
        type="textarea"
        outer-class="md:col-span-4"
        name="description"
        :help="t('emissionSource.description_help')"
      />
    </div>
  </div>
</template>
