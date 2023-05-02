<script setup lang="ts">
import logo from '~/assets/images/logo.png'
</script>

<template>
  <router-link to="/auth/login">
    <img
      :src="logo"
      alt=""
    >
  </router-link>
</template>
