<script>
export default {
  data() {
    return {
      theme: this.$store.themeSettingsStore.theme,
      thems: [
        {
          value: 'light',
          label: 'Light',
        },
        {
          value: 'dark',
          label: 'Dark',
        },
      ],
    }
  },

  watch: {
    theme: {
      handler() {
        switch (this.theme) {
          case 'light':
            this.$store.themeSettingsStore.theme = this.theme
            document.body.classList.remove('dark')
            document.body.classList.add(this.theme)
            this.$store.themeSettingsStore.isDark = false
            localStorage.setItem('theme', this.theme)
            break
          case 'dark':
            this.$store.themeSettingsStore.theme = this.theme

            // set body class by theme name
            document.body.classList.remove('light')
            document.body.classList.add(this.theme)
            this.$store.themeSettingsStore.isDark = true
            localStorage.setItem('theme', this.theme)

            break
          default:
            this.$store.themeSettingsStore.theme = this.theme

            // set body class by theme name
            document.body.classList.remove('dark')
            document.body.classList.add(this.theme)
            localStorage.setItem('theme', this.theme)
        }
      },
      immediate: true,
    },
  },

  mounted() {
  },
}
</script>

<template>
  <div>
    <div class="col-span-12 text-slate-600 dark:text-slate-300 text-base mb-2">
      Theme
    </div>
    <div class="grid md:grid-cols-3 grid-cols-1 gap-3">
      <div v-for="(item, i) in thems" :key="i">
        <label
          :for="`theme_id${i}`"
          class="flex items-center text-sm text-slate-500 dark:text-slate-400 cursor-pointer"
        >
          <input
            :id="`theme_id${i}`"
            v-model="theme"
            class="hidden"
            type="radio"
            name="sidebar"
            :value="item.value"
          >

          <span
            :class="item.value === theme ? 'shadow-inset-4' : ''"
            class="flex-none h-4 w-4 bg-white dark:bg-transparent rounded-full border border-secondary-500 inline-block ltr:mr-3 rtl:ml-3 transition-all duration-150"
          />
          {{ item.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.shadow-inset-4 {
  box-shadow: inset 0 0 0 4px #111112;
}
.dark .shadow-inset-4 {
  box-shadow: inset 0 0 0 4px #ccc;
}
</style>
