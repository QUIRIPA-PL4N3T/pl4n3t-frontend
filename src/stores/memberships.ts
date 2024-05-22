import { defineStore } from 'pinia'
import { membershipsApi } from '~/api'
import type { BackUrls, CompanyMembership, Membership, MembershipsApiMembershipsPurchaseCreateRequest, PreferenceResponse, Purchase } from '~/api-client'
import attrMembershipData from '~/stores/attr-membership.json'

import type { AttrMembership } from '~/api/modelsDefaults'
import {
  DEFAULT_COMPANY_MEMBERSHIP,
  DEFAULT_MEMBERSHIP,
  DEFAULT_PURCHASE,
} from '~/api/modelsDefaults'

export const useMembershipsStore = defineStore('membership', {
  state: () => ({
    membershipsTypes: <Membership[]>[],
    companyMembership: <CompanyMembership>DEFAULT_COMPANY_MEMBERSHIP,
    currentMembership: <Membership>DEFAULT_MEMBERSHIP,
    attrMembership: <AttrMembership[]>attrMembershipData,
    purchase: <Purchase>DEFAULT_PURCHASE,
    preferenceResponse: <PreferenceResponse>{},
  }),
  getters: {
    hasMemberships(): boolean {
      return this.membershipsTypes.length > 0
    },
    getMembershipById(): any {
      return (id: number) => {
        const mem = this.membershipsTypes.find((membershipsType: Membership) => membershipsType.id === id)
        return mem || DEFAULT_MEMBERSHIP
      }
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
        const { data } = await membershipsApi.membershipsCompanyRetrieve({ id })
        this.companyMembership = data
      }
      catch (error) {
        this.companyMembership = DEFAULT_COMPANY_MEMBERSHIP
      }
    },
    async purchaseMembership(requestParameters: MembershipsApiMembershipsPurchaseCreateRequest) {
      try {
        const { data } = await membershipsApi.membershipsPurchaseCreate(requestParameters)
        this.preferenceResponse = data?.init_point
      }
      catch (error) {
        console.error(error)
      }
    },
  },
})
