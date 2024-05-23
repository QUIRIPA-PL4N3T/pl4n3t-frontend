<script setup lang="ts">
import { storeToRefs } from 'pinia'

const membershipsStore = useMembershipsStore()
const companyStore = useCompanyStore()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { t } = useI18n()
const router = useRouter()

const { company } = storeToRefs(companyStore)
const { currentMembership, companyMembership } = storeToRefs(membershipsStore)

function viewPlans() {
  router.push({
    name: 'memberships',
  })
}

function loadData() {
  if (user.value)
    membershipsStore.fetchCompanyMembership(Number(company.value.id))
}

watch(() => user.value, () => {
  loadData()
})

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="flex justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-3 text-left">
          <MembershipCard :buy="false" :membership="currentMembership" />
        </div>
        <div class="col-span-1 row-span-">
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
