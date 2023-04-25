<script setup lang="ts">
const { text } = defineProps<{ text: String }>()
</script>

<template>
  <div class=" border-transparent hover:border-slate-900 border-2 rounded ">
    <button
      class="w-full flex justify-center items-center justify-items-center  h-11 bg-slate-900 text-white  rounded m-0.5 "
    >
      <label>{{ text }}</label>
    </button>
  </div>
</template>
