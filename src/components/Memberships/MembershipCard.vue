<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Membership } from '~/api-client'
import { DEFAULT_MEMBERSHIPS } from '~/api/modelsDefaults'

const {
  membership = DEFAULT_MEMBERSHIPS,
  buy = true,
} = defineProps<{
  membership: Membership
  buy?: boolean
  using?: boolean
}>()

const { t } = useI18n()
const router = useRouter()
const membershipsStore = useMembershipsStore()
const { attrMembership } = storeToRefs(membershipsStore)

function purchaseMembership(id: number) {
  router.push({
    name: 'purchase-membership',
    params: { id },
  })
}
function getIcon(value: string | number | boolean) {
  switch (typeof value) {
    case 'string':
      return value
    case 'number':
      return value
    default:
      return value ? 'Si' : 'No'
  }
}
</script>

<template>
  <Card>
    <header class="mb-6">
      <div class="flex justify-between gap-2">
        <h4 class="text-xl">
          {{ membership.name }}
        </h4>
        <Badge
          v-if="using"
          icon="radix:arrow-left"
          :label="t('memberships.subscriber')"
          badge-class="bg-primary-500 text-primary-500 bg-opacity-[0.12]"
        />
      </div>
      <div
        class="space-x-4 relative flex items-center mb-5 rtl:space-x-reverse"
      >
        <span class="text-[32px] leading-10 font-medium">
          ${{ membership.price !== '0.00' ? membership.price : 'FREE' }}
        </span>
      </div>
      <p class="text-purple-800 dark:text-slate-300 text-lg">
        {{ membership.duration }} / {{ t('memberships.days') }}
      </p>
    </header>
    <div class="price-body space-y-8 m-2">
      <p class="text-sm leading-5 text-slate-600 dark:text-slate-300">
        {{ membership.description }}
      </p>
      <ul class="mt-8 space-y-5 text-sm  text-slate-700">
        <li
          v-for="(attr, i) in attrMembership"
          :key="i" class="flex"
        >
          <p>
            <strong class="mr-1 font-semibold text-slate-700">
              {{ attr.attr }}
            </strong>
            <span class="text-md">- {{ getIcon(membership?.[attr.field]) }}</span>
          </p>
        </li>
      </ul>
    </div>
    <Button
      v-if="buy"
      btn-class="btn-outline-dark dark:border-slate-400 w-full mt-4"
      @click="purchaseMembership(membership.id)"
    >
      {{ t('memberships.button') }}
    </Button>
  </Card>
</template>
