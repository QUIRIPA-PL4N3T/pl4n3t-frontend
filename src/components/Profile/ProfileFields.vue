<script setup lang="ts">
import { storeToRefs } from 'pinia'

const basicStore = useAuthStore()
const { user } = storeToRefs(basicStore)

const { t } = useI18n()
</script>

<template>
  <div class="text-left">
    <FormKit
      v-model="user.username"
      :label="t('profile.fields.username.label')"
      aria-readonly="true"
      disabled="true"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="text"
      :placeholder="t('profile.fields.username.placeholder')"
      name="name"
      required
    />
    <FormKit
      v-model="user.first_name"
      :label="t('profile.fields.first_name.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="text"
      :placeholder="t('profile.fields.first_name.placeholder')"
      name="card"
      required
    />
    <FormKit
      v-model="user.last_name"
      :label="t('profile.fields.last_name.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="text"
      :placeholder="t('profile.fields.last_name.placeholder')"
      name="expiration"
    />
    <FormKit
      v-model="user.email"
      :label="t('profile.fields.email.label')"
      aria-readonly="true"
      disabled="true"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="email"
      :placeholder="t('profile.fields.email.placeholder')"
      name="email"
    />
  </div>
</template>
