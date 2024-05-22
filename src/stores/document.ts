import { defineStore } from 'pinia'
import { documentApi } from '~/api'
import type { DocumentsApiDocumentsCreateRequest } from '~/api-client'
import {
  DEFAULT_DOCUMENT,
} from '~/api/modelsDefaults'

interface EditableDocumentsApiDocumentsCreateRequest {
  objectPk: number
  objectType: string
  file?: File
  title?: string
  tags?: string
}

export const useDocumentsStore = defineStore('document', {
  state: () => ({
    documentItem: <EditableDocumentsApiDocumentsCreateRequest>DEFAULT_DOCUMENT,
  }),
  getters: {
  },
  actions: {
    setDocumentProperties(properties: Partial<EditableDocumentsApiDocumentsCreateRequest>) {
      Object.assign(this.documentItem, properties)
    },
    async uploadDocument() {
      await documentApi.documentsCreate(this.documentItem as DocumentsApiDocumentsCreateRequest)
    },
  },
})
