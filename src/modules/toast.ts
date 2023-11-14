import Toast from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'
import type { UserModule } from '~/types'

// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
}

export const install: UserModule = ({ app }) => {
  app.use(Toast, options)
}
