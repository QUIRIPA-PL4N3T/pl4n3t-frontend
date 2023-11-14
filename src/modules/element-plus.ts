import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(ElementPlus)
}
