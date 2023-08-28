import { defineStore } from 'pinia'
import { companyApi } from '~/api'
import type { Company } from '~/api-client'
import { SizeEnum } from '~/api-client'

export const DEFAULT_COMPANY: Company = {
  id: 0,
  name: '',
  description: null,
  industry: null,
  size: SizeEnum.Small,
  website: null,
  geo_location: null,
  economic_sector: null,
  industry_type: null,
  logo_absolute_url: '',
  locations: [],
  members_roles: [],
  brands: [],
  city_name: '',
  state_name: '',
  country_name: '',
}

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companies: <Company[]>[],
    company: <Company>DEFAULT_COMPANY,
    currentLocation: <any>{},
  }),
  getters: {
    optionsLocations(): any {
      return this.company.locations.map((location: any) => ({
        label: location.name,
        value: location.id,
      }),
      )
    },
    getCurrentLocation(): any {
      return this.currentLocation
    },
    hasCompany(): boolean {
      return this.companies.length > 0
    },
  },
  actions: {
    async fetchCompany() {
      try {
        const { data: companies } = await companyApi.companiesCompaniesList()
        this.companies = companies
      }
      catch (error) {
        console.error(error)
      }
      if (this.companies.length > 0)
        this.company = this.companies[0]
    },
    async saveCompany() {
      try {
        if (this.company.id === 0) {
          const { data: company } = await companyApi.companiesCompaniesCreate({ company: this.company })
          this.company = company
        }
        else {
          const { data: company } = await companyApi.companiesCompaniesUpdate({ id: this.company.id, company: this.company })
          this.company = company
        }
      }
      catch (error) {
        console.error(error)
      }
    },
    getLocationName(id: number) {
      const location = this.company.locations.find((item: any) => Number(item.id) === id)
      if (location)
        return location.name
      return `location ${id}`
    },
    fetchCurrentLocation(data: any): any {
      this.currentLocation = data
    },
  },
})
