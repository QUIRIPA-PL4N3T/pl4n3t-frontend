<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { menuItems } from '../../constant/data'

const openClass = 'w-[248px]'
const closeClass = 'w-[72px] close_sidebar'
const shadowBase = ref(false)
const themeSettingsStore = useThemeSettingsStore()
const { sidebarCollapse, skin, semiDark, isMouseHovered, isDark } = storeToRefs(themeSettingsStore)
</script>

<template>
  <div :class="semiDark ? 'dark' : ''">
    <div
      :class="`sidebar-wrapper bg-white dark:bg-slate-800 ${
        skin === 'bordered'
          ? 'border-r border-gray-5002 dark:border-slate-700'
          : 'shadow-base'
      }   ${
        sidebarCollapse
          ? closeClass
          : openClass
      }
      ${isMouseHovered ? 'sidebar-hovered' : ''}

      `"
      @mouseenter="isMouseHovered = true"
      @mouseleave="isMouseHovered = false"
    >
      <div
        :class="`logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6  sticky top-0   px-4  ${
          sidebarCollapse
            ? closeClass
            : openClass
        } ${
          skin === 'bordered'
            ? ' border-b border-r border-gray-5002 dark:border-slate-700'
            : ' border-none'
        }
        ${isMouseHovered ? 'logo-hovered' : ''}

        `"
      >
        <router-link
          v-if="
            !sidebarCollapse
              || isMouseHovered
          "
          to="/auth/login"
        >
          <img
            v-if="
              !isDark
                && !semiDark
            "
            src="../../assets/images/logo.png"
            alt=""
          >

          <img
            v-if="
              isDark
                || semiDark
            "
            src="../../assets/images/logo.png"
            alt=""
          >
        </router-link>
        <router-link
          v-if="
            sidebarCollapse
              && !isMouseHovered
          "
          to="/auth/login"
        >
          <img
            v-if="
              !isDark
                && !semiDark
            "
            src="../../assets/images/logo.png"
            alt=""
          >
          <img
            v-if="
              isDark
                || semiDark
            "
            src="../../assets/images/logo.png"
            alt=""
          >
        </router-link>
        <span
          v-if="
            !sidebarCollapse
              || isMouseHovered
          "
          class="cursor-pointer text-slate-900 dark:text-white text-2xl"
          @click="
            sidebarCollapse
              = !sidebarCollapse
          "
        >
          <!-- <Icon icon="heroicons-outline:menu-alt-3"
        /> -->
          <div
            class="h-4 w-4 border-[1.5px] border-slate-900 dark:border-slate-700 rounded-full transition-all duration-150"
            :class="
              sidebarCollapse
                ? ''
                : 'ring-2 ring-inset ring-offset-4 ring-black-900 dark:ring-slate-400 bg-slate-900 dark:bg-slate-400 dark:ring-offset-slate-700'
            "
          />
        </span>
      </div>
      <div
        class="h-[60px] absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none"
        :class="[shadowBase ? ' opacity-100' : ' opacity-0']"
      />

      <div class="sidebar-menu px-4 h-[calc(100%-80px)]">
        <Navmenu :items="menuItems" />
    </div>
    </div>
  </div>
</template>

<style lang="scss">
.sidebar-wrapper {
  @apply fixed ltr:left-0 rtl:right-0 top-0   h-screen   z-[999];
  transition: width 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);
  will-change: width;
}

.nav-shadow {
  background: linear-gradient(
    rgb(255, 255, 255) 5%,
    rgba(255, 255, 255, 75%) 45%,
    rgba(255, 255, 255, 20%) 80%,
    transparent
  );
}
.dark {
  .nav-shadow {
    background: linear-gradient(
      rgba(#1e293b, 100%) 5%,
      rgba(#1e293b, 75%) 45%,
      rgba(#1e293b, 20%) 80%,
      transparent
    );
  }
}
.sidebar-wrapper.sidebar-hovered {
  width: 248px !important;
}
.logo-segment.logo-hovered {
  width: 248px !important;
}
</style>
