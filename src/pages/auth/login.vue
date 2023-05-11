<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const authStore = useAuthStore()
const router = useRouter()
const checkbox = ref<boolean>(false)
const textError = ref<string>()
let typeInput = $ref<string>('password')
const { isAuthenticated } = storeToRefs(authStore)
const { t } = useI18n()

const showPassword = () => typeInput = typeInput === 'text' ? 'password' : 'text'

async function login(value: any) {
  await authStore.logIn(value)
  if (isAuthenticated.value)
    router.push('/dashboard')
}
</script>

<template>
  <div class="loginwrapper auth-background">
    <div class="lg-inner-column">
      <div class="left-columns lg:w-1/2 lg:block hidden">
        <div class="logo-box-3">
          <Logo class="w-3/4 max-w-[384px]" />
        </div>
      </div>

      <div class="lg:w-1/2 w-full flex flex-col items-center justify-center">
        <div class="auth-box-3">
          <div class="mobile-logo text-center mb-6 lg:hidden block">
            <Logo class="h-16 mt-8 m-auto" />
          </div>
          <label class="flex justify-center text-2xl mt-4 text-slate-900">{{ t('login.text') }}</label>
          <form class=" mb-4" @submit.prevent="login">
            <div class="flex flex-col  relative mb-2">
              <label>{{ t('email') }}</label>
              <input name="email" class="input" type="text" :placeholder="t('hintEmail')">
              <h2 v-if="textError" class="text-red-500">
                {{ textError }}
              </h2>

              <div class="text-xl absolute top-14 right-3">
                <span v-if="textError" class="text-red-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            </div>
            <div class="flex flex-col  relative mb-2">
              <label>{{ t('password') }}</label>
              <input name="password" class="input" :type="typeInput" :placeholder="t('hintPassword')">
              <div class="text-xl absolute top-14 right-3">
                <span class="cursor-pointer text-secondary-500" @click="showPassword">
                  <Icon v-if="typeInput === 'password'" icon="heroicons-outline:eye" />
                  <Icon v-else icon="heroicons-outline:eye-off" />
                </span>
              </div>
            </div>
            <div class="flex justify-between mt-5">
              <CheckBoxAuth :label="t('login.checkBox')" :model-value="checkbox" :checked="false" :value="false" @on-selected="checkbox = !checkbox" />
              <RouterLink to="/auth/resetPassword">
                <label>{{ t('forgotPassword') }}</label>
              </RouterLink>
            </div>
            <ButtonAuth class=" mt-10" :text="t('login.buttonLogin')" />
          </form>
          <SignInSocial class=" mt-5 mb-10" />
          <div class="flex justify-center items-center mt-7">
            <label class=" text-gray-500 text-sm mr-2">{{ t('login.footer') }}</label>
            <RouterLink class=" flex justify-center items-center" to="/auth/register">
              <label class=" text-sm">{{ t('login.link') }}</label>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.auth-background {
  background-image: linear-gradient(135deg, #5c94ff 0%, #9332ff 100%);
}
</style>
