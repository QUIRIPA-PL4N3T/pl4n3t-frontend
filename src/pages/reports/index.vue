<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <h1>{{ t('reports.title') }}</h1>
</template>

<route lang="yaml">
name: reports
meta:
  layout: sidebar
  requiresAuth: true
</route>
