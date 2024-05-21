<script setup lang="ts">
import { storeToRefs } from 'pinia'

const router = useRouter()

const classificationStore = useClassificationStore()
const authStore = useAuthStore()
const { t } = useI18n()
const { user } = storeToRefs(authStore)
const { inventoriableClassificationGroups } = storeToRefs(classificationStore)
const emissionSourceStore = useEmissionSourceStore()
const { currentGlobalLocationId } = storeToRefs(emissionSourceStore)
let selectedGroupId = $ref(0)

function goEditEmissionSource(id: number) {
  router.push({
    name: 'emission-source-edit',
    params: { id },
  })
}

async function filterByGroup(id: number) {
  selectedGroupId = id
  emissionSourceStore.filterEmissionSources(
    {
      group: selectedGroupId,
      location: currentGlobalLocationId.value,
    },
  )
}

watch(() => user.value, () => {
  if (user.value && currentGlobalLocationId.value)
    emissionSourceStore.fetchEmissionSources()
})

watch(() => currentGlobalLocationId.value, () => {
  if (currentGlobalLocationId.value)
    emissionSourceStore.fetchEmissionSources()
})
</script>

<template>
  <div class="w-full h-full">
    <div class="lg:col-span-4 col-span-12 space-y-5">
      <Card
        v-if="currentGlobalLocationId"
        :title="t('equipments.modal.title')"
      >
        <div class="flex gap-3 items-baseline overflow-auto">
          <button
            v-for="(group, i) in inventoriableClassificationGroups"
            :key="i"
            class="relative flex items-center justify-center w-1/6"
            @click.prevent="filterByGroup(group.id)"
          >
            <div class="flex flex-col">
              <Image
                :src="group.icon!"
                alt="{{ brand.name }}"
                :image-class="group.id === selectedGroupId ? 'rounded-md border-indigo-500 border-2 border-slate-100 w-full h-[80px] object-contain object-center p-3' : 'rounded-md border-2 border-slate-100 w-full h-[80px] object-contain object-center p-3' "
              />
              <span class="text-xs pt-2">
                {{ group.name }}
              </span>
            </div>
          </button>
        </div>

        <div class="flex justify-end pb-4">
          <Button
            :text="t('emissionSource.add')"
            btn-class="btn btn-dark btn-sm"
            @click.prevent="goEditEmissionSource(0)"
          />
        </div>
        <EmissionSourcesTable />
      </Card>
      <NoLocationSelected v-else />
    </div>
  </div>
</template>

<route lang="yaml">
name: inventory
meta:
  layout: sidebar
  requiresAuth: true
</route>
