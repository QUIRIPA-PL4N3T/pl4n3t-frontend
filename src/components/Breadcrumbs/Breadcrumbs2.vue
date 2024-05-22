<script setup>
</script>

<template>
  <div class="flex items-center space-x-3 rtl:space-x-reverse">
    <h4
      v-if="$route.name && !$route.meta.groupParent"
      :class="
        $route.meta.groupParent
          ? 'lg:border-r lg:border-secondary-500'
          : ''
      "
      class="font-medium lg:text-2xl text-xl text-slate-900 inline-block pr-4"
    >
      {{ $route.meta.groupParent }}
    </h4>
    <ul v-if="$route.meta.groupParent" class="breadcrumbs">
      <li class="text-primary-500">
        <router-link to="/auth/login" class="text-lg">
          <Icon icon="heroicons-outline:home" />
        </router-link>
        <span class="breadcrumbs-icon rtl:transform rtl:rotate-180">
          <Icon icon="heroicons:chevron-right" />
        </span>
      </li>
      <li class="text-primary-500">
        <button type="button">
          {{ $route.name }}
        </button>
        <span class="breadcrumbs-icon rtl:transform rtl:rotate-180">
          <Icon icon="heroicons:chevron-right" />
        </span>
      </li>
      <li class="text-slate-500 dark:text-slate-400">
        {{ $route.meta.groupParent }}
      </li>
    </ul>
  </div>
</template>

<style lang=""></style>
