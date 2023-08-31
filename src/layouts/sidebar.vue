<script setup lang="ts">
import { storeToRefs } from 'pinia'

const themeSettingsStore = useThemeSettingsStore()

const { menuLayout, sidebarHidden, sidebarCollapse, mobileSidebar } = storeToRefs(themeSettingsStore)
const { width } = useWindowSize()

function switchHeaderClass() {
  if (
    menuLayout.value === 'horizontal'
        || sidebarHidden.value
  )
    return 'ml-0'
  else if (sidebarCollapse.value)
    return 'ml-[72px]'
  else
    return 'ml-[248px]'
}
</script>

<template>
  <main class="text-gray-700 dark:text-gray-200">
    <Header :class="width > 1280 ? switchHeaderClass() : ''" />
    <SidebarPlanet v-if="width > 1280" />
    <!-- main sidebar end -->
    <Transition name="mobilemenu">
      <MobileSidebar
        v-if="width < 1280 && mobileSidebar"
      />
    </Transition>
    <Transition name="overlay-fade">
      <div
        v-if="width < 1280 && mobileSidebar"
        class="overlay bg-slate-900 bg-opacity-70 backdrop-filter backdrop-blur-[3px] backdrop-brightness-10 fixed inset-0 z-[999]"
        @click="mobileSidebar = false"
      />
    </Transition>
    <main class="flex-1 h-full">
      <div class="py-6">
        <div
          class="px-4 sm:px-6 md:px-8"
          :class="width > 1280 ? switchHeaderClass() : ''"
        >
          <Breadcrumbs />
          <RouterView />
        </div>
      </div>
    </main>
  </main>
</template>

<route lang="yaml">
name: sidebar
meta:
  requiresAuth: true
</route>
