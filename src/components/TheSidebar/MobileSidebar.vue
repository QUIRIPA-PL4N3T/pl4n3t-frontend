<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { menuItems } from '../../constants/menuItems'

const themeSettingsStore = useThemeSettingsStore()

const companies = ref([
  { name: 'sede 1' },
  { name: 'sede 2' },
  { name: 'sede 3' },
  { name: 'sede 4' },
  { name: 'sede 5' },
  { name: 'sede 6' },
  { name: 'sede 7' },
  { name: 'sede 8' },
  { name: 'sede 9' },
])

function toggleMobileSidebar() {
  themeSettingsStore.toggleMobileSidebar()
}
</script>

<template>
  <div
    :class="`mobile-sidebar bg-white dark:bg-slate-800  ${
      themeSettingsStore.theme === 'bordered'
        ? 'border border-gray-5002'
        : 'shadow-base'
    }   `"
  >
    <div class="logo-segment flex items-center justify-between px-4 py-6">
      <router-link to="/auth/login">
        <img
          v-if="!themeSettingsStore.isDark"
          src="../../assets/images/logo.png"
          alt=""
        >

        <img
          v-if="themeSettingsStore.isDark"
          src="../../assets/images/logo.png"
          alt=""
        >
      </router-link>
      <span
        class="cursor-pointer text-2xl text-slate-900 dark:text-white"
        @click="toggleMobileSidebar"
      ><Icon icon="heroicons:x-mark" /></span>
    </div>

    <DropdownSearch :items="companies" />

    <div class="sidebar-menu h-[calc(100%-100px)] px-4" data-simplebar>
      <div>
        <MenuEnvironment />
      </div>
      <div class="pt-2">
        <MenuLocationSearch />
      </div>
      <NavigationMenu :items="menuItems" />
      <div
        v-if="!themeSettingsStore.sidebarCollapse"
        class="relative mb-[100px] mt-14 rounded-2xl bg-slate-900 p-4 text-center text-white"
      >
        <div class="mx-auto mt-6 max-w-[160px]">
          <div class="widget-title">
            Unlimited Access
          </div>
          <div class="text-xs font-light">
            Upgrade your system to business plan
          </div>
        </div>
        <div class="mt-6">
          <button
            class="btn-sm block w-full bg-white text-slate-900 btn hover:bg-opacity-80"
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mobile-sidebar {
  @apply fixed ltr:left-0 rtl:right-0 top-0   h-full   z-[9999]  w-[280px];
}
</style>
