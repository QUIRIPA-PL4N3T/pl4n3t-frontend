<script>
import { recetOrder } from '../../../constant/basic-tablle-data'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination,
  },

  data() {
    return {
      recetOrder,
      current: 1,
      perPage: 6,
      pageRange: 5,
      searchTerm: '',
      actions: [
        {
          name: 'view',
          icon: 'heroicons-outline:eye',
        },
        {
          name: 'edit',
          icon: 'heroicons:pencil-square',
        },
        {
          name: 'delete',
          icon: 'heroicons-outline:trash',
        },
      ],
      options: [
        {
          value: '1',
          label: '1',
        },
        {
          value: '3',
          label: '3',
        },
        {
          value: '5',
          label: '5',
        },
      ],
      columns: [
        {
          label: 'User',
          field: 'user',
        },
        {
          label: 'Product',
          field: 'product',
        },

        {
          label: 'invoice',
          field: 'invoice',
        },

        {
          label: 'price',
          field: 'price',
        },
        {
          label: 'Status',
          field: 'status',
        },
      ],
    }
  },
}
</script>

<template>
  <div>
    <vue-good-table
      :columns="columns"
      style-class=" vgt-table table-head less-padding2   v-middle"
      :rows="recetOrder"
      :pagination-options="{
        enabled: true,
        perPage,
      }"
      :sort-options="{
        enabled: false,
      }"
    >
      <template #table-row="props">
        <div v-if="props.column.field === 'user'" class="flex items-center">
          <div class="flex-none">
            <div class="w-8 h-8 rounded-[100%] ltr:mr-2 rtl:ml-2">
              <img
                :src="props.row.user.image"
                alt=""
                class="w-full h-full rounded-[100%] object-cover"
              >
            </div>
          </div>
          <div class="flex-1 text-start">
            <h4 class="text-sm font-medium text-slate-600">
              {{ props.row.user.name }}
            </h4>
          </div>
        </div>
        <span v-if="props.column.field === 'status'" class="block w-full">
          <span
            class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
            :class="`${
              props.row.status === 'paid'
                ? 'text-success-500 bg-success-500'
                : ''
            }
            ${
              props.row.status === 'due'
                ? 'text-warning-500 bg-warning-500'
                : ''
            }
            ${
              props.row.status === 'pending'
                ? 'text-danger-500 bg-danger-500'
                : ''
            }
            ${
              props.row.status === 'cancled'
                ? 'text-danger-500 bg-danger-500'
                : ''
            }
            ${
              props.row.status === 'shipped'
                ? 'text-primary-500 bg-primary-500'
                : ''
            }

             `"
          >
            {{ props.row.status }}
          </span>
        </span>
      </template>
      <template #pagination-bottom="props">
        <div class="py-4 px-3 flex justify-center">
          <Pagination
            :total="24"
            :current="current"
            :per-page="perPage"
            :page-range="pageRange"
            :page-changed="props.pageChanged"
            :per-page-changed="props.perPageChanged"
            :options="options"
            @page-changed="current = $event"
          >
            >
          </Pagination>
        </div>
      </template>
    </vue-good-table>
  </div>
</template>

<style lang="scss"></style>
