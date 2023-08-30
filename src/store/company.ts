import { defineStore } from 'pinia'
import { brandApi, companyApi, locationApi } from '~/api'
import type {
  Brand,
  Company,
  Location,
} from '~/api-client'

import {
  DEFAULT_BRAND,
  DEFAULT_COMPANY,
  DEFAULT_LOCATION,
} from '~/api/modelsDefaults'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companies: <Company[]>[],
    currentBrand: <Brand>DEFAULT_BRAND,
    currentLocation: <Location>DEFAULT_LOCATION,
    company: <Company>DEFAULT_COMPANY,
  }),
  getters: {
    brands(): Brand[] {
      return this.company.brands
    },
    optionBrands(): any {
      return this.company.brands.map((brand: Brand) => ({
        label: brand.name,
        value: brand.id,
      }))
    },
    optionsLocations(): any {
      return this.company.locations.map((location: Location) => ({
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
    async fetchLocation(id: number) {
      // Fetch current location by id
      if (id === 0) {
        this.currentLocation = DEFAULT_LOCATION
        return
      }

      try {
        const { data: location } = await locationApi.companiesLocationsRetrieve({ id })
        this.currentLocation = location
      }
      catch (error) {
        this.currentLocation = DEFAULT_LOCATION
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
    async saveLocation() {
      // Create or update a location
      this.currentLocation.company = this.company.id
      try {
        if (this.currentLocation.id === 0) {
          const { data: location } = await locationApi.companiesLocationsCreate({ location: this.currentLocation })
          this.currentLocation = location
        }
        else {
          const { data: location } = await locationApi.companiesLocationsUpdate({
            id: this.currentLocation.id,
            location: this.currentLocation,
          })
          this.currentLocation = location
        }
        this.fetchCompany()
      }
      catch (error) {
        console.error(error)
      }
    },
    async deleteBrand(id: number) {
      try {
        await brandApi.companiesBrandsDestroy({ id })
        this.fetchCompany()
      }
      catch (error) {
        console.error(error)
      }
    },
    async deleteLocation(id: number) {
      try {
        await locationApi.companiesLocationsDestroy({ id })
        this.fetchCompany()
      }
      catch (error) {
        console.error(error)
      }
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
