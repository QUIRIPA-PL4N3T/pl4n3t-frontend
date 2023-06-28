import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    isLoading: false,
    count: 0,
  }),
  actions: {
    setLoading(payload: boolean) {
      if (payload) {
        this.count++
        this.isLoading = true
      }
      else if (this.count > 0) {
        this.count--
        this.isLoading = (this.count > 0)
      }
    },
  },
})
