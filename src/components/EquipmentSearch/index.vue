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
    type: [String, Number, Array],
    default: '',
  },
  mode: {
    type: String as () => 'tags' | 'single' | 'multiple' | undefined,
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
const selectedOption = ref(props.modelValue)
const options = ref<Option[]>([])

onMounted(() => {
  loadOptions()
})

watch(selectedOption, (newValue) => {
  emit('update:modelValue', newValue)
})

async function onSearchChange(query: string) {
  await loadOptions(query)
}

async function loadOptions(query = '') {
  if (query.length < 3)
    return
  const data: any = await classificationStore.getCommonEquipments(query)
  options.value = data.map((item: any) => ({
    label: item.name,
    value: item.id,
  }))
}
</script>

<template>
  <div :class="`formkit-wrapper ${classes}`">
    <label :for="label" class="text-slate-700 text-sm leading-6 block mb-3 form-label font-semibold cursor-pointer w-full">{{ label }}</label>
    <Multiselect
      v-model="selectedOption"
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
