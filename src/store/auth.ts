import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

// import { refreshApi, usersApi } from '~/api'
import setupInterceptors from '~/api/interceptors'

export const useAuthStore = defineStore('auth', {
  state: (): any => ({
    user: null,
    accessToken: null,
    refreshToken: Cookies.get('refreshToken') || null,
    interceptorConfigured: false,
  }),
  getters: {
    isAuthenticated(): boolean {
      return !!this.accessToken || !!this.refreshToken
    },
    type(): string {
      return 'User type'
    },
    subType(): string {
      return 'User subtype'
    },
    username(): string {
      return 'User'
    },
  },
  actions: {
    async getUserProfile() {
      try {
        // const { data: currentUser } = await usersApi.currentRetrieve()
        const { data: currentUser } = await Promise.resolve({ data: { username: 'example', first_name: 'Jon', last_name: 'Doe' } })
        this.user = currentUser
      }
      catch (error) {
        console.error(error)
      }
    },
    async createUser(user: any) {
      // Register new user at API
      // await usersApi.registerCreate({ register: user })
    },
    async logIn(user: any) {
      // API login
      // TODO: request refresh token in API
      // const { data } = await usersApi.loginCreate({ customTokenObtainPair: user })
      const { data } = await Promise.resolve({ data: { access: 'access-token-12345', refresh: 'refresh-token-12345' } })
      this.accessToken = data.access
      // Persist refresh token
      this.refreshTokenPersist(data.refresh)
      // Set axios interceptors to inject the bearer token in all request headers
      setupInterceptors(this)
      this.getUserProfile()
      return this.isAuthenticated
    },
    async logOut() {
      // TODO: revoke refresh token
      // await usersApi.logoutCreate({ logout: { refresh_token: this.refreshToken } })
      // In order 1.Remove refresh token, 2.Remove Access Token, remove user
      this.refreshTokenRemove()
      this.accessToken = null
      this.user = null
    },
    async refresh() {
      // Update access and refresh token from api Server
      this.refreshTokenSynchronize()
      if (this.refreshToken && !this.user) {
        // Request a new token
        // TODO: request refresh token in API
        // const { data } = await refreshApi.refreshCreate({ tokenRefresh: { refresh: this.refreshToken } })
        const { data } = await Promise.resolve({ data: { access: 'access-token-12345', refresh: 'refresh-token-12345' } })
        this.accessToken = data.access
        // Update and Persist refresh token
        this.refreshTokenPersist(data.refresh)
        setupInterceptors(this)
        this.getUserProfile()
      }
      return this.isAuthenticated
    },
    refreshTokenSynchronize() {
      // Retrieve refresh from cookies and update
      const refreshToken = Cookies.get('refreshToken') || null
      if (this.refreshToken !== refreshToken)
        this.refreshToken = refreshToken
    },
    refreshTokenPersist(tokenRefresh: any) {
      // Save refresh token in a cookie
      this.refreshToken = tokenRefresh
      Cookies.set('refreshToken', tokenRefresh, { secure: true, sameSite: 'strict' })
    },
    refreshTokenRemove() {
      // Remove all refresh token
      this.refreshToken = null
      Cookies.remove('refreshToken')
    },
  },
})
