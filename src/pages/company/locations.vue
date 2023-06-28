<script setup lang="ts">
import { storeToRefs } from 'pinia'
import json from './location-headers.json'

const companyStore = useCompanyStore()
const basicStore = useBasicStore()
const { company } = storeToRefs(companyStore)
const { optionsLocationTypeList } = storeToRefs(basicStore)
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
              <Select
                label="Tipo de Sede"
                :options="optionsLocationTypeList"
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
name: locations
meta:
  layout: sidebar
  requiresAuth: true
</route>
