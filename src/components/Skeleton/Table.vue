<script>
export default {
  props: {
    count: {
      type: Number,
      default: 6,
    },
  },

  computed: {
    items() {
      return Array.from({ length: this.count })
    },
  },
}
</script>

<template>
  <div class="w-full bg-white dark:bg-slate-700 shadow-base p-6 rounded-md">
    <table
      class="animate-pulse w-full border-separate border-spacing-4 table-fixed"
    >
      <thead>
        <tr>
          <th scope="col">
            <div class="h-4 bg-[#C4C4C4] dark:bg-slate-500" />
          </th>
          <th scope="col">
            <div class="h-4 bg-[#C4C4C4] dark:bg-slate-500" />
          </th>
          <th scope="col">
            <div class="h-4 bg-[#C4C4C4] dark:bg-slate-500" />
          </th>
          <th scope="col">
            <div class="h-4 bg-[#C4C4C4] dark:bg-slate-500" />
          </th>
          <th scope="col">
            <div class="h-4 bg-[#C4C4C4] dark:bg-slate-500" />
          </th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="(item, i) in items" :key="i">
          <td>
            <div class="h-2 bg-[#C4C4C4] dark:bg-slate-500" />
          </td>
          <td>
            <div class="h-2 bg-[#C4C4C4] dark:bg-slate-500" />
          </td>
          <td>
            <div class="h-2 bg-[#C4C4C4] dark:bg-slate-500" />
          </td>
          <td>
            <div class="h-2 bg-[#C4C4C4] dark:bg-slate-500" />
          </td>
          <td>
            <div class="h-2 bg-[#C4C4C4] dark:bg-slate-500" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang=""></style>
