import VueGoodTablePlugin from 'vue-good-table-next'
import 'vue-good-table-next/dist/vue-good-table-next.css'

import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(VueGoodTablePlugin)
}
