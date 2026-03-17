export default defineNuxtConfig({
  compatibilityDate: '2026-03-17',
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  pinia: {
    storesDirs: ['./stores/**'], 
  },

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  app: {
    baseURL: '/nuxt-blog/', // 例如 '/my-nuxt-app/'
    head: {
      title: '个人博客',
      meta: [
        { name: 'description', content: '我的个人博客网站' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: '~/tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },

  nitro: {
    preset: 'github-pages', 
  }
})
