<script setup lang="ts">
import { Icon } from '@iconify/vue'

const {
  size = 'md',
  closeIcon,
  title,
  textButton,
  open = false,
  direction = 'right',
} = defineProps<{
  size?: 'sm' | 'md' | 'lg'
  title: string
  direction: 'left' | 'right'
  closeIcon?: boolean
  textButton?: string
  classButton?: string
  open: boolean
}>()

const emit = defineEmits<{
  (event: 'close', value: boolean): void
}>()

let translate = $ref<string>(reaction(false))

function reaction(open: boolean): string {
  return open
    ? 'translate-x-0'
    : direction === 'right' ? 'translate-x-full' : '-translate-x-full'
}

function getSize(size: string): string {
  switch (size) {
    case 'sm':
      return '60'
    case 'md':
      return '1/3'
    default:
      return 'full'
  }
}

watch(() => open, () => {
  translate = reaction(open)
})
</script>

<template>
  <Button
    :text="textButton ? textButton : title"
    :btn-class="`${classButton} btn-dark btn-sm`"
    @click="emit('close', !open)"
  />
  <div
    class="fixed top-0 z-[1000] h-full transition-all duration-500 transform bg-white shadow-lg"
    :class="[`${direction}-0`, translate, `w-${getSize(size)}`]"
  >
    <div class="px-6 py-4">
      <div class="flex flex-wrap justify-between items-center">
        <div class="col-span-3 text-left">
          {{ title }}
        </div>
        <div v-show="closeIcon" class="text-black-500 col-span-1">
          <Button btn-class="btn-link" @click="emit('close', !open)">
            <Icon icon="material-symbols-light:close" class="size-6 p-0 m-0" />
          </Button>
        </div>
      </div>
      <div class="flex w-full h-screen p-2 overflow-auto scrollbar shadow-base">
        <slot name="body" class="scrollbar" />
      </div>
      <div class="flex w-full">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/* width */
.scrollbar::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.scrollbar::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
