<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { EmissionsSource, GreenhouseGasEmission } from '~/api-client'

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
const emissionFactors: { [key: string]: number } = {}
const globalWarmingPotential: { [key: string]: number } = {}
const results = ref<null | { [key: string]: number }>(null)

function calculateEmissions() {
  results.value = {}

  // Calculate Greenhouse
  Object.entries(emissionFactors).forEach(([key, value]) => {
    if (results.value)
      results.value[key] = usage.value * value
  })

  // Calculate CO₂e
  results.value.CO2e = 0
  Object.entries(results.value).forEach(([key, value]) => {
    if (globalWarmingPotential[key] && results.value)
      results.value.CO2e += value * globalWarmingPotential[key]
  })
}

function reset() {
  unit.value = emissionFactor.value!.unit.id || 0
  year.value = new Date().getFullYear()
  month.value = new Date().getMonth()
  usage.value = 0
  results.value = null
}

watch(() => model.value, () => {
  load()
})

watch(() => usage.value, () => {
  calculateEmissions()
})

async function load() {
  if (model.value)
    await emissionFactorStore.retrieveFactorData(model.value.emission_factor)

  if (emissionFactor.value) {
    emissionFactor.value.greenhouse_emission_gases.forEach((item: GreenhouseGasEmission) => {
      if (item.greenhouse_gas && item.greenhouse_gas.acronym) {
        emissionFactors[item.greenhouse_gas.acronym] = item.value!
        globalWarmingPotential[item.greenhouse_gas.acronym] = item.greenhouse_gas.kg_co2_equivalence!
      }
    })
    reset()
  }
}

onMounted(() => {
  load()
})

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
</script>

<template>
  <div class="w-full pb-3">
    <h4>{{ title }}</h4>
    <p>{{ subHeading }}</p>
  </div>
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

  <div v-if="emissionFactor && results" class="results">
    <div class="head">
      <div>{{ t('emissionFactor.greenhouseGas') }}</div>
      <div>{{ t('emissionFactor.value') }}</div>
      <div>{{ t('emissionFactor.uncertainty') }} (%)</div>
      <div>{{ t('emissionFactor.gwp') }}</div>
    </div>

    <div v-for="gas in emissionFactor.greenhouse_emission_gases" :key="gas.id" class="contents">
      <div v-if="results[gas.greenhouse_gas.acronym] !== 0" class="grid grid-cols-subgrid col-span-4">
        <div class="col-span-1 text-sm">
          <strong>{{ gas.greenhouse_gas.name }}</strong> ({{ gas.greenhouse_gas.acronym }})
        </div>
        <div class="col-span-1 text-sm text-right">
          {{ results[gas.greenhouse_gas.acronym].toFixed(5) }} {{ gas.unit.symbol }}
        </div>
        <div class="col-span-1 text-sm text-center">
          {{ gas.percentage_uncertainty! * 100 }}%
        </div>
        <div class="col-span-1 text-sm text-center">
          {{ gas.greenhouse_gas.kg_co2_equivalence }}
        </div>
      </div>
    </div>
  </div>
  <div v-if="results" class="grid grid-cols-2 py-4 px-2 mt-2 border rounded-md">
    <div class="col-span-1 font-bold">
      Equivalente de Dióxido de Carbono (CO₂e)
    </div>
    <div class="col-span-1 text-sm text-right">
      {{ results.CO2e.toFixed(5) }} kg de CO₂e
    </div>
  </div>
</template>

<style scoped lang="scss">
.results {
  @apply grid grid-cols-4 gap-4 mt-3 border p-2 rounded-md;

  .head {
    @apply grid grid-cols-subgrid col-span-4 border-b py-3;

    div {
      @apply col-span-1 font-bold text-center;
    }
  }
}
</style>
