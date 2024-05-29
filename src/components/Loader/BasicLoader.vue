<script lang="ts" setup>
const { text = 'loading' } = defineProps<{
  text?: string
}>()

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col justify-center items-center mx-auto">
    <Icon icon="eos-icons:loading" class="p-0 m-0" />
    <p class="text-md text-center">
      {{ text ? text : t('loading') }}
    </p>
  </div>
</template>
