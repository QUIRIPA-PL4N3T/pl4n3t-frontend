<script setup lang="ts">
import { storeToRefs } from 'pinia'

const membershipsStore = useMembershipsStore()
const companyStore = useCompanyStore()
const { t } = useI18n()
const router = useRouter()

const { company } = storeToRefs(companyStore)
const { currentMembership, companyMembership, companyMemberships } = storeToRefs(membershipsStore)

membershipsStore.fetchCompanyMembership(Number(company.value.id)).then(() => {
  if (companyMembership.value.membership)
    membershipsStore.fetchMembership(companyMembership.value?.membership)
})

function viewPlans() {
  router.push({
    name: 'memberships',
  })
}
</script>

<template>
  <div class="flex justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <div class="grid grid-rows-4 grid-flow-col gap-4">
        <div class="row-span-4">
          <Card class="max-w-lg w-full p-8 mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-2xl text-black font-normal mb-4">
              {{ t('my_membership.title_memberships') }}
            </h2>
            <hr>
            <div
              v-for="(compMembership, i) in companyMemberships" :key="i"
              class="flex"
            >
              <MembershipMiniCard :company-membership="compMembership" />
            </div>
            <div
              class="flex flex-col items-center justify-center m-4"
            >
              <h4 class="text-2xl text-slate-600 dark:text-slate-300 font-medium">
                {{ t('not_found') }}
              </h4>
            </div>
          </Card>
        </div>
        <div class="col-span-4">
          <Card class="max-w-lg w-full p-8 mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-left mb-4">
              <h2 class="text-2xl text-black font-normal">
                {{ t('my_membership.title') }} <span class="font-bold">{{ currentMembership?.name
                }}</span>
              </h2>
              <p class="text-gray-600">
                {{ t('my_membership.subtitle') }}
              </p>
            </div>
            <div class="text-left grid grid-cols-2 gap-4">
              <div>
                <p class="text-xl text-black font-normal">
                  {{ t('my_membership.start_date') }}
                </p>
                <span class="font-medium">
                  {{ new Date(companyMembership.start_date).toLocaleString('en-US', { timeZone: 'UTC' }) }}
                </span>
              </div>
              <div>
                <p class="text-xl text-black font-normal">
                  {{ t('my_membership.end_date') }}
                </p>
                <span class="font-medium">
                  {{ new Date(companyMembership.end_date).toLocaleString('en-US', { timeZone: 'UTC' }) }}
                </span>
              </div>
              <div class="col-span-2">
                <Button
                  btn-class="btn-dark dark:border-slate-400 w-full mt-4"
                  @click="viewPlans()"
                >
                  {{ t('my_membership.button') }}
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <div class="row-span-3 col-span-4 text-left">
          <MembershipCard :buy="false" :membership="currentMembership" />
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
path: /my-membership
name: my-membership
meta:
  layout: sidebar
  requiresAuth: true
</route>
