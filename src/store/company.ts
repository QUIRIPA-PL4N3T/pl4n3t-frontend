import { defineStore } from 'pinia'
import { brandApi, companyApi } from '~/api'
import type {
  Brand,
  Company,
} from '~/api-client'

import {
  DEFAULT_BRAND,
  DEFAULT_COMPANY,
} from '~/api/modelsDefaults'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companies: <Company[]>[],
    currentBrand: <Brand>DEFAULT_BRAND,
    company: <Company>DEFAULT_COMPANY,
    currentLocation: <any>{},
  }),
  getters: {
    brands(): Brand[] {
      return this.company.brands
    },
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
    async fetchBrand(id: number) {
      // Fetch current brand by id
      if (id === 0) {
        this.currentBrand = DEFAULT_BRAND
        return
      }

      try {
        const { data: brand } = await brandApi.companiesBrandsRetrieve({ id })
        this.currentBrand = brand
      }
      catch (error) {
        this.currentBrand = DEFAULT_BRAND
      }
    },
    async saveBrand(data: any) {
      // Create or update a brand
      if (data.logo === null)
        delete data.logo
      try {
        if (this.currentBrand.id === 0) {
          const { data: brand } = await brandApi.companiesBrandsCreate(data)
          this.currentBrand = brand
        }
        else {
          const { data: brand } = await brandApi.companiesBrandsUpdate(data)
          this.currentBrand = brand
        }
        this.fetchCompany()
      }
      catch (error) {
        console.error(error)
      }
    },
    async deleteBrand(id: number) {
      await brandApi.companiesBrandsDestroy({ id })
      this.fetchCompany()
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
