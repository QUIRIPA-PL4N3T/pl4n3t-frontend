import { defineStore } from 'pinia'
import { membershipsApi } from '~/api'
import type { BackUrls, CompanyMembership, Membership, MembershipsApiMembershipsPurchaseCreateRequest, PreferenceResponse, Purchase } from '~/api-client'
import attrMembershipData from '~/stores/attr-membership.json'

import type { AttrMembership } from '~/api/modelsDefaults'
import {
  DEFAULT_COMPANY_MEMBERSHIP,
  DEFAULT_MEMBERSHIPS,
  DEFAULT_PURCHASE,
} from '~/api/modelsDefaults'

export const useMembershipsStore = defineStore('membership', {
  state: () => ({
    membershipsTypes: <Membership[]>[],
    companyMemberships: <CompanyMembership[]>[],
    companyMembership: <CompanyMembership>DEFAULT_COMPANY_MEMBERSHIP,
    currentMembership: <Membership>DEFAULT_MEMBERSHIPS,
    attrMembership: <AttrMembership[]>attrMembershipData,
    purchase: <Purchase>DEFAULT_PURCHASE,
  }),
  getters: {
    memberships(): Membership[] {
      return this.memberships
    },
    getCurrentCompanyMembership(): CompanyMembership {
      return this.companyMembership
    },
    getCurrentMembership(): Membership {
      return this.currentMembership
    },
    hasMemberships(): boolean {
      return this.memberships.length > 0
    },
  },
  actions: {
    purchaseLoadBackUrl(backUrls: BackUrls) {
      this.purchase.payer.surname = this.purchase.payer.name
      this.purchase.back_urls.success += backUrls.success
      this.purchase.back_urls.failure += backUrls.failure
      this.purchase.back_urls.pending += backUrls.pending
    },
    async fetchMemberships() {
      try {
        const { data: memberships } = await membershipsApi.membershipsTypesList()
        this.membershipsTypes = memberships
      }
      catch (error) {
        console.error(error)
      }
    },
    async fetchCompanyMembership(id: number) {
      try {
        const { data: companyMemberships } = await membershipsApi.membershipsCompanyMembershipsRetrieve({ id })
        this.companyMemberships = companyMemberships
      }
      catch (error) {
        this.fetchMembership(1)
        this.companyMembership = DEFAULT_COMPANY_MEMBERSHIP
      }
    },
    async fetchMembership(id: number) {
      // Fetch Membership brand by id
      if (id === 0) {
        this.currentMembership = DEFAULT_MEMBERSHIPS
        return
      }

      try {
        const { data: currentMembership } = await membershipsApi.membershipsTypesRetrieve({ id })
        this.currentMembership = currentMembership
      }
      catch (error) {
        this.currentMembership = DEFAULT_MEMBERSHIPS
      }
    },
    async purchaseMembership(requestParameters: MembershipsApiMembershipsPurchaseCreateRequest) {
      try {
        await membershipsApi.membershipsPurchaseCreate(requestParameters)
      }
      catch (error) {
        console.error(error)
      }
    },
  },
})
