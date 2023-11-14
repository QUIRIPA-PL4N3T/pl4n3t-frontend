<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
import { useThemeSettingsStore } from '~/stores/themeSettings'

const themeSettingsStore = useThemeSettingsStore()
provide('themeSettings', themeSettingsStore)

useHead({
  title: 'PL4N3T',
  meta: [
    { name: 'description', content: 'application to manage carbon footprint in companies' },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
