<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import go from '~/assets/images/icons/gp.svg'

const { t } = useI18n()
</script>

<template>
  <div class=" mt-4">
    <div class="flex justify-between items-center mb-6">
      <div class=" w-2/6 h-0.5 bg-gray-200" />
      <label class=" text-gray-500 ml-1 mr-1 text-xs">{{ t('signInSocial') }}</label>
      <div class="w-2/6  h-0.5 bg-gray-200" />
    </div>
    <div class="flex justify-center">
      <div class=" justify-center items-center w-7/12">
        <ul class="flex justify-center">
          <RouterLink
            class=" inline-flex w-10 h-10 bg-red-500 text-white text-2xl flex-col items-center justify-center rounded-full"
            to="#"
          >
            <img :src="go" alt="">
          </RouterLink>
        </ul>
      </div>
    </div>
  </div>
</template>
