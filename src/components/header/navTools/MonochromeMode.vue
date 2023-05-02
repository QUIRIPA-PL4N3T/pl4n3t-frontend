<script>
import { useThemeSettingsStore } from '~/store/themeSettings'

const themeSettingsStore = useThemeSettingsStore()
export default {
  methods: {
    toggleMonochrome() {
      themeSettingsStore.toggleMonochrome()
    },
  },
}
</script>

<template>
  <span
    class="lg:h-[32px] lg:w-[32px] lg:bg-slate-50 lg:dark:bg-slate-900 dark:text-white text-slate-900 cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center"
    @click="toggleMonochrome"
  >
    <Icon icon="mdi:palette-outline" class="font-bold" />
  </span>
</template>

  <style lang=""></style>
