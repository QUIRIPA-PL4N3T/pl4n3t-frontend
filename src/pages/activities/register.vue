<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { EmissionsSource } from '~/api-client'

const classificationStore = useClassificationStore()
const { classificationGroups } = storeToRefs(classificationStore)
const emissionSourceStore = useEmissionSourceStore()
const { currentGlobalLocationId } = storeToRefs(emissionSourceStore)
const { locationEmissionSources } = storeToRefs(emissionSourceStore)

const emissionSourceSelected = ref<EmissionsSource | null>(null)

const { t } = useI18n()
let selectedGroupId = $ref(0)

async function filterByGroup(id: number) {
  selectedGroupId = id
  emissionSourceStore.filterEmissionSources(
    {
      group: selectedGroupId,
      location: currentGlobalLocationId.value,
    },
  )
}
</script>

<template>
  <div class="w-full h-full">
    <div class="lg:col-span-4 col-span-12 space-y-5">
      <Card v-if="currentGlobalLocationId">
        <div class="flex gap-3 items-baseline overflow-auto">
          <button
            v-for="(group, i) in classificationGroups"
            :key="i"
            class="relative flex items-center justify-center w-1/6"
            @click.prevent="filterByGroup(group.id)"
          >
            <div class="flex flex-col">
              <Image
                :src="group.icon!"
                alt="{{ brand.name }}"
                image-class="rounded-md border-2 border-slate-100 w-full h-[80px] object-contain object-center p-3"
              />
              <span class="text-xs pt-2">
                {{ group.name }}
              </span>
            </div>
          </button>
        </div>
      </Card>
    </div>
    <div class="flex flex-col md:flex-row gap-2 pt-2 w-full">
      <div class="w-full md:w-1/4">
        <Card>
          <EmissionSourceSelect
            v-model="emissionSourceSelected"
            :label="t('emissionSource.title')"
            :options="locationEmissionSources"
          />
        </Card>
      </div>
      <div class="w-full md:w-3/4">
        <Card>
          <FuelCalculator
            v-model="emissionSourceSelected"
          />
        </Card>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
path: '/activities/:id'
name: register-activity
meta:
  layout: sidebar
  requiresAuth: true
</route>
