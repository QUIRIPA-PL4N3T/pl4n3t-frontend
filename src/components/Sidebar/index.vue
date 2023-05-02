<script>
// import { Icon } from "@iconify/vue";
import { defineComponent } from 'vue'
import { SimpleBar } from 'simplebar-vue3'
import { onMounted, ref } from 'vue'
import { menuItems } from '../../constant/data'

export default defineComponent({
  components: {
    SimpleBar,
  },

  setup() {
    const shadowbase = ref(false)
    const simplebarInstance = ref(null)
    onMounted(() => {
      simplebarInstance.value
        .getScrollElement()
        .addEventListener('scroll', () => {
          if (simplebarInstance.value.getScrollElement().scrollTop > 50) {
            simplebarInstance.value.getScrollElement().classList.add('scroll')
            shadowbase.value = true
          }
          else {
            simplebarInstance.value
              .getScrollElement()
              .classList.remove('scroll')
            shadowbase.value = false
          }
        })
    })

    return {
      simplebarInstance,
      shadowbase,
    }
  },
  data() {
    return {
      menuItems,
      openClass: 'w-[248px]',
      closeClass: 'w-[72px] close_sidebar',
    }
  },
})
</script>

<template>
  <div :class="$store.themeSettingsStore.semidark ? 'dark' : ''">
    <div
      :class="`sidebar-wrapper bg-white dark:bg-slate-800    ${
        $store.themeSettingsStore.skin === 'bordered'
          ? 'border-r border-gray-5002 dark:border-slate-700'
          : 'shadow-base'
      }   ${
        $store.themeSettingsStore.sidebarCollasp
          ? closeClass
          : openClass
      }
      ${$store.themeSettingsStore.isMouseHovered ? 'sidebar-hovered' : ''}

      `"
      @mouseenter="$store.themeSettingsStore.isMouseHovered = true"
      @mouseleave="$store.themeSettingsStore.isMouseHovered = false"
    >
      <div
        :class="`logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6  sticky top-0   px-4  ${
          $store.themeSettingsStore.sidebarCollasp
            ? closeClass
            : openClass
        } ${
          $store.themeSettingsStore.skin === 'bordered'
            ? ' border-b border-r border-gray-5002 dark:border-slate-700'
            : ' border-none'
        }
        ${$store.themeSettingsStore.isMouseHovered ? 'logo-hovered' : ''}

        `"
      >
        <router-link
          v-if="
            !$store.themeSettingsStore.sidebarCollasp
              || $store.themeSettingsStore.isMouseHovered
          "
          to="/auth/login"
        >
          <img
            v-if="
              !$store.themeSettingsStore.isDark
                && !$store.themeSettingsStore.semidark
            "
            src="../../assets/images/logo.png"
            alt=""
          >

          <img
            v-if="
              $store.themeSettingsStore.isDark
                || $store.themeSettingsStore.semidark
            "
            src="../../assets/images/logo.png"
            alt=""
          >
        </router-link>
        <router-link
          v-if="
            $store.themeSettingsStore.sidebarCollasp
              && !$store.themeSettingsStore.isMouseHovered
          "
          to="/auth/login"
        >
          <img
            v-if="
              !$store.themeSettingsStore.isDark
                && !$store.themeSettingsStore.semidark
            "
            src="../../assets/images/logo.png"
            alt=""
          >
          <img
            v-if="
              $store.themeSettingsStore.isDark
                || $store.themeSettingsStore.semidark
            "
            src="../../assets/images/logo.png"
            alt=""
          >
        </router-link>
        <span
          v-if="
            !$store.themeSettingsStore.sidebarCollasp
              || $store.themeSettingsStore.isMouseHovered
          "
          class="cursor-pointer text-slate-900 dark:text-white text-2xl"
          @click="
            $store.themeSettingsStore.sidebarCollasp
              = !$store.themeSettingsStore.sidebarCollasp
          "
        >
          <!-- <Icon icon="heroicons-outline:menu-alt-3"
        /> -->
          <div
            class="h-4 w-4 border-[1.5px] border-slate-900 dark:border-slate-700 rounded-full transition-all duration-150"
            :class="
              $store.themeSettingsStore.sidebarCollasp
                ? ''
                : 'ring-2 ring-inset ring-offset-4 ring-black-900 dark:ring-slate-400 bg-slate-900 dark:bg-slate-400 dark:ring-offset-slate-700'
            "
          />
        </span>
      </div>
      <div
        class="h-[60px] absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none"
        :class="[shadowbase ? ' opacity-100' : ' opacity-0']"
      />

      <SimpleBar
        class="sidebar-menu px-4 h-[calc(100%-80px)]"
        @created="
          (instance) => {
            simplebarInstance = instance;
          }
        "
      >
        <Navmenu :items="menuItems" />
      </SimpleBar>
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
