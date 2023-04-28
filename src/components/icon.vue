<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { icon, size = '24px' } = defineProps<{ icon: String; size?: String }>()
</script>

<template>
  <span>
    <Icon :icon="icon" :width="size" />
  </span>
</template>
