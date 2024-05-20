<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import ProfilePassword from '~/components/Profile/ProfilePassword.vue'
import { handleError } from '~/utilities/utils'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const { t } = useI18n()
const toast = useToast()

let errorMessage = $ref<string>('')
let loading = $ref<boolean>(false)

let processingBasic = $ref<boolean>(false)
let processingPassword = $ref<boolean>(false)

watch(() => user.value, () => {
  loading = !!user.value
})

async function updateUser() {
  processingBasic = true
  try {
    await authStore.updateUser().then(() => {
      toast.success(t('profile.alerts.profile_success'), {
        timeout: 2000,
      })
      processingBasic = false
    }).catch(() => {
      processingBasic = false
      toast.error(t('profile.alerts.error'))
    })
  }
  catch (error: any) {
    errorMessage = handleError(error)
    toast.error(t('profile.alerts.error'))
  }
}

async function updatePassword() {
  processingPassword = true
  try {
    await authStore.updatePassword().then(() => {
      toast.success(t('profile.alerts.password_success'), {
        timeout: 2000,
      })
      processingPassword = false
    }).catch(() => {
      processingPassword = false
      toast.error(t('profile.alerts.error'))
    })
  }
  catch (error: any) {
    errorMessage = handleError(error)
    toast.error(t('profile.alerts.error'))
  }
}
</script>

<template>
  <div class="flex justify-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 b">
    <Card

      class-name="w-[400px]"
      :title="t('profile.titles.basic_title')"
      :subtitle="t('profile.titles.basic_subtitle')"
    >
      <SkeletonForm v-if="!loading" />
      <div v-else>
        <FormKit
          type="form"
          :actions="false"
          :incomplete-message="false"
          :errors="[errorMessage]"
          @submit="updateUser"
        >
          <ProfileFields />
          <button
            type="submit" class="flex flex-wrap justify-center items-center gap-2 p-4 btn-dark dark:border-slate-400 w-full mt-4"
          >
            <Icon v-if="processingBasic" icon="eos-icons:loading" class="p-0 m-0" />
            {{ t('profile.button_form') }}
          </button>
        </FormKit>
        <ElAlert v-if="errorMessage" class="mt-4" :title="errorMessage" type="error" show-icon />
      </div>
    </Card>
    <Card
      class-name="w-[400px]"
      :title="t('profile.titles.password_title')"
      :subtitle="t('profile.titles.password_subtitle')"
    >
      <SkeletonForm v-if="!loading" />
      <div v-else>
        <FormKit
          type="form"
          :actions="false"
          :incomplete-message="false"
          @submit="updatePassword"
        >
          <ProfilePassword />
          <button
            type="submit" class="flex flex-wrap justify-center items-center gap-2 p-4 btn-danger dark:border-slate-400 w-full mt-4"
          >
            <Icon v-if="processingPassword" icon="eos-icons:loading" class="p-0 m-0" />
            {{ t('profile.button_form') }}
          </button>
        </FormKit>

        <ElAlert v-if="errorMessage" class="mt-4" :title="errorMessage" type="error" show-icon />
      </div>
    </Card>
  </div>
</template>

<route lang="yaml">
name: profile
meta:
  layout: sidebar
  requiresAuth: true
</route>
