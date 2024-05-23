import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { mainApi } from '~/api'
import { SizeEnum } from '~/api-client'
import type { City, Country, DocumentType, EconomicSector, IndustryType, LocationType, State, UnitOfMeasure } from '~/api-client'
import { i18n } from '~/modules/i18n'
import { formatOptions, formatOptionsNotEmpty } from '~/utilities/utils'

export const useBasicStore = defineStore('basic', {
  state: () => ({
    documentTypes: useLocalStorage<DocumentType[]>('documentTypes', []),
    unitOfMeasureList: useLocalStorage<UnitOfMeasure[]>('unitOfMeasureList', []),
    geiUnitOfMeasureList: useLocalStorage<UnitOfMeasure[]>('geiUnitOfMeasureList', []),
    economicSectorList: useLocalStorage<EconomicSector[]>('economicSectorList', []),
    industryTypeList: useLocalStorage<IndustryType[]>('industryTypeList', []),
    locationTypeList: useLocalStorage<LocationType[]>('locationTypeList', []),
    countryList: useLocalStorage<Country[]>('countries', []),
    stateList: useLocalStorage<State[]>('states', []),
    cityList: useLocalStorage<City[]>('cities', []),
    vehicleTypeList: useLocalStorage<string[]>('vehicleTypeList', []),
    vehicleLoadList: useLocalStorage<string[]>('vehicleLoadList', []),
    vehicleFuelList: useLocalStorage<string[]>('vehicleFuelList', []),
    methodologiesList: useLocalStorage<string[]>('methodologiesList', []),
    fuelStorageList: useLocalStorage<string[]>('fuelStorageList', []),
    fuelStorageManagementList: useLocalStorage<string[]>('fuelStorageManagementList', []),
    vehicleEfficiencyUnitList: useLocalStorage<string[]>('vehicleEfficiencyUnitList', []),
    electricitySourceList: useLocalStorage<string[]>('electricitySourceList', []),
    refrigerantSourceList: useLocalStorage<string[]>('refrigerantSourceList', []),
    refrigerantDisposalList: useLocalStorage<string[]>('refrigerantDisposalList', []),
    refrigerantMaintenanceAndRepairList: useLocalStorage<string[]>('refrigerantMaintenanceAndRepairList', []),
    refrigerantCapacityUnitList: useLocalStorage<string[]>('refrigerantCapacityUnitList', []),
    wasteRegisterList: useLocalStorage<string[]>('wasteRegisterList', []),
    operationWasteList: useLocalStorage<string[]>('operationWasteList', []),
    goodsAndServiceOriginList: useLocalStorage<string[]>('goodsAndServiceOriginList', []),
    serviceAcquiredList: useLocalStorage<string[]>('serviceAcquiredList', []),
    goodsAcquiredList: useLocalStorage<string[]>('goodsAcquiredList', []),
    goodsAndServiceList: useLocalStorage<string[]>('goodsAndServiceList', []),
    supplierActionImplementationList: useLocalStorage<string[]>('supplierActionImplementationList', []),
    assetLeasedList: useLocalStorage<string[]>('assetLeasedList', []),
    durationList: useLocalStorage<string[]>('durationList', []),
    investmentList: useLocalStorage<string[]>('investmentList', []),
    wasteTypeList: useLocalStorage<string[]>('wasteTypeList', []),
    wasteOrganicList: useLocalStorage<string[]>('wasteOrganicList', []),
    wasteInorganicList: useLocalStorage<string[]>('wasteInorganicList', []),
    wasteDangerList: useLocalStorage<string[]>('wasteDangerList', []),
    wasteManagementOrganicList: useLocalStorage<string[]>('wasteManagementOrganicList', []),
    wasteManagementInorganicList: useLocalStorage<string[]>('wasteManagementInorganicList', []),
    wasteManagementDangerList: useLocalStorage<string[]>('wasteManagementDangerList', []),
    unitSoldPeriod: useLocalStorage<string[]>('unitSoldPeriod', []),
    productOperation: useLocalStorage<string[]>('productOperation', []),
  }),
  getters: {
    optionsEconomicSectorList(): any {
      return formatOptions(this.economicSectorList)
    },
    optionsUnitOfMeasure(): any {
      return formatOptions(this.economicSectorList)
    },
    optionsCompanySize(): any {
      const options = Object.keys(SizeEnum).map(key => ({
        name: i18n.t(`company.sizes.${key.toUpperCase()}`),
        id: SizeEnum[key as keyof typeof SizeEnum],
      }))
      return formatOptions(options)
    },
    optionsIndustryTypeList(): any {
      return formatOptions(this.economicSectorList)
    },
    optionsLocationTypeList(): any {
      return formatOptions(this.locationTypeList)
    },
    optionsDocuments(): any {
      return formatOptions(this.documentTypes)
    },
    optionsCountries(): any {
      return formatOptions(this.countryList)
    },
    optionsStates(): any {
      return formatOptions(this.stateList)
    },
    optionCities(): any {
      return formatOptions(this.cityList)
    },
    optionsVehicleTypeList(): any {
      return formatOptions(this.vehicleTypeList)
    },
    optionsVehicleFuelList(): any {
      return formatOptions(this.vehicleFuelList)
    },
    optionsVehicleLoadList(): any {
      return formatOptions(this.vehicleLoadList)
    },
    optionsVehicleEfficiencyUnitList(): any {
      return formatOptions(this.vehicleEfficiencyUnitList)
    },
    optionsMethodologiesList(): any {
      return formatOptions(this.methodologiesList)
    },
    optionsFuelStorageList(): any {
      return formatOptions(this.fuelStorageList, '', '', false)
    },
    optionsFuelStorageManagementList(): any {
      return formatOptions(this.fuelStorageManagementList, '', '', false)
    },
    optionsElectricitySourceList(): any {
      return formatOptions(this.electricitySourceList)
    },
    optionsRefrigerantSourceList(): any {
      return formatOptions(this.refrigerantSourceList)
    },
    optionsRefrigerantDisposalList(): any {
      return formatOptions(this.refrigerantDisposalList)
    },
    optionsRefrigerantMaintenanceAndRepairList(): any {
      return formatOptions(this.refrigerantMaintenanceAndRepairList)
    },
    optionsRefrigerantCapacityUnitList(): any {
      return formatOptions(this.refrigerantCapacityUnitList)
    },
    optionsWasteRegisterList(): any {
      return this.wasteRegisterList
    },
    getWasteCategoriesList(): any {
      return this.operationWasteList
    },
    optionsOperationWasteEmptyLabelList(): any {
      return this.operationWasteList.map(type => ({
        value: type,
        label: '',
      }))
    },
    optionsGoodsAndServiceOriginList(): any {
      return formatOptions(this.goodsAndServiceOriginList)
    },
    optionsServiceAcquiredList(): any {
      return formatOptions(this.serviceAcquiredList)
    },
    optionsGoodsAcquiredList(): any {
      return formatOptions(this.goodsAcquiredList)
    },
    optionsGoodsAndServiceList(): any {
      return formatOptions(this.goodsAndServiceList)
    },
    optionSupplierActionImplementationList(): any {
      return formatOptions(this.supplierActionImplementationList)
    },
    optionAssetLeasedList(): any {
      return formatOptions(this.assetLeasedList)
    },
    optionDurationList(): any {
      return formatOptions(this.durationList)
    },
    optionInvestmentList(): any {
      return formatOptions(this.investmentList)
    },
    optionWasteTypeList(): any {
      return formatOptions(this.wasteTypeList)
    },
    optionWasteOrganicList(): any {
      return formatOptions(this.wasteOrganicList)
    },
    optionWasteInorganicList(): any {
      return formatOptions(this.wasteInorganicList)
    },
    optionWasteDangerList(): any {
      return formatOptions(this.wasteDangerList)
    },
    optionsWasteManagementList(): any {
      return []
    },
    getWasteManagementOrganicList(): any {
      return this.wasteManagementOrganicList
    },
    optionWasteManagementInorganicList(): any {
      return formatOptions(this.wasteManagementInorganicList)
    },
    optionWasteManagementDangerList(): any {
      return formatOptions(this.wasteManagementDangerList)
    },
    optionUnitSoldPeriod(): any {
      return formatOptions(this.unitSoldPeriod)
    },
    optionProductOperation(): any {
      return formatOptionsNotEmpty(this.productOperation)
    },
    optionYesNo(): any {
      return [
        {
          label: i18n.t('yes'),
          value: true,
        },
        {
          label: i18n.t('no'),
          value: false,
        },
      ]
    },
    optionUnitOfMeasure(): any {
      const empty = {
        label: i18n.t('selectAnOption'),
        value: null,
      }

      const options = this.unitOfMeasureList.reduce((acc: any[], item: any) => {
        const group = acc.find(g => g.group === item.group)

        if (group) {
          group.options.push({
            label: item.name,
            value: item.id,
          })
        }
        else {
          acc.push({
            group: item.group,
            options: [
              {
                label: item.name,
                value: item.id,
              },
            ],
          })
        }
        return acc
      }, [])

      return [empty, ...options]
    },
    geiOptionUnitOfMeasure(): any {
      const empty = {
        label: i18n.t('selectAnOption'),
        value: null,
      }

      const options = this.geiUnitOfMeasureList.reduce((acc: any[], item: any) => {
        const group = acc.find(g => g.group === item.group)

        if (group) {
          group.options.push({
            label: item.name,
            value: item.id,
          })
        }
        else {
          acc.push({
            group: item.group,
            options: [
              {
                label: item.name,
                value: item.id,
              },
            ],
          })
        }

        return acc
      }, [])
      return [empty, ...options]
      return [empty, ...options]
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
        this.unitOfMeasureList = unitsOfMeasure.filter(item => item.is_gei_unit === false)
        this.geiUnitOfMeasureList = unitsOfMeasure.filter(item => item.is_gei_unit === true)

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

        const wasteTypeStr: any = configurations.find((config: any) => config.key === 'WASTE_TYPE_LIST')
        this.wasteTypeList = wasteTypeStr.value.split(',')

        const wasteOrganicStr: any = configurations.find((config: any) => config.key === 'WASTE_ORGANIC_LIST')
        this.wasteOrganicList = wasteOrganicStr.value.split(',')

        const wasteInorganicStr: any = configurations.find((config: any) => config.key === 'WASTE_INORGANIC_LIST')
        this.wasteInorganicList = wasteInorganicStr.value.split(',')

        const wasteDangerStr: any = configurations.find((config: any) => config.key === 'WASTE_DANGER_LIST')
        this.wasteDangerList = wasteDangerStr.value.split(',')

        const wasteManagementOrganicStr: any = configurations.find((config: any) => config.key === 'WASTE_MANAGEMENT_ORGANIC_LIST')
        this.wasteManagementOrganicList = wasteManagementOrganicStr.value.split(',')

        const wasteManagementInorganicStr: any = configurations.find((config: any) => config.key === 'WASTE_MANAGEMENT_INORGANIC_LIST')
        this.wasteManagementInorganicList = wasteManagementInorganicStr.value.split(',')

        const wasteManagementDangerStr: any = configurations.find((config: any) => config.key === 'WASTE_MANAGEMENT_DANGER_LIST')
        this.wasteManagementDangerList = wasteManagementDangerStr.value.split(',')

        const wasteRegisterStr: any = configurations.find((config: any) => config.key === 'WASTE_REGISTER_LIST')
        this.wasteRegisterList = wasteRegisterStr.value.split(',')

        const operationWasteStr: any = configurations.find((config: any) => config.key === 'OPERATION_WASTE_LIST')
        this.operationWasteList = operationWasteStr.value.split(',')

        const goodsAndServiceOriginStr: any = configurations.find((config: any) => config.key === 'GOODS_AND_SERVICES_ORIGIN_LIST')
        this.goodsAndServiceOriginList = goodsAndServiceOriginStr.value.split(',')

        const serviceAcquiredStr: any = configurations.find((config: any) => config.key === 'SERVICE_ACQUIRED_LIST')
        this.serviceAcquiredList = serviceAcquiredStr.value.split(',')

        const goodsAcquiredStr: any = configurations.find((config: any) => config.key === 'GOODS_ACQUIRED_LIST')
        this.goodsAcquiredList = goodsAcquiredStr.value.split(',')

        const goodsAndServiceStr: any = configurations.find((config: any) => config.key === 'GOODS_AND_SERVICES_LIST')
        this.goodsAndServiceList = goodsAndServiceStr.value.split(',')

        const supplierActionImplementationStr: any = configurations.find((config: any) => config.key === 'SUPPLIER_ACTIONS_IMPLEMENTATION_LIST')
        this.supplierActionImplementationList = supplierActionImplementationStr.value.split(',')

        const assetLeasedStr: any = configurations.find((config: any) => config.key === 'ASSETS_LEASED_LIST')
        this.assetLeasedList = assetLeasedStr.value.split(',')

        const durationStr: any = configurations.find((config: any) => config.key === 'DURATION_LIST')
        this.durationList = durationStr.value.split(',')

        const investmentStr: any = configurations.find((config: any) => config.key === 'INVESTMENT_LIST')
        this.investmentList = investmentStr.value.split(',')

        const unitSoldPeriodStr: any = configurations.find((config: any) => config.key === 'UNITS_SOLD_PERIOD_LIST')
        this.unitSoldPeriod = unitSoldPeriodStr.value.split(',')

        const productOperationStr: any = configurations.find((config: any) => config.key === 'PRODUCT_OPERATION_OPTIONS_LIST')
        this.productOperation = productOperationStr.value.split(',')
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
