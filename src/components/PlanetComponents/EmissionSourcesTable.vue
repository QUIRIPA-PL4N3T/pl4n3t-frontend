<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { VueGoodTable } from 'vue-good-table-next'

const router = useRouter()
const { t } = useI18n()
const emissionSourceStore = useEmissionSourceStore()
const { locationEmissionSources } = storeToRefs(emissionSourceStore)

const current = ref(1)
const perpage = ref(10)
const pageRange = ref(5)

const columns = ref([
  {
    label: t('emissionSource.code'),
    field: 'code',
  },
  {
    label: t('emissionSource.default_name'),
    field: 'emission_source_name',
  },
  {
    label: t('emissionSource.group'),
    field: 'group_name',
  },
  {
    label: 'Action',
    field: 'action',
  },
])
function editItem(id: number) {
  router.push({
    name: 'emission-source-edit',
    params: { id },
  })
}
</script>

<template>
  <div v-if="locationEmissionSources">
    <VueGoodTable
      :columns="columns"
      style-class=" vgt-table less-padding centered "
      :rows="locationEmissionSources"
      :pagination-options="{
        enabled: true,
        perPage: perpage,
      }"
      :sort-options="{
        enabled: false,
      }"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectioninfoClass: 'custom-class',
        selectionText: 'rows selected',
        clearSelectionText: 'clear',
        disableSelectinfo: true, // disable the select info-500 panel on top
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
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
                <div class="action-btn" @click="editItem(props.row.id)">
                  <Icon icon="heroicons:pencil-square" />
                </div>
              </template>
              <span> Edit</span>
            </Tooltip>
          </div>
        </span>
      </template>
      <template #pagination-bottom="props">
        <div class="py-4 px-3 flex justify-center">
          <Pagination
            :total="locationEmissionSources.length"
            :current="current"
            :per-page="perpage"
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
