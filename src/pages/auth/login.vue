<script setup lang="ts">
import logo from '~/assets/images/logo.png'

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
  if (!seletedCheckBox)
    alert('aaa')
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
        <label class="flex justify-center text-2xl mt-4 text-slate-900">Sign in</label>
        <form class=" mb-4" @submit.prevent="login">
          <div class="flex flex-col  relative mb-2">
            <label for="la">Email</label>
            <input v-model="email" class="input" type="text" placeholder="Email" onchange="">
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
            <label for="la">Password</label>
            <input v-model="password" class="input" :type="typeInput" placeholder="hinText">
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
          <div class="flex justify-between mt-5">
            <CheckBoxAuth label="Keep me signed in" :model-value="checkbox" :checked="false" :value="false" @on-selected="onSelected" />
            <RouterLink to="/auth/resetPassword">
              <label for="">Forgot Password?</label>
            </RouterLink>
          </div>
          <ButtonAuth class=" mt-10" text="Sign In" />
        </form>
        <SignInSocial class=" mt-5 mb-10" />
        <div class="flex justify-center items-center mt-7">
          <label class=" text-gray-500 text-sm mr-2">DON´T HAVE AN ACCOUNT? SIGN UP </label>
          <RouterLink class=" flex justify-center items-center" to="/auth/register">
            <label class=" text-sm">SIGN UP</label>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>
