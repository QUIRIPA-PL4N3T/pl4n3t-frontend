<script setup lang="ts">
import type { CompanyMembership } from '~/api-client'
import { DEFAULT_COMPANY_MEMBERSHIP } from '~/api/modelsDefaults'

const {
  companyMembership = DEFAULT_COMPANY_MEMBERSHIP,
  using = false,
} = defineProps<{
  companyMembership: CompanyMembership
  using?: boolean
}>()
</script>

<template>
  <Card>
    <header class="mb-6">
      <div class="flex justify-between">
        <h4 class="text-xl mb-5">
          {{ companyMembership.id }}
        </h4>
        <Badge
          v-if="using"
          icon="radix:arrow-left"
          :label="t('memberships.subscriber')"
          badge-class="bg-primary-500 text-primary-500 bg-opacity-[0.12]"
        />
      </div>
      <p class="text-purple-800 dark:text-slate-300 text-lg">
        {{ companyMembership.start_date }} / {{ companyMembership.end_date }}
      </p>
    </header>
  </Card>
</template>
