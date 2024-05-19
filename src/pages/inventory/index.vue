<script setup lang="ts">
import { storeToRefs } from 'pinia'

const router = useRouter()

const classificationStore = useClassificationStore()
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
const { inventoriableClassificationGroups } = storeToRefs(classificationStore)
const emissionSourceStore = useEmissionSourceStore()
const { environLocation } = storeToRefs(emissionSourceStore)

function goEditEmissionSource(id: number) {
  router.push({
    name: 'emission-source-edit',
    params: { id },
  })
}

function filterByGroup(id: number) {
  // TODO: add equipment filter by group
  console.warn(id)
}

watch(() => user.value, () => {
  if (user.value && !Number.isNaN(environLocation.value))
    emissionSourceStore.fetchEmissionSourcesByLocation(Number(environLocation.value))
})

const { t } = useI18n()
</script>

<template>
  <div class="w-full h-full">
    <div class="lg:col-span-4 col-span-12 space-y-5">
      <Card :title="t('equipments.modal.title')">
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
                image-class="rounded-md border-2 border-slate-100 w-full h-[80px] object-contain object-center p-3"
              />
              <span class="text-xs pt-2">
                {{ group.name }}
              </span>
            </div>
          </button>
        </div>

        <div class="flex justify-end pb-4">
          <Button
            :text="t('equipment.add')"
            btn-class="btn btn-dark btn-sm"
            @click.prevent="goEditEmissionSource(0)"
          />
        </div>
        <EmissionSourcesTable />
      </Card>
    </div>
  </div>
</template>

<route lang="yaml">
name: inventory
meta:
  layout: sidebar
  requiresAuth: true
</route>
