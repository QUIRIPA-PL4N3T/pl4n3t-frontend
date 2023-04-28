<script setup lang="ts">
import go from '../../assets/images/logo-p.png'
</script>

<template>
  <header class="bg-white shadow-md h-14 md:h-20 flex">
    <img :src="go" alt="logo" class="block xl:hidden ">
    <a href="" class="p-2 my-4 hidden md:block flex justify-center items-center xl:hidden">
      <Icon icon="heroicons-outline:menu" size="30px" />

    </a>
    <nav class="flex justify-end w-full">
      <ul class="h-auto flex justify-center items-center ">
        <li>
          <a href="" class="mx-3"><Language /></a>
        </li>
        <li>
          <a href="" class="mx-5 bg-red-700"><SwitchDark /></a>
        </li>
        <li class="hidden md:block">
          <a href="" class="mx-3">a</a>
        </li>
        <li class="hidden md:block">
          <a href="" class="mx-3">b</a>
        </li>
        <li class="hidden md:block">
          <a href="" class="mx-3">c</a>
        </li>
      </ul>
    </nav>
    <a href="" class="p-2 block xl:hidden flex justify-center items-center block ">
      <Icon icon="heroicons-outline:menu" size="30px" />

    </a>
  </header>
  <footer class="bg-white shadow-md  fixed bottom-0 block md:hidden w-full h-16 border-t-2 border-gray-00">
    <nav class="flex justify-around w-full">
      <ul class="h-auto flex justify-center items-center">
        <li>
          <a href="" class="mx-3">a</a>
        </li>
        <li>
          <a href="" class="mx-3">b</a>
        </li>
        <li class="menu-icon">
          <a href="" class="mx-3">I</a>
        </li>
      </ul>
    </nav>
  </footer>
</template>
