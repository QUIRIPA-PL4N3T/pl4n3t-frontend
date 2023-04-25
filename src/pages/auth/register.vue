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
        <label class="flex justify-center text-2xl mt-4 text-slate-900">Sign up</label>
        <form class=" mb-4" @submit.prevent="login">
          <TextField class=" mt-5" label="Full Name" types="text" hin-text="Full Name" text-error="" />
          <TextField class=" mt-5" label="Email" types="text" hin-text="hh" text-error="" />
          <TextField label="password" types="password" :password="true" hin-text="*****" text-error="" />
          <CheckBox
            label="You accept our Terms and Conditions and Privacy Policy"
            :value="false"
            :model-value="checkbox"
            class="mt-3"
          />
          <Button class=" mt-10" text="Create An Account" :on-change="login" />
        </form>
        <SignSocial class=" mt-5 mb-10" />
        <div class="flex justify-center items-center mt-7">
          <label class=" text-gray-500 text-sm mr-2">ALREADY REGISTERED?</label>
          <RouterLink class=" flex justify-center items-center" to="/auth/login">
            <label class=" text-sm">SIGN IN</label>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>
