import { MembershipTypeEnum, SizeEnum } from '~/api-client'
import type {
  Address,
  BackUrls,
  Brand,
  Company,
  CompanyMembership,
  DocumentsApiDocumentsCreateRequest,
  EmissionsSource,
  Identification,
  Location,
  Membership,
  Payer,
  Phone,
  Purchase,
  UpdatePassword,
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
export const DEFAULT_MEMBERSHIP: Membership = {
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
  membership: DEFAULT_MEMBERSHIP,
  start_date: '2024-05-15T15:35:37.531Z',
  end_date: '2024-05-15T15:35:37.531Z',
}

export const DEFAULT_PURCHASE_PHONE: Phone = {
  area_code: '57',
  number: '3168314191',
}

export const DEFAULT_PURCHASE_IDENTIFICATION: Identification = {
  type: '1',
  number: '123456789',
}

export const DEFAULT_PURCHASE_ADDRESS: Address = {
  street_name: 'Calle 20',
  street_number: 15,
  zip_code: '50001',
}

export const DEFAULT_PAYER: Payer = {
  name: 'juan sebastian',
  surname: '',
  email: 'jstorres0211@gmail.com',
  phone: DEFAULT_PURCHASE_PHONE,
  identification: DEFAULT_PURCHASE_IDENTIFICATION,
  address: DEFAULT_PURCHASE_ADDRESS,
}

export const DEFAULT_BACK_URL: BackUrls = {
  success: window.location.origin,
  failure: window.location.origin,
  pending: window.location.origin,
}

export const DEFAULT_PURCHASE: Purchase = {
  payer: DEFAULT_PAYER,
  back_urls: DEFAULT_BACK_URL,
}

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

export interface InitPoint {
  /**
   *
   * @type {string}
   * @memberof InitPoint
   */
  expiration_date_from: string

  /**
   *
   * @type {string}
   * @memberof InitPoint
   */
  expiration_date_to: string

  /**
   *
   * @type {string}
   * @memberof InitPoint
   */
  expires: boolean

  /**
   *
   * @type {string}
   * @memberof InitPoint
   */
  external_reference: string

  /**
   *
   * @type {string}
   * @memberof InitPoint
   */
  id: string

  /**
   *
   * @type {string}
   * @memberof InitPoint
   */
  init_point: string
}
export const DEFAULT_UPDATE_PASSWORD: UpdatePassword = {
  old_password: '',
  new_password: '',
  confirm_password: '',
}
