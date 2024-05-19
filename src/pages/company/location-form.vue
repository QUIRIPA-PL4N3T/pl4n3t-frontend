<script setup lang="ts">
import { storeToRefs } from 'pinia'

const props = defineProps<{ id?: string }>()

const { t } = useI18n()
const authStore = useAuthStore()
const basicStore = useBasicStore()
const router = useRouter()
const { user } = storeToRefs(authStore)
const companyStore = useCompanyStore()
const { company, currentLocation, optionBrands } = storeToRefs(companyStore)
const {
  optionsCountries,
  optionsStates,
  optionCities,
  optionsLocationTypeList,
} = storeToRefs(basicStore)
const confirmModal = ref<any>(null)
const selectedBrand = ref(null)

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

watch(() => company.value, () => {
  if (company.value)
    router.push({ name: 'locations' })
})

// Watch for changes in optionsStates and auto-select if only one option is available
watch(optionBrands, (newOptions) => {
  if (newOptions.length === 1)
    selectedBrand.value = newOptions[0].value
})

function closeModal() {
  if (confirmModal.value)
    confirmModal.value.closeModal()
}

companyStore.fetchLocation(Number(props.id))
</script>

<template>
  <div class="xl:col-span-2">
    <Card :title="currentLocation.name || t('location.new')">
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
                  validation="required"
                  name="name"
                />
              </div>
              <div class="pb-2">
                <FormKit
                  v-if="company.brands.length > 0"
                  v-model="selectedBrand"
                  :label="t('general.brand')"
                  type="select"
                  name="brand"
                  validation="required"
                  :options="optionBrands"
                />
              </div>
              <div class="flex flex-col lg:grid lg:grid-cols-3 gap-4 w-full">
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
              <div class="flex flex-col lg:grid lg:grid-cols-3 w-full gap-4">
                <FormKit
                  :label="t('location.address')"
                  type="text"
                  class="flex-grow"
                  placeholder="..."
                  validation="required"
                  name="address"
                />
                <FormKit
                  :label="t('location.email')"
                  type="email"
                  class="flex-grow"
                  placeholder="..."
                  validation="required"
                  name="email"
                />
                <FormKit
                  :label="t('location.phone')"
                  class="flex-grow"
                  type="text"
                  placeholder="..."
                  validation="required"
                  name="phone"
                />
              </div>
              <div class="flex flex-col lg:grid lg:grid-cols-2 w-full gap-4">
                <FormKit
                  :label="t('location.type')"
                  type="select"
                  name="location_type"
                  :options="optionsLocationTypeList"
                />
                <FormKit
                  :label="t('location.employeesNumber')"
                  type="number"
                  placeholder="..."
                  name="employees"
                />
              </div>
            </div>
            <div class="flex justify-end gap-2 pt-3">
              <Modal
                v-if="currentLocation.id !== 0"
                ref="confirmModal"
                :title="t('company.delete.Brand')"
                :label="t('delete')"
                label-class="btn-danger"
                theme-class="bg-danger-500"
              >
                <div class="text-base text-slate-600 dark:text-slate-300">
                  {{ t('company.brand.delete.message') }}
                </div>
                <template #footer>
                  <Button
                    :text="t('cancel')"
                    btn-class="btn-dark"
                    @click="closeModal"
                  />
                  <Button
                    :text="t('Accept')"
                    btn-class="btn-danger"
                    @click="deleteLocation(currentLocation.id)"
                  />
                </template>
              </Modal>
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
