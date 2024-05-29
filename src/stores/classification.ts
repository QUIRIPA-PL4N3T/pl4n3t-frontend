import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { emissionFactorApi, emissionSourceGroupApi, quantificationTypeApi, sourceTypeApi } from '~/api'
import type { EmissionFactor, EmissionFactorList, EmissionSourceGroup, FactorType, QuantificationType, SourceType } from '~/api-client'
import { formatOptions } from '~/utilities/utils'

export const useClassificationStore = defineStore('classification', {
  state: () => ({
    quantificationTypes: useLocalStorage<QuantificationType[]>('quantificationTypes', []),
    classificationGroups: useLocalStorage<EmissionSourceGroup[]>('classificationGroups', []),
    factorTypes: useLocalStorage<FactorType[]>('emissionFactorTypes', []),
    emissionFactors: useLocalStorage<EmissionFactorList[]>('emissionFactors', []),
    filteredEmissionFactors: useLocalStorage<EmissionFactorList[]>('filteredEmissionFactors', []),
    sourceTypes: useLocalStorage<SourceType[]>('sourceTypes', []),
    environment: useLocalStorage<QuantificationType | null>('environment', null),
  }),
  getters: {
    inventoriableClassificationGroups(): EmissionSourceGroup[] {
      return this.classificationGroups.filter(group => group.allow_inventory)
    },
    optionsQuantificationTypes(): any {
      return formatOptions(this.quantificationTypes, 'name', 'id', false)
    },
    optionGroups(): any {
      return formatOptions(this.classificationGroups)
    },
    optionFactorTypes(): any {
      return formatOptions(this.factorTypes)
    },
    optionSourceTypes(): any {
      return formatOptions(this.sourceTypes)
    },
    optionsFilteredEmissionFactors(): any {
      return formatOptions(this.filteredEmissionFactors)
    },
  },
  actions: {
    setEnvironment(environment: QuantificationType | null) {
      this.environment = environment
    },
    setEmissionTypesByGroup(id: number) {
      const group = this.classificationGroups.find(item => item.id === id)
      if (group?.emission_factor_types)
        this.factorTypes = group.emission_factor_types
      else
        this.factorTypes = []
    },
    async getCommonActivities(search?: string) {
      try {
        if (search) {
          const { data } = await emissionSourceGroupApi.classificationsActivitiesSearchRetrieve({ search })
          return data
        }
        else {
          const { data } = await emissionSourceGroupApi.classificationsActivitiesList()
          return data
        }
      }
      catch (error) {
        console.error(error)
      }
    },
    async getInvestments(search?: string) {
      try {
        if (search) {
          const { data } = await emissionSourceGroupApi.classificationsInvestmentSearchRetrieve({ search })
          return data
        }
        else {
          const { data } = await emissionSourceGroupApi.classificationsInvestmentList()
          return data
        }
      }
      catch (error) {
        console.error(error)
      }
    },
    async getCommonEquipments(params: any) {
      try {
        const { data } = await emissionSourceGroupApi.classificationsEquipmentsList(params)
        return data
      }
      catch (error) {
        console.error(error)
      }
    },
    async getCommonProducts(search?: string) {
      try {
        if (search) {
          const { data } = await emissionSourceGroupApi.classificationsProductsSearchRetrieve({ search })
          return data
        }
        else {
          const { data } = await emissionSourceGroupApi.classificationsProductsList()
          return data
        }
      }
      catch (error) {
        console.error(error)
      }
    },
    filterEmissionFactorByType(id: number, source_type?: number) {
      if (source_type) {
        this.filteredEmissionFactors = this.emissionFactors.filter(
          item => Number(item.factor_type) === id && Number(item.source_type) === source_type,
        )
      }
      else {
        this.filteredEmissionFactors = this.emissionFactors.filter(
          item => Number(item.factor_type) === id,
        )
      }
    },
    async fetchClassificationData() {
      try {
      // Fetch document types
        const { data: quantificationTypes } = await quantificationTypeApi.classificationsQuantificationTypesList()
        this.quantificationTypes = quantificationTypes
        this.environment = this.quantificationTypes[0]

        const { data: classificationGroups } = await emissionSourceGroupApi.classificationsEmissionSourceGroupsList()
        this.classificationGroups = classificationGroups.filter(group => group.enabled)

        const { data: emissionFactors } = await emissionFactorApi.emissionsEmissionFactorsList()
        this.emissionFactors = emissionFactors

        const { data: sourceTypes } = await sourceTypeApi.emissionsSourceTypesList()
        this.sourceTypes = sourceTypes
      }
      catch (error) {
        console.error(error)
      }
    },
  },
})
