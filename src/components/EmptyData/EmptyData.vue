<script setup lang="ts">
const { title, content, icon = 'ph:empty' } = defineProps<{
  title?: string
  content?: string
  icon?: string
}>()

const { t } = useI18n()
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center text-center gap-2">
    <Icon class="text-xl" :icon="icon" />
    <h4 class="text-2xl text-slate-600 dark:text-slate-300 font-medium">
      {{ title ? title : t('not_found') }}
    </h4>
    <p class="text-sm text-slate-500 lg:pt-0 pt-4">
      <span> {{ content ? content : t('notResultFound') }}</span>
    </p>
  </div>
</template>
