import { defineStore } from 'pinia'
import { membershipsApi } from '~/api'
import type { CompanyMembership, Membership, PurchaseMember } from '~/api-client'
import attrMembershipData from '~/stores/attr-membership.json'

import type { AttrMembership } from '~/api/modelsDefaults'
import {
  DEFAULT_COMPANY_MEMBERSHIP,
  DEFAULT_MEMBERSHIPS,
} from '~/api/modelsDefaults'

export const useMembershipsStore = defineStore('membership', {
  state: () => ({
    membershipsTypes: <Membership[]>[],
    companyMembership: <CompanyMembership>DEFAULT_COMPANY_MEMBERSHIP,
    currentMembership: <Membership>DEFAULT_MEMBERSHIPS,
    attrMembership: <AttrMembership[]>attrMembershipData,
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
        const { data: companyMembership } = await membershipsApi.membershipsCompanyMembershipsRetrieve({ id })
        this.companyMembership = companyMembership
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
    async purchaseMembership(purchaseMember: PurchaseMember) {
      try {
        await membershipsApi.membershipsPurchaseCreate({
          membershipId: this.currentMembership.id,
          purchaseMember,
        })
      }
      catch (error) {
        console.error(error)
      }
    },
  },
})
