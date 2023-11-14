import Multiselect from '@vueform/multiselect'
import type { UserModule } from '~/types'
import '@vueform/multiselect/themes/default.css'

export const install: UserModule = ({ app }) => {
  app.component('Multiselect', Multiselect)
}
