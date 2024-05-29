<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWindowSize } from '@vueuse/core'

const themeSettingsStore = useThemeSettingsStore()

const { menuLayout, sidebarHidden, sidebarCollapse, mobileSidebar } = storeToRefs(themeSettingsStore)
const { width } = useWindowSize()
const authStore = useAuthStore()
const { loadingToken } = storeToRefs(authStore)
const { t } = useI18n()

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
  <main class="flex flex-col min-h-screen text-gray-700 dark:text-gray-200 bg-gray-100">
    <TheHeader :class="width > 1280 ? switchHeaderClass() : ''" />
    <TheSidebar v-if="width > 1280" />
    <!-- main sidebar end -->
    <Transition name="mobilemenu">
      <MobileSidebar
        v-if="width < 1280 && mobileSidebar"
      />
    </Transition>
    <Transition name="overlay-fade">
      <div
        v-if="width < 1280 && mobileSidebar"
        class="overlay fixed inset-0 z-[999] bg-slate-900 bg-opacity-70 backdrop-blur-[3px] backdrop-brightness-10 backdrop-filter"
        @click="mobileSidebar = false"
      />
    </Transition>
    <main class="h-full flex-1">
      <div class="py-6">
        <div
          class="px-4 md:px-8 sm:px-6"
          :class="width > 1280 ? switchHeaderClass() : ''"
        >
          <Breadcrumbs />
          <div v-if="loadingToken" class="w-full">
            <BasicLoader :text="t('refreshing_token')" />
          </div>
          <RouterView v-else />
        </div>
      </div>
    </main>
    <TheFooter :class="width > 1280 ? switchHeaderClass() : ''" />
  </main>
</template>
