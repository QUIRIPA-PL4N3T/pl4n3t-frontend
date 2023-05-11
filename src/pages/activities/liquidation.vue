<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <h1>{{ t('activities.processActivities') }}</h1>
</template>

  <route lang="yaml">
name: liquidation
meta:
  layout: sidebar
  requiresAuth: true
  </route>
