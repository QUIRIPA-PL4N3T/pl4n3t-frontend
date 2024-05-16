<script setup lang="ts">
import { storeToRefs } from 'pinia'

const basicStore = useBasicStore()
const membershipsStore = useMembershipsStore()
const { optionsDocuments } = storeToRefs(basicStore)
const { purchase } = storeToRefs(membershipsStore)

const { t } = useI18n()
</script>

<template>
  <div class="text-left">
    <FormKit
      v-model="purchase.payer.name"
      :label="t('purchase_membership.fields.name.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      type="text"
      :placeholder="t('purchase_membership.fields.name.placeholder')"
      name="name"
      required
    />
    <FormKit
      v-model="purchase.payer.email"
      :label="t('purchase_membership.fields.email.label')"
      outer-class="w-full"
      inner-class="max-w-xl"
      prefix-icon="email"
      validation="email"
      type="email"
      :placeholder="t('purchase_membership.fields.email.placeholder')"
      name="card"
      required
    />
    <div class="grid grid-flow-row-dense grid-cols-5 gap-2 my-4">
      <div class="col-span-1">
        <FormKit
          v-model="purchase.payer.phone.area_code"
          :label="t('purchase_membership.fields.phone_zone.label')"
          outer-class="w-full"
          inner-class="max-w-xl"
          type="number"
          :placeholder="t('purchase_membership.fields.phone_zone.placeholder')"
          name="phone_zone"
          required
        />
      </div>
      <div class="col-span-4">
        <FormKit
          v-model="purchase.payer.phone.number"
          :label="t('purchase_membership.fields.phone.label')"
          outer-class="w-full"
          inner-class="max-w-xl"
          type="number"
          prefix-icon="telephone"
          validation="length:10,10"
          validation-visibility="live"
          :placeholder="t('purchase_membership.fields.phone.placeholder')"
          name="phone"
          required
        />
      </div>
    </div>
    <div class="grid grid-flow-row-dense grid-cols-5 gap-2 my-4">
      <div class="col-span-2">
        <FormKit
          v-model="purchase.payer.identification.type"
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
          v-model="purchase.payer.identification.number"
          :label="t('purchase_membership.fields.identification.label')"
          outer-class="w-full"
          inner-class="max-w-xl"
          type="text"
          validation="min:5"
          :placeholder="t('purchase_membership.fields.identification.placeholder')"
          name="identification"
          required
        />
      </div>
    </div>
    <div class="grid grid-flow-row-dense grid-cols-5 gap-2 my-4">
      <div class="col-span-3">
        <FormKit
          v-model="purchase.payer.address.street_name"
          :label="t('purchase_membership.fields.street_name.label')"
          outer-class="w-full"
          inner-class="max-w-xl"
          type="text"
          name="street_name"
          :placeholder="t('purchase_membership.fields.street_name.placeholder')"
          required
        />
      </div>
      <div class="col-span-2">
        <FormKit
          v-model="purchase.payer.address.street_number"
          :label="t('purchase_membership.fields.street_number.label')"
          outer-class="w-full"
          inner-class="max-w-xl"
          type="text"
          validation="length:1,5"
          :placeholder="t('purchase_membership.fields.street_number.placeholder')"
          name="street_number"
          required
        />
      </div>
      <div class="col-span-5">
        <FormKit
          v-model="purchase.payer.address.zip_code"
          :label="t('purchase_membership.fields.zip_code.label')"
          outer-class="w-full"
          inner-class="max-w-xl"
          type="text"
          validation="length:5,10"
          :placeholder="t('purchase_membership.fields.zip_code.placeholder')"
          name="zip_code"
          required
        />
      </div>
    </div>
  </div>
</template>
