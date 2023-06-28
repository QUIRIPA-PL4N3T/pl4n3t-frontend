import { AccountsApi, MainApi } from '~/api-client'

import axiosInstance from '~/api/axios'

const apiUrl = `${import.meta.env.VITE_API_URL}`

export const mainApi = new MainApi(undefined, apiUrl, axiosInstance)
export const accountApi = new AccountsApi(undefined, apiUrl, axiosInstance)
