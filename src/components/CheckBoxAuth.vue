<script setup lang="ts">
import imageCk from '~/assets/images/icons/ck-white.svg'

const {
  label,
  checked = false,
  disabled = false,
  name = 'checkbox',
  activeClass = 'ing-black-500  bg-slate-900 dark:bg-slate-700 dark:ring-slate-700',
  value,
} = defineProps<{
  label: string
  checked?: boolean
  disabled?: boolean
  name?: string
  value: boolean
  activeClass?: string
}>()

const emit = defineEmits<{
  (event: 'onSelected', value: boolean): void
}>()

const ck = ref(checked)

function onChange() {
  ck.value = !ck.value
  return ck.value
}
</script>

<template>
  <div>
    <label
      class="flex items-center"
    >
      <input
        type="checkbox"
        class="hidden"
        :disabled="disabled"
        :name="name"
        :value="value"
        v-bind="$attrs"
        @change=" emit('onSelected', ck)"
        @input="onChange"
      >
      <span
        class="h-4 w-4 border flex-none border-slate-100 dark:border-slate-800 rounded inline-flex ltr:mr-3 rtl:ml-3 relative transition-all duration-150"
        :class="
          ck
            ? `${activeClass} ring-2 ring-offset-2 dark:ring-offset-slate-800 `
            : 'bg-slate-100 border-none'
        "
      >
        <img
          v-if="ck"
          :src="imageCk"
          alt=""
          class="h-[10px] w-[10px] block m-auto"
        >
      </span>
      <span
        v-if="label"
        class="text-slate-500 dark:text-slate-400 text-sm leading-6 ml-3"
      >
        {{ label }}
      </span>
    </label>
  </div>
</template>
