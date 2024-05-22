<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import { useClassificationStore } from '~/stores/classification'

interface Option {
  label: string
  value: string | number
}
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number, Array] as PropType<string | null | undefined>,
    default: '',
  },
  mode: {
    type: String as PropType<'tags' | 'single' | 'multiple'>,
    default: 'tags',
  },
  closeOnSelect: {
    type: Boolean,
    default: true,
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  createOption: {
    type: Boolean,
    default: true,
  },
  classes: {
    type: String,
    default: '',
  },
  max: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['update:modelValue'])
const classificationStore = useClassificationStore()
const options = ref<Option[]>([])

onMounted(() => {
  loadOptions()
})

async function onSearchChange(query: string) {
  if (query.length < 3)
    return
  await loadOptions(query)
}

async function loadOptions(query?: string) {
  const data: any = await classificationStore.getInvestments(query)
  options.value = data.map((item: any) => ({
    label: item.name,
    value: item.name,
  }))
}

const value = computed({
  get() {
    if (props.modelValue)
      return JSON.parse(props.modelValue)
    return []
  },
  set(value) {
    emit('update:modelValue', JSON.stringify(value))
  },
})
</script>

<template>
  <div :class="`formkit-wrapper ${classes}`">
    <label :for="label" class="text-slate-700 text-sm leading-6 block mb-3 form-label font-semibold cursor-pointer w-full">{{ label }}</label>
    <Multiselect
      v-model="value"
      class="input mt-0 form-control text-sm"
      :options="options"
      :mode="mode"
      :max="max"
      :create-option="createOption"
      :close-on-select="closeOnSelect"
      :searchable="searchable"
      @search-change="onSearchChange"
    />
  </div>
</template>

<style scoped lang="scss">
.multiselect {
  @apply px-0;
}
.multiselect-wrapper{

}
</style>
