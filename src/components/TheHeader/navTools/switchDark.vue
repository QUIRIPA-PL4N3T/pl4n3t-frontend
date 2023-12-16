<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeSettingsStore } from '~/stores/themeSettings'

const themeSettingsStore = useThemeSettingsStore()
const { isDark } = storeToRefs(themeSettingsStore)
function toggleDark() {
  themeSettingsStore.toggleDark()
}
</script>

<template>
  <span
    class="lg:bg-gray-500-f7 flex flex-col cursor-pointer items-center justify-center rounded-full bg-slate-50 text-[20px] text-slate-900 lg:h-[32px] lg:w-[32px] dark:text-white lg:dark:bg-slate-900"
    @click="toggleDark"
  >
    <Icon v-if="!isDark" icon="heroicons-outline:moon" />
    <Icon v-else icon="heroicons-outline:sun" />
  </span>
</template>

<style lang=""></style>
