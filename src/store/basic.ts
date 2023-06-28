import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { mainApi } from '~/api'
import type { City, DocumentType, EconomicSector, IndustryType, LocationType, State, UnitOfMeasure } from '~/api-client'

export const useBasicStore = defineStore('basic', {
  state: () => ({
    unitOfMeasureList: useLocalStorage<UnitOfMeasure[]>('unitOfMeasureList', []),
    economicSectorList: useLocalStorage<EconomicSector[]>('economicSectorList', []),
    industryTypeList: useLocalStorage<IndustryType[]>('industryTypeList', []),
    locationTypeList: useLocalStorage<LocationType[]>('locationTypeList', []),
    stateList: useLocalStorage<State[]>('stateList', []),
    cityList: useLocalStorage<City[]>('cityList', []),
    documentTypes: useLocalStorage<DocumentType[]>('documentTypes', []),
  }),
  getters: {
    optionsEconomicSectorList(): any {
      return this.economicSectorList.map((type: any) => ({
        label: type.name,
        value: type.id,
      }),
      )
    },
    optionsUnitOfMeasure(): any {
      return this.unitOfMeasureList.map((unit: any) => ({
        value: unit.id,
        label: unit.name,
      }))
    },
    optionsIndustryTypeList(): any {
      return this.industryTypeList.map(type => ({
        value: type.id,
        label: type.name,
      }),
      )
    },
    optionsLocationTypeList(): any {
      return this.locationTypeList.map(type => ({
        value: type.id,
        label: type.name,
      }))
    },
    optionsDocuments(): any {
      return this.documentTypes.map(type => ({
        value: type.id,
        label: type.name,
      }))
    },
    optionsStateList(): any {
      return this.stateList.map(state => ({
        value: state.id,
        label: state.name,
      }))
    },
    optionCities(): any {
      return this.cityList.map(city => ({
        value: city.id,
        label: city.name,
      }))
    },
  },
  actions: {
    async fetchBasicData() {
      try {
      // Fetch document types
        const { data: documents } = await mainApi.mainDocumentTypeList()
        this.documentTypes = documents.sort((a, b) => a.name.localeCompare(b.name))

        // Fetch unitsOfMeasure types
        const { data: unitsOfMeasure } = await mainApi.mainUnitOfMeasureList()
        this.unitOfMeasureList = unitsOfMeasure

        // Fetch Economic Sectors
        const { data: economicSectors } = await mainApi.mainEconomicSectorList()
        this.economicSectorList = economicSectors

        // Fetch Industry types
        const { data: industryTypes } = await mainApi.mainIndustryTypeList()
        this.industryTypeList = industryTypes

        // Fetch location types
        const { data: locationTypes } = await mainApi.mainLocationTypeList()
        this.locationTypeList = locationTypes

        // Fetch states
        const { data: states } = await mainApi.mainStateList()
        this.stateList = states

        // Fetch cities
        const { data: cities } = await mainApi.mainCityList()
        this.cityList = cities
      }
      catch (error) {
        console.error(error)
      }
    },
    getUnitMeasureSymbol(id: number): string {
      const unit = this.unitOfMeasureList.find(item => item.id === id)
      return unit ? unit.symbol : ''
    },
    getUnitMeasureName(id: number): string {
      const unit = this.unitOfMeasureList.find(item => item.id === id)
      return unit ? unit.name! : ''
    },
  },
})
