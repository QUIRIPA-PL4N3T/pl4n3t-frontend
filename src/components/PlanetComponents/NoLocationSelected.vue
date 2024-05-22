<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <Card>
    <Alert
      class-name="bg-warning-500 bg-opacity-[14%] text-danger-500"
      icon="heroicons-outline:ban"
    >
      <div>{{ t('currentLocation.required') }}</div>
    </Alert>
  </Card>
</template>
