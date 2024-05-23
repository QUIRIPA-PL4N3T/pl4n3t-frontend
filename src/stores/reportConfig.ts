import { defineStore } from 'pinia'
import { DEFAULT_REPORT } from '~/api/modelsDefaults'
import type { ReportConfig } from '~/api/modelsDefaults'
import reports from '~/stores/reports.json'

export const useReportStore = defineStore('reportConfig', {
  state: () => ({
    reportConfig: <ReportConfig>DEFAULT_REPORT,
    templates: <ReportConfig[]>reports,
    templatesCompany: <ReportConfig[]>reports,
  }),
  getters: {
  },
  actions: {
    async fetchReportConfig() {
      // try {
      //   const { data } = await reportConfigApi.membershipsTypesList()
      //   this.reportConfig = data
      // }
      // catch (error) {
      //   console.error(error)
      // }
    },
    async updateReportConfig() {
      // try {
      //   const { data } = await reportConfigApi.membershipsPurchaseCreate(reportConfig)
      //   this.preferenceResponse = data?.init_point
      // }
      // catch (error) {
      //   console.error(error)
      // }
    },
  },
})
