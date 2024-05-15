import { MembershipTypeEnum, SizeEnum } from '~/api-client'
import type {
  Brand,
  Company,
  CompanyMembership,
  DocumentsApiDocumentsCreateRequest,
  EmissionsSource,
  Location,
  Membership,
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
export const DEFAULT_MEMBERSHIPS: Membership = {
  id: 1,
  name: 'Gratuito',
  membership_type: MembershipTypeEnum.Free,
  price: '0.00',
  duration: 365,
  description: 'Membresía gratuita para pequeñas empresas.',
  benefits: 'Navegación y visualización de contenido público, creación de un perfil.',
  num_brands: 1,
  num_locations: 1,
  num_users: 1,
  emission_sources: true,
  footprint_types: 'Huella de Carbono',
  liquidation_options: 'Anual',
  analysis_tools: false,
  basic_support: true,
  storage_capacity: 'No sube soportes',
  tutorials: true,
  webinars: false,
  general_support: true,
  dedicated_support: false,
  custom_api_access: false,
}

export const DEFAULT_COMPANY_MEMBERSHIP: CompanyMembership = {
  id: 1,
  company: 1,
  membership: 1,
  start_date: '2024-05-15T15:35:37.531Z',
  end_date: '2024-05-15T15:35:37.531Z',
}

/**
 *
 * @export
 * @interface Membership
 */
export interface AttrMembership {
  /**
   *
   * @type {string}
   * @memberof Membership
   */
  field: string
  /**
   *
   * @type {string}
   * @memberof Membership
   */
  attr: string
}
