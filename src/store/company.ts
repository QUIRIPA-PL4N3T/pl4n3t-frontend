import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    company: <any>{},
  }),
  getters: {
    optionsLocations(): any {
      return this.company.locations.map((location: any) => ({
        label: location.name,
        value: location.id,
      }),
      )
    },
  },
  actions: {
    fetchCompany(data: any) {
      this.company = data
    },
    getLocationName(id: number) {
      const location = this.company.locations.find((item: any) => Number(item.id) === id)
      if (location)
        return location.name
      return `location ${id}`
    },
  },
})
