<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { icon } = defineProps<{ icon: String }>()
</script>

<template>
  <span>
    <Icon :icon="icon" />
  </span>
</template>
