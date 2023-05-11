<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

const name = computed( () => {
  return route.name!.toString().replace("-", " ")
})
</script>

<template>
  <div class="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse">
    <h4
      v-if="$route.name && !$route.meta.groupParent"
      :class="
        $route.meta.groupParent
          ? 'lg:border-r lg:border-secondary-500'
          : ''
      "
      class="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4"
    >
      {{ t(`${name}.title`) }}
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
        <button type="button" class="capitalize">
          {{ $route.meta.groupParent }}
        </button>
        <span class="breadcrumbs-icon rtl:transform rtl:rotate-180">
          <Icon icon="heroicons:chevron-right" />
        </span>
      </li>
      <li class="capitalize text-slate-500 dark:text-slate-400 lo">
        {{ t(`${name}.title`) }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.breadcrumbs {
  @apply flex text-sm space-x-2 items-center;
  li {
    @apply relative flex items-center space-x-2 capitalize font-normal rtl:space-x-reverse;
    .breadcrumbs-icon {
      @apply text-lg text-secondary-500 dark:text-slate-500;
    }
  }
}
</style>
