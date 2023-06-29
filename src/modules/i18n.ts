import { createI18n } from 'vue-i18n'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.globEager('../../locales/*.y(a)?ml'))
    .map(([key, value]: [string, any]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(14, yaml ? -5 : -4), value.default]
    }),
)

const instance = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  availableLocales: ['en', 'es', 'pt'],
  messages,
})

export const i18n = instance.global

export default instance
