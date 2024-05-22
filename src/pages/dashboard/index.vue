<script setup lang="ts">
// import { storeToRefs } from 'pinia'

// Import Images
import shade1 from '~/assets/images/all-img/shade-1.png'
import shade2 from '~/assets/images/all-img/shade-2.png'
import shade3 from '~/assets/images/all-img/shade-3.png'
import shade4 from '~/assets/images/all-img/shade-4.png'
import {
  pieChart,
  pieChartDark,
  stacked,
  stackedDark,
} from '~/constants/data'

// const emissionFactorStore = useEmissionFactorStore()
const themeSettingsStore = useThemeSettingsStore()
const { t } = useI18n()
// const companyStore = useCompanyStore()
// const { statistics } = storeToRefs(emissionFactorStore)
// const { company } = storeToRefs(companyStore)

const statistics = [
  {
    title: 'CO₂ - Dióxido de Carbono',
    count: '354',
    bg: 'bg-warning-500',
    text: 'text-primary-500',
    percent: '25.67% ',
    icon: 'heroicons:arrow-trending-up',
    img: shade1,
    percentClass: 'text-primary-500',
  },
  {
    title: 'CH₄ - Metano ',
    count: '86,9',

    bg: 'bg-info-500',
    text: 'text-primary-500',
    percent: '8.67%',
    icon: 'heroicons:arrow-trending-up',
    img: shade2,
    percentClass: 'text-primary-500',
  },
  {
    title: 'N₂O - Óxido Nitroso',
    count: '15%',
    bg: 'bg-primary-500',
    text: 'text-danger-500',
    percent: '1.67%  ',
    icon: 'heroicons:arrow-trending-down',
    img: shade3,
    percentClass: 'text-danger-500',
  },
  {
    title: 'Perfluorocarbonos',
    count: '654',
    bg: 'bg-success-500',
    text: 'text-primary-500',
    percent: '11.67%  ',
    icon: 'heroicons:arrow-trending-up',
    img: shade4,
    percentClass: 'text-primary-500',
  },
]

const Campaigns = [
  {
    name: 'Tipo de Fuente',
    value: 'Valor',
  },
  {
    name: 'Combustible',
    value: '40%',
  },
  {
    name: 'Electricidad',
    value: '28%',
  },
  {
    name: 'Papel',
    value: '34%',
  },
  {
    name: 'Viajes',
    value: '17%',
  },
]

// const rangeDate = null

// const show = $ref<boolean[]>([])
// function toggleGraphVisibility(index: number) {
//   show[index] = !show[index]
// }
</script>

<template>
  <div>
    <div class="card-auto space-y-5">
      <div class="grid grid-cols-12 gap-5">
        <div class="lg:col-span-8 col-span-12 space-y-5">
          <Card>
            <div class="grid xl:grid-cols-4 lg:grid-cols-2 col-span-1 gap-3">
              <div
                v-for="(item, i) in statistics"
                :key="i"
                :class="item.bg"
                class="rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]"
              >
                <div class="overlay absolute left-0 top-0 w-full h-full z-[-1]">
                  <img
                    :src="item.img"
                    alt=""
                    draggable="false"
                    class="w-full h-full object-contain"
                  >
                </div>
                <span
                  class="block mb-6 text-sm text-slate-900 dark:text-white font-medium"
                >{{ item.title }}</span>
                <span
                  class="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-6"
                >{{ item.count }}</span>
                <div class="flex space-x-2 rtl:space-x-reverse">
                  <div class="flex-none text-xl" :class="item.text">
                    <Icon :icon="item.icon" />
                  </div>
                  <div class="flex-1 text-sm">
                    <span class="block mb-[2px]" :class="item.percentClass">{{
                      item.percent
                    }}</span>
                    <span class="block mb-1 text-slate-600 dark:text-slate-300">{{ t('since.lastMonth') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <header class="md:flex md:space-y-0 space-y-4">
              <h6 class="flex-1 text-slate-900 dark:text-white">
                {{ t('distribution.bySede') }}
              </h6>
            </header>

            <div class="legend-ring">
              <apexchart
                type="bar"
                height="410"
                :options="
                  themeSettingsStore.isDark
                    ? stackedDark.chartOptions
                    : stacked.chartOptions
                "
                :series="stacked.series"
              />
            </div>
          </Card>
        </div>
        <div class="lg:col-span-4 col-span-12 space-y-5">
          <Card :title="t('emission.sources')">
            <ul class="divide-y divide-slate-100 dark:divide-slate-700">
              <li
                v-for="(item, i) in Campaigns"
                :key="i"
                class="first:text-xs text-sm first:text-slate-600 text-slate-600 dark:text-slate-300 py-2 first:uppercase"
              >
                <div class="flex justify-between">
                  <span>{{ item.name }}</span>
                  <span>{{ item.value }}</span>
                </div>
              </li>
            </ul>
          </Card>
          <Card title="GEI Generados">
            <div class="legend-ring3">
              <apexchart
                type="pie"
                height="335"
                :options="
                  themeSettingsStore.isDark
                    ? pieChartDark.chartOptions
                    : pieChart.chartOptions
                "
                :series="pieChart.series"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: dashboard
meta:
  layout: sidebar
  requiresAuth: true
</route>
