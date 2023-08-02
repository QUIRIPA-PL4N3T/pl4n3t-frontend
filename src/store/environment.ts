import { defineStore } from 'pinia'

const environments = [
  'Huella de carbono',
  'Huella hídrica',
  'Huella plástica',
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
