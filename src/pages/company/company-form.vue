<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)
</script>

<template>
  <div class="xl:col-span-2">
    <Card :title="company.name">
      <form action="">
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <Textinput
            v-model="company.name"
            :label="t('company.name')"
            name="name"
            type="text"
            placeholder="..."
          />
          <Textinput
            v-model="company.email"
            :label="t('company.email')"
            name="email"
            type="email"
            placeholder="..."
          />
          <Textinput
            v-model="company.phone"
            :label="t('company.phone')"
            name="phone"
            type="text"
            placeholder="..."
          />
          <Textinput
            v-model="company.estate"
            :label="t('company.city')"
            name="estate"
            type="text"
            placeholder="..."
          />
          <Textinput
            v-model="company.address"
            :label="t('company.address')"
            name="address"
            type="text"
            placeholder="..."
          />
          <Textinput
            v-model="company.url"
            :label="t('company.url')"
            name="url"
            type="text"
            placeholder="..."
          />
          <Select label="Country" name="hmi_country" />
        </div>
        <div class="flex justify-end">
          <div class="space-y-5">
            <Button :text="t('save')" btn-class="btn-dark" />
          </div>
        </div>
      </form>
    </Card>
  </div>
</template>

<route lang="yaml">
name: company-edit
meta:
  layout: sidebar
  requiresAuth: true
</route>
