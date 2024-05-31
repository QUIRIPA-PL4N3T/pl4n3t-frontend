<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { VueGoodTable } from 'vue-good-table-next'

const { t } = useI18n()
const emissionFactorStore = useEmissionFactorStore()
const { emissionResults } = storeToRefs(emissionFactorStore)

const current = ref(1)
const perPage = ref(10)
const pageRange = ref(5)

const columns = ref([
  {
    label: t('activities.year'),
    field: 'year',
  },
  {
    label: t('activities.month'),
    field: 'month',
  },
  {
    label: t('activities.source'),
    field: 'source_name',
  },
  {
    label: t('activities.usage'),
    field: 'usage',
  },
  {
    label: t('activities.units'),
    field: 'unit_symbol',
  },
  {
    label: t('activities.totalCo2e'),
    field: 'total_co2e',
  },
  {
    label: t('activities.co2'),
    field: 'co2',
  },
  {
    label: t('activities.hc4'),
    field: 'ch4',
  },
  {
    label: t('activities.n20'),
    field: 'n2o',
  },
  {
    label: 'Action',
    field: 'action',
  },
])
</script>

<template>
  <div v-if="emissionResults">
    <VueGoodTable
      :columns="columns"
      style-class=" vgt-table less-padding2 centered "
      :rows="emissionResults"
      :pagination-options="{
        enabled: true,
        perPage,
      }"
      :sort-options="{
        enabled: false,
      }"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true,
        selectionInfoClass: 'custom-class',
        selectionText: 'rows selected',
        clearSelectionText: 'clear',
        disableSelectInfo: true,
        selectAllByGroup: true,
      }"
    >
      <template #table-row="props">
        <span v-if="props.column.field === 'name'" class="flex items-center">
          <span
            class="text-sm text-slate-600 dark:text-slate-300 capitalize font-normal"
          >{{ props.row.name }}</span>
        </span>
        <span v-if="props.column.field === 'action'">
          <div class="flex space-x-3 justify-center rtl:space-x-reverse">
            <Tooltip placement="top" arrow theme="dark">
              <template #button>
                <div class="action-btn">
                  <Icon icon="heroicons:eye" />
                </div>
              </template>
              <span> View</span>
            </Tooltip>
            <Tooltip placement="top" arrow theme="danger-500">
              <template #button>
                <div class="action-btn">
                  <Icon icon="heroicons:trash" />
                </div>
              </template>
              <span>Delete</span>
            </Tooltip>
          </div>
        </span>
      </template>
      <template #pagination-bottom="props">
        <div class="py-4 px-3 flex justify-center">
          <Pagination
            :total="emissionResults.length"
            :current="current"
            :per-page="perPage"
            :page-range="pageRange"
            :page-changed="props.pageChanged"
            :per-page-changed="props.perPageChanged"
            @page-changed="current = $event"
          >
            >
          </Pagination>
        </div>
      </template>
    </VueGoodTable>
  </div>
</template>

  <style lang="scss" scoped>
  .action-btn {
    @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
  }
  </style>
