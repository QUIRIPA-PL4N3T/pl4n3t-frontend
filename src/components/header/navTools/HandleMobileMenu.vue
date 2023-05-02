<script setup>
import { useThemeSettingsStore } from '~/store/themeSettings'

const themeSettingsStore = useThemeSettingsStore()

// dispath toggleMsidebar
function toggleMsidebar() {
  themeSettingsStore.toggleMsidebar()
}
</script>

<template>
  <div
    class="cursor-pointer text-slate-900 dark:text-white text-2xl"
    @click="toggleMsidebar"
  >
    <Icon icon="heroicons-outline:menu-alt-3" />
  </div>
</template>

<style lang="scss"></style>
