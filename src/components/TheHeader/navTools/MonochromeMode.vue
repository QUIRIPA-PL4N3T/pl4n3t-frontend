<script setup lang="ts">
import { useThemeSettingsStore } from '~/stores/themeSettings'

const themeSettingsStore = useThemeSettingsStore()

function toggleMonochrome() {
  themeSettingsStore.toggleMonochrome()
}
</script>

<template>
  <span
    class="flex flex-col cursor-pointer items-center justify-center rounded-full text-[20px] text-slate-900 lg:h-[32px] lg:w-[32px] lg:bg-slate-50 dark:text-white lg:dark:bg-slate-900"
    @click="toggleMonochrome"
  >
    <Icon icon="mdi:palette-outline" class="font-bold" />
  </span>
</template>

  <style lang=""></style>
