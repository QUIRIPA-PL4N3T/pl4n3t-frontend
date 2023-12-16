<script>
export default {
  data() {
    return {
      semiDark: this.$store.themeSettingsStore.semiDark,
    }
  },
  watch: {
    semiDark: {
      handler() {
        if (this.semiDark) {
          this.$store.themeSettingsStore.semiDark = this.semiDark
          document.body.classList.remove('semi-light')
          document.body.classList.add('semi-dark')
          localStorage.setItem('semiDark', this.semiDark)
        }
        else {
          this.$store.themeSettingsStore.semiDark = this.semiDark
          document.body.classList.remove('semi-dark')
          document.body.classList.add('semi-light')
          localStorage.setItem('semiDark', this.semiDark)
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
    <div class="flex justify-between mt-6 items-center">
      <div class="text-slate-600 text-base dark:text-slate-300">
        Semi Dark
      </div>
      <div>
        <label
          :class="semiDark ? 'bg-primary-500' : 'bg-secondary-500'"
          class="relative inline-flex h-6 w-[46px] items-center rounded-full transition-all duration-150 cursor-pointer"
        >
          <input v-model="semiDark" type="checkbox" class="hidden">
          <span
            :class="
              semiDark
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
