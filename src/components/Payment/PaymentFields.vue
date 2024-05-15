<script setup lang="ts">
const names = ref('')
const card = ref('')
const expiration = ref('2024-09')
const cvv = ref('')
const address = ref('')

const { t } = useI18n()
</script>

<template>
  <div class="text-left">
    <FormKit
      v-model="names"
      :label="t('pusharse-membership.fields.names.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="text"
      :placeholder="t('pusharse-membership.fields.names.placeholder')"
      name="name"
      required
    />
    <FormKit
      v-model="card"
      :label="t('pusharse-membership.fields.card.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="text"
      :placeholder="t('pusharse-membership.fields.card.placeholder')"
      name="card"
      required
    />
    <FormKit
      v-model="expiration"
      :label="t('pusharse-membership.fields.expiration.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="month"
      :placeholder="t('pusharse-membership.fields.expiration.placeholder')"
      name="expiration"
      validation="required|date_before:2010-01-01"
    />
    <FormKit
      v-model="cvv"
      :label="t('pusharse-membership.fields.cvv.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="number"
      mask="###"
      :placeholder="t('pusharse-membership.fields.cvv.placeholder')"
      name="cvv"
      required
      :help="t('pusharse-membership.fields.cvv.help')"
    />
    <FormKit
      v-model="address"
      :label="t('pusharse-membership.fields.address.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="number"
      :placeholder="t('pusharse-membership.fields.address.placeholder')"
      name="address"
      required
    />
  </div>
</template>
