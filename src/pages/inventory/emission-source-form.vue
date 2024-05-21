<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { EmissionSourceGroup } from '~/api-client'

const props = defineProps<{ id?: string }>()
const selectedGroup = ref<EmissionSourceGroup | undefined>(undefined)
const selectedGroupId = ref(0)
const selectedFactorTypeId = ref(0)
const disabledSourceType = ref<boolean>(false)
const groupContainerRef = ref<HTMLDivElement | null>(null)
const confirmModal = ref<any>(null)

const { t } = useI18n()
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
const emissionSourceStore = useEmissionSourceStore()
const classificationStore = useClassificationStore()
const documentStore = useDocumentsStore()
const { currentGlobalLocationId } = storeToRefs(emissionSourceStore)

const { inventoriableClassificationGroups } = storeToRefs(classificationStore)
const { currentEmissionSource } = storeToRefs(emissionSourceStore)

async function save() {
  await emissionSourceStore.saveEmissionSource()
}

async function deleteEmissionFactor(id: number) {
  await emissionSourceStore.deleteEmissionSource(id)
}

async function uploadDocument(event: Event) {
  const inputElement = event.target as HTMLInputElement
  if (inputElement.files && inputElement.files.length > 0) {
    const file: File = inputElement.files[0]

    documentStore.setDocumentProperties({
      objectPk: currentEmissionSource.value.id,
      objectType: 'emission-source',
      file,
      title: file.name,
    })

    await documentStore.uploadDocument()
    emissionSourceStore.fetchEmissionSource(Number(props.id))
  }
}

watch(() => user.value, () => {
  if (!user.value)
    return
  emissionSourceStore.fetchEmissionSource(Number(props.id))
  setSelectGroupById(currentEmissionSource.value.group!)
})

watch(() => selectedFactorTypeId.value, () => {
  classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value, currentEmissionSource.value.source_type)
})

watch(() => currentEmissionSource.value.group, () => {
  selectedGroupId.value = currentEmissionSource.value.group || 0
  setSelectGroupById(selectedGroupId.value)
})

function setSelectGroup(group: EmissionSourceGroup) {
  selectedGroupId.value = group.id
  classificationStore.setEmissionTypesByGroup(group.id)
  selectedGroup.value = group

  switch (selectedGroup.value?.form_name) {
    case 'ORGANIZATION_VEHICLES':
      currentEmissionSource.value.source_type = 2
      disabledSourceType.value = true
      break
    default:
      break
  }
}

function setSelectedGroupFocus(id: number) {
  const selectedElement = groupContainerRef.value?.querySelector(`button[data-group-id="${id}"]`)
  selectedElement?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
}

function setSelectGroupById(id: number) {
  if (id !== 0) {
    selectedGroup.value = inventoriableClassificationGroups.value.find(group => group.id === id)
    setSelectedGroupFocus(id)
  }
}

function closeModal() {
  if (confirmModal.value)
    confirmModal.value.closeModal()
}

setSelectGroupById(currentEmissionSource.value.group!)

if (user.value && !Number.isNaN(props.id))
  emissionSourceStore.fetchEmissionSource(Number(props.id))
</script>

<template>
  <div class="xl:col-span-2">
    <Card :title="`${t('emissionSource.edit')} ${currentEmissionSource.name}`">
      <div ref="groupContainerRef" class="flex gap-3 items-stretch overflow-auto pb-5">
        <div
          v-for="(group, i) in inventoriableClassificationGroups"
          :key="i"
          class="relative flex w-40 hover:bg-black-100"
        >
          <button
            class="relative flex w-40 hover:bg-black-100 justify-center h-full"
            :data-group-id="group.id"
            :class="{ 'border-indigo-600 rounded  bg-black-200 border-2': group.id === selectedGroupId }"
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
        </div>
      </div>
      <Alert
        v-if="selectedGroup"
        dismissible
        class-name="bg-primary-500 bg-opacity-[14%] text-indigo-500"
        icon="heroicons-outline:information-circle"
      >
        <div class="text-indigo-600 text-sm" v-html="selectedGroup.description" />
      </Alert>
      <div class="flex flex-row gap-4 pt-5">
        <!-- Form Column -->
        <div class="w-full">
          <FormKit
            v-model="currentEmissionSource"
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
                <FormKit
                  :value="currentGlobalLocationId.id"
                  type="hidden"
                  name="location"
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
                <li v-for="document in currentEmissionSource.documents" :key="document.id" class="underline text-blue-500">
                  <a :href="document.file_url" target="_blank">{{ document.title }}</a>
                </li>
              </ul>
            </div>
            <div>
              <FormKit
                type="file"
                :label="t('emissionSource.attach.label')"
                :help="t('emissionSource.attach.help')"
                :disabled="currentEmissionSource.id === 0"
                name=""
                accept=".jpg,.png,.pdf"
                @change="uploadDocument"
              />
            </div>
            <!-- End attachment Section -->
            <div class="text-base text-slate-600 dark:text-slate-300 mb-5" />
            <div v-show="selectedGroupId !== 0" class="flex justify-end gap-2 pt-3">
              <Modal
                v-if="currentEmissionSource.id !== 0"
                ref="confirmModal"
                :title="t('company.delete.Brand')"
                :label="t('delete')"
                label-class="btn-danger"
                theme-class="bg-danger-500"
              >
                <div class="text-base text-slate-600 dark:text-slate-300">
                  {{ t('company.brand.delete.emissionFactor') }}
                </div>
                <template #footer>
                  <Button
                    :text="t('cancel')"
                    btn-class="btn-dark"
                    @click="closeModal"
                  />
                  <Button
                    :text="t('Accept')"
                    btn-class="btn-danger"
                    @click="deleteEmissionFactor(currentEmissionSource.id)"
                  />
                </template>
              </Modal>
              <div class="space-y-5">
                <Button
                  :text="t('save')"
                  type="submit"
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
path: '/inventory/:id'
name: emission-source-edit
meta:
  layout: sidebar
  requiresAuth: true
</route>
