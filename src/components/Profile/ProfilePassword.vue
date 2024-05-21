<script setup lang="ts">
import { storeToRefs } from 'pinia'

const basicStore = useAuthStore()
const { password } = storeToRefs(basicStore)

const { t } = useI18n()

function handleIconClick(node: any) {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>

<template>
  <div class="text-left">
    <FormKit
      v-model="password.old_password"
      :label="t('profile.fields.old_password.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="password"
      :placeholder="t('profile.fields.old_password.placeholder')"
      name="old_password"
      prefix-icon="password"
      suffix-icon="eyeClosed"
      suffix-icon-class="hover:text-blue-500"
      required
      @suffix-icon-click="handleIconClick"
    />
    <FormKit
      v-model="password.new_password"
      :label="t('profile.fields.new_password.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="password"
      :placeholder="t('profile.fields.new_password.placeholder')"
      name="new_password"
      prefix-icon="password"
      suffix-icon="eyeClosed"
      suffix-icon-class="hover:text-blue-500"
      required
      @suffix-icon-click="handleIconClick"
    />
    <FormKit
      v-model="password.confirm_password"
      :label="t('profile.fields.confirm_password.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="password"
      :placeholder="t('profile.fields.confirm_password.placeholder')"
      name="confirm_password"
      prefix-icon="password"
      suffix-icon="eyeClosed"
      suffix-icon-class="hover:text-blue-500"
      required
      @suffix-icon-click="handleIconClick"
    />
  </div>
</template>
