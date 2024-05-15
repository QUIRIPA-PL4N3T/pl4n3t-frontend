<script>
export default {
  components: {
  },
  props: {
    label: {
      type: String,
      default: 'primary-500',
    },
    badgeClass: {
      type: String,
      default: 'bg-primary-500 text-white',
    },
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <span class="badge" :class="badgeClass">{{ label }}</span>
  <span v-if="$slots.default" class="inline-flex items-center"><slot /></span>
</template>

<style lang="scss" scoped>
.badge {
  @apply py-1 px-2 text-xs  capitalize font-semibold rounded-[.358rem] whitespace-nowrap  align-baseline inline-flex;
  &.pill {
    @apply rounded-[999px];
  }
}
</style>
