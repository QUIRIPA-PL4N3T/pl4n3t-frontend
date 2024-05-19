<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import type { EmissionSourceGroup } from '~/api-client'

const props = defineProps<{ id?: string }>()
const selectedGroup = ref<EmissionSourceGroup | undefined>(undefined)
const selectedGroupId = ref(0)
const selectedFactorTypeId = ref(0)
const disabledSourceType = ref<boolean>(false)

const { t } = useI18n()
const authStore = useAuthStore()
const toast = useToast()

const { user } = storeToRefs(authStore)
const emissionSourceStore = useEmissionSourceStore()
const classificationStore = useClassificationStore()
const documentStore = useDocumentsStore()

const { inventoriableClassificationGroups } = storeToRefs(classificationStore)
const { currentEquipment } = storeToRefs(emissionSourceStore)
const { documentItem } = storeToRefs(documentStore)

async function save() {
  try {
    await emissionSourceStore.saveEmissionSource()
    toast.success(t('equipment.save.success'), {
      timeout: 2000,
    })
  }
  catch (error) {
    console.error(error)
    toast.error(t('equipment.save.error'))
  }
}

async function deleteEmissionFactor(id: number) {
  await emissionSourceStore.deleteEmissionSource(id)
}

async function uploadDocument(event: Event) {
  const inputElement = event.target as HTMLInputElement
  if (inputElement.files && inputElement.files.length > 0) {
    const file: File = inputElement.files[0]
    documentItem.value.objectPk = currentEquipment.value.id
    documentItem.value.objectType = 'emission-source'
    documentItem.value.file = file
    documentItem.value.title = file.name
    await documentStore.uploadDocument()
    emissionSourceStore.fetchEmissionSource(Number(props.id))
  }
}

watch(() => user.value, () => {
  if (user.value)
    emissionSourceStore.fetchEmissionSource(Number(props.id))
})

watch(() => selectedFactorTypeId.value, () => {
  classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value, currentEquipment.value.source_type)
})

watch(() => currentEquipment.value.group, () => {
  selectedGroupId.value = currentEquipment.value.group || 0
  setSelectGroupById(selectedGroupId.value)
})

function setSelectGroup(group: EmissionSourceGroup) {
  selectedGroupId.value = group.id
  classificationStore.setEmissionTypesByGroup(group.id)
  selectedGroup.value = group

  switch (selectedGroup.value?.form_name) {
    case 'ORGANIZATION_VEHICLES':
      currentEquipment.value.source_type = 2
      disabledSourceType.value = true
      break
    default:
      break
  }
}

function setSelectGroupById(id: number) {
  if (id !== 0)
    selectedGroup.value = inventoriableClassificationGroups.value.find(group => group.id === id)
}

emissionSourceStore.fetchEmissionSource(Number(props.id))

setSelectGroupById(currentEquipment.value.group!)
</script>

<template>
  <div class="xl:col-span-2">
    <Card :title="currentEquipment.name">
      <label class="ltr:inline-block rtl:block input-label" for="phon">{{ t('equipment.group') }}</label>
      <div class="flex gap-3 items-stretch overflow-auto pb-5">
        <Tooltip
          v-for="(group, i) in inventoriableClassificationGroups"
          :key="i"
          placement="bottom"
          btn-class="relative flex w-40 hover:bg-black-100"
        >
          <template #button>
            <button
              class="relative flex w-40 hover:bg-black-100 justify-center h-full"
              :class="{ 'border-blue-500 bg-black-200 border-2': group.id === selectedGroupId }"
              @click.prevent="setSelectGroup(group)"
            >
              <div class="flex flex-col h-full items-center p-2">
                <Image
                  :src="group.icon!"
                  alt="{{ brand.name }}"
                  image-class="rounded-md border-2 border-slate-100 max-w-full h-[80px] object-contain object-center p-3"
                />
                <span class="text-xs pt-2">
                  {{ group.name }}
                </span>
              </div>
            </button>
          </template>
          <div class="text-white text-sm" v-html="group.description" />
        </Tooltip>
      </div>
      <hr>
      <div class="flex flex-row gap-4 pt-5">
        <!-- Form Column -->
        <div class="w-full">
          <FormKit
            v-model="currentEquipment"
            type="form"
            :actions="false"
            :incomplete-message="false"
            :disabled="selectedGroupId === 0"
            @submit="save"
          >
            <div class="text-base text-slate-600 dark:text-slate-300">
              <div class="flex gap-4 pb-5">
                <FormKit
                  v-model="selectedGroupId"
                  type="hidden"
                  name="group"
                />
              </div>
            </div>
            <FuelUseFields v-if="selectedGroup && ['FUEL'].includes(selectedGroup.form_name!)" />
            <OrganizationVehicleFields v-else-if="selectedGroup && ['ORGANIZATION_VEHICLES'].includes(selectedGroup.form_name!)" />
            <ElectricityFields v-else-if="selectedGroup && ['ELECTRICITY'].includes(selectedGroup.form_name!)" />
            <RefrigerantFields v-else-if="selectedGroup && ['REFRIGERANTS'].includes(selectedGroup.form_name!)" />
            <WasteFields v-else-if="selectedGroup && ['WASTE'].includes(selectedGroup.form_name!)" />
            <ServiceFields v-else-if="selectedGroup && ['SERVICES'].includes(selectedGroup.form_name!)" />
            <LeasedAssetFields v-else-if="selectedGroup && ['LEASED_ASSETS'].includes(selectedGroup.form_name!)" />
            <TransportationFields v-else-if="selectedGroup && ['TRANSPORTATION'].includes(selectedGroup.form_name!)" />
            <ProductFields v-else-if="selectedGroup && ['PRODUCTS'].includes(selectedGroup.form_name!)" />
            <InvestmentFields v-else-if="selectedGroup && ['INVESTMENTS'].includes(selectedGroup.form_name!)" />
            <!-- Attachment Section -->
            <div class="mb-5">
              <ul>
                <li v-for="document in currentEquipment.documents" :key="document.id" class="underline text-blue-500">
                  <a :href="document.file_url" target="_blank">{{ document.title }}</a>
                </li>
              </ul>
            </div>
            <div>
              <FormKit
                type="file"
                :label="t('equipment.attach.label')"
                :help="t('equipment.attach.help')"
                :disabled="currentEquipment.id === 0"
                name=""
                accept=".jpg,.png,.pdf"
                @change="uploadDocument"
              />
            </div>
            <!-- End attachment Section -->
            <div class="text-base text-slate-600 dark:text-slate-300 mb-5" />
            <div v-show="selectedGroupId !== 0" class="flex justify-end gap-2 pt-3">
              <Button
                :text="t('delete')"
                btn-class="btn-danger"
                @click="deleteEmissionFactor(currentEquipment.id)"
              />
              <div class="space-y-5">
                <Button
                  :text="t('save')"
                  btn-class="btn-dark"
                />
              </div>
            </div>
          </FormKit>
        </div>
      </div>
    </Card>
  </div>
</template>

<route lang="yaml">
path: '/emission-source-edit/:id'
name: emission-source-edit
meta:
  layout: sidebar
  requiresAuth: true
</route>
