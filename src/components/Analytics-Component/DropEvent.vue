<script>
import { MenuItem } from '@headlessui/vue'
import Dropdown from '@/components/Dropdown'
import Icon from '@/components/Icon'

export default {
  components: {
    Dropdown,
    Icon,
    MenuItem,
  },
  data() {
    return {
      actions: [
        {
          name: 'Last 28 Days',
        },
        {
          name: ' Last Month ',
        },
        {
          name: '  Last Year ',
        },
      ],
    }
  },
}
</script>

<template>
  <div>
    <Dropdown class-menu-items=" w-[140px]">
      <span
        class="text-lg inline-flex h-6 w-6 flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded dark:text-slate-400"
      ><Icon icon="heroicons-outline:dots-horizontal" /></span>
      <template #menus>
        <MenuItem v-for="(item, i) in actions" :key="i">
          <div
            class="

                  hover:bg-secondary-500 dark:hover:bg-slate-600 dark:bg-opacity-60 hover:text-white text-slate-900 dark:text-slate-300
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center "
          >
            <span>{{ item.name }}</span>
          </div>
        </MenuItem>
      </template>
    </Dropdown>
  </div>
</template>

<style lang=""></style>
