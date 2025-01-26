import { defineStore } from 'pinia'

export const useLiuren = defineStore({
  state: () => {
    return {
      current: null,
    }
  },
  actions: {
    setCurrent(current) {
      this.current = current
    },
  },
})
