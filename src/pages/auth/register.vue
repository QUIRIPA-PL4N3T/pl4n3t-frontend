<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import logo from '~/assets/images/logo.png'

const { t } = useI18n()
const fullName = ref<string>()
const fullNameError = ref<string>()
const email = ref<string>()
const textError = ref<string>()
const password = ref<string>()
const passwordError = ref<string>()
const checkbox = ref<boolean>(false)
let typeInput = $ref<string>('password')
let seletedCheckBox = $ref<boolean>(false)

const showPassword = () => typeInput = typeInput === 'text' ? 'password' : 'text'
const onSelected = (value: boolean) => seletedCheckBox = value

function login() {
}
</script>

<template>
  <main class="min-h-screen flex">
    <div class="w-1/2  hidden   lg:flex lg:justify-center lg:items-center">
      <Logo :image="logo" class=" h-28" />
    </div>
    <div class="flex w-full justify-center items-center lg:w-1/2">
      <div class=" w-full max-w-lg h-full pl-5 sm:h-5/6 pr-5  bg-white  rounded border shadow-2xl ">
        <Logo :image="logo" class="h-16 mt-8 m-auto" />
        <label class="flex justify-center text-2xl mt-4 text-slate-900">{{ t('register.text') }}</label>
        <form class=" mb-4" @submit.prevent="login">
          <div class="flex flex-col  relative mb-2">
            <label>{{ t('register.textFullName') }}</label>
            <input v-model="fullName" class="input" type="text" :placeholder="t('register.textHinFullName')">
            <h2 v-if="fullNameError" class="text-red-500">
              {{ textError }}
            </h2>

            <div class="text-xl absolute top-14 right-3">
              <span v-if="textError" class="text-red-500">
                <Icon icon="heroicons-outline:information-circle" />
              </span>
            </div>
          </div>
          <div class="flex flex-col  relative mb-2">
            <label>{{ t('textEmail') }}</label>
            <input v-model="email" class="input" type="text" :placeholder="t('textHinEmail')">
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
            <input v-model="password" class="input" :type="typeInput" :placeholder="t('textHinPassword')">
            <h2 v-if="passwordError" class="text-red-500">
              {{ passwordError }}
            </h2>
            <div class="text-xl absolute top-14 right-3">
              <span class="cursor-pointer text-secondary-500" @click="showPassword">
                <Icon v-if="typeInput === 'password'" icon="heroicons-outline:eye" />
                <Icon v-else icon="heroicons-outline:eye-off" />
              </span>
            </div>
          </div>
          <CheckBoxAuth
            :label="t('register.textCheckBox')" :value="false" :model-value="checkbox" class="mt-3"
            @on-selected="onSelected"
          />
          <ButtonAuth class=" mt-10" :text="t('register.textButtonLogin')" :on-change="login" />
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
  </main>
</template>
