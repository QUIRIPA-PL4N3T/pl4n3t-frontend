<script setup lang="ts">
import tw from '~/assets/images/icons/tw.svg'
import fc from '~/assets/images/icons/fb.svg'
import inR from '~/assets/images/icons/in.svg'
import go from '~/assets/images/icons/gp.svg'
</script>

<template>
  <div class=" mt-4">
    <div class="flex justify-between items-center mb-6">
      <div class=" w-2/6 h-0.5 bg-gray-200" />
      <label class=" text-gray-500 ml-1 mr-1 text-xs">Or continue with</label>
      <div class="w-2/6  h-0.5 bg-gray-200" />
    </div>
    <div class="flex justify-center">
      <div class=" justify-center items-center w-7/12">
        <ul class="flex justify-between">
          <RouterLink
            class=" inline-flex w-10 h-10 bg-blue-400 text-white text-2xl flex-col items-center justify-center rounded-full"
            to="#"
          >
            <img :src="tw" alt="">
          </RouterLink>
          <RouterLink
            class=" inline-flex w-10 h-10 bg-blue-800 text-white text-2xl flex-col items-center justify-center rounded-full"
            to="#"
          >
            <img :src="fc" alt="">
          </RouterLink>
          <RouterLink
            class=" inline-flex w-10 h-10 bg-blue-700 text-white text-2xl flex-col items-center justify-center rounded-full"
            to="#"
          >
            <img :src="inR" alt="">
          </RouterLink>
          <RouterLink
            class=" inline-flex w-10 h-10 bg-red-500 text-white text-2xl flex-col items-center justify-center rounded-full"
            to="#"
          >
            <img :src="go" alt="">
          </RouterLink>
        </ul>
      </div>
    </div>
  </div>
</template>
