import { defaultConfig, plugin } from '@formkit/vue'
import config from '~/formkit.config'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(plugin, defaultConfig(config))
}
