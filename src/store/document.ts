import { defineStore } from 'pinia'
import { documentApi } from '~/api'
import type { DocumentsApiDocumentsCreateRequest } from '~/api-client'
import {
  DEFAULT_DOCUMENT,
} from '~/api/modelsDefaults'

export const useDocumentsStore = defineStore('document', {
  state: () => ({
    documentItem: <DocumentsApiDocumentsCreateRequest>DEFAULT_DOCUMENT,
  }),
  getters: {
  },
  actions: {
    async uploadDocument() {
      await documentApi.documentsCreate(this.documentItem)
    },
  },
},
)
