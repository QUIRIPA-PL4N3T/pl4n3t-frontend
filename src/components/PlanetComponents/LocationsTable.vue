<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { VueGoodTable } from 'vue-good-table-next'

const { t } = useI18n()
const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)
const router = useRouter()

const current = ref(1)
const perpage = ref(10)
const pageRange = ref(5)

const columns = ref([
  {
    label: 'Id',
    field: 'id',
  },
  {
    label: t('location.name'),
    field: 'name',
  },
  {
    label: t('location.address'),
    field: 'address',
  },

  {
    label: t('location.phone'),
    field: 'phone',
  },
  {
    label: t('location.email'),
    field: 'email',
  },
  {
    label: t('location.employees'),
    field: 'employees',
  },
  {
    label: t('location.status'),
    field: 'status',
  },
  {
    label: 'Action',
    field: 'action',
  },
])

function editItem(id: number) {
  router.push({
    name: 'location-edit',
    params: { id },
  })
}

async function deleteItem(id: number) {
  await companyStore.deleteLocation(id)
}
</script>

<template>
  <div v-if="company.locations">
    <VueGoodTable
      :columns="columns"
      style-class=" vgt-table  lesspadding2 centered "
      :rows="company.locations"
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
        <span v-if="props.column.field === 'order'" class="font-medium">
          {{ `#${props.row.order}` }}
        </span>
        <span
          v-if="props.column.field === 'date'"
          class="text-slate-500 dark:text-slate-400"
        >
          {{ props.row.date }}
        </span>
        <span v-if="props.column.field === 'status'" class="block w-full">
          <span
            class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
            :class="`${props.row.status === 'very-good' ? 'text-success-500 bg-success-500' : ''}
              ${props.row.status === 'very-bad' ? 'text-white bg-black-500' : ''}
              ${props.row.status === 'good' ? 'text-warning-500 bg-warning-500' : ''}
              ${props.row.status === 'fair' ? 'text-yellow-400 bg-yellow-300' : ''}
              ${props.row.status === 'bad' ? 'text-danger-500 bg-danger-500' : ''}`"
          >
            {{ t(`company.status-options.${props.row.status}`) }}
          </span>
        </span>
        <span v-if="props.column.field === 'action'">
          <div class="flex space-x-3 justify-center rtl:space-x-reverse">
            <Tooltip placement="top" arrow theme="dark">
              <template #button>
                <div class="action-btn" @click="editItem(props.row.id)">
                  <Icon icon="heroicons:pencil-square" />
                </div>
              </template>
              <span> {{ t('edit') }}</span>
            </Tooltip>
            <Tooltip placement="top" arrow theme="danger-500">
              <template #button>
                <div class="action-btn" @click="deleteItem(props.row.id)">
                  <Icon icon="heroicons:trash" />
                </div>
              </template>
              <span>{{ t('delete') }}</span>
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
