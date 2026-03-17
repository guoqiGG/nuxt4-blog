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
    isDark: false,
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
    
    toggleTheme() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark')
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    
    setTheme(theme: 'light' | 'dark') {
      this.isDark = theme === 'dark'
      document.documentElement.classList.toggle('dark')
      localStorage.setItem('theme', theme)
    },
    
    initTheme() {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.setTheme(savedTheme as 'light' | 'dark')
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.setTheme('dark')
      }
    },
  },
})
