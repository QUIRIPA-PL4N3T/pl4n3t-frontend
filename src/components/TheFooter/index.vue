<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <footer class="sticky bottom-0 z-[999]">
    <div
      class="site-footer px-6 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 py-4"
    >
      <div class="flex justify-center md:gap-5">
        <div class="text-center md:text-right text-sm">
          {{ t('copyright.footer') }}
        </div>
      </div>
    </div>
  </footer>
</template>
