<script setup lang="ts">
import { storeToRefs } from 'pinia'

const companyStore = useCompanyStore()
const emissionFactorStore = useEmissionFactorStore()
const { optionsLocations } = storeToRefs(companyStore)
const { optionsFactor, optionsMonths, activities } = storeToRefs(emissionFactorStore)

const empty: any = {
  id: 0,
  location: 0,
  activity: 0,
  amount: 0,
  month: 0,
  h02: 0,
  hc4: 0,
  n2o: 0,
}
let activity = $ref(empty)

const { t } = useI18n()

function addActivity() {
  const emissionFactor = emissionFactorStore.getEmissionFactorById(Number(activity.activity))
  if (emissionFactor) {
    const id = activities.value.length + 1
    emissionFactorStore.addActivity(
      {
        id,
        location: companyStore.getLocationName(Number(activity.location)),
        activity: emissionFactor.name,
        amount: activity.amount,
        month: emissionFactorStore.getMonthById(activity.month) || 1,
        valueHO2: activity.amount * (emissionFactor.emission_factor.CO2 || 0),
        valueCH4: activity.amount * (emissionFactor.emission_factor.CH4 || 0),
        valueN2O: activity.amount * (emissionFactor.emission_factor.N2O || 0),
      })
  }
  activity = empty
}
</script>

<template>
  <div class="w-full h-full">
    <div class="lg:col-span-4 col-span-12 space-y-5">
      <Card :title="t('activities.modal.title')" noborder>
        <template #header>
          <Modal
            ref="modal1"
            :title="t('activities.modal.title')"
            :label="t('activities.add')"
            label-class="btn btn-dark btn-sm"
          >
            <form action="" @submit.prevent="addActivity">
              <div class="text-base text-slate-600 dark:text-slate-300">
                <Select
                  v-model="activity.location"
                  :label="t('activities.modal.location')"
                  :options="optionsLocations"
                  type="text"
                  placeholder="..."
                  name="location"
                />
                <Select
                  v-model="activity.activity"
                  :label="t('activities.modal.activity')"
                  :options="optionsFactor"
                  type="text"
                  placeholder="..."
                  name="activity"
                />
                <div class="my-2 flex flex-col">
                  <label for="amount">{{ t('activities.modal.amount') }}</label>
                  <input
                    id="'amount"
                    v-model="activity.amount"
                    placeholder="..."
                    type="number"
                    name="amount"
                    class="w-full input-control h-[40px]"
                  >
                </div>
                <Select
                  v-model="activity.month"
                  :label="t('activities.modal.month')"
                  :options="optionsMonths"
                  type="text"
                  placeholder="..."
                  name="month"
                />
              </div>
              <div class="flex gap-2 justify-end mt-4">
                <Button
                  :text="t('cancel')"
                  btn-class="btn-outline-dark "
                  @click="$refs.modal1.closeModal()"
                />
                <Button
                  :text="t('save')"
                  type="submit"
                  btn-class="btn-dark"
                  @click="$refs.modal1.closeModal()"
                />
              </div>
            </form>
          </Modal>
        </template>
        <ActivitiesTable />
      </Card>
    </div>
  </div>
</template>

<route lang="yaml">
name: register
meta:
  layout: sidebar
  requiresAuth: true
</route>
