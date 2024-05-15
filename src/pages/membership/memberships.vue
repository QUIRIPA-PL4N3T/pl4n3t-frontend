<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { MembershipTypeEnum } from '~/api-client'

const { t } = useI18n()
const membershipsStore = useMembershipsStore()
const companyStore = useCompanyStore()

const { company } = storeToRefs(companyStore)
const { companyMembership, membershipsTypes } = storeToRefs(membershipsStore)

membershipsStore.fetchCompanyMembership(company.value.id)
</script>

<template>
  <div class="flex flex-col gap-2 justify-center items-center max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-4xl font-extrabold sm:text-5xl">
      {{ t('memberships.title') }}
    </h2>
    <p class="mt-4 text-xl">
      {{ t('memberships.subtitle') }}
    </p>
    <div class="w-full flex flex-col space-y-5">
      <div class="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
        <div
          v-for="(membership, i) in membershipsTypes"
          :key="i"
          class="price-table bg-opacity-[0.16] dark:bg-opacity-[0.36] rounded-[6px] text-slate-900 dark:text-white relative overflow-hidden z-[1]"
        >
          <MembershipCard :using="Number(companyMembership.membership) === membership.id" :buy="membership.membership_type !== MembershipTypeEnum.Free" :membership="membership" />
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
path: /memberships
name: memberships
meta:
  layout: sidebar
  requiresAuth: true
</route>
