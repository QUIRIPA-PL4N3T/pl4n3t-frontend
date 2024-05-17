<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { MenuItem } from '@headlessui/vue'

const { t } = useI18n()
const authStore = useAuthStore()
const { fullName, uiAvatar } = storeToRefs(authStore)
const router = useRouter()

const ProfileMenu = [
  {
    label: t('menu.profile'),
    icon: 'heroicons-outline:user',
    link: () => {
      router.push('profile')
    },
  },
  // {
  //   label: t('menu.chat'),
  //   icon: 'heroicons-outline:chat',
  //   link: () => {
  //     router.push('chat')
  //   },
  // },
  // {
  //   label: t('menu.email'),
  //   icon: 'heroicons-outline:mail',
  //   link: () => {
  //     router.push('email')
  //   },
  // },
  // {
  //   label: t('menu.todo'),
  //   icon: 'heroicons-outline:clipboard-check',
  //   link: () => {
  //     router.push('todo')
  //   },
  // },
  {
    label: t('menu.settings'),
    icon: 'heroicons-outline:cog',
    link: () => {
      router.push('settings')
    },
  },
  {
    label: t('menu.membership'),
    icon: 'heroicons-outline:credit-card',
    link: () => {
      router.push('membership')
    },
  },
  // {
  //   label: t('menu.faq'),
  //   icon: 'heroicons-outline:information-circle',
  //   link: () => {
  //     router.push('faq')
  //   },
  // },
  {
    label: t('menu.logout'),
    icon: 'heroicons-outline:login',
    link: () => {
      authStore.logOut()
      router.push('/')
      localStorage.removeItem('activeUser')
    },
  },
]
</script>

<template>
  <Dropdown class-menu-items=" w-[180px] top-[58px] ">
    <div class="flex items-center">
      <div class="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div class="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img
            :src="uiAvatar"
            alt=""
            class="block w-full h-full object-cover rounded-full"
          >
        </div>
      </div>
      <div
        class="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap"
      >
        <span
          class="overflow-hidden text-ellipsis whitespace-nowrap mx-2 block"
        >{{ fullName }}</span>
        <span class="text-base inline-block"><Icon icon="heroicons-outline:chevron-down" /></span>
      </div>
    </div>
    <template #menus>
      <MenuItem v-for="(item, i) in ProfileMenu" v-slot="{ active }" :key="i">
        <div
          type="button"
          :class="`${
            active
              ? 'bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-900 dark:text-slate-300'
              : 'text-slate-600 dark:text-slate-300'
          } `"
          class="inline-flex items-center space-x-2 rtl:space-x-reverse w-full px-4 py-2 first:rounded-t last:rounded-b font-normal cursor-pointer"
          @click="item.link()"
        >
          <div class="flex-none text-lg">
            <Icon :icon="item.icon" />
          </div>
          <div class="flex-1 text-sm">
            {{ item.label }}
          </div>
        </div>
      </MenuItem>
    </template>
  </Dropdown>
</template>

<style lang=""></style>
