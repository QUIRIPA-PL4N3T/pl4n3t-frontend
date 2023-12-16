<script setup lang="ts">
import logo from '~/assets/images/logo-pl4n3t.png'
</script>

<template>
  <router-link to="/auth/login">
    <img
      class="w-full"
      :src="logo"
      alt=""
    >
  </router-link>
</template>
