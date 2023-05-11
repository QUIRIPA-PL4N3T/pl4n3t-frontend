import { useThemeSettingsStore } from '~/store/themeSettings'

export function setup() {
  const themeSettingsStore = useThemeSettingsStore()
  if (localStorage.users === undefined) {
    const users = [
      {
        name: 'Pl4n3t',
        email: 'pl4n3t@gmail.com',
        password: 'pl4n3t',
      },
    ]
    localStorage.setItem('users', JSON.stringify(users))
  }

  // check local Storage theme for dark light bordered
  if (localStorage.theme === 'dark') {
    document.body.classList.add('dark')
    themeSettingsStore.theme = 'dark'
    themeSettingsStore.isDark = true
  }
  else {
    document.body.classList.add('light')
    themeSettingsStore.theme = 'light'
    themeSettingsStore.isDark = false
  }
  if (localStorage.semiDark === 'true') {
    document.body.classList.add('semi-dark')
    themeSettingsStore.semiDark = true
    themeSettingsStore.semiDarkTheme = 'semi-dark'
  }
  else {
    document.body.classList.add('semi-light')
    themeSettingsStore.semiDark = false
    themeSettingsStore.semiDarkTheme = 'semi-light'
  }
  // check local storage for menuLayout
  if (localStorage.menuLayout === 'horizontal')
    themeSettingsStore.menuLayout = 'horizontal'

  else
    themeSettingsStore.menuLayout = 'vertical'

  // check skin  for local storage
  if (localStorage.skin === 'bordered') {
    themeSettingsStore.skin = 'bordered'
    document.body.classList.add('skin--bordered')
  }
  else {
    themeSettingsStore.skin = 'default'
    document.body.classList.add('skin--default')
  }
  // check direction for local storage
  if (localStorage.direction === 'true') {
    themeSettingsStore.direction = true
    document.documentElement.setAttribute('dir', 'rtl')
  }
  else {
    themeSettingsStore.direction = false
    document.documentElement.setAttribute('dir', 'ltr')
  }

  // Check if the monochrome mode is set or not
  if (localStorage.getItem('monochrome') !== null) {
    themeSettingsStore.monochrome = true
    document.getElementsByTagName('html')[0].classList.add('grayscale')
  }
}
