import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    company: <any>{},
  }),
  actions: {
    fetchCompany(data: any) {
      this.company = data
    },
  },
})
