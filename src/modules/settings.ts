import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.config.globalProperties.$store = {}
  // app.mount('#app')
}
