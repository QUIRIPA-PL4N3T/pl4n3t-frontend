<script setup lang="ts">
import logo from '~/assets/images/logo.png'

const email = ref<string>()
const textError = ref<string>()
function resetPassword() {
}
</script>

<template>
  <main class="min-h-screen flex">
    <div class="w-1/2  hidden   lg:flex lg:justify-center lg:items-center">
      <Logo :image="logo" class=" h-28" />
    </div>
    <div class="flex w-full justify-center items-center lg:w-1/2">
      <div class=" w-full max-w-lg h-2/3 pl-5 pr-5  bg-white  rounded border shadow-2xl ">
        <Logo :image="logo" class="h-16 mt-20 m-auto" />
        <label class="flex justify-center text-2xl mt-10 text-slate-900">Forgot Your Password</label>
        <form class=" mb-4" @submit.prevent="resetPassword">
          <div class="flex flex-col  relative mb-2">
            <label for="la">Email</label>
            <input
              v-model="email"
              class="input"
              type="text"
              placeholder="Email"
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
          <ButtonAuth class=" mt-10" text="send Recovery Email" />
        </form>
        <div class="flex justify-center items-center mt-7">
          <label class=" text-gray-500 text-sm mr-2">FORGET IT,</label>
          <RouterLink class=" flex justify-center items-center" to="/auth/login">
            <label class="text-sm mr-2 hover:cursor-pointer hover:underline  ">SIGN UP</label>
          </RouterLink>
          <label class=" text-gray-500 text-sm mr-2">TO THE SIGN IN</label>
        </div>
      </div>
    </div>
  </main>
</template>
