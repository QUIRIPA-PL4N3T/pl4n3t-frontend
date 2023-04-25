<script setup lang="ts">
const { image } = defineProps<{ image: string }>()
</script>

<template>
  <img :src="image" alt="">
</template>
