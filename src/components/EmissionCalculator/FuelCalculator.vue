<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { EmissionFactorComponent, EmissionsSource, GreenhouseGas, GreenhouseGasEmission } from '~/api-client'

const model = defineModel<EmissionsSource | null>({ required: true })

const emissionFactorStore = useEmissionFactorStore()
const {
  emissionFactor,
  optionsFactorUnits,
  optionsMonths,
  optionsYears,
} = storeToRefs(emissionFactorStore)

const { t } = useI18n()

const usage = ref(0)
const unit = ref(0)
const month = ref(0)
const year = ref(new Date().getFullYear())

const results = ref<null | { [key: string]: number }>(null)
const groupedResults = ref<null | { [group: string]: { [gas: string]: number } }>(null)

let greenhouseGasEmissionFactorsByComponent: { [group: string]: { [gas: string]: GreenhouseGasEmission } } = {}
let globalWarmingPotential: { [key: string]: number } = {}
const factorPercentage: { [key: string]: number } = {}

function resetResults() {
  // Clear results variables
  unit.value = emissionFactor.value!.unit.id || 0
  year.value = new Date().getFullYear()
  month.value = new Date().getMonth()
  usage.value = 0
  results.value = null
  groupedResults.value = null
  greenhouseGasEmissionFactorsByComponent = {}
  globalWarmingPotential = {}
}

async function loadFactorData() {
  // Obtain the main emission factor data
  if (model.value)
    await emissionFactorStore.retrieveFactorData(model.value.emission_factor)

  if (emissionFactor.value) {
    // Clear variables
    resetResults()

    // Function to add the gases of a component to the greenhouseGasEmissionFactorsByComponent dictionary.
    const addGreenhouseGasesByComponent = (componentName: string, greenhouseEmissionGas: GreenhouseGasEmission[], percentage: number) => {
      greenhouseEmissionGas.forEach((item: GreenhouseGasEmission) => {
        if (item.greenhouse_gas && item.greenhouse_gas.acronym) {
        // Create dictionary for new component if it does not exist
          if (!greenhouseGasEmissionFactorsByComponent[componentName])
            greenhouseGasEmissionFactorsByComponent[componentName] = {}

          // Store the percentage applied for later display in the template
          factorPercentage[componentName] = percentage * 100

          // Calculate the percentage to be applied according to the current component
          item.value = item.value! * percentage

          // Add the gas to the component dictionary
          greenhouseGasEmissionFactorsByComponent[componentName][item.greenhouse_gas.acronym] = item

          // Update global warming potential if it does not exist.
          if (!globalWarmingPotential[item.greenhouse_gas.acronym])
            globalWarmingPotential[item.greenhouse_gas.acronym] = item.greenhouse_gas.kg_co2_equivalence || 0
        }
      })
    }

    // Add gases from the main emission factor
    addGreenhouseGasesByComponent(emissionFactor.value!.name, emissionFactor.value.greenhouse_emission_gases, emissionFactor.value.application_percentage || 1)

    // Add component gases
    emissionFactor.value.components.forEach((component: EmissionFactorComponent) => {
      addGreenhouseGasesByComponent(component.component_name, component.greenhouse_emission_gases, component.application_percentage || 1)
    })
  }
}

function calculateEmissions() {
  // Initialize emission results and grouped as empty objects
  results.value = {}
  groupedResults.value = {}

  // Calculate emissions for each group/component and gas
  Object.entries(greenhouseGasEmissionFactorsByComponent).forEach(([group, factors]) => {
    groupedResults.value![group] = {}
    // Initialize the sum of CO₂e for the current group.
    let groupCO2e = 0

    // Iterate on each gas within the current group
    Object.entries(factors).forEach(([key, gas]) => {
      // Calculate the gas emission by multiplying the value of use by the value of the gas
      const value = usage.value * gas.value!
      // Storing gas emission in the grouped results
      groupedResults.value![group][key] = value
      // Add the CO₂e of the current gas to the group total.
      groupCO2e += value * globalWarmingPotential[key]
    })
    // Save the total CO₂e of the component in the results.
    if (results.value)
      results.value[`${group}_CO2e`] = groupCO2e
  })

  // Calculate total CO₂e by summing the emissions of each gas multiplied by its global warming potential.
  results.value.CO2e = 0
  Object.entries(groupedResults.value).forEach(([_, factors]) => {
    Object.entries(factors).forEach(([key, value]) => {
      // Verify whether the global warming potential of the gas exists.
      if (globalWarmingPotential[key]) {
        // Add the CO₂e of the current gas to the total.
        if (results.value)
          results.value.CO2e += value * globalWarmingPotential[key]
      }
    })
  })
}

async function saveEmissionData() {
  const data = {
    name: 'Resultado de Emisión',
    date: new Date().toISOString().split('T')[0],
    usage: usage.value,
    unit: unit.value,
    total_co2e: results.value!.CO2e,
    gas_details: Object.entries(groupedResults.value!).flatMap(([_, factors]) =>
      Object.entries(factors).map(([acronym, value]) => ({
        greenhouse_gas: getGreenHouseGasByAcronym(acronym)!.id,
        value,
        co2e: value * globalWarmingPotential[acronym],
      })),
    ),
  }

  await emissionFactorStore.saveEmissionResult(data)
}

const title = computed(() => {
  if (emissionFactor.value)
    return emissionFactor.value.name
  return t('emissionFactor.name')
})

const subHeading = computed(() => {
  if (emissionFactor.value)
    return emissionFactor.value.source_type.name
  return t('emissionFactor.type')
})

function getGreenHouseGasByAcronym(acronym: string): GreenhouseGas | null {
  if (emissionFactor.value && emissionFactor.value.greenhouse_emission_gases) {
    const greenhouseEmissionGas = emissionFactor.value.greenhouse_emission_gases.find(item => item.greenhouse_gas.acronym === acronym)
    return greenhouseEmissionGas?.greenhouse_gas || null
  }
  return null
}

function getGreenhouseNameByAcronym(acronym: string): string {
  const greenhouseGas = getGreenHouseGasByAcronym(acronym)
  if (greenhouseGas)
    return greenhouseGas.name
  return acronym
}

watch(() => model.value, () => {
  loadFactorData()
})

watch(() => usage.value, () => {
  calculateEmissions()
})

onMounted(() => {
  loadFactorData()
})
</script>

<template>
  <div class="w-full pb-3">
    <h4>{{ title }}</h4>
    <p>{{ subHeading }}</p>
  </div>
  <!-- Greenhouse calculator -->
  <div class="calculator-container">
    <FormKit
      type="form"
      :actions="false"
      @submit="calculateEmissions"
    >
      <div class="flex flex-col md:grid md:grid-cols-2 gap-4">
        <FormKit
          v-model="usage"
          number
          step="any"
          name="usage"
          :label="t('emissionFactor.usage')"
          type="number"
          validation="required|number"
        />
        <FormKit
          v-model="unit"
          name="units"
          :label="t('Units')"
          type="select"
          validation="required"
          :options="optionsFactorUnits"
        />
        <FormKit
          v-model="year"
          name="year"
          :label="t('month')"
          type="select"
          validation="required"
          :options="optionsYears"
        />
        <FormKit
          v-model="month"
          name="month"
          :label="t('month')"
          type="select"
          validation="required"
          :options="optionsMonths"
        />
      </div>
    </FormKit>
  </div>

  <!-- Greenhouse emission by component -->
  <div v-if="groupedResults && results">
    <template v-for="(factors, group) in groupedResults" :key="group">
      <div class="results">
        <div class="head">
          <div class="col-span-2">
            {{ group }}: ({{ factorPercentage[group] }}%)
          </div>
          <div class="col-span-1">
            {{ t('emissionFactor.value') }}
          </div>
          <div class="col-span-1">
            {{ t('emissionFactor.uncertainty') }} (%)
          </div>
          <div class="col-span-1">
            {{ t('emissionFactor.gwp') }}
          </div>
        </div>

        <div v-for="(value, acronym) in factors" :key="acronym" class="contents">
          <div v-if="value !== 0" class="grid grid-cols-subgrid col-span-5">
            <div class="col-span-2 text-sm">
              <strong>{{ getGreenhouseNameByAcronym(acronym.toString()) }}</strong> ({{ acronym }})
            </div>
            <div class="col-span-1 text-sm text-center">
              {{ value.toFixed(7) }} kg
            </div>
            <div class="col-span-1 text-sm text-center">
              {{ (greenhouseGasEmissionFactorsByComponent[group][acronym].percentage_uncertainty || 0) * 100 }}%
            </div>
            <div class="col-span-1 text-sm text-center">
              {{ globalWarmingPotential[acronym] }}
            </div>
          </div>
        </div>
        <div class="col-span-5 border-t flex justify-end pe-16 py-4 text-md items-center gap-4">
          <strong class="text-sm">
            {{ t('carbon_dioxide_equivalent') }}:
          </strong>
          <div>
            {{ results[`${group}_CO2e`].toFixed(7) }} kg de CO₂e
          </div>
        </div>
      </div>
    </template>
  </div>

  <!-- Total Co2 emissions -->
  <div v-if="results" class="grid grid-cols-2 py-4 px-2 mt-2 border rounded-md mb-2">
    <div class="col-span-1 font-bold">
      <strong class="text-sm">
        {{ t('total_carbon_dioxide_equivalent') }}
      </strong>
    </div>
    <div class="col-span-1 text-md text-right pe-16">
      {{ results.CO2e.toFixed(7) }} kg de CO₂e
    </div>
  </div>

  <div class="col-span-2 flex justify-end">
    <div class="space-y-5">
      <Button
        :text="t('save')"
        btn-class="btn-dark"
        @click="saveEmissionData()"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.results {
  @apply grid grid-cols-5 gap-4 mt-3 border p-2 rounded-md;

  .head {
    @apply grid grid-cols-subgrid col-span-5 border-b py-3;

    div {
      @apply font-bold text-center;
    }
  }
}
</style>
