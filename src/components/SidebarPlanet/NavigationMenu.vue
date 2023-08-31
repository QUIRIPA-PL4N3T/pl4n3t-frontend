<script setup lang="ts">
import { storeToRefs } from 'pinia'

interface Child {
  childTitle: string
  childLink: string
}

interface MenuItem {
  child?: Child[]
  link?: string
  icon?: string
  title?: string
  isHeader?: boolean
  childLink?: string
  childTitle?: string
  requiredCompany?: boolean
  requiredData?: boolean
}

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
  items: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
  childrenLinks: {
    type: Array,
    default: null,
  },
})

const { t } = useI18n()
const themeSettingsStore = useThemeSettingsStore()
const companyStore = useCompanyStore()
const { hasCompany } = storeToRefs(companyStore)

const { mobileSidebar } = storeToRefs(themeSettingsStore)
let activeSubmenu = $ref(null)
const router = useRouter()

watch(() => router.currentRoute.value, () => {
  if (mobileSidebar.value)
    mobileSidebar.value = false

  props.items.forEach((item: any) => {
    if (item.link === router.currentRoute.value.name)
      activeSubmenu = null
  })
})

function beforeEnter(element: any) {
  requestAnimationFrame(() => {
    if (!element.style.height)
      element.style.height = '0px'

    element.style.display = null
  })
}

function enter(element: any) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.height = `${element.scrollHeight}px`
    })
  })
}

function afterEnter(element: any) {
  element.style.height = null
}

function beforeLeave(element: any) {
  requestAnimationFrame(() => {
    if (!element.style.height)
      element.style.height = `${element.offsetHeight}px`
  })
}

function leave(element: any) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.height = '0px'
    })
  })
}

function afterLeave(element: any) {
  element.style.height = null
}

function toggleSubmenu(index: any) {
  if (activeSubmenu === index)
    activeSubmenu = null
  else
    activeSubmenu = index
}
</script>

<template>
  <ul>
    <li
      v-for="(item, i) in items"
      :key="i"
      :class="`${item.child ? 'item-has-children' : ''} ${activeSubmenu === i ? 'open' : ''} ${$route.name === item.link ? 'menu-item-active' : ''}`"
      class="single-sidebar-menu"
    >
      <template v-if="item.requiredCompany === false || (item.requiredCompany === true && hasCompany)">
        <!-- ?? single menu with no children !!  -->
        <router-link
          v-if="!item.child && !item.isHeader"
          :to="`${item.link}`"
          class="menu-link"
        >
          <span v-if="item.icon" class="menu-icon">
            <Icon :icon="item.icon" /></span>
          <div v-if="item.title" class="text-box">
            {{ t(item.title) }}
          </div>
        </router-link>

        <!-- ?? only for menu label ??  -->
        <div v-else-if="item.isHeader && !item.child" class="menu-label">
          {{ t(item.title!) }}
        </div>
        <!-- !!sub menu parent li !! -->
        <div
          v-else
          class="menu-link"
          :class="
            activeSubmenu === i ? 'parent_active not-collapsed' : 'collapsed'
          "
          @click="toggleSubmenu(i)"
        >
          <div class="flex-1 flex items-start">
            <span v-show="item.icon" class="menu-icon">
              <Icon :icon="item.icon" /></span>
            <div v-if="item.title" class="text-box">
              {{ t(item.title) }}
            </div>
          </div>
          <div class="flex-0">
            <div
              class="menu-arrow transform transition-all duration-300"
              :class="
                activeSubmenu === i
                  ? ' ltr:rotate-90 rtl:rotate-90'
                  : 'rtl:rotate-180'
              "
            >
              <Icon icon="heroicons-outline:chevron-right" />
            </div>
          </div>
        </div>
        <Transition
          enter-active-class="submenu_enter-active"
          leave-active-class="submenu_leave-active"
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
        >
          <!-- !! SubMenu !! -->
          <ul v-if="i === activeSubmenu" class="sub-menu ">
            <li
              v-for="(children, index) in item.child"
              :key="index"
              class="block ltr:pl-4 rtl:pr-4 ltr:pr-1 rtl:-l-1 mb-4 first:mt-4"
            >
              <router-link v-slot="{ isActive }" :to="children.childLink">
                <span
                  class="text-sm flex space-x-3 rtl:space-x-reverse items-center transition-all duration-150"
                  :class="
                    isActive
                      ? ' text-slate-900 dark:text-white font-medium'
                      : 'text-slate-600 dark:text-slate-300'
                  "
                >
                  <span
                    class="h-2 w-2 rounded-full border border-slate-600 dark:border-slate-300 inline-block flex-none"
                    :class="
                      isActive
                        ? ' bg-slate-900 dark:bg-slate-300 ring-4 ring-opacity-[15%] ring-black-500 dark:ring-slate-300 dark:ring-opacity-20'
                        : ''
                    "
                  />
                  <span class="flex-1">
                    {{ t(children.childTitle) }}
                  </span>
                </span>
              </router-link>
            </li>
          </ul>
        </Transition>
      </template>
    </li>
  </ul>
</template>

<style lang="scss">
.submenu_enter-active,
.submenu_leave-active {
  overflow: hidden;
  transition: all 0.34s linear;
}

.not-collapsed .has-icon {
  transition: all 0.34s linear;
}
.not-collapsed .has-icon {
  @apply transform rotate-180;
}

// single sidebar menu css
.single-sidebar-menu {
  @apply relative;
  .menu-label {
    @apply text-slate-800 dark:text-slate-300 text-xs font-semibold uppercase mb-4 mt-4;
  }
  > .menu-link {
    @apply flex text-slate-600 font-medium dark:text-slate-300 text-sm capitalize px-[10px] py-3 rounded-[4px] cursor-pointer;
  }
  .menu-icon {
    @apply icon-box inline-flex items-center text-slate-600 dark:text-slate-300 text-lg ltr:mr-3 rtl:ml-3;
  }
}
// menu item has children
.item-has-children {
  .menu-arrow {
    @apply h-5 w-5 text-base text-slate-300 bg-slate-100 dark:bg-[#334155] dark:text-slate-300 rounded-full flex justify-center items-center;
  }
}

// close sidebar css
.close_sidebar .menu-label {
  @apply hidden;
}

.close_sidebar:not(.sidebar-hovered) {
  .menu-arrow {
    @apply hidden;
  }
  .single-sidebar-menu {
    .text-box {
      @apply absolute  left-full ml-5 w-[180px] top-0 px-4 py-3 bg-white shadow-dropdown rounded-[4px] dark:bg-slate-800 z-[999] invisible opacity-0 transition-all duration-150;
    }
    &:hover {
      .text-box {
        @apply visible opacity-100;
      }
    }
  }
  .item-has-children {
    .text-box {
      @apply hidden;
    }

    > ul {
      @apply ml-4 absolute left-full top-0 w-[230px] bg-white shadow-dropdown rounded-[4px] dark:bg-slate-800 z-[999] px-4 pt-3 transition-all duration-150 invisible opacity-0;
      display: block !important;
    }
    &:hover {
      > ul {
        @apply visible opacity-100;
      }
    }
  }
}

// active menu
.item-has-children {
  .parent_active {
    @apply bg-secondary-500 bg-opacity-20;
    .icon-box,
    .menu-icon,
    .text-box {
      @apply text-slate-700 dark:text-slate-200;
    }
    .menu-arrow {
      @apply bg-secondary-500 text-slate-600 text-opacity-70 bg-opacity-30 dark:text-white;
    }
  }
}
.menu-item-active {
  .menu-link {
    @apply bg-slate-800 dark:bg-slate-700;
    .icon-box,
    .menu-icon,
    .text-box {
      @apply text-white dark:text-slate-300;
    }
  }
}
</style>
