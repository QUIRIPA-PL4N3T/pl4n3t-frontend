<script setup lang="ts">
// import Chart from 'chart.js/auto';

const { id } = defineProps<{ id: string }>()

onMounted(() => {
  // const chart = new Chart(
  //     document.getElementById(id),
  //     config
  // )
})
</script>

<template>
  <h2>Title</h2>
  <div class=" p-3">
    <canvas :id="id" class="p-2  aspect-auto " />
  </div>
</template>
