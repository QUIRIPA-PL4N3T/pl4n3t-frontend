import {
  AccountsApi,
  BrandsApi,
  CompaniesApi,
  CompanyEmissionSourceEntriesApi,
  CompanyEmissionSourcesApi,
  CompanyMembersApi,
  DashboardApi,
  DocumentsApi,
  EmissionFactorsApi,
  EmissionSourceGroupsApi,
  EmissionsResultsApi,
  FactorTypesApi,
  GHGScopesApi,
  GreenhouseGasEmissionsApi,
  GreenhouseGasesApi,
  ISOCategoriesApi,
  LocationsApi,
  MainApi,
  MembershipsApi,
  QuantificationTypesApi,
  SourceTypesApi,
} from '~/api-client'

import axiosInstance from '~/api/axios'

const apiUrl = `${import.meta.env.VITE_API_URL}`

export const mainApi = new MainApi(undefined, apiUrl, axiosInstance)
export const accountApi = new AccountsApi(undefined, apiUrl, axiosInstance)
export const brandApi = new BrandsApi(undefined, apiUrl, axiosInstance)
export const companyApi = new CompaniesApi(undefined, apiUrl, axiosInstance)
export const companyEmissionSourceEntryApi = new CompanyEmissionSourceEntriesApi(undefined, apiUrl, axiosInstance)
export const companyEmissionSourceApi = new CompanyEmissionSourcesApi(undefined, apiUrl, axiosInstance)
export const companyUserApi = new CompanyMembersApi(undefined, apiUrl, axiosInstance)
export const emissionFactorApi = new EmissionFactorsApi(undefined, apiUrl, axiosInstance)
export const emissionSourceGroupApi = new EmissionSourceGroupsApi(undefined, apiUrl, axiosInstance)
export const factorTypeApi = new FactorTypesApi(undefined, apiUrl, axiosInstance)
export const ghgScopesApi = new GHGScopesApi(undefined, apiUrl, axiosInstance)
export const greenhouseGasEmissionApi = new GreenhouseGasEmissionsApi(undefined, apiUrl, axiosInstance)
export const greenhouseGasApi = new GreenhouseGasesApi(undefined, apiUrl, axiosInstance)
export const isoCategoryApi = new ISOCategoriesApi(undefined, apiUrl, axiosInstance)
export const locationApi = new LocationsApi(undefined, apiUrl, axiosInstance)
export const quantificationTypeApi = new QuantificationTypesApi(undefined, apiUrl, axiosInstance)
export const sourceTypeApi = new SourceTypesApi(undefined, apiUrl, axiosInstance)
export const documentApi = new DocumentsApi(undefined, apiUrl, axiosInstance)
export const membershipsApi = new MembershipsApi(undefined, apiUrl, axiosInstance)
export const emissionResultApi = new EmissionsResultsApi(undefined, apiUrl, axiosInstance)
export const dashboardApi = new DashboardApi(undefined, apiUrl, axiosInstance)
