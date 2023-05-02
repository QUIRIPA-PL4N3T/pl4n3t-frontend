<script>
import { useThemeSettingsStore } from '~/store/themeSettings'

const themeSettingsStore = useThemeSettingsStore()

export default {
  methods: {
    toogleDark() {
      themeSettingsStore.toogleDark()
    },
  },
}
</script>

<template>
  <span
    class="lg:h-[32px] lg:w-[32px] lg:bg-gray-500-f7 bg-slate-50 lg:dark:bg-slate-900 dark:text-white text-slate-900 cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center"
    @click="toogleDark"
  >
    <Icon v-if="!$store.themeSettingsStore.isDark" icon="heroicons-outline:moon" />
    <Icon v-else-if="$store.themeSettingsStore.isDark" icon="heroicons-outline:sun" />
  </span>
</template>

<style lang=""></style>
