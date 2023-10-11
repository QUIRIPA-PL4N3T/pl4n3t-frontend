import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { mainApi } from '~/api'
import type { City, Country, DocumentType, EconomicSector, IndustryType, LocationType, State, UnitOfMeasure } from '~/api-client'

export const useBasicStore = defineStore('basic', {
  state: () => ({
    documentTypes: useLocalStorage<DocumentType[]>('documentTypes', []),
    unitOfMeasureList: useLocalStorage<UnitOfMeasure[]>('unitOfMeasureList', []),
    economicSectorList: useLocalStorage<EconomicSector[]>('economicSectorList', []),
    industryTypeList: useLocalStorage<IndustryType[]>('industryTypeList', []),
    locationTypeList: useLocalStorage<LocationType[]>('locationTypeList', []),
    countryList: useLocalStorage<Country[]>('countries', []),
    stateList: useLocalStorage<State[]>('states', []),
    cityList: useLocalStorage<City[]>('cities', []),
    vehicleTypeList: useLocalStorage<String[]>('vehicleTypeList', []),
    vehicleLoadList: useLocalStorage<String[]>('vehicleLoadList', []),
    vehicleFuelList: useLocalStorage<String[]>('vehicleFuelList', []),
    methodologiesList: useLocalStorage<String[]>('methodologiesList', []),
    fuelStorageList: useLocalStorage<String[]>('fuelStorageList', []),
    fuelStorageManagementList: useLocalStorage<String[]>('fuelStorageManagementList', []),
    vehicleEfficiencyUnitList: useLocalStorage<String[]>('vehicleEfficiencyUnitList', []),
    electricitySourceList: useLocalStorage<String[]>('electricitySourceList', []),
    refrigerantSourceList: useLocalStorage<String[]>('refrigerantSourceList', []),
    refrigerantDisposalList: useLocalStorage<String[]>('refrigerantDisposalList', []),
    refrigerantMaintenanceAndRepairList: useLocalStorage<String[]>('refrigerantMaintenanceAndRepairList', []),
    refrigerantCapacityUnitList: useLocalStorage<String[]>('refrigerantCapacityUnitList', []),
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
    optionsCountries(): any {
      return this.countryList.map(country => ({
        value: country.id,
        label: country.name,
      }))
    },
    optionsStates(): any {
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
    optionsVehicleTypeList(): any {
      return this.vehicleTypeList.map(type => ({
        value: type,
        label: type,
      }))
    },
    optionsVehicleFuelList(): any {
      return this.vehicleFuelList.map(type => ({
        value: type,
        label: type,
      }))
    },
    optionsVehicleLoadList(): any {
      return this.vehicleLoadList.map(type => ({
        value: type,
        label: type,
      }))
    },
    optionsVehicleEfficiencyUnitList(): any {
      return this.vehicleEfficiencyUnitList.map(type => ({
        value: type,
        label: type,
      }))
    },
    optionsMethodologiesList(): any {
      return this.methodologiesList.map(type => ({
        value: type,
        label: type,
      }))
    },
    optionsFuelStorageList(): any {
      return this.fuelStorageList.map(type => ({
        value: type,
        label: type,
      }))
    },
    optionsFuelStorageManagementList(): any {
      return this.fuelStorageManagementList.map(type => ({
        value: type,
        label: type,
      }))
    },
    optionsElectricitySourceList(): any {
      return this.electricitySourceList.map(type => ({
        value: type,
        label: type,
      }))
    },
    optionsRefrigerantSourceList(): any {
      return this.refrigerantSourceList.map(type => ({
        value: type,
        label: type,
      }))
    },
    optionsRefrigerantDisposalList(): any {
      return this.refrigerantDisposalList.map(type => ({
        value: type,
        label: type,
      }))
    },
    optionsRefrigerantMaintenanceAndRepairList(): any {
      return this.refrigerantMaintenanceAndRepairList.map(type => ({
        value: type,
        label: type,
      }))
    },
    optionsRefrigerantCapacityUnitList(): any {
      return this.refrigerantCapacityUnitList.map(type => ({
        value: type,
        label: type,
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

        // Fetch countries
        const { data: countries } = await mainApi.mainCountriesList()
        this.countryList = countries

        // Fetch configurations list
        const { data: configurations } = await mainApi.mainConfigurationsList()

        const vehicleTypeListStr: any = configurations.find((config: any) => config.key === 'VEHICLE_TYPE_LIST')
        this.vehicleTypeList = vehicleTypeListStr.value.split(',')

        const vehicleLoadListStr: any = configurations.find((config: any) => config.key === 'VEHICLE_LOAD_LIST')
        this.vehicleLoadList = vehicleLoadListStr.value.split(',')

        const vehicleFuelListStr: any = configurations.find((config: any) => config.key === 'VEHICLE_FUEL_LIST')
        this.vehicleFuelList = vehicleFuelListStr.value.split(',')

        const vehicleEfficiencyUnitListStr: any = configurations.find((config: any) => config.key === 'VEHICLE_EFFICIENCY_UNIT_LIST')
        this.vehicleEfficiencyUnitList = vehicleEfficiencyUnitListStr.value.split(',')

        const methodologiesListStr: any = configurations.find((config: any) => config.key === 'METHODOLOGIES_LIST')
        this.methodologiesList = methodologiesListStr.value.split(',')

        const fuelStorageStr: any = configurations.find((config: any) => config.key === 'FUEL_STORAGE_LIST')
        this.fuelStorageList = fuelStorageStr.value.split(',')

        const fuelStorageManagementStr: any = configurations.find((config: any) => config.key === 'FUEL_STORAGE_MANAGEMENT_LIST')
        this.fuelStorageManagementList = fuelStorageManagementStr.value.split(',')

        const electricitySourceStr: any = configurations.find((config: any) => config.key === 'ELECTRICITY_SOURCE_LIST')
        this.electricitySourceList = electricitySourceStr.value.split(',')

        const refrigerantSourceStr: any = configurations.find((config: any) => config.key === 'REFRIGERANT_SOURCE_LIST')
        this.refrigerantSourceList = refrigerantSourceStr.value.split(',')

        const refrigerantDisposalStr: any = configurations.find((config: any) => config.key === 'FINAL_REFRIGERANT_DISPOSAL_LIST')
        this.refrigerantDisposalList = refrigerantDisposalStr.value.split(',')

        const refrigerantMaintenanceAndRepairStr: any = configurations.find((config: any) => config.key === 'REFRIGERANT_MAINTENANCE_AND_REPAIR_LIST')
        this.refrigerantMaintenanceAndRepairList = refrigerantMaintenanceAndRepairStr.value.split(',')

        const refrigerantCapacityUnitStr: any = configurations.find((config: any) => config.key === 'REFRIGERANT_CAPACITY_UNIT_LIST')
        this.refrigerantCapacityUnitList = refrigerantCapacityUnitStr.value.split(',')
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
    async getStatesByCountryId(id: number) {
      // Fetch states by country
      try {
        const { data: states } = await mainApi.mainStateList({ country: id })
        this.stateList = states
      }
      catch (error) {
        console.warn(error)
        this.stateList = []
      }
    },
    async getCitiesByStateID(id: number) {
      try {
        // Fetch cities by state
        const { data: cities } = await mainApi.mainCityList({ state: id })
        this.cityList = cities
      }
      catch (error) {
        console.warn(error)
        this.cityList = []
      }
    },
  },
})
