import { defineStore } from 'pinia'

export const useSiteStore = defineStore('site', {
  state: () => ({
    config: {
      title: '我的个人博客',
      author: '开发者',
      description: '记录技术成长与思考',
      email: 'admin@example.com',
      socialLinks: [
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'Twitter', url: 'https://twitter.com' },
        { name: 'LinkedIn', url: 'https://linkedin.com' },
      ],
    },
    isLoading: false,
  }),

  getters: {
    siteInfo: (state) => state.config,
    isLoaded: (state) => !state.isLoading,
  },

  actions: {
    async fetchSiteInfo() {
      this.isLoading = true
      try {
        const data = await $fetch('/api/site-info')
        this.config = { ...this.config, ...data }
      } catch (error) {
        console.error('Failed to fetch site info:', error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
