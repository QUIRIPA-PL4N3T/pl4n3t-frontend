<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import type { Membership } from '~/api-client'
import PaymentFields from '~/components/Payment/PaymentFields.vue'
import { handleError } from '~/utilities/utils'

const membershipsStore = useMembershipsStore()
const companyStore = useCompanyStore()
const router = useRouter()
const { t } = useI18n()
const toast = useToast()
let errorMessage = $ref<string>('')
let processing = $ref<boolean>(false)
const id = Number(router.currentRoute.value.params?.id)
const mp = new MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
  locale: 'es',
})

const { company } = storeToRefs(companyStore)
const { purchase, getMembershipById, preferenceResponse } = storeToRefs(membershipsStore)

const membership = computed((): Membership => {
  return getMembershipById.value(id)
})

const catchPayment = computed((): boolean => {
  return !!preferenceResponse.value.id
})

function startMP(PREFERENCE_ID: string): void {
  mp.bricks().create('wallet', 'wallet_container', {
    initialization: {
      preferenceId: PREFERENCE_ID,
    },
    customization: {
      visual: {
        style: {
          theme: 'default',
        },
      },
    },
  })
}

async function purchaseMembership() {
  processing = true
  try {
    membershipsStore.purchaseLoadBackUrl({
      success: router.resolve({ name: 'purchase-status', params: { id: 1 } }).href,
      failure: router.resolve({ name: 'purchase-status', params: { id: 1 } }).href,
      pending: router.resolve({ name: 'purchase-status', params: { id: 1 } }).href,
    })
    await membershipsStore.purchaseMembership({
      purchase: purchase.value,
      companyId: company.value.id,
      membershipId: membership.value.id,
    }).then(() => {
      toast.success(t('purchase_membership.alerts.success'), {
        timeout: 2000,
      })
      processing = false
      startMP(preferenceResponse.value.id)
      // renderPaymentBrick(bricksBuilder)
    }).catch(() => {
      processing = false
      toast.error(t('purchase_membership.alerts.error'))
    })
  }
  catch (error: any) {
    errorMessage = handleError(error)
    toast.error(t('purchase_membership.alerts.error'))
  }
}
</script>

<template>
  <div class="flex justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <div class="w-full flex flex-wrap gap-2 justify-center">
        <div class="max-w-sm text-left">
          <MembershipCard :buy="false" :membership="membership" />
        </div>
        <div class="max-w-lg w-full p-8 mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl overflow-hidden shadow-lg">
          <div class="text-left mb-4">
            <h2 class="text-2xl text-black font-normal">
              {{ t('purchase_membership.header') }} <span class="font-bold">{{ membership?.name
              }}</span>
            </h2>
            <p class="text-gray-600">
              {{ t('purchase_membership.subheader') }}
            </p>
          </div>
          <div class="w-full">
            <FormKit
              v-if="!catchPayment"
              type="form"
              :actions="false"
              :incomplete-message="false"
              @submit="purchaseMembership"
            >
              <PaymentFields />
              <button
                type="submit" class="flex flex-wrap justify-center items-center gap-2 p-4 btn-dark dark:border-slate-400 w-full mt-4"
              >
                <Icon v-if="processing" icon="eos-icons:loading" class="p-0 m-0" />
                {{ t('purchase_membership.button') }}
              </button>
            </FormKit>
            <div v-else id="wallet_container" class="w-full my-4">
              <h3 class="text-xl">
                Mercado pago
              </h3>
            </div>
            <ElAlert v-if="errorMessage" class="mt-4" :title="errorMessage" type="error" show-icon />
          </div>
          <hr class="m-4">
          <div class="text-left mb-4">
            <h2 class="text-2xl text-black font-normal">
              {{ t('purchase_membership.footer-total') }}
              <span class="text-dark leading-10 font-medium">
                ${{ membership.price !== '0.00' ? membership.price : 'FREE' }}
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
path: '/purchase-membership/:id'
name: purchase-membership
meta:
  layout: sidebar
  requiresAuth: true
</route>
