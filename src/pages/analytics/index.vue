<script setup lang="ts">
import { storeToRefs } from 'pinia'

const emissionSourceStore = useEmissionSourceStore()
const { currentGlobalLocationId } = storeToRefs(emissionSourceStore)
const { t } = useI18n()
</script>

<template>
  <Card
    v-if="currentGlobalLocationId"
    :title="t('analytics.title')"
  >
    ...
  </Card>
  <NoLocationSelected v-else />
</template>

<route lang="yaml">
name: analytics
meta:
  layout: sidebar
  requiresAuth: true
  </route>
