<script setup lang="ts">
import { storeToRefs } from 'pinia'
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
  group: {
    type: [String, Number, undefined] as PropType<string | number | undefined>,
    default: undefined,
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
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const classificationStore = useClassificationStore()
const options = ref<Option[]>([])

onMounted(() => {
  loadOptions()
})

watch(() => props.group, () => {
  loadOptions()
})

watch(() => user.value, () => {
  loadOptions()
})

async function onSearchChange(query: string) {
  if (query.length < 3)
    return
  await loadOptions(query)
}

async function loadOptions(query = '') {
  if (!user.value)
    return

  const params: any = {}
  if (query)
    params.name = query
  if (props.group)
    params.group = props.group

  const data: any = await classificationStore.getCommonEquipments(params)
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
