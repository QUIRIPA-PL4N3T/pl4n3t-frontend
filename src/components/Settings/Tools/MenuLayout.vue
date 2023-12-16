<script>
export default {
  data() {
    return {
      layout: this.$store.themeSettingsStore.menuLayout,
      menuCollapse: this.$store.themeSettingsStore.sidebarCollapse,
      menuHidden: this.$store.themeSettingsStore.sidebarHidden,
      layouts: [
        {
          value: 'vertical',
          label: 'Vertical',
        },
        {
          value: 'horizontal',
          label: 'Horizontal',
        },
      ],
    }
  },
  watch: {
    layout: {
      handler() {
        switch (this.layout) {
          case 'vertical':
            this.$store.themeSettingsStore.menuLayout = this.layout
            document.documentElement.setAttribute('menu-layout', this.layout)
            localStorage.setItem('menuLayout', this.layout)

            break
          case 'horizontal':
            this.$store.themeSettingsStore.menuLayout = this.layout
            document.documentElement.setAttribute('menu-layout', this.layout)
            localStorage.setItem('menuLayout', this.layout)

            break
        }
      },
      immediate: true,
    },
    menuHidden: {
      handler() {
        this.$store.themeSettingsStore.sidebarHidden = this.menuHidden
      },
      immediate: true,
    },
    menuCollapse: {
      handler() {
        this.$store.themeSettingsStore.sidebarCollapse = this.menuCollapse
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <div>
    <div class="col-span-12 text-slate-600 dark:text-slate-300 text-base mb-2">
      Menu layout
    </div>
    <div class="grid grid-cols-3 gap-3">
      <div v-for="(item, i) in layouts" :key="i">
        <label
          :for="`menu_layout_id${i}`"
          class="flex items-center text-sm text-slate-500 dark:text-slate-400 cursor-pointer"
        >
          <input
            :id="`menu_layout_id${i}`"
            v-model="layout"
            class="hidden"
            type="radio"
            name="menulayout"
            :value="item.value"
          >
          <span
            :class="item.value === layout ? 'shadow-inset-4' : ''"
            class="h-4 w-4 bg-white rounded-full dark:bg-transparent border border-secondary-500 inline-block ltr:mr-3 rtl:ml-3 transition-all duration-150"
          />
          {{ item.label }}</label>
      </div>
    </div>
    <div
      v-if="
        $store.themeSettingsStore.menuLayout === 'vertical'
          && $store.themeSettingsStore.sidebarHidden === false
      "
      class="flex justify-between mt-6 items-center"
    >
      <div class="text-slate-600 text-base dark:text-slate-300">
        Menu Collapsed
      </div>
      <div>
        <label
          :class="menuCollapse ? 'bg-primary-500' : 'bg-secondary-500'"
          class="relative inline-flex h-6 w-[46px] items-center rounded-full transition-all duration-150 cursor-pointer"
        >
          <input v-model="menuCollapse" type="checkbox" class="hidden">
          <span
            :class="
              menuCollapse
                ? 'ltr:translate-x-6 rtl:-translate-x-6'
                : 'ltr:translate-x-[2px] rtl:translate-x-[-2px]'
            "
            class="inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-150"
          />
        </label>
      </div>
    </div>
    <div
      v-if="$store.themeSettingsStore.menuLayout === 'vertical'"
      class="flex justify-between mt-6 items-center"
    >
      <div class="text-slate-600 text-base dark:text-slate-300">
        Menu Hidden
      </div>
      <div>
        <label
          :class="menuHidden ? 'bg-primary-500' : 'bg-secondary-500'"
          class="relative inline-flex h-6 w-[46px] items-center rounded-full transition-all duration-150 cursor-pointer"
        >
          <input v-model="menuHidden" type="checkbox" class="hidden">
          <span
            :class="
              menuHidden
                ? 'ltr:translate-x-6 rtl:-translate-x-6'
                : 'ltr:translate-x-[2px] rtl:translate-x-[-2px]'
            "
            class="inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-150"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
