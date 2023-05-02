<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import logo from '~/assets/images/logo.png'

const { t } = useI18n()
const authStore = useAuthStore()
const checkbox = ref<boolean>(false)
const router = useRouter()
let typeInput = $ref<string>('password')
const selectedCheckBox = $ref<boolean>(false)
const showPassword = () => typeInput = typeInput === 'text' ? 'password' : 'text'

async function register(value: any) {
  await authStore.logIn(value)
  router.push('/auth/login')
}
</script>

<template>
  <div class="loginwrapper bg-cover bg-no-repeat bg-center">
    <div class="lg-inner-column">
      <div class="left-columns lg:w-1/2 lg:block hidden">
        <div class="logo-box-3">
          <Logo :image="logo" class=" h-28" />
        </div>
      </div>
      <div class="lg:w-1/2 w-full flex flex-col items-center justify-center">
        <div class="auth-box-3">
          <div class="mobile-logo text-center mb-6 lg:hidden block">
            <Logo :image="logo" class="h-16 mt-8 m-auto" />
          </div>
          <div class="text-center 2xl:mb-10 mb-5">
            <h4
              class="font-medium text-2xl text-slate-900 dark:text-white mb-3"
            >
              {{ t('register.title') }}
            </h4>
            <div class="text-slate-500 dark:text-slate-400 text-base">
              {{ t('register.description') }}
            </div>
          </div>
          <form class=" mb-4" @submit.prevent="register">
            <div class="flex flex-col  relative mb-2">
              <label>{{ t('register.first-name') }}</label>
              <input class="input" type="text" :placeholder="t('register.textHinFullName')">
            </div>
            <div class="flex flex-col  relative mb-2">
              <label>{{ t('register.last-name') }}</label>
              <input class="input" type="text" :placeholder="t('register.textHinFullName')">
            </div>
            <div class="flex flex-col  relative mb-2">
              <label>{{ t('textEmail') }}</label>
              <input class="input" type="text" :placeholder="t('textHinEmail')">
            </div>
            <div class="flex flex-col  relative mb-2">
              <label>{{ t('textPassword') }}</label>
              <input class="input" :type="typeInput" :placeholder="t('textHinPassword')">
              <div class="text-xl absolute top-14 right-3">
                <span class="cursor-pointer text-secondary-500" @click="showPassword">
                  <Icon v-if="typeInput === 'password'" icon="heroicons-outline:eye" />
                  <Icon v-else icon="heroicons-outline:eye-off" />
                </span>
              </div>
            </div>
            <CheckBoxAuth
              :label="t('register.textCheckBox')" :value="false" :model-value="checkbox" class="mt-3"
              @on-selected="selectedCheckBox = !selectedCheckBox"
            />
            <ButtonAuth class=" mt-10" :text="t('register.textButtonLogin')" :on-change="register" />
          </form>
          <SignInSocial class=" mt-5 mb-10" />
          <div class="flex justify-center items-center mt-7">
            <label class=" text-gray-500 text-sm mr-2">{{ t('register.textFooter') }}</label>
            <RouterLink class=" flex justify-center items-center" to="/auth/login">
              <label class=" text-sm">{{ t('register.textLink') }}</label>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
