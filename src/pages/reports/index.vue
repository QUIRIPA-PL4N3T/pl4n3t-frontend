<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const period = ref('')
const methodology = ref('ghgProtocol')
const format = ref('pdf')
const emissionSourceStore = useEmissionSourceStore()
const { currentGlobalLocationId } = storeToRefs(emissionSourceStore)

function generateReport() {
  // Report generator
}
</script>

<template>
  <div class="w-full h-full">
    <div class="lg:col-span-4 col-span-12 space-y-5">
      <Card
        v-if="currentGlobalLocationId"
        :title="t('reports.title')"
      >
        <form class="flex flex-col gap-5" @submit="generateReport">
          <div>
            <label for="period">{{ t('reports.period') }}:</label>
            <input id="period" v-model="period" type="text">
          </div>

          <div>
            <label for="methodology">{{ t('reports.methodology') }}:</label>
            <select id="methodology" v-model="methodology">
              <option value="ghgProtocol">
                GHGProtocol
              </option>
              <option value="iso14064-1">
                ISO 14064-1
              </option>
            </select>
          </div>

          <div>
            <label for="format">{{ t('reports.format') }}:</label>
            <select id="format" v-model="format">
              <option value="pdf">
                PDF
              </option>
              <option value="word">
                Word
              </option>
              <option value="excel">
                Excel
              </option>
            </select>
          </div>

          <Button type="submit" class="btn-dark">
            {{ t('reports.generate') }}
          </Button>
        </form>
      </Card>
      <NoLocationSelected v-else />
    </div>
  </div>
</template>

<route lang="yaml">
name: reports
meta:
  layout: sidebar
  requiresAuth: true
</route>
