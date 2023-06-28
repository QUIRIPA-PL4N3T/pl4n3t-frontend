<script>
import { useThemeSettingsStore } from '~/store/themeSettings'

export default {
  mounted() {
    this.$store.themeSettingsStore = useThemeSettingsStore()
  },
}
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
