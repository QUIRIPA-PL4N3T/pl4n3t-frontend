<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import logo from '~/assets/images/logo.png'

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

// TODO: Class to select the background remove
let counter = $ref(0)
let backgroundClass = $ref<string>('login-background-0')
function changeMe() {
  counter++
  counter = counter % 8
  backgroundClass = `login-background-${counter}`
}
</script>

<template>
  <div class="loginwrapper" :class="backgroundClass">
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
          <label class="flex justify-center text-2xl mt-4 text-slate-900">{{ t('login.text') }}</label>
          <form class=" mb-4" @submit.prevent="login">
            <div class="flex flex-col  relative mb-2">
              <label>{{ t('textEmail') }}</label>
              <input name="email" class="input" type="text" :placeholder="t('textHinEmail')">
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
              <label>{{ t('textPassword') }}</label>
              <input name="password" class="input" :type="typeInput" :placeholder="t('textHinPassword')">
              <div class="text-xl absolute top-14 right-3">
                <span class="cursor-pointer text-secondary-500" @click="showPassword">
                  <Icon v-if="typeInput === 'password'" icon="heroicons-outline:eye" />
                  <Icon v-else icon="heroicons-outline:eye-off" />
                </span>
              </div>
            </div>
            <div class="flex justify-between mt-5">
              <CheckBoxAuth :label="t('login.textCheckBox')" :model-value="checkbox" :checked="false" :value="false" @on-selected="checkbox = !checkbox" />
              <RouterLink to="/auth/resetPassword">
                <label>{{ t('forgotPassword') }}</label>
              </RouterLink>
            </div>
            <ButtonAuth class=" mt-10" :text="t('login.textButtonLogin')" />
          </form>
          <SignInSocial class=" mt-5 mb-10" />
          <div class="flex justify-center items-center mt-7">
            <label class=" text-gray-500 text-sm mr-2">{{ t('login.textFooter') }}</label>
            <RouterLink class=" flex justify-center items-center" to="/auth/register">
              <label class=" text-sm">{{ t('login.textLink') }}</label>
            </RouterLink>
          </div>
          <button
            @click="changeMe"
          >
            ¡Click me! {{ counter }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-background-0 {
  background: linear-gradient(to bottom, #e8e8e8, #d8d8d8, #c8c8c8, #b8b8b8, #a8a8a8);
}

.login-background-1 {
  background-image: linear-gradient(to top right, #1f253d, #5377b0, #47c9a2);
}

.login-background-2 {
  background-image: linear-gradient(to top right, #000000, #808080, #ffffff);
}
.login-background-3 {
  background-image: linear-gradient(135deg, #5c94ff 0%, #9332ff 100%);
}
.login-background-4 {
  background-image:
    repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0, rgba(255, 255, 255, 0.1) 1px, transparent 1px, transparent 4px),
    linear-gradient(to right, #4c7aff, #9332ff);

}
.login-background-5 {
  background-image:
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.1) 0, rgba(255, 255, 255, 0.1) 1px, transparent 1px, transparent 4px),
    linear-gradient(to right, #4c7aff, #9332ff);

}
.login-background-6 {
  background-image:
    repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0, rgba(255, 255, 255, 0.1) 1px, transparent 1px, transparent 20px),
    linear-gradient(to top right, #4a4a4a, #9e9e9e);

}

.login-background-7 {
  background-image: linear-gradient(to top right, #4a4a4a, #9e9e9e);
}
</style>
