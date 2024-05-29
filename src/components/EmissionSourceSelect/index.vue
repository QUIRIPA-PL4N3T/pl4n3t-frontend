<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, defineEmits, ref, watch } from 'vue'
import type { EmissionsSource } from '~/api-client'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Object as PropType<EmissionsSource | null>,
    default: null,
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array as PropType<Array<EmissionsSource>>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const searchQuery = ref('')
const selectedItem = ref<EmissionsSource | null>(null)

const filteredOptions = computed(() => {
  if (searchQuery.value) {
    return props.options.filter(option =>
      option.name!.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }
  return props.options
})

function selectItem(item: EmissionsSource) {
  selectedItem.value = item
  emit('update:modelValue', item)
}

watch(() => props.modelValue, (newVal) => {
  selectedItem.value = newVal as EmissionsSource
  emit('update:modelValue', selectedItem.value)
})
</script>

<template>
  <div class="flex flex-col">
    <label :for="label" class="text-slate-700 text-sm leading-6 block mb-3 form-label font-semibold cursor-pointer w-full">{{ label }}</label>
    <div class="autocomplete">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="label"
        class="autocomplete-input"
      >
      <div v-if="options.length && filteredOptions.length" class="autocomplete-options p-0">
        <div
          v-for="item in filteredOptions"
          :key="item.id"
          class="autocomplete-item text-sm"
          :class="{ selected: selectedItem && item.id === selectedItem.id }"
          @click="selectItem(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.autocomplete {
  @apply w-full m-auto;
}

.autocomplete-input {
  @apply w-full border p-2 border-neutral-300 rounded text-sm;

}

.autocomplete-options {
  @apply w-full overflow-y-auto border border-neutral-300 z-10 rounded mt-2 max-h-[400px];
}

.autocomplete-item {
  @apply p-1 cursor-pointer;
}

.autocomplete-item:hover,
.autocomplete-item.selected
{
  @apply bg-neutral-300;
}
</style>
