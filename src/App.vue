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
    { name: 'description', content: 'Application to manage carbon footprint in companies' },
    {
      name: 'theme-color',
      content: () => '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => '/logo-p.png',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
