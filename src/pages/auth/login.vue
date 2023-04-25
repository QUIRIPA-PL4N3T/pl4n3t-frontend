<script setup lang="ts">
import logo from '~/assets/images/logo.png'

const checkbox = ref< boolean>(false)

function login() {
}
</script>

<template>
  <main class="min-h-screen flex">
    <div class="w-1/2  hidden   lg:flex lg:justify-center lg:items-center">
      <Logo :image="logo" class=" h-28" />
    </div>
    <div class="flex w-full justify-center items-center lg:w-1/2">
      <div class=" w-full max-w-lg h-4/5 pl-5 pr-5  bg-white  rounded border shadow-2xl ">
        <Logo :image="logo" class="h-16 mt-8 m-auto" />
        <label class="flex justify-center text-2xl mt-4 text-slate-900">Sign in</label>
        <form class=" mb-4" @submit.prevent="login">
          <TextField class=" mt-5" label="Email" types="text" hin-text="hh" text-error="" />
          <TextField label="password" types="password" :password="true" hin-text="*****" text-error="" />
          <div class="flex justify-between mt-5">
            <CheckBox label="Keep me signed in" :model-value="checkbox" :checked="false" :value="false" />
            <RouterLink to="/">
              <label for="">Forgot Password?</label>
            </RouterLink>
          </div>
          <Button class=" mt-10" text="Sign In" :on-change="login" />
        </form>
        <SignSocial class=" mt-5 mb-10" />
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
