<script setup>
import { useThemeSettingsStore } from '~/store/themeSettings'

const themeSettingsStore = useThemeSettingsStore()

// dispath toggleMobilsidebar
function toggleMobilsidebar() {
  themeSettingsStore.toggleMobilsidebar()
}
</script>

<template>
  <div
    class="cursor-pointer text-slate-900 dark:text-white text-2xl"
    @click="toggleMobilsidebar"
  >
    <Icon icon="heroicons-outline:menu-alt-3" />
  </div>
</template>

<style lang="scss"></style>
