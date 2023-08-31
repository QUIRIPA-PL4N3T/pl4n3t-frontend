<script setup lang="ts">
import { storeToRefs } from 'pinia'

const props = defineProps<{ id?: string }>()

const selectedGroupId = ref(0)
const selectedFactorTypeId = ref(0)

const { t } = useI18n()
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
const emissionSourceStore = useEmissionSourceStore()
const classificationStore = useClassificationStore()
const { classificationGroups, optionFactorTypes, optionsFilteredEmissionFactors, optionSourceTypes } = storeToRefs(classificationStore)
const { currentEquipment } = storeToRefs(emissionSourceStore)

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
  classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value)
})

watch(() => currentEquipment.value.group, () => {
  selectedGroupId.value = currentEquipment.value.group || 0
})

function selectGroup(id: number) {
  selectedGroupId.value = id
  classificationStore.setEmissionTypesByGroup(id)
}

function filterEmissionFactors() {
  classificationStore.filterEmissionFactorByType(selectedFactorTypeId.value)
}

emissionSourceStore.fetchEmissionSource(Number(props.id))
</script>

<template>
  <div class="xl:col-span-2">
    <Card :title="currentEquipment.name">
      <label class="ltr:inline-block rtl:block input-label" for="phon">{{ t('equipment.group') }}</label>
      <div class="flex gap-3 items-stretch overflow-auto pb-5">
        <button
          v-for="(group, i) in classificationGroups"
          :key="i"
          class="relative flex w-40"
          :class="{ 'border-blue-500 border-2': group.id === selectedGroupId }"
          @click.prevent="selectGroup(group.id)"
        >
          <div class="flex flex-col h-full">
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
                  :label="t('equipment.name')"
                  outer-class="w-full"
                  inner-class="max-w-xl"
                  type="text"
                  placeholder="..."
                  name="name"
                />
                <FormKit
                  :label="t('equipment.code')"
                  outer-class="w-full"
                  inner-class="max-w-xl"
                  type="text"
                  placeholder="..."
                  name="code"
                />
              </div>
              <div class="pb-5">
                <FormKit
                  :label="t('equipment.source_type')"
                  type="select"
                  placeholder="..."
                  :options="optionSourceTypes"
                  name="source_type"
                />
              </div>
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
