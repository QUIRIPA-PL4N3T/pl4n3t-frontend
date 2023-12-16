<script setup>
import { useThemeSettingsStore } from '~/stores/themeSettings'

const themeSettingsStore = useThemeSettingsStore()

// dispath toggleMobileSidebar
function toggleMobileSidebar() {
  themeSettingsStore.toggleMobileSidebar()
}
</script>

<template>
  <div
    class="cursor-pointer text-2xl text-slate-900 dark:text-white"
    @click="toggleMobileSidebar"
  >
    <Icon icon="heroicons-outline:menu-alt-3" />
  </div>
</template>

<style lang="scss"></style>
