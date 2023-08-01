import { defineStore } from 'pinia'

const environments = [
  'huella de carbono',
  'huella hidrica',
  'huella plastica',
]

export const useEnvironmentStore = defineStore('environment', {
  state: () => ({
    environment: <any>{},
  }),
  getters: {
    getEnvironment(): any {
      return this.environment
    },
    getEnvironments() {
      return environments
    },
  },
  actions: {
    fetchEnvironment(data: any) {
      this.environment = data
    },

  },
})
