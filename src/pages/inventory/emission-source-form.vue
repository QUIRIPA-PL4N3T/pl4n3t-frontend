<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { EmissionSourceGroup } from '~/api-client'

const props = defineProps<{ id?: string }>()
const selectedGroup = ref<EmissionSourceGroup | undefined>(undefined)
const selectedGroupId = ref(0)
const selectedFactorTypeId = ref(0)
const confirmModal = ref<any>(null)
provide('selectedGroupId', selectedGroupId)
const router = useRouter()
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
  if (currentEmissionSource.value.id !== 0)
    editItem(currentEmissionSource.value.id)
}

function editItem(id: number) {
  router.push({
    name: 'emission-source-edit',
    params: { id },
  })
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
  classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value, Number(currentEmissionSource.value.source_type))
})

watch(() => currentEmissionSource.value.group, () => {
  selectedGroupId.value = currentEmissionSource.value.group || 0
  setSelectGroupById(selectedGroupId.value)
})

function setSelectGroup(group: EmissionSourceGroup) {
  selectedGroupId.value = group.id
  classificationStore.setEmissionTypesByGroup(group.id)
  selectedGroup.value = group
}

function setSelectGroupById(id: number) {
  if (id !== 0)
    selectedGroup.value = inventoriableClassificationGroups.value.find(group => group.id === id)
}

function closeModal() {
  if (confirmModal.value)
    confirmModal.value.closeModal()
}

if (user.value && !Number.isNaN(props.id))
  emissionSourceStore.fetchEmissionSource(Number(props.id))

onMounted(() => {
  setSelectGroupById(currentEmissionSource.value.group!)
})

onBeforeUnmount(() => {
  selectedGroupId.value = 0
  emissionSourceStore.fetchEmissionSource(0)
  selectedGroup.value = undefined
})

const isNew = computed(() => {
  return currentEmissionSource.value.id === 0
})

const formFields = computed<string>(() => {
  return selectedGroup.value?.form_name || ''
})

const currentGroup = computed<EmissionSourceGroup | undefined>(() => {
  return inventoriableClassificationGroups.value.find(item => item.id === currentEmissionSource.value.group)
})
</script>

<template>
  <div class="xl:col-span-2">
    <Card :title="`${t('emissionSource.edit')} ${currentEmissionSource.name}`">
      <div v-if="isNew" class="flex gap-3 items-stretch overflow-auto pb-5">
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
      <div
        v-if="currentGroup"
        class="flex gap-4"
      >
        <div
          v-if="!isNew"
          class="relative flex w-1/4 justify-center items-center"
          :data-group-id="currentGroup.id"
          :class="{ 'border-indigo-600 rounded border-2': currentGroup.id === selectedGroupId }"
        >
          <div class="flex flex-col items-center p-2">
            <Image
              :src="currentGroup.icon!"
              alt="{{ brand.name }}"
              image-class="rounded-md max-w-full h-[80px] object-contain object-center p-3"
            />
            <span class="text-xs pt-2 text-center">
              {{ currentGroup.name }}
            </span>
          </div>
        </div>
        <Alert
          v-if="selectedGroup"
          class-name="bg-primary-500 bg-opacity-[14%] text-indigo-500 w-full"
          icon="heroicons-outline:information-circle"
        >
          <div class="text-indigo-600 text-sm" v-html="selectedGroup.description" />
        </Alert>
      </div>
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
                  number
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
            <FuelUseFields v-if="formFields === 'FUEL'" />
            <OrganizationVehicleFields v-else-if="formFields === 'ORGANIZATION_VEHICLES'" />
            <ElectricityFields v-else-if="formFields === 'ELECTRICITY'" />
            <RefrigerantFields v-else-if="formFields === 'REFRIGERANTS'" />
            <WasteFields v-else-if="formFields === 'WASTE'" />
            <ServiceFields v-else-if="formFields === 'SERVICES'" />
            <LeasedAssetFields v-else-if="formFields === 'LEASED_ASSETS'" />
            <TransportationFields v-else-if="formFields === 'TRANSPORTATION'" />
            <ProductFields v-else-if="formFields === 'PRODUCTS'" />
            <InvestmentFields v-else-if="formFields === 'INVESTMENTS'" />
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
