<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import { setErrors } from '@formkit/core'
import ProfilePassword from '~/components/Profile/ProfilePassword.vue'
import { handleError } from '~/utilities/utils'
import ProfileDelete from '~/components/Profile/ProfileDelete.vue'

const authStore = useAuthStore()
const router = useRouter()
const companyStore = useCompanyStore()

const { user, uiAvatar } = storeToRefs(authStore)
const { company } = storeToRefs(companyStore)

const { t } = useI18n()
const toast = useToast()

let errorMessage = $ref<string>('')
let loading = $ref<boolean>(false)

let processingBasic = $ref<boolean>(false)
let processingPassword = $ref<boolean>(false)

authStore.getUserProfile()

const file = ref(null)

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
    }).catch((response: any) => {
      processingBasic = false
      if (response?.response?.data)
        setErrors('update_password', [], response?.response.data)
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
      router.push('/auth/login')
      processingPassword = false
    }).catch((response: any) => {
      processingPassword = false
      if (response?.response?.data)
        setErrors('update_password', [], response?.response.data)
    })
  }
  catch (error: any) {
    errorMessage = handleError(error)
    toast.error(t(errorMessage))
  }
}

async function updateAvatar(e: Event) {
  const name = e.target?.name
  const file = e.target?.files[0]
  const hasName = ['file', 'logo', 'headerImg'].includes(name)
  if (hasName && file)
    processingBasic = true
  try {
    await authStore.updateAvatar({ avatar: file }).then(() => {
      toast.success(t('profile.alerts.avatar_success'), {
        timeout: 2000,
      })
      processingBasic = false
    }).catch((response: any) => {
      processingBasic = false
      if (response?.response?.data)
        setErrors('update_avatar', [], response?.response.data)
    })
  }
  catch (error: any) {
    errorMessage = handleError(error)
    toast.error(t('profile.alerts.error'))
  }
}

async function deleteAccount(confirm: boolean) {
  if (confirm) {
    try {
      await authStore.deleteAccount(user.value.id).then(() => {
        toast.success(t('profile.alerts.avatar_success'), {
          timeout: 2000,
        })
        router.push('/auth/login')
      }).catch(() => {
        toast.error(t('profile.alerts.error'))
      })
    }
    catch (error: any) {
      errorMessage = handleError(error)
      toast.error(t('profile.alerts.error'))
    }
  }
}
</script>

<template>
  <div class="flex flex-wrap justify-center  gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 b">
    <div class="grid grid-cols-2 grid-rows-2 gap-4 auto-cols-max auto-rows-max">
      <div class="lg:col-span-1 col-span-2">
        <Card
          :title="t('profile.titles.basic_title')"
          :subtitle="t('profile.titles.basic_subtitle')"
        >
          <SkeletonForm v-if="!loading" />
          <div v-else>
            <div class="md:flex items-center md:space-x-6 rtl:space-x-reverse">
              <div class="flex-none">
                <div
                  class="md:h-12 md:w-12 h-12 w-12 md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative"
                >
                  <img
                    :src="uiAvatar"
                    :alt="user.name"
                    class="w-12 h-12 object-cover rounded-full"
                  >
                  <input
                    id="file"
                    ref="file"
                    class="hidden"
                    type="file"
                    name="file"
                    @change="updateAvatar"
                  >
                  <Button
                    type="button"
                    btn-class="btn-dark"
                    class="absolute left-8 top-8 size-6 p-2 rounded-full shadow-sm flex flex-col items-center justify-center"
                    @click="file.click()"
                  >
                    <Icon icon="heroicons:pencil-square" />
                  </Button>
                </div>
              </div>
              <div class="flex-1">
                <div
                  class="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]"
                >
                  {{ user.first_name }}
                </div>
                <div class="text-sm font-light text-slate-600 dark:text-slate-400">
                  {{ user.email }}
                </div>
              </div>
            </div>
            <div class="flex w-full mt-4">
              <input
                id="file"
                class="absolute left-8 top-8 size-6 p-2 rounded-full shadow-sm flex flex-col items-center justify-center" type="file" name="file"
              >
            </div>
            <hr class="m-4">
            <FormKit
              id="update_user"
              type="form"
              :actions="false"
              :incomplete-message="false"
              @submit="updateUser"
            >
              <ProfileFields />
              <Button
                type="submit" btn-class="btn-dark" class="w-full mt-4"
              >
                <Icon v-if="processingBasic" icon="eos-icons:loading" class="p-0 m-0" />
                {{ t('profile.button_form') }}
              </Button>
            </FormKit>
            <ElAlert v-if="errorMessage" class="mt-4" :title="errorMessage" type="error" show-icon />
          </div>
        </Card>
      </div>
      <div class="lg:col-span-1 col-span-2">
        <Card
          :title="t('profile.titles.password_title')"
          :subtitle="t('profile.titles.password_subtitle')"
        >
          <SkeletonForm v-if="!loading" />
          <div v-else>
            <FormKit
              id="update_password"
              type="form"
              :actions="false"
              :incomplete-message="false"
              @submit="updatePassword"
            >
              <ProfilePassword />
              <Button
                type="submit" btn-class="btn-danger" class="w-full mt-4"
              >
                <Icon v-if="processingPassword" icon="eos-icons:loading" class="p-0 m-0" />
                {{ t('profile.button_form') }}
              </Button>
            </FormKit>

            <ElAlert v-if="errorMessage" class="mt-4" :title="errorMessage" type="error" show-icon />
          </div>
        </Card>
      </div>
      <div class="col-span-2 ">
        <Card>
          <h3 class="text-red-500 text-xl">
            {{ t('profile.titles.delete_title') }}
          </h3>
          <h4 class="text-gray-500 text-sm">
            {{ t('profile.titles.delete_subtitle') }} <span class="font-bold">{{ company.name }}</span>
          </h4>
          <ProfileDelete @confirm="confirm => deleteAccount(confirm)" />
        </Card>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: profile
meta:
  layout: sidebar
  requiresAuth: true
</route>
