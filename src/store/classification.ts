import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { quantificationTypeApi } from '~/api'
import type { QuantificationType } from '~/api-client'

export const useClassificationStore = defineStore('classification', {
  state: () => ({
    quantificationTypes: useLocalStorage<QuantificationType[]>('quantificationTypes', []),
    environment: <QuantificationType | null>(null),
  }),
  getters: {
    optionsQuantificationTypes(): any {
      return this.quantificationTypes.map((type: any) => ({
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
    async fetchClassificationData() {
      try {
      // Fetch document types
        const { data: quantificationTypes } = await quantificationTypeApi.classificationsQuantificationTypesList()
        this.quantificationTypes = quantificationTypes
        this.environment = this.quantificationTypes[0]
      }
      catch (error) {
        console.error(error)
      }
    },
  },
})
