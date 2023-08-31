import { defineStore } from 'pinia'
import { companyEmissionSourceApi, locationApi } from '~/api'
import type { EmissionsSource } from '~/api-client'
import { DEFAULT_EMISSIONS_SOURCE } from '~/api/modelsDefaults'

export const useEmissionSourceStore = defineStore('emissionSource', {
  state: () => ({
    currentEquipment: <EmissionsSource>DEFAULT_EMISSIONS_SOURCE,
    locationEquipments: <EmissionsSource[]>[],
    environLocation: useLocalStorage<any | null>('environLocation', null),
  }),
  getters: {

  },
  actions: {
    async fetchEmissionSource(id: number) {
      // Fetch current location by id
      if (id === 0) {
        this.currentEquipment = DEFAULT_EMISSIONS_SOURCE
        return
      }

      try {
        const { data: currentEquipment } = await companyEmissionSourceApi.companiesEmissionSourcesRetrieve({ id })
        this.currentEquipment = currentEquipment
      }
      catch (error) {
        this.currentEquipment = DEFAULT_EMISSIONS_SOURCE
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

      this.currentEquipment.location = this.environLocation
      try {
        if (this.currentEquipment.id === 0) {
          const { data: currentEquipment } = await companyEmissionSourceApi.companiesEmissionSourcesCreate(
            { emissionsSource: this.currentEquipment })
          this.currentEquipment = currentEquipment
        }
        else {
          const { data: currentEquipment } = await companyEmissionSourceApi.companiesEmissionSourcesUpdate({
            id: this.currentEquipment.id,
            emissionsSource: this.currentEquipment,
          })
          this.currentEquipment = currentEquipment
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
