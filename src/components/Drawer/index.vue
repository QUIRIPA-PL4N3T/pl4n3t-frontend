<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { closeIcon, title, textButton, open, direction } = defineProps<{
  title: string
  direction: 'left' | 'right'
  closeIcon?: boolean
  textButton?: string
  classButton?: string
  open: boolean
}>()

const isOpen = ref<boolean>(false)

function classObject() {
  if (open) {
    if (open && direction === 'right')
      return 'translate-x-full right-0'
    return 'translate-x-full left-0'
  }
  return 'hidden'
}
</script>

<template>
  <Button
    :text="textButton ? textButton : title"
    :btn-class="`${classButton} btn-dark btn-sm`"
    @click="isOpen = !isOpen"
  />
  <div
    class="fixed top-0 z-[1000] w-64 h-full transition-all duration-500 transform bg-white shadow-lg"
    :class="classObject"
  >
    <div class="px-6 py-4">
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-3">
          <h2 class="text-lg font-semibold">
            {{ title }} - {{ classObject() }} - {{ open }}
          </h2>
        </div>
        <div v-if="closeIcon">
          <Icon icon="radix-icons:eye" class="p-0 m-0" />
        </div>
      </div>
      <div class="flex w-full">
        <slot name="body" />
      </div>
      <div class="flex w-full">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
