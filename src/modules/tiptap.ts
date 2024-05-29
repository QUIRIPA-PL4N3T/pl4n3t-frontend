import { EditorContent } from '@tiptap/vue-3'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.component('EditorContent', EditorContent)
}
