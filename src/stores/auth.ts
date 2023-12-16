import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { accountApi } from '~/api'
import type { UserModel } from '~/api-client'
import setupInterceptors from '~/api/interceptors'

export const useAuthStore = defineStore('auth', {
  state: (): any => ({
    user: <UserModel | null>(null),
    accessToken: null,
    refreshToken: Cookies.get('refreshToken') || null,
    interceptorConfigured: false,
  }),
  getters: {
    isAuthenticated(): boolean {
      return !!this.accessToken || !!this.refreshToken
    },
    username(): string {
      if (this.user) {
        if (this.user.first_name || this.user.last_name)
          return `${this.user.first_name} ${this.user.last_name}`
        else
          return this.user.username
      }
      return ''
    },
    fullName(): string {
      if (this.user) {
        const names = this.user!.first_name.split(' ')
        const lastNames = this.user!.last_name.split(' ')
        return `${names[0]} ${lastNames[0]}`
      }
      else { return '' }
    },
    uiAvatar(): string {
      if (this.user && this.user.avatar)
        return this.user.avatar.file_url
      return `https://ui-avatars.com/api/?name=${this.user ? this.fullName : 'Unknown'}`
    },
  },
  actions: {
    async getUserProfile() {
      try {
        const { data: currentUser } = await accountApi.accountsCurrentRetrieve()
        this.user = currentUser
      }
      catch (error) {
        console.error(error)
      }
    },
    async createUser(user: any) {
      // Register new user at API
      await accountApi.accountsRegisterCreate({ register: user })
    },
    async logIn(user: any) {
      // API login
      const { data } = await accountApi.accountsLoginCreate({ customTokenObtainPair: user })
      this.accessToken = data.access
      // Persist refresh token
      this.refreshTokenPersist(data.refresh)
      // Set axios interceptors to inject the bearer token in all request headers
      setupInterceptors(this)
      this.getUserProfile()
      return this.isAuthenticated
    },
    async logOut() {
      try {
        await accountApi.accountsLogoutCreate({ logout: { refresh_token: this.refreshToken } })
        // In order 1.Remove refresh token, 2.Remove Access Token, remove user
        this.refreshTokenRemove()
        this.accessToken = null
        this.user = null
      }
      catch (error) {
        this.refreshTokenRemove()
      }
    },
    async refresh() {
      // Update access and refresh token from api Server
      this.refreshTokenSynchronize()
      if (this.refreshToken && !this.user) {
        // Request a new token
        const { data } = await accountApi.accountsRefreshCreate({ tokenRefresh: { refresh: this.refreshToken, access: this.accessToken } })
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
    async requestRestorePassword(email: any) {
      await accountApi.accountsRecoverPasswordCreate({ resetPasswordRequest: email })
    },
    async recoverPasswordChange(resetPassword: any) {
      await accountApi.accountsChangePasswordCreate({ resetPassword })
    },
  },
})
