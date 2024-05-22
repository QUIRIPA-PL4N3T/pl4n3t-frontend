<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'primary-500',
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
  },
  className: {
    type: String,
    default: '',
  },
})

let isDestroy = $ref(false)

function destroy() {
  isDestroy = true
}
</script>

<template>
  <div
    v-if="!isDestroy"
    class="py-[18px] px-6 font-normal text-sm rounded-md"
    :class="`${className}`"
  >
    <div class="flex items-start space-x-3 rtl:space-x-reverse">
      <div v-if="icon" class="flex-0 text-[22px]">
        <Icon :icon="icon" />
      </div>
      <div class="flex-1">
        <slot />
      </div>
      <div
        v-if="dismissible"
        class="flex-0 text-2xl cursor-pointer"
        @click="destroy"
      >
        <Icon icon="heroicons-outline:x" />
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
