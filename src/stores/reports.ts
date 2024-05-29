import { defineStore } from 'pinia'
import { reportsApi } from '~/api'
import type { CompanyTemplateDetail, CompanyTemplateList, ReportDetail, ReportTemplateDetail, ReportTemplateList } from '~/api-client/models'
import { DEFAULT_REPORT_DETAIL } from '~/api/modelsDefaults'

export const useReportsStore = defineStore('reports', {
  state: () => ({
    report: <ReportDetail>DEFAULT_REPORT_DETAIL,
    reports: <ReportList[]>[],
    template: <ReportTemplateDetail>DEFAULT_REPORT_DETAIL,
    templates: <ReportTemplateList[]>[],
    templateCompany: <CompanyTemplateDetail>DEFAULT_REPORT_DETAIL,
    templatesCompany: <CompanyTemplateList[]>[],
  }),
  getters: {
  },
  actions: {
    async fetchTemplates() {
      try {
        const { data } = await reportsApi.reportsPlanetTemplatesList()
        this.templates = data
      }
      catch (error) {
        console.error(error)
      }
    },
    async getTemplate(id: number) {
      try {
        const { data } = await reportsApi.reportsPlanetTemplatesRetrieve({ id })
        this.template = data
      }
      catch (error) {
        console.error(error)
      }
    },
    async generateBranchTemplate(id: number, company: number) {
      try {
        this.getTemplate(id).then(() => {
          this.createCompanyTemplate({ ...this.template, company }).then(() => {
            this.fetchCompanyTemplates(company)
          })
        })
      }
      catch (error) {
        console.error(error)
      }
    },
    async createCompanyTemplate(companyTemplateDetail: CompanyTemplateDetail) {
      try {
        const { data } = await reportsApi.reportsCompanyTemplatesCreate({ companyTemplateDetail })
        this.templateCompany = data
      }
      catch (error) {
        console.error(error)
      }
    },
    async updateCompanyTemplate(id: number, companyTemplateDetail: CompanyTemplateDetail) {
      try {
        const { data } = await reportsApi.reportsCompanyTemplatesUpdate({ id, companyTemplateDetail })
        this.templateCompany = data
      }
      catch (error) {
        console.error(error)
      }
    },
    async deleteCompanyTemplate(id: number) {
      try {
        await reportsApi.reportsCompanyTemplatesDestroy({ id }).then(() => {
          this.fetchCompanyTemplates()
        })
      }
      catch (error) {
        console.error(error)
      }
    },
    async fetchCompanyTemplates() {
      try {
        const { data } = await reportsApi.reportsCompanyTemplatesList()
        this.templatesCompany = data
      }
      catch (error) {
        console.error(error)
      }
    },
    async getCompanyTemplate(id: number) {
      try {
        const { data } = await reportsApi.reportsCompanyTemplatesRetrieve({ id })
        this.templateCompany = data
      }
      catch (error) {
        console.error(error)
      }
    },
    async fetchReports() {
      try {
        const { data } = await reportsApi.reportsReportsList()
        this.reports = data
      }
      catch (error) {
        console.error(error)
      }
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
