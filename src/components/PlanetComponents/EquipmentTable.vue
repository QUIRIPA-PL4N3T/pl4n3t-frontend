<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { VueGoodTable } from 'vue-good-table-next'

const router = useRouter()
const { t } = useI18n()
const emissionSourceStore = useEmissionSourceStore()
const { locationEquipments } = storeToRefs(emissionSourceStore)

const current = ref(1)
const perpage = ref(10)
const pageRange = ref(5)

const columns = ref([
  {
    label: 'Id',
    field: 'id',
  },
  {
    label: t('equipment.name'),
    field: 'name',
  },
  {
    label: t('equipment.code'),
    field: 'code',
  },
  {
    label: t('equipment.description'),
    field: 'description',
  },

  {
    label: t('equipment.group'),
    field: 'group',
  },
  {
    label: t('equipment.source_type'),
    field: 'source_type',
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

async function deleteItem(id: number) {
  await emissionSourceStore.deleteEmissionSource(id)
}
</script>

<template>
  <div v-if="locationEquipments">
    <VueGoodTable
      :columns="columns"
      style-class=" vgt-table  lesspadding2 centered "
      :rows="locationEquipments"
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
            <Tooltip placement="top" arrow theme="danger-500">
              <template #button>
                <div class="action-btn" @click="deleteItem(props.row.id)">
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
            :total="50"
            :current="current"
            :per-page="perpage"
            :page-range="pageRange"
            :page-changed="props.pageChanged"
            :per-page-changed="props.perPageChanged"
            @pageChanged="current = $event"
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
