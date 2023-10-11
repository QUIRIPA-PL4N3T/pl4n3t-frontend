import { SizeEnum } from '~/api-client'
import type {
  Brand,
  Company,
  DocumentsApiDocumentsCreateRequest,
  EmissionsSource,
  Location,
}
  from '~/api-client'

export const DEFAULT_COMPANY: Company = {
  id: 0,
  name: '',
  description: null,
  industry: null,
  size: SizeEnum.Small,
  website: null,
  geo_location: null,
  economic_sector: null,
  industry_type: null,
  logo_absolute_url: '',
  locations: [],
  members_roles: [],
  brands: [],
  city_name: '',
  state_name: '',
  country_name: '',
}

export const DEFAULT_BRAND: Brand = {
  id: 0,
  company: 0,
  name: '',
  description: null,
  logo_absolute_url: '',
  logo: null,
}

export const DEFAULT_LOCATION: Location = {
  id: 0,
  name: '',
  address: '',
  city: 0,
  country: 0,
  state: 0,
  zip_code: '00000',
  company: 0,
  geo_location: null,
  brand: 0,
  location_type: null,
  emission_source_locations: [],
}

export const DEFAULT_EMISSIONS_SOURCE: EmissionsSource = {
  id: 0,
  name: '',
  code: '',
  description: null,
  location: 0,
  image: null,
  group: 0,
  source_type: 0,
  factor_type: 0,
  emission_factor: 0,
  geo_location: null,
  documents: [],
}

export const DEFAULT_DOCUMENT: DocumentsApiDocumentsCreateRequest = {
  objectPk: 0,
  objectType: 'emission-source',
  file: undefined,
  title: '',
  tags: '',
}
