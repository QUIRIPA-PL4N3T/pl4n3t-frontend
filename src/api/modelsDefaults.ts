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
  ReportDetail,
  ReportTemplateList,
  UpdatePassword,
}
  from '~/api-client'

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
  emission_sources: [],
}

export const DEFAULT_EMISSIONS_SOURCE: EmissionsSource = {
  id: 0,
  name: '',
  code: '',
  location: 0,
  description: null,
  image: null,
  group: 0,
  factor_type: 0,
  emission_factor: 0,
  geo_location: null,
  documents: [],
  emission_source_name: '',
  group_name: '',
  waste_management_data: {},
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
  days_remaining: '',
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
  name: 'Juan Sebastian',
  surname: '',
  email: 'jstorres0211@gmail.com',
  phone: DEFAULT_PURCHASE_PHONE,
  identification: DEFAULT_PURCHASE_IDENTIFICATION,
  address: DEFAULT_PURCHASE_ADDRESS,
}

export const DEFAULT_BACK_URL: BackUrls = {
  success: 'window.location.origin',
  failure: 'window.location.origin',
  pending: 'window.location.origin',
}

export const DEFAULT_PURCHASE: Purchase = {
  payer: DEFAULT_PAYER,
  back_urls: DEFAULT_BACK_URL,
}

export const DEFAULT_COMPANY: Company = {
  id: 0,
  name: '',
  description: null,
  industry: null,
  size: SizeEnum.Small,
  locations: [],
  website: null,
  geo_location: null,
  economic_sector: null,
  industry_type: null,
  members_roles: [],
  brands: [] as Array<Brand>,
  country: null,
  address: null,
  postal_code: null,
  phone: null,
  state: null,
  city: null,
  logo_absolute_url: '',
  email: null,
  country_name: '',
  state_name: '',
  city_name: '',
  nit: null,
  logo: null,
  economic_sector_name: '',
  size_name: '',
  industry_type_name: '',
  membership: DEFAULT_COMPANY_MEMBERSHIP,
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

export const DEFAULT_REPORT: ReportTemplateList = {
  id: 1,
  name: 'Informe de Inventarios de GEI y Huella de Carbono Organizacional',
  creation_date: '2016-08-29T09:12:33.001Z',
  version: 1.0,
}

export const DEFAULT_REPORT_DETAIL: ReportDetail = {
  id: 0,
  name: '',
  creation_date: '',
  version: 1,
  introduction: '',
  definitions: '',
  company_description: '',
  organizational_description: '',
  baseline_year_diagnostic: '',
  report_frequency: '',
  intended_use: '',
  diagnostic_scope: '',
  diagnostic_objectives: '',
  quantification_methodology: '',
  emissions_inventory_exclusions: '',
  carbon_footprint_determination: '',
  gei_inventory_boundaries: '',
  report_results: '',
  emissions_inventory: '',
  emissions_consolidation: '',
  emissions_consolidation_year: '',
  carbon_footprint_quantification: '',
  emissions_reduction_recommendations: '',
  conclusions: '',
  period: '',
  annexes: '',
}

export interface ActionEmits<T> {
  action: 'edit' | 'preview' | 'branch' | 'delete'
  value: T
}
