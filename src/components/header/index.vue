<script setup lang="ts">
import { useWindow } from '~/mixins/windowMixin'

const { windowData } = useWindow()
const themeSettingsStore = useThemeSettingsStore()

function navbarTypeClass() {
  switch (themeSettingsStore.navbarType) {
    case 'floating':
      return 'floating'
    case 'sticky':
      return 'sticky top-0 z-[999]'
    case 'static':
      return 'static'
    case 'hidden':
      return 'hidden'
    default:
      return 'sticky top-0'
  }
}
function borderSwitchClass() {
  if (
    themeSettingsStore.skin === 'bordered'
        && themeSettingsStore.navbarType !== 'floating'
  )
    return 'border-b border-gray-5002 dark:border-slate-700'
  else if (
    themeSettingsStore.skin === 'bordered'
        && themeSettingsStore.navbarType === 'floating'
  )
    return 'border border-gray-5002 dark:border-slate-700'
  else
    return 'dark:border-b dark:border-slate-700 dark:border-opacity-60'
}
</script>

<template>
  <header :class="navbarTypeClass()">
    <div
      :class="`app-header md:px-6 px-[15px]  dark:bg-slate-800 shadow-base dark:shadow-base3 bg-white ${borderSwitchClass()} ${
        themeSettingsStore.navbarColor
      }
      ${
        themeSettingsStore.menuLayout === 'horizontal' && windowData.width.value > 1280
          ? 'py-1'
          : 'md:py-6 py-3'
      }
      `"
    >
      <div class="flex justify-between items-center h-full">
        <div
          v-if="themeSettingsStore.menuLayout === 'vertical'"
          class="flex items-center md:space-x-4 space-x-2 rtl:space-x-reverse"
        >
          <button
            v-if="themeSettingsStore.sidebarCollapse && windowData.width.value > 1280"
            class="ltr:mr-5 rtl:ml-5 text-xl text-slate-900 dark:text-white"
            @click="themeSettingsStore.sidebarCollapse = false"
          >
            <Icon
              v-if="!themeSettingsStore.direction"
              icon="akar-icons:arrow-right"
            />
            <Icon
              v-if="themeSettingsStore.direction"
              icon="akar-icons:arrow-left"
            />
          </button>
          <MobileLogo v-if="windowData.width.value < 1280" />
          <HandleMobileMenu
            v-if="windowData.width.value < 1280 && windowData.width.value > 768"
          />
          <SearchModal />
        </div>
        <div
          v-if="themeSettingsStore.menuLayout === 'horizontal'"
          class="flex items-center space-x-4 rtl:space-x-reverse"
        >
          <Logo v-if="windowData.width.value > 1280" />
          <MobileLogo v-else />
          <HandleMobileMenu v-if="windowData.width.value < 1280" />
        </div>
        <HorizontalNav
          v-if="
            themeSettingsStore.menuLayout === 'horizontal' && windowData.width.value > 1280
          "
        />
        <div
          class="nav-tools flex items-center lg:space-x-6 space-x-3 rtl:space-x-reverse"
        >
          <Language />
          <SwitchDark />
          <MonochromeMode />
          <!-- <Message v-if="windowData.width.value > 768" /> -->
          <!-- <Notification v-if="windowData.width.value > 768" /> -->
          <Profile v-if="windowData.width.value > 768" />
          <HandleMobileMenu v-if="windowData.width.value < 768" />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.floating .app-header {
  @apply md:mx-6 md:my-8 mx-[15px] my-[15px] rounded-md;
}
</style>
