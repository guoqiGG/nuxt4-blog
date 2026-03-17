<template>
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-16">
      <h1 class="text-6xl font-bold text-slate-900 mb-6 text-gradient dark:text-transparent">关于我</h1>
      <div class="w-40 h-40 mx-auto bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl shadow-purple-500/30 mb-8 animate-scale-in dark:from-blue-600 dark:via-purple-600 dark:to-pink-600">
        {{ siteConfig.author.substring(0, 2).toUpperCase() }}
      </div>
      <h2 class="text-4xl font-bold text-slate-900 mb-3 dark:text-white">{{ siteConfig.author }}</h2>
      <p class="text-2xl text-slate-600 dark:text-slate-300">{{ siteConfig.description }}</p>
      <p class="text-blue-600 font-bold text-xl mt-3 dark:text-blue-400">{{ siteConfig.email }}</p>
    </div>

    <div class="card-gradient p-10 text-white relative overflow-hidden dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
      <div class="relative z-10">
        <div class="space-y-10">
          <section>
            <h3 class="text-3xl font-bold mb-6 flex items-center gap-4">
              <span class="text-4xl">📖</span>
              关于这个博客
            </h3>
            <p class="text-slate-300 leading-relaxed text-lg dark:text-slate-400">
              欢迎来到我的个人博客！这是一个基于 Nuxt 4 构建的技术博客平台。
              我在这里分享我在前端开发领域的学习心得和技术文章。
            </p>
          </section>

          <section>
            <h3 class="text-3xl font-bold mb-6 flex items-center gap-4">
              <span class="text-4xl">🛠️</span>
              技术栈
            </h3>
            <div class="flex flex-wrap gap-4">
              <span class="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-sm font-bold border border-white/20 hover:bg-white/20 transition-all dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600">Vue 3</span>
              <span class="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-sm font-bold border border-white/20 hover:bg-white/20 transition-all dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600">Nuxt 4</span>
              <span class="px-6 py-3 bg-yellow-500/20 backdrop-blur-sm rounded-xl text-sm font-bold border border-yellow-500/30 hover:bg-yellow-500/30 transition-all dark:bg-yellow-600/20 dark:border-yellow-600/30 dark:hover:bg-yellow-600/30">TypeScript</span>
              <span class="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-sm font-bold border border-white/20 hover:bg-white/20 transition-all dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600">Pinia</span>
              <span class="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-sm font-bold border border-white/20 hover:bg-white/20 transition-all dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600">Tailwind CSS</span>
              <span class="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-sm font-bold border border-white/20 hover:bg-white/20 transition-all dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600">Node.js</span>
            </div>
          </section>

          <section>
            <h3 class="text-3xl font-bold mb-6 flex items-center gap-4">
              <span class="text-4xl">📧</span>
              联系我
            </h3>
            <p class="text-slate-300 mb-8 text-lg dark:text-slate-400">欢迎通过以下方式联系我：</p>
            <div class="space-y-4">
              <p class="text-white text-xl flex items-center gap-4 dark:text-white">
                <span class="text-3xl">📧</span>
                {{ siteConfig.email }}
              </p>
              <div class="flex flex-wrap gap-4">
                <a 
                  v-for="social in siteConfig.socialLinks" 
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-7 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 font-bold dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 dark:hover:from-blue-800 dark:hover:via-purple-800 dark:hover:to-pink-800"
                >
                  {{ social.name }}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const siteStore = useSiteStore()
const siteConfig = computed(() => siteStore.config)
</script>
