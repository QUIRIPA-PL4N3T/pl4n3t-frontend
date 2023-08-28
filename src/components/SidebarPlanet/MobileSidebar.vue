<script>
import { Icon } from '@iconify/vue'
import { defineComponent } from 'vue'
import { menuItems } from '../../constant/data'

const themeSettingsStore = useThemeSettingsStore()

export default defineComponent({
  components: {
    Icon,
  },
  data() {
    const companies = [
      { name: 'sede 1' },
      { name: 'sede 2' },
      { name: 'sede 3' },
      { name: 'sede 4' },
      { name: 'sede 5' },
      { name: 'sede 6' },
      { name: 'sede 7' },
      { name: 'sede 8' },
      { name: 'sede 9' },
    ]

    return {
      menuItems,
      openClass: 'w-[248px]',
      closeClass: 'w-[72px] close_sidebar',
      companies,

    }
  },
  methods: {
    toggleMobileSidebar() {
      themeSettingsStore.toggleMobileSidebar()
    },
  },
})
</script>

<template>
  <div
    :class="`mobile-sidebar bg-white dark:bg-slate-800  ${
      $store.themeSettingsStore.theme === 'bordered'
        ? 'border border-gray-5002'
        : 'shadow-base'
    }   `"
  >
    <div class="logo-segment flex justify-between items-center px-4 py-6">
      <router-link to="/auth/login">
        <img
          v-if="!$store.themeSettingsStore.isDark"
          src="../../assets/images/logo.png"
          alt=""
        >

        <img
          v-if="$store.themeSettingsStore.isDark"
          src="../../assets/images/logo.png"
          alt=""
        >
      </router-link>
      <span
        class="cursor-pointer text-slate-900 dark:text-white text-2xl"
        @click="toggleMobileSidebar"
      ><Icon icon="heroicons:x-mark" /></span>
    </div>

    <DropdownSearch :items="companies" />

    <div class="sidebar-menu px-4 h-[calc(100%-100px)]" data-simplebar>
      <NavigationMenu :items="menuItems" />
      <div
        v-if="!$store.themeSettingsStore.sidebarCollapse"
        class="bg-slate-900 mb-[100px] mt-14 p-4 relative text-center rounded-2xl text-white"
      >
        <div class="max-w-[160px] mx-auto mt-6">
          <div class="widget-title">
            Unlimited Access
          </div>
          <div class="text-xs font-light">
            Upgrade your system to business plan
          </div>
        </div>
        <div class="mt-6">
          <button
            class="btn bg-white hover:bg-opacity-80 text-slate-900 btn-sm w-full block"
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
