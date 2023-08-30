import { SizeEnum } from '~/api-client'
import type { Brand, Company } from '~/api-client'

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
