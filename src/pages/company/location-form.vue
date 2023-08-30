<script setup lang="ts">
import { storeToRefs } from 'pinia'

const props = defineProps<{ id?: string }>()

const { t } = useI18n()
const authStore = useAuthStore()
const basicStore = useBasicStore()

const { user } = storeToRefs(authStore)
const companyStore = useCompanyStore()
const { company, currentLocation, optionBrands } = storeToRefs(companyStore)
const {
  optionsCountries,
  optionsStates,
  optionCities,
  optionsLocationTypeList,
} = storeToRefs(basicStore)

async function save() {
  await companyStore.saveLocation()
}

async function handleCountryChange() {
  await basicStore.getStatesByCountryId(Number(currentLocation.value.country!))
}

async function handleStateChange() {
  await basicStore.getCitiesByStateID(currentLocation.value.state!)
}

async function deleteLocation(id: number) {
  await companyStore.deleteLocation(id)
}

watch(() => user.value, () => {
  if (user.value)
    companyStore.fetchLocation(Number(props.id))
})

companyStore.fetchLocation(Number(props.id))
</script>

<template>
  <div class="xl:col-span-2">
    <Card :title="currentLocation.name">
      <div class="flex flex-row gap-4">
        <!-- Form Column -->
        <div class="w-full">
          <FormKit
            v-model="currentLocation"
            type="form"
            :actions="false"
            :incomplete-message="false"
            @submit="save"
          >
            <div class="text-base text-slate-600 dark:text-slate-300">
              <div class="pb-2">
                <FormKit
                  :label="t('location.name')"
                  type="text"
                  placeholder="..."
                  name="name"
                />
              </div>
              <div class="pb-2">
                <FormKit
                  v-if="company.brands.length > 0"
                  :label="t('general.brand')"
                  type="select"
                  name="location_type"
                  :options="optionBrands"
                />
              </div>
              <div class="flex gap-4">
                <FormKit
                  type="select"
                  name="country"
                  :label="t('general.origin_country')"
                  placeholder="--"
                  validation="required"
                  :classes="{ outer: !company.country ? 'option-placeholder' : '' }"
                  :options="optionsCountries"
                  @change="handleCountryChange()"
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
              </div>
              <div class="flex gap-4 w-full">
                <FormKit
                  :label="t('location.address')"
                  type="text"
                  class="flex-grow"
                  placeholder="..."
                  name="address"
                />
                <FormKit
                  :label="t('location.email')"
                  type="email"
                  class="flex-grow"
                  placeholder="..."
                  name="email"
                />
                <FormKit
                  :label="t('location.phone')"
                  class="flex-grow"
                  type="text"
                  placeholder="..."
                  name="phone"
                />
              </div>
              <FormKit
                label="Tipo de Sede"
                type="select"
                name="location_type"
                :options="optionsLocationTypeList"
              />
              <FormKit
                :label="t('location.employees')"
                type="number"
                placeholder="..."
                name="employees"
              />
            </div>
            <div class="flex justify-end gap-2 pt-3">
              <Button :text="t('delete')" btn-class="btn-danger" @click="deleteLocation(currentLocation.id)" />
              <div class="space-y-5">
                <Button :text="t('save')" btn-class="btn-dark" />
              </div>
            </div>
          </FormKit>
        </div>
      </div>
    </Card>
  </div>
</template>

<route lang="yaml">
path: '/location-edit/:id'
name: location-edit
meta:
  layout: sidebar
  requiresAuth: true
</route>
