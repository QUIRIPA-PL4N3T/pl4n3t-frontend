<script setup lang="ts">
import { storeToRefs } from 'pinia'

const router = useRouter()
const classificationStore = useClassificationStore()
const emissionSourceStore = useEmissionSourceStore()
const emissionFactor = useEmissionFactorStore()
const authStore = useAuthStore()

const { classificationGroups } = storeToRefs(classificationStore)
const { currentGlobalLocationId } = storeToRefs(emissionSourceStore)
const { user } = storeToRefs(authStore)
const { t } = useI18n()

function filterByGroup(id: number) {
  // TODO: add emissionSource filter by group
  console.warn(id)
}

function goRegisterActivity(id: number) {
  router.push({
    name: 'register-activity',
    params: { id },
  })
}

async function loadData() {
  if (user.value && currentGlobalLocationId.value) {
    emissionFactor.fetchEmissionResults({
      location: currentGlobalLocationId.value,
    })
  }
}

watch(() => user.value, () => {
  loadData()
})

watch(() => currentGlobalLocationId.value, () => {
  loadData()
})

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="w-full h-full">
    <div class="lg:col-span-4 col-span-12 space-y-5">
      <Card
        v-if="currentGlobalLocationId"
        :title="t('activities.title')"
      >
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

        <div class="flex justify-end pb-4">
          <Button
            :text="t('activities.registerActivity')"
            btn-class="btn btn-dark btn-sm"
            @click.prevent="goRegisterActivity(0)"
          />
        </div>

        <ActivitiesTable />
      </Card>
      <NoLocationSelected v-else />
    </div>
  </div>
</template>

<route lang="yaml">
name: activities
meta:
  layout: sidebar
  requiresAuth: true
</route>
