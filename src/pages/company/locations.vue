<script setup lang="ts">
import { storeToRefs } from 'pinia'

const router = useRouter()

const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)
const { t } = useI18n()

function goEditLocation(id: number) {
  router.push({
    name: 'location-edit',
    params: { id },
  })
}
</script>

<template>
  <div class="w-full h-full">
    <div class="lg:col-span-4 col-span-12 space-y-5">
      <Card :title="t('locations.title')" noborder>
        <div class="flex justify-end pb-4">
          <Button
            :text="t('location.add')"
            btn-class="btn btn-dark btn-sm"
            @click.prevent="goEditLocation(0)"
          />
        </div>
        <LocationsTable />
        <VueGoodTable
          style-class="vgt-table lesspadding2 centered "
          :rows="company.locations"
        />
      </Card>
    </div>
  </div>
</template>

<route lang="yaml">
name: locations
meta:
  layout: sidebar
  requiresAuth: true
</route>
