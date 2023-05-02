<script>
import { Icon } from '@iconify/vue'

export default {
  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
      default: 'heroicons-outline:home',
    },
  },
}
</script>

<template>
  <span>
    <Icon :icon="icon" />
  </span>
</template>

<style lang=""></style>
