<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <h1>{{ t('activities.register') }}</h1>
</template>

  <route lang="yaml">
name: register
meta:
  layout: sidebar
  requiresAuth: true
  </route>
