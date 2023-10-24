import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { emissionFactorApi, emissionSourceGroupApi, quantificationTypeApi, sourceTypeApi } from '~/api'
import type { EmissionFactor, EmissionSourceGroup, FactorType, QuantificationType, SourceType } from '~/api-client'

export const useClassificationStore = defineStore('classification', {
  state: () => ({
    quantificationTypes: useLocalStorage<QuantificationType[]>('quantificationTypes', []),
    classificationGroups: useLocalStorage<EmissionSourceGroup[]>('classificationGroups', []),
    factorTypes: useLocalStorage<FactorType[]>('emissionFactorTypes', []),
    emissionFactors: useLocalStorage<EmissionFactor[]>('emissionFactors', []),
    filteredEmissionFactors: useLocalStorage<EmissionFactor[]>('filteredEmissionFactors', []),
    sourceTypes: useLocalStorage<SourceType[]>('sourceTypes', []),
    environment: useLocalStorage<QuantificationType | null>('environment', null),
  }),
  getters: {
    inventoriableClassificationGroups(): EmissionSourceGroup[] {
      return this.classificationGroups.filter(group => group.allow_inventory)
    },
    optionsQuantificationTypes(): any {
      return this.quantificationTypes.map((type: any) => ({
        label: type.name,
        value: type.id,
      }),
      )
    },
    optionGroups(): any {
      return this.classificationGroups.map((type: any) => ({
        label: type.name,
        value: type.id,
      }),
      )
    },
    optionFactorTypes(): any {
      return this.factorTypes.map((type: any) => ({
        label: type.name,
        value: type.id,
      }),
      )
    },
    optionSourceTypes(): any {
      return this.sourceTypes.map((type: any) => ({
        label: type.name,
        value: type.id,
      }),
      )
    },
    optionsFilteredEmissionFactors(): any {
      return this.filteredEmissionFactors.map((type: any) => ({
        label: type.name,
        value: type.id,
      }),
      )
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
    filterEmissionFactorByType(id: number, source_type?: number) {
      if (source_type)
        this.filteredEmissionFactors = this.emissionFactors.filter(item => item.factor_type === id && item.source_type === source_type)
      else
        this.filteredEmissionFactors = this.emissionFactors.filter(item => item.factor_type === id)
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
