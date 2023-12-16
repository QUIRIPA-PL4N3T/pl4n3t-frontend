<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <h1>{{ t('goals.title') }}</h1>
</template>

<route lang="yaml">
name: goals
meta:
  layout: sidebar
  requiresAuth: true
</route>
