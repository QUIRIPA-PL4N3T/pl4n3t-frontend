import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { companyEmissionSourceApi, locationApi } from '~/api'
import type { EmissionsSource } from '~/api-client'
import { DEFAULT_EMISSIONS_SOURCE } from '~/api/modelsDefaults'
import { i18n } from '~/modules/i18n'

const toast = useToast()

export const useEmissionSourceStore = defineStore('emissionSource', {
  state: () => ({
    currentEmissionSource: <EmissionsSource>DEFAULT_EMISSIONS_SOURCE,
    locationEmissionSources: <EmissionsSource[]>[],
    currentGlobalLocationId: useLocalStorage<any | null>('currentGlobalLocationId', null),
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
        if (this.currentGlobalLocationId) {
          const { data: location } = await locationApi.companiesLocationsRetrieve({ id })
          this.locationEmissionSources = location.emission_sources
        }
      }
      catch (error) {
        console.error(error)
      }
    },
    async saveEmissionSource() {
      // Create or update a location
      if (!this.currentGlobalLocationId)
        return

      this.currentEmissionSource.location = this.currentGlobalLocationId
      try {
        if (this.currentEmissionSource.id === 0) {
          const { data: currentEmissionSource } = await companyEmissionSourceApi.companiesEmissionSourcesCreate(
            { emissionsSource: this.currentEmissionSource },
          )
          this.currentEmissionSource = currentEmissionSource
          toast.success(i18n.t('emissionSource.save.success'))
        }
        else {
          const { data: currentEmissionSource } = await companyEmissionSourceApi.companiesEmissionSourcesUpdate({
            id: this.currentEmissionSource.id,
            emissionsSource: this.currentEmissionSource,
          })
          this.currentEmissionSource = currentEmissionSource
          toast.success(i18n.t('emissionSource.updated'))
        }
        this.fetchEmissionSourcesByLocation(this.currentGlobalLocationId)
      }
      catch (error) {
        toast.error(i18n.t('emissionSource.save.error'))
        console.error(error)
      }
    },
    async deleteEmissionSource(id: number) {
      try {
        await companyEmissionSourceApi.companiesEmissionSourcesDestroy({ id })
        this.fetchEmissionSourcesByLocation(this.currentGlobalLocationId)
      }
      catch (error) {
        console.error(error)
      }
    },
  },
})
