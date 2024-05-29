import VueDocumentEditor from 'vue-document-editor'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.component('VueDocumentEditor', VueDocumentEditor)
}
