<script setup lang="ts">
import { storeToRefs } from 'pinia'

const basicStore = useBasicStore()
const { optionsDocuments } = storeToRefs(basicStore)

const name = ref('')
const email = ref('')
const phone_zone = ref('')
const phone = ref('')
const identification_type = ref('')
const identification = ref('')
const street_name = ref('')
const street_number = ref('')
const zip_code = ref('')

const { t } = useI18n()
</script>

<template>
  <div class="text-left">
    <FormKit
      v-model="name"
      :label="t('purchase_membership.fields.name.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="text"
      :placeholder="t('purchase_membership.fields.name.placeholder')"
      name="name"
      required
    />
    <FormKit
      v-model="email"
      :label="t('purchase_membership.fields.email.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="email"
      :placeholder="t('purchase_membership.fields.email.placeholder')"
      name="card"
      required
    />
    <div class="grid grid-flow-row-dense grid-cols-5 gap-2 my-4">
      <div class="col-span-1">
        <FormKit
          v-model="phone_zone"
          :label="t('purchase_membership.fields.phone_zone.label')"
          outer-class="w-full"
          inner-class="max-w-xl"
          type="number"
          :placeholder="t('purchase_membership.fields.phone_zone.placeholder')"
          name="phone_zone"
        />
      </div>
      <div class="col-span-4">
        <FormKit
          v-model="phone"
          :label="t('purchase_membership.fields.phone.label')"
          outer-class="w-full"
          inner-class="max-w-xl"
          type="number"
          :placeholder="t('purchase_membership.fields.phone.placeholder')"
          name="phone"
        />
      </div>
    </div>
    <div class="grid grid-flow-row-dense grid-cols-5 gap-2 my-4">
      <div class="col-span-2">
        <FormKit
          v-model="identification_type"
          :label="t('purchase_membership.fields.identification_type.label')"
          outer-class="w-full"
          inner-class="max-w-xl"
          type="select"
          :options="optionsDocuments"
          name="identification_type"
          required
        />
      </div>
      <div class="col-span-3">
        <FormKit
          v-model="identification"
          :label="t('purchase_membership.fields.identification.label')"
          outer-class="w-full"
          inner-class="max-w-xl"
          type="text"
          :placeholder="t('purchase_membership.fields.identification.placeholder')"
          name="identification"
          required
        />
      </div>
    </div>
    <div class="grid grid-flow-row-dense grid-cols-5 gap-2 my-4">
      <div class="col-span-3">
        <FormKit
          v-model="street_name"
          :label="t('purchase_membership.fields.street_name.label')"
          outer-class="w-full"
          inner-class="max-w-xl"
          type="text"
          name="street_name"
          required
          :placeholder="t('purchase_membership.fields.street_name.placeholder')"
        />
      </div>
      <div class="col-span-2">
        <FormKit
          v-model="street_number"
          :label="t('purchase_membership.fields.street_number.label')"
          outer-class="w-full"
          inner-class="max-w-xl"
          type="text"
          :placeholder="t('purchase_membership.fields.street_number.placeholder')"
          name="street_number"
          required
        />
      </div>
      <div class="col-span-5">
        <FormKit
          v-model="zip_code"
          :label="t('purchase_membership.fields.zip_code.label')"
          outer-class="w-full"
          inner-class="max-w-xl"
          type="text"
          :placeholder="t('purchase_membership.fields.zip_code.placeholder')"
          name="zip_code"
          required
        />
      </div>
    </div>
  </div>
</template>
