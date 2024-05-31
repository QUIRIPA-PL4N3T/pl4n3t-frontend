import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { brandApi, companyApi, dashboardApi, locationApi } from '~/api'
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
import { i18n } from '~/modules/i18n'
import { handleError } from '~/utilities/utils'

const toast = useToast()

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companies: <Company[]>[],
    currentBrand: <Brand>JSON.parse(JSON.stringify(DEFAULT_BRAND)),
    currentLocation: <Location>DEFAULT_LOCATION,
    company: <Company>DEFAULT_COMPANY,
    dashboardData: <any>({}),
  }),
  getters: {
    brands(): Brand[] {
      return this.company.brands
    },
    optionBrands(): any {
      const emptyBrand = {
        label: i18n.t('brand.select'),
        value: null,
      }
      const brands = this.company.brands.map((brand: Brand) => ({
        label: brand.name,
        value: brand.id,
      }))
      return [emptyBrand, ...brands]
    },
    optionsLocations(): any {
      const emptyLocation = {
        label: i18n.t('select.location'),
        value: null,
      }

      const locations = this.company.locations.map((location: Location) => ({
        label: location.name,
        value: location.id,
      }))

      return [emptyLocation, ...locations]
    },
    getCurrentLocation(): any {
      return this.currentLocation
    },
    hasCompany(): boolean {
      return this.companies.length > 0
    },
  },
  actions: {
    async fetchDashboardData(id: number) {
      try {
        const requestParameters = { id }
        const { data } = await dashboardApi.companiesDashboardRetrieve(requestParameters)
        this.dashboardData = data
      }
      catch (error) {
        console.error(error)
      }
    },
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
        this.clearBrand()
        return
      }

      try {
        const { data: brand } = await brandApi.companiesBrandsRetrieve({ id })
        this.currentBrand = brand
      }
      catch (error) {
        this.clearBrand()
      }
    },
    clearBrand() {
      this.currentBrand = <Brand>JSON.parse(JSON.stringify(DEFAULT_BRAND))
    },
    clearLocation() {
      this.currentLocation = <Location>JSON.parse(JSON.stringify(DEFAULT_LOCATION))
    },
    async fetchLocation(id: number) {
      // Fetch current location by id
      if (id === 0) {
        this.clearLocation()
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
        if (data.id === 0) {
          await brandApi.companiesBrandsCreate(data)
          toast.success(i18n.t('brand.created.success'))
        }
        else {
          await brandApi.companiesBrandsUpdate(data)
          toast.success(i18n.t('brand.updated.success'))
        }
        this.fetchCompany()
      }
      catch (error) {
        console.error(error)
        toast.error(handleError(error))
      }
    },
    async saveLocation() {
      // Create or update a location
      this.currentLocation.company = this.company.id
      try {
        if (this.currentLocation.id === 0) {
          await locationApi.companiesLocationsCreate({ location: this.currentLocation })
          toast.success(i18n.t('location.created.success'))
        }
        else {
          await locationApi.companiesLocationsUpdate({
            id: this.currentLocation.id,
            location: this.currentLocation,
          })
          toast.success(i18n.t('location.updated.success'))
        }
        this.clearLocation()
        this.fetchCompany()
      }
      catch (error) {
        console.error(error)
        toast.error(handleError(error))
      }
    },
    async deleteBrand(id: number) {
      try {
        await brandApi.companiesBrandsDestroy({ id })
        toast.success(i18n.t('location.deleted.brand'))
        this.clearBrand()
        this.fetchCompany()
      }
      catch (error) {
        console.error(error)
        toast.error(handleError(error))
      }
    },
    async deleteLocation(id: number) {
      try {
        await locationApi.companiesLocationsDestroy({ id })
        this.fetchCompany()
        toast.success(i18n.t('location.deleted.success'))
      }
      catch (error) {
        console.error(error)
        toast.error(handleError(error))
      }
    },
    async saveCompany() {
      try {
        if (this.company.id === 0) {
          const { data: company } = await companyApi.companiesCompaniesCreate({ company: this.company })
          this.company = company
          toast.success(i18n.t('company.create.success'))
        }
        else {
          const { data: company } = await companyApi.companiesCompaniesUpdate({ id: this.company.id, company: this.company })
          this.company = company
          toast.success(i18n.t('company.update.success'))
        }
      }
      catch (error) {
        console.error(error)
        toast.error(handleError(error))
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
