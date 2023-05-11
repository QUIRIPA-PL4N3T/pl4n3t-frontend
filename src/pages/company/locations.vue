<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <h1>{{ t('company.locations') }}</h1>
</template>

<route lang="yaml">
name: locations
meta:
  layout: sidebar
  requiresAuth: true
</route>
