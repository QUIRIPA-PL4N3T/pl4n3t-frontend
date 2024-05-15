<script setup lang="ts">
import { storeToRefs } from 'pinia'
import PaymentFields from '~/components/Payment/PaymentFields.vue'

const membershipsStore = useMembershipsStore()
const router = useRouter()
const { t } = useI18n()

membershipsStore.fetchMembership(Number(router.currentRoute.value.params.id))
const { currentMembership } = storeToRefs(membershipsStore)
</script>

<template>
  <div class="flex justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <div class="w-full flex flex-wrap gap-2">
        <div class="max-w-sm text-left">
          <MembershipCard :buy="false" :membership="currentMembership" />
        </div>
        <div class="max-w-lg w-full p-8 mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl overflow-hidden shadow-lg">
          <div class="text-left mb-4">
            <h2 class="text-2xl text-black font-normal">
              {{ t('pusharse-membership.header') }} <span class="font-bold">{{ currentMembership?.name
              }}</span>
            </h2>
            <p class="text-gray-600">
              {{ t('pusharse-membership.subheader') }}
            </p>
          </div>
          <div class="w-full">
            <FormKit
              type="form"
              :actions="false"
              :incomplete-message="false"
            >
              <PaymentFields />
            </FormKit>
          </div>
          <hr class="m-4">
          <div class="text-left mb-4">
            <h2 class="text-2xl text-black font-normal">
              {{ t('pusharse-membership.footer-total') }}
              <span class="text-dark leading-10 font-medium">
                ${{ currentMembership.price !== '0.00' ? currentMembership.price : 'FREE' }}
              </span>
            </h2>
            <Button
              btn-class="btn-dark dark:border-slate-400 w-full mt-4"
              @click="null"
            >
              {{ t('pusharse-membership.button') }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
path: '/pusharse-membership/:id'
name: pusharse-membership
meta:
  layout: sidebar
  requiresAuth: true
</route>
