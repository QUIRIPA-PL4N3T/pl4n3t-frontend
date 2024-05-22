<script>
import { topMenu } from '../../../constants/topMenu'

export default {
  data() {
    return {
      topMenu,
    }
  },

  computed: {
    newMenulist() {
      return this.topMenu.filter((item) => {
        return Boolean(!item.isHeader)
      })
    },
  },
}
</script>

<template>
  <ul>
    <li
      v-for="(item, i) in newMenulist"
      :key="i"
      :class="
        item.child
          ? 'menu-item-has-children'
          : '' || item.megamenu
            ? 'menu-item-has-children has-megamenu'
            : ''
      "
    >
      <router-link v-if="!item.child && !item.megamenu" :to="item.link">
        <div class="flex flex-1 items-center space-x-[6px] rtl:space-x-reverse">
          <span v-if="item.icon" class="icon-box">
            <Icon :icon="item.icon" />
          </span>
          <div v-if="item.title" class="text-box">
            {{ item.title }}
          </div>
        </div>
      </router-link>
      <a v-if="item.child || item.megamenu" href="javascript: void(0);">
        <div class="flex flex-1 items-center space-x-[6px] rtl:space-x-reverse">
          <span v-if="item.icon" class="icon-box">
            <Icon :icon="item.icon" /></span>
          <div v-if="item.title" class="text-box">{{ item.title }}</div>
        </div>
        <div
          class="relative top-1 flex-none text-sm leading-[1] ltr:ml-3 rtl:mr-3"
        >
          <Icon icon="heroicons-outline:chevron-down" />
        </div>
      </a>
      <ul v-if="item.child" class="sub-menu">
        <li
          v-for="(childitem, index) in item.child"
          :key="index"
          :class="childitem.submenu ? 'menu-item-has-children' : ''"
        >
          <router-link v-if="!childitem.submenu" :to="childitem.childLink">
            <div class="flex items-start space-x-2 rtl:space-x-reverse">
              <Icon :icon="childitem.childicon" class="text-base leading-[1]" />
              <span class="leading-[1]">{{ childitem.childTitle }}</span>
            </div>
          </router-link>

          <a v-if="childitem.submenu" href="javascript: void(0);">{{
            childitem.childTitle
          }}</a>

          <ul v-if="childitem.submenu" class="sub-menu">
            <li
              v-for="(subitem, subindex) in childitem.submenu"
              :key="subindex"
            >
              <router-link :to="subitem.subMenuLink">
                {{ subitem.submenutitle }}
              </router-link>
            </li>
          </ul>
          <!-- end sub menu -->
        </li>
      </ul>
      <div v-if="item.megamenu" class="rt-mega-menu">
        <div
          class="flex flex-wrap justify-between space-x-8 rtl:space-x-reverse"
        >
          <div v-for="(m_item, m_i) in item.megamenu" :key="m_i">
            <div
              class="mb-2 flex items-center text-sm font-medium text-slate-900 space-x-1 dark:text-white"
            >
              <Icon :icon="m_item.megamenuicon" />
              <span> {{ m_item.megamenutitle }}</span>
            </div>
            <router-link
              v-for="(ms_item, ms_i) in m_item.singleMegamenu"
              :key="ms_i"
              v-slot="{ isActive }"
              :to="ms_item.m_childLink"
              class="flex items-center text-[15px] leading-6 space-x-2 rtl:space-x-reverse"
            >
              <span
                class="inline-block h-[6px] w-[6px] flex-none border border-slate-600 rounded-full dark:border-white"
                :class="isActive ? ' bg-slate-900 dark:bg-white' : ''"
              />
              <span
                :class="
                  isActive
                    ? ' text-slate-900 dark:text-white font-medium'
                    : 'text-slate-600 dark:text-slate-300'
                "
              >{{ ms_item.m_childTitle }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss">
.main-menu {
  > ul {
    > li {
      @apply inline-block relative;
      > a {
        @apply relative flex capitalize items-start text-sm font-medium leading-6 text-slate-600 dark:text-slate-300 2xl:px-6 xl:px-5 py-6  transition-all duration-150;
        .icon-box {
          @apply text-slate-500 dark:text-slate-300 transition-all duration-150 text-lg;
        }
      }
      &:hover {
        > a {
          @apply text-primary-500;
          .icon-box {
            @apply text-primary-500;
          }
        }
      }
      &.has-megamenu {
        @apply static;
      }
    }
  }
}

.main-menu > ul > li.menu-item-has-children > ul.sub-menu,
.main-menu > ul > li.menu-item-has-children > .rt-mega-menu {
  @apply absolute  left-0 min-w-[178px] w-max top-[110%] px-4 py-3  bg-white
  rounded-[4px] dark:bg-slate-800 z-[999] invisible opacity-0 transition-all duration-150
  shadow-base2;
}
.main-menu > ul > li.menu-item-has-children > .rt-mega-menu {
  @apply max-w-[1170px]  left-1/2  -translate-x-1/2;
}
.main-menu > ul > li.menu-item-has-children > .rt-mega-menu {
  @apply w-full;
}
.main-menu > ul > li.menu-item-has-children:hover > ul.sub-menu,
.main-menu > ul > li.menu-item-has-children:hover > .rt-mega-menu {
  @apply top-full visible opacity-100;
}
.main-menu > ul > li.menu-item-has-children > ul.sub-menu li {
  @apply relative pb-2 last:pb-0;
}
.main-menu > ul > li.menu-item-has-children > ul.sub-menu li a {
  @apply text-sm  font-normal   text-slate-600 dark:text-slate-300 dark:hover:text-primary-500 capitalize py-1 last:pb-0 block hover:text-primary-500;
}
.rt-mega-menu {
  a {
    @apply dark:text-slate-300 dark:hover:text-primary-500 text-sm  py-[6px];
  }
}
</style>
