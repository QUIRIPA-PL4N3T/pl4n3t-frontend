<script setup lang="ts">
import Bill from '~/components/Payment/Bill.vue'

const { t } = useI18n()
</script>

<template>
  <div class="flex justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <div class="w-full flex flex-wrap gap-2 justify-center">
        <div class="max-w-sm text-left">
          <MembershipCard :buy="false" :membership="currentMembership" />
        </div>
        <div class="max-w-lg p-8 mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl overflow-hidden shadow-lg">
          <div class="max-w-[500px] min-w-xl space-y-4 flex flex-col justify-center items-center">
            <h1 class="text-center text-xl font-semibold text-slate-900 dark:text-white">
              {{ t('purchase_status.header_status') }}
            </h1>
            <div
              class="text-center text-4xl font-semibold text-slate-900 dark:text-white"
            >
              Estado
            </div>
            <Bill />
            <p
              class="font-normal text-slate-600 dark:text-slate-300 max-w-[400px]"
            >
              {{ t('purchase_status.subheader_success') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
path: '/purchase-status/:id'
name: purchase-status
meta:
  layout: sidebar
  requiresAuth: true
</route>
