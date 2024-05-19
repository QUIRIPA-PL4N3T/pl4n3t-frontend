<script setup lang="ts">
import { storeToRefs } from 'pinia'

const emissionSourceStore = useEmissionSourceStore()
const { currentGlobalLocation } = storeToRefs(emissionSourceStore)
const { t } = useI18n()
</script>

<template>
  <Card
    v-if="currentGlobalLocation"
    :title="t('goals.title')"
  >
    ...
  </Card>
  <NoLocationSelected v-else />
</template>

<route lang="yaml">
name: goals
meta:
  layout: sidebar
  requiresAuth: true
</route>
