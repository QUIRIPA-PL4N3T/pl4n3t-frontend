<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import logo from '~/assets/images/logo.png'

const { t } = useI18n()
const email = ref<string>()
const textError = ref<string>()
function resetPassword() {
}
</script>

<template>
  <main class="min-h-screen flex">
    <div class="w-1/2  hidden lg:flex lg:justify-center lg:items-center">
      <Logo :image="logo" class=" h-28" />
    </div>
    <div class="flex w-full justify-center items-center lg:w-1/2">
      <div class=" w-full max-w-lg h-2/3 pl-5 pr-5  bg-white  rounded border shadow-2xl ">
        <Logo :image="logo" class="h-16 mt-20 m-auto" />
        <label class="flex justify-center text-2xl mt-10 text-slate-900">{{ t('forgotPasswordScreen.text') }}</label>
        <form class=" mb-4" @submit.prevent="resetPassword">
          <div class="flex flex-col  relative mb-2">
            <label for="la">{{ t('email') }}</label>
            <input
              v-model="email"
              class="input"
              type="text"
              :placeholder="t('hintEmail')"
              onchange=""
            >
            <h2 v-if="textError" class="text-red-500">
              {{ textError }}
            </h2>

            <div class="text-xl absolute top-14 right-3">
              <span v-if="textError" class="text-red-500">
                <Icon icon="heroicons-outline:information-circle" />
              </span>
            </div>
          </div>
          <ButtonAuth class=" mt-10" :text="t('forgotPasswordScreen.textButton')" />
        </form>
        <div class="flex justify-center items-center mt-7">
          <label class=" text-gray-500 text-sm mr-2">{{ t('forgotPasswordScreen.textFooter1') }}</label>
          <RouterLink class=" flex justify-center items-center" to="/auth/login">
            <label class="text-sm mr-2 hover:cursor-pointer hover:underline ">{{ t ('forgotPasswordScreen.link') }}</label>
          </RouterLink>
          <label class=" text-gray-500 text-sm mr-2">{{ t('forgotPasswordScreen.textFooter2') }}</label>
        </div>
      </div>
    </div>
  </main>
</template>
