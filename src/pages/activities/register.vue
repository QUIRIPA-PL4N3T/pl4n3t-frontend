<script setup lang="ts">
import { storeToRefs } from 'pinia'

const router = useRouter()
const classificationStore = useClassificationStore()
const { classificationGroups } = storeToRefs(classificationStore)

const { t } = useI18n()

function filterByGroup(id: number) {
  // TODO: add equipment filter by group
  console.warn(id)
}

function goRegisterActivity(id: number) {
  router.push({
    name: 'emission-source-edit',
    params: { id },
  })
}
</script>

<template>
  <div class="w-full h-full">
    <div class="lg:col-span-4 col-span-12 space-y-5">
      <Card :title="t('activities.modal.title')" noborder>
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
            :text="t('equipment.add')"
            btn-class="btn btn-dark btn-sm"
            @click.prevent="goRegisterActivity(0)"
          />
        </div>

        <ActivitiesTable />
      </Card>
    </div>
  </div>
</template>

<route lang="yaml">
name: register
meta:
  layout: sidebar
  requiresAuth: true
</route>
