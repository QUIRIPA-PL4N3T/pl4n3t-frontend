<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { EmissionSourceGroup } from '~/api-client'

const props = defineProps<{ id?: string }>()

const selectedGroup = ref<EmissionSourceGroup | undefined>(undefined)
const selectedGroupId = ref(0)
const selectedFactorTypeId = ref(0)
const disabledSourceType = ref<boolean>(false)

const { t } = useI18n()
const authStore = useAuthStore()
const basicStore = useBasicStore()

const { user } = storeToRefs(authStore)
const emissionSourceStore = useEmissionSourceStore()
const classificationStore = useClassificationStore()
const { inventoriableClassificationGroups, optionFactorTypes, optionsFilteredEmissionFactors, optionSourceTypes } = storeToRefs(classificationStore)
const { currentEquipment } = storeToRefs(emissionSourceStore)
const {
  optionsVehicleTypeList,
  optionsVehicleLoadList,
  optionsVehicleEfficiencyUnitList,
} = storeToRefs(basicStore)

async function save() {
  await emissionSourceStore.saveEmissionSource()
}

async function deleteEmissionFactor(id: number) {
  await emissionSourceStore.deleteEmissionSource(id)
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

function filterEmissionFactors() {
  classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value)
}

function emissionFactorTypeLabel(): string {
  switch (selectedGroup.value?.form_name) {
    case 'ORGANIZATION_VEHICLES':
      return t('equipment.vehicle_fuel_type')
    default:
      return t('equipment.factor_type')
  }
}

function emissionFactorLabel(): string {
  switch (selectedGroup.value?.form_name) {
    case 'ORGANIZATION_VEHICLES':
      return t('equipment.vehicle_fuel')
    default:
      return t('equipment.emission_factor')
  }
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
                <span class="text-pink">{{ group.classification }}</span>
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
                <FormKit
                  :label="t('equipment.code')"
                  outer-class="w-full"
                  inner-class="max-w-xl"
                  type="text"
                  placeholder="..."
                  name="code"
                />
                <FormKit
                  v-if="selectedGroup && ['ORGANIZATION_VEHICLES'].includes(selectedGroup.form_name!)"
                  :label="t('equipment.name')"
                  outer-class="w-full"
                  inner-class="max-w-xl"
                  type="text"
                  placeholder="..."
                  name="name"
                />
              </div>
              <div class="pb-5">
                <FormKit
                  :disabled="disabledSourceType"
                  :label="t('equipment.source_type')"
                  type="select"
                  placeholder="..."
                  :options="optionSourceTypes"
                  name="source_type"
                />
              </div>
              <div
                v-if="selectedGroup && ['ORGANIZATION_VEHICLES'].includes(selectedGroup.form_name!)"
                class="grid grid-cols-1 md:grid-cols-2 gap-x-4"
              >
                <div class="pb-5">
                  <FormKit
                    :label="t('equipment.vehicle_type')"
                    type="select"
                    placeholder="..."
                    :options="optionsVehicleTypeList"
                    name="vehicle_type"
                  />
                </div>
                <div class="pb-5">
                  <FormKit
                    :label="t('equipment.vehicle_load_type')"
                    type="select"
                    placeholder="..."
                    :options="optionsVehicleLoadList"
                    name="vehicle_load"
                  />
                </div>
                <div class="pb-5 col-span-2">
                  <FormKit
                    type="number"
                    :label="`${t('equipment.vehicle_capacity')} ${currentEquipment.vehicle_load || ''}`"
                    number
                    name="vehicle_capacity"
                  />
                </div>
                <div class="pb-5">
                  <FormKit
                    type="number"
                    :label="t('equipment.vehicle_efficiency')"
                    number
                    name="vehicle_efficiency"
                  />
                </div>
                <div class="pb-5">
                  <FormKit
                    :label="t('equipment.vehicle_efficiency_unit')"
                    type="select"
                    placeholder="..."
                    :options="optionsVehicleEfficiencyUnitList"
                    name="vehicle_efficiency_unit"
                  />
                </div>
              </div>
              <div class="flex gap-4 pb-5">
                <FormKit
                  v-model="selectedFactorTypeId"
                  :label="emissionFactorTypeLabel()"
                  outer-class="w-full"
                  type="select"
                  placeholder="..."
                  name="factor_type"
                  :options="optionFactorTypes"
                  @onchange="filterEmissionFactors"
                />
                <FormKit
                  :label="emissionFactorLabel()"
                  outer-class="w-full"
                  type="select"
                  placeholder="..."
                  name="emission_factor"
                  :options="optionsFilteredEmissionFactors"
                />
              </div>
              <FormKit
                :label="t('equipment.description')"
                type="textarea"
                placeholder="..."
                name="description"
              />
            </div>
            <div class="text-base text-slate-600 dark:text-slate-300" />
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
