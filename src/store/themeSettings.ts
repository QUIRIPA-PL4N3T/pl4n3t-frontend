import { defineStore } from 'pinia'

export const useThemeSettingsStore = defineStore('themeSettings', {
  state: () => ({
    sidebarCollapse: false,
    sidebarHidden: false,
    mobilSidebar: false,
    semiDark: false,
    monochrome: false,
    semiDarkTheme: 'semi-light',
    isDark: false,
    skin: 'default',
    theme: 'light',
    isOpenSettings: false,
    cWidth: 'full',
    menuLayout: 'vertical',
    navbarType: 'sticky',
    isMouseHovered: false,
    footerType: 'static',
    direction: false,
    chartColors: {
      title: 'red',
    },
  }),
  actions: {
    setSidebarCollapse() {
      this.sidebarCollapse = !this.sidebarCollapse
    },

    toggleDark() {
      this.isDark = !this.isDark
      document.body.classList.remove(this.theme)
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      document.body.classList.add(this.theme)
      localStorage.setItem('theme', this.theme)
    },

    toggleMonochrome() {
      const isMonochrome = (localStorage.getItem('monochrome') !== null)
      // this.monochrome = !this.monochrome;
      if (isMonochrome) {
        localStorage.removeItem('monochrome')
        document.getElementsByTagName('html')[0].classList.remove('grayscale')
        return
      }
      localStorage.setItem('monochrome', 'true')
      document.getElementsByTagName('html')[0].classList.add('grayscale')
    },

    toggleSettings() {
      this.isOpenSettings = !this.isOpenSettings
    },
    toggleMobilsidebar() {
      this.mobilSidebar = !this.mobilSidebar
    },
    toggleSemiDark() {
      this.semiDark = !this.semiDark
      this.semiDarkTheme = this.semiDark ? 'semi-dark' : 'semi-light'
      document.body.classList.toggle(this.semiDarkTheme)
      localStorage.setItem('semiDark', String(this.semiDark))
    },
  },
})
