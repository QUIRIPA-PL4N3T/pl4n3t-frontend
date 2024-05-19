import { defineStore } from 'pinia'
import { companyEmissionSourceApi, locationApi } from '~/api'
import type { EmissionsSource } from '~/api-client'
import { DEFAULT_EMISSIONS_SOURCE } from '~/api/modelsDefaults'

export const useEmissionSourceStore = defineStore('emissionSource', {
  state: () => ({
    currentEmissionSource: <EmissionsSource>DEFAULT_EMISSIONS_SOURCE,
    locationEquipments: <EmissionsSource[]>[],
    environLocation: useLocalStorage<any | null>('environLocation', null),
  }),
  getters: {

  },
  actions: {
    async fetchEmissionSource(id: number) {
      // Fetch current location by id
      if (id === 0) {
        this.currentEmissionSource = DEFAULT_EMISSIONS_SOURCE
        return
      }

      try {
        const { data: currentEmissionSource } = await companyEmissionSourceApi.companiesEmissionSourcesRetrieve({ id })
        this.currentEmissionSource = currentEmissionSource
      }
      catch (error) {
        this.currentEmissionSource = DEFAULT_EMISSIONS_SOURCE
      }
    },
    async fetchEmissionSourcesByLocation(id: number) {
      try {
        if (this.environLocation) {
          const { data: location } = await locationApi.companiesLocationsRetrieve({ id })
          this.locationEquipments = location.emission_source_locations
        }
      }
      catch (error) {
        console.error(error)
      }
    },
    async saveEmissionSource() {
      // Create or update a location
      if (!this.environLocation)
        return

      this.currentEmissionSource.location = this.environLocation
      try {
        if (this.currentEmissionSource.id === 0) {
          const { data: currentEmissionSource } = await companyEmissionSourceApi.companiesEmissionSourcesCreate(
            { emissionsSource: this.currentEmissionSource },
          )
          this.currentEmissionSource = currentEmissionSource
        }
        else {
          const { data: currentEmissionSource } = await companyEmissionSourceApi.companiesEmissionSourcesUpdate({
            id: this.currentEmissionSource.id,
            emissionsSource: this.currentEmissionSource,
          })
          this.currentEmissionSource = currentEmissionSource
        }
        this.fetchEmissionSourcesByLocation(this.environLocation)
      }
      catch (error) {
        console.error(error)
      }
    },
    async deleteEmissionSource(id: number) {
      try {
        await companyEmissionSourceApi.companiesEmissionSourcesDestroy({ id })
        this.fetchEmissionSourcesByLocation(this.environLocation)
      }
      catch (error) {
        console.error(error)
      }
    },
  },
})
