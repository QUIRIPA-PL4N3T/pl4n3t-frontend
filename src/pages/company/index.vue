<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <h1>{{ t('company.title') }}</h1>
</template>

<route lang="yaml">
name: company
meta:
  layout: sidebar
  requiresAuth: true
</route>
