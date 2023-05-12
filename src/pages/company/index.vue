<script setup lang="ts">
import { storeToRefs } from 'pinia'
import json from './location-headers.json'

const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)
const router = useRouter()

const { t } = useI18n()
const headers = json

function goEditCompany() {
  router.push({ name: 'company-edit', params: { id: 0 } })
}
</script>

<template>
  <div class="w-full h-full">
    <div class="lg:col-span-4 col-span-12 space-y-5">
      <Card :title="company.name">
        <template #header>
          <button type="button" class="btn btn-dark btn-sm" @click.prevent="goEditCompany">
            {{ t('company.edit') }}
          </button>
        </template>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="w-full flex md:w-1/6 align-middle justify-center">
            <a :href="company.url">
              <img :src="company.logo" :alt="company.name" class="max-w-[300px]" style="width: 100%;">
            </a>
          </div>
          <div class="w-full md:w-3/6">
            <h5>{{ t('company.contact') }}</h5>
            <p>{{ company.address }}</p>
            <p>{{ `${company.estate}, ${company.postalCode}, ${company.country}` }}</p>
            <p>{{ `${t('company.phone')}: ${company.phone}` }}</p>
            <p>{{ `${t('company.email')}: ${company.email}` }}</p>
          </div>
          <div class="flex flex-col w-full md:w-2/6 align-middle justify-center">
            <a href="/" class="font-bold text-sky-400">{{ t('membership.title') }}</a>
            <p>{{ `${t('membership.locationLimit')}: ` }} {{ company.membership.locationLimit }}</p>
            <p>{{ `${t('membership.workersLimit')}: ` }} {{ company.membership.locationLimit }}</p>
          </div>
        </div>
      </Card>

      <Card :title="t('locations.title')" noborder>
        <template #header>
          <Modal
            ref="modal1"
            :title="t('location.modal.title')"
            :label="t('location.add')"
            label-class="btn btn-dark btn-sm"
          >
            <div class="text-base text-slate-600 dark:text-slate-300">
              <Textinput
                :label="t('location.name')"
                type="text"
                placeholder="..."
                name="name"
              />
              <Textinput
                :label="t('location.address')"
                type="text"
                placeholder="..."
                name="address"
              />
              <Textinput
                :label="t('location.phone')"
                type="text"
                placeholder="..."
                name="phon"
              />
              <Textinput
                :label="t('location.email')"
                type="email"
                placeholder="..."
                name="email"
              />
              <Textinput
                :label="t('location.employees')"
                type="numeric"
                placeholder="..."
                name="employees"
              />
            </div>
            <template #footer>
              <Button
                :text="t('cancel')"
                btn-class="btn-outline-dark "
                @click="$refs.modal1.closeModal()"
              />
              <Button
                :text="t('save')"
                btn-class="btn-dark "
                @click="$refs.modal1.closeModal()"
              />
            </template>
          </Modal>
        </template>
        <CompanyTable />

        <VueGoodTable
          style-class="vgt-table lesspadding2 centered "
          :columns="headers"
          :rows="company.locations"
        />
      </Card>
    </div>
  </div>
</template>

<route lang="yaml">
name: company
meta:
  layout: sidebar
  requiresAuth: true
</route>
