<script setup lang="ts">
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { loadingToken } = storeToRefs(authStore)
const { t } = useI18n()
</script>

<template>
  <main class="flex flex-col min-h-screen text-gray-700 dark:text-gray-200 bg-gray-100">
    <main class="h-full flex-1">
      <div class="py-6">
        <div
          class="px-4 md:px-8 sm:px-6"
        >
          <Breadcrumbs />
          <BasicLoader v-if="loadingToken" :text="t('refreshing_token')" />
          <RouterView v-else />
        </div>
      </div>
    </main>
  </main>
</template>
