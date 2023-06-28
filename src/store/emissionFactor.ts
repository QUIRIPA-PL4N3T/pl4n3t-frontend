import { defineStore } from 'pinia'

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

export const useEmissionFactorStore = defineStore('emissionFactor', {
  state: () => ({
    emissionFactors: <any>{},
    activities: <any[]>[],
  }),
  getters: {
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
    statistics(): any {
      return [
        {
          title: 'CO2',
          count: '720.15 KgCO2/Gal',
          bg: 'bg-[#E5F9FF] dark:bg-slate-900',
        },
        {
          title: 'CH4',
          count: '1.0013679 KgCH4/Gal',
          bg: 'bg-[#FFEDE5] dark:bg-slate-900',
        },
        {
          title: 'N2O',
          count: '0.0821 KgN2O/Gal',
          bg: 'bg-[#EAE5FF] dark:bg-slate-900',
        },
      ]
    },
  },
  actions: {
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
