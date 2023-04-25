<script setup lang="ts">
const { label, hinText, password, types, textError = 'err' } = defineProps<{ label: String; hinText: string; textError: String; password?: Boolean; types: string }>()

let typeInput = $ref<string>(types)

function toggleType() {
  // toggle the type of the input field
  typeInput = typeInput === 'text' ? 'password' : 'text'
}
</script>

<template>
  <div class="flex flex-col  relative mb-2">
    <label for="la">{{ label }}</label>
    <input
      class="input"
      :type="typeInput"
      :placeholder="hinText"
    >
    <h2 v-if="textError" class="text-red-500">
      {{ textError }}
    </h2>

    <div class="text-xl absolute top-14 right-3">
      <span v-if="textError" class="text-red-500">
        <Icon icon="heroicons-outline:information-circle" />
      </span>
      <span
        v-if="password"
        class="cursor-pointer text-secondary-500"
        @click="toggleType"
      >
        <Icon v-if="typeInput === 'password'" icon="heroicons-outline:eye" />
        <Icon v-else icon="heroicons-outline:eye-off" />
      </span>
    </div>
  </div>
</template>
