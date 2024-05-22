<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const companyStore = useCompanyStore()
const basicStore = useBasicStore()
const { company } = storeToRefs(companyStore)
const {
  optionsCountries,
  optionsStates,
  optionCities,
  optionsIndustryTypeList,
  optionsEconomicSectorList,
  optionsCompanySize,
} = storeToRefs(basicStore)

async function handleCountryChange() {
  await basicStore.getStatesByCountryId(company.value.country!)
}

async function handleStateChange() {
  await basicStore.getCitiesByStateID(company.value.state!)
}
</script>

<template>
  <div class="xl:col-span-2">
    <Card :title="company.name">
      <FormKit
        v-model="company"
        type="form"
        :actions="false"
        :incomplete-message="false"
        @submit="companyStore.saveCompany"
      >
        <div class="flex flex-col md:grid md:grid-cols-2 grid-cols-1 gap-5">
          <FormKit
            type="text"
            name="name"
            label-class="block capitalize form-label"
            :label="t('company.name')"
            validation="required|length:3"
            placeholder="..."
          />
          <FormKit
            type="text"
            name="nit"
            label-class="block capitalize form-label"
            :label="t('general.nit')"
            validation="required|length:3"
            placeholder="..."
          />
          <FormKit
            :label="t('company.email')"
            name="email"
            type="text"
            placeholder="..."
            validation="required|email"
          />
          <FormKit
            :label="t('company.phone')"
            name="phone"
            type="text"
            placeholder="..."
            validation="required|number|length:10,10"
            :validation-messages="{
              length: 'Número de contacto debe tener 10 caracteres.',
            }"
          />
          <FormKit
            :label="t('company.address')"
            name="address"
            type="text"
            placeholder="..."
          />
          <FormKit
            type="select"
            name="country"
            :label="t('general.origin_country')"
            placeholder="--"
            validation="required"
            :classes="{ outer: !company.country ? 'option-placeholder' : '' }"
            :options="optionsCountries"
            @change="handleCountryChange"
          />
          <FormKit
            type="select"
            name="state"
            :label="t('general.state')"
            placeholder="--"
            validation="required"
            :classes="{ outer: !company.state ? 'option-placeholder' : '' }"
            :options="optionsStates"
            @change="handleStateChange"
          />
          <FormKit
            type="select"
            name="city"
            :label="t('general.city')"
            placeholder="--"
            validation="required"
            :classes="{ outer: !company.city ? 'option-placeholder' : '' }"
            :options="optionCities"
          />

          <FormKit
            :label="t('company.url')"
            name="website"
            wr
            type="text"
            placeholder="..."
          />

          <FormKit
            type="select"
            name="size"
            :label="t('company.size')"
            :options="optionsCompanySize"
          />

          <FormKit
            type="select"
            name="economic_sector"
            :label="t('general.economic_sector')"
            :options="optionsEconomicSectorList"
          />

          <FormKit
            type="select"
            name="industry_type"
            :label="t('general.industry_type')"
            :options="optionsIndustryTypeList"
          />

          <div class="col-span-2 flex justify-end">
            <div class="space-y-5">
              <Button :text="t('save')" btn-class="btn-dark" />
            </div>
          </div>
        </div>
      </FormKit>
    </Card>
  </div>
</template>

<route lang="yaml">
name: company-edit
meta:
  layout: sidebar
  requiresAuth: true
</route>
