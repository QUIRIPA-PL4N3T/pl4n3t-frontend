import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import type { EmissionFactor, EmissionResultList, UnitOfMeasure } from '~/api-client'
import { emissionFactorApi, emissionResultApi, mainApi } from '~/api'
import { formatOptions, handleError } from '~/utilities/utils'
import { i18n } from '~/modules/i18n'

export interface companyInterface {
  title: string
  count: string
  bg: string
  companies: {
    name: string
    progress: number
  }[]
}

const months: string[] = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const toast = useToast()

export const useEmissionFactorStore = defineStore('emissionFactor', {
  state: () => ({
    emissionFactors: <any[]>[],
    activities: <any[]>[],
    emissionFactor: <EmissionFactor | null>(null),
    factorUnits: <UnitOfMeasure[]>([]),
    emissionResults: <EmissionResultList[]>([]),
  }),
  getters: {
    optionsYears(): any {
      const years = []
      const currentYear = new Date().getFullYear()
      for (let i = currentYear - 20; i <= currentYear; i++) {
        years.push({
          label: i.toString(),
          value: i,
        })
      }
      return years
    },
    optionsMonths(): any {
      return months.map((month, index) => ({
        label: month,
        value: index,
      }))
    },
    optionsFactor(): any {
      return this.emissionFactors.map((factor: any) => ({
        label: factor.name,
        value: factor.id,
      }),
      )
    },
    statistics(): companyInterface[] {
      return [
        {
          title: 'huella de carbono organizacional',
          count: '720.15 KgCO2/Gal',
          bg: 'bg-[#E5F9FF] dark:bg-slate-900',
          companies: [
            { name: 'empresa', progress: 0 },

          ],
        },
        {
          title: 'huella hídrica',
          count: '1.0013679 KgCH4/Gal',
          bg: 'bg-[#FFEDE5] dark:bg-slate-900',
          companies: [
            { name: 'empresa', progress: 0 },

          ],
        },
        {
          title: 'huella plástica',
          count: '0.0821 KgN2O/Gal',
          bg: 'bg-[#EAE5FF] dark:bg-slate-900',
          companies: [
            { name: 'empresa', progress: 0 },

          ],
        },
      ]
    },
    getFactorData(): EmissionFactor | null {
      return this.emissionFactor
    },
    getFactorUnits(): UnitOfMeasure[] {
      return this.factorUnits
    },
    optionsFactorUnits(): any {
      return formatOptions(this.factorUnits, 'name', 'id', true)
    },

  },
  actions: {
    async fetchEmissionResults(filter: any) {
      try {
        const { data } = await emissionResultApi.emissionsEmissionResultsList(filter)
        this.emissionResults = data
      }
      catch (error) {
        console.error(error)
      }
    },
    async retrieveFactorData(id: number) {
      try {
        const { data } = await emissionFactorApi.emissionsEmissionFactorsRetrieve({ id })
        this.emissionFactor = data
        this.fetchFactorUnits(this.emissionFactor.measure_type || '')
      }
      catch (error) {
        console.error(error)
      }
    },
    async fetchFactorUnits(measureType: string) {
      try {
        const { data } = await mainApi.mainUnitOfMeasureList({ measureType })
        this.factorUnits = data
      }
      catch (error) {
        console.error(error)
      }
    },
    async saveEmissionResult(results: any) {
      try {
        const requestParameters = { emissionResult: results }
        const { status } = await emissionResultApi.emissionsSaveEmissionDataCreate(requestParameters)
        if (status === 201)
          toast.success(i18n.t('emissions.saved.success'))
      }
      catch (error) {
        toast.error(error)
        console.error(handleError(error))
      }
    },
    fetchActivities(data: any) {
      this.emissionFactors = data
    },
    addActivity(activity: any) {
      this.activities.push(activity)
    },
    getEmissionFactorById(id: number) {
      const activity = this.emissionFactors.find((item: any) => Number(item.id) === id)
      if (activity)
        return activity
      return null
    },
    getMonthById(id: number) {
      return months[id]
    },
  },
})
