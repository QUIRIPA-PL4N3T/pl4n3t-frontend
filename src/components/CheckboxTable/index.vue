<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  rows: {
    type: Array as () => string[],
    required: true,
  },
  columns: {
    type: Array as () => string[],
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const tableData = ref<Record<string, Record<string, boolean>>>({})

function initializeTableData() {
  if (props.modelValue) {
    try {
      tableData.value = JSON.parse(props.modelValue)
    }
    catch (error) {
      console.error('Invalid JSON string:', error)
    }
  }
  else {
    props.rows.forEach((row) => {
      tableData.value[row] = {}
      props.columns.forEach((column) => {
        tableData.value[row][column] = false
      })
    })
  }
}

initializeTableData()

function toggleCheckbox(row: string, column: string) {
  tableData.value[row][column] = !tableData.value[row][column]
  emit('update:modelValue', tableData.value)
}

function isChecked(row: string, column: string) {
  return tableData.value[row]?.[column] || false
}

watch(() => props.modelValue, initializeTableData)
</script>

<template>
  <div class="">
    <label :for="label" class="text-slate-700 text-sm leading-6 block mb-3 form-label font-semibold cursor-pointer w-full">{{ label }}</label>
    <table class="border-separate border border-slate-200">
      <thead>
        <tr>
          <th />
          <th v-for="column in columns" :key="column" class="text-sm font-light">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row">
          <td class="text-sm font-light">
            {{ row }}
          </td>
          <td v-for="column in columns" :key="column">
            <input
              class="formkit-input"
              type="checkbox"
              :checked="isChecked(row, column)"
              @change="toggleCheckbox(row, column)"
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  @apply w-full;
}
th, td {
  @apply text-center p-1;
}
.formkit-input {
  @apply w-[24px] h-[24px] rounded;
}
</style>
