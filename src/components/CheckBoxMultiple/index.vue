<script setup lang="ts">
import type { PropType } from 'vue'

interface Option {
  label: string
  value: string | number
}

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String as PropType< string | null | undefined>,
    default: '',
  },
  options: {
    type: Array as PropType<Option[]>,
    required: true,
  },
  outerClass: {
    type: String,
    default: '',
  },
  fieldsetClass: {
    type: String,
    default: 'border border-gray-400 formkit-fieldset py-2 px-2 rounded',
  },
})
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    if (typeof props.modelValue === 'string') {
      try {
        return JSON.parse(props.modelValue)
      }
      catch {
        return []
      }
    }
    return []
  },
  set(value) {
    emit('update:modelValue', JSON.stringify(value))
  },
})

function toggleSelection(optionValue: string | number) {
  const currentValue = value.value.slice()
  const index = currentValue.indexOf(optionValue)
  if (index === -1)
    currentValue.push(optionValue)
  else
    currentValue.splice(index, 1)

  value.value = currentValue
}
</script>

<template>
  <div :class="outerClass">
    <label class="text-slate-700 text-sm leading-6 block mb-1 form-label font-semibold cursor-pointer w-full">{{ label }}</label>
    <fieldset :class="fieldsetClass">
      <div v-for="option in options" :key="option.value" class="flex mb-2">
        <input
          :id="`${name}-${option.value}`"
          type="checkbox"
          :value="option.value"
          :checked="value.includes(option.value)"
          class="formkit-input formkit-input-checkbox"
          @change="toggleSelection(option.value)"
        >
        <label :for="`${name}-${option.value}`" class="formkit-label-checkbox">{{ option.label }}</label>
      </div>
    </fieldset>
  </div>
</template>

<style scoped>
.formkit-input {
  @apply w-[24px] h-[24px] rounded;
}

.formkit-label-checkbox {
  @apply text-slate-700 ps-2 text-sm leading-6 block cursor-pointer w-full;
}
</style>
