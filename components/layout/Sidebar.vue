<template>
  <div class="flex">
    <aside class="w-80 hidden lg:block bg-white/90 backdrop-blur-md rounded-3xl shadow-xl shadow-purple-500/10 p-8 sticky top-24 border border-white/20">
      <div class="mb-10 text-center">
        <div class="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-5 shadow-2xl shadow-purple-500/30">
          {{ siteConfig.author.substring(0, 2).toUpperCase() }}
        </div>
        <h3 class="font-bold text-slate-900 text-2xl">{{ siteConfig.author }}</h3>
        <p class="text-sm text-slate-500 mt-3 leading-relaxed">{{ siteConfig.description }}</p>
      </div>

      <div class="space-y-8">
        <div>
          <h4 class="font-bold text-slate-900 mb-5 flex items-center gap-3 text-lg">
            <span class="text-2xl">📂</span>
            分类
          </h4>
          <ul class="space-y-3">
            <li 
              v-for="category in categories" 
              :key="category.id"
              class="flex justify-between items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all cursor-pointer group border border-transparent hover:border-blue-200"
            >
              <span class="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{{ category.name }}</span>
              <span class="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-lg text-sm font-bold">
                {{ category.count }}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-slate-900 mb-5 flex items-center gap-3 text-lg">
            <span class="text-2xl">🏷️</span>
            标签云
          </h4>
          <div class="flex flex-wrap gap-3">
            <span 
              v-for="tag in tags" 
              :key="tag.id"
              class="px-5 py-2.5 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-xl text-sm hover:from-blue-100 hover:to-purple-100 hover:text-blue-600 hover:shadow-lg transition-all cursor-pointer font-semibold border border-slate-200"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>

        <div>
          <h4 class="font-bold text-slate-900 mb-5 flex items-center gap-3 text-lg">
            <span class="text-2xl">📝</span>
            最近文章
          </h4>
          <ul class="space-y-4">
            <li 
              v-for="post in recentPosts" 
              :key="post.id"
              class="group cursor-pointer"
            >
              <NuxtLink :to="`/posts/${post.id}`" class="block p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all border border-transparent hover:border-blue-200">
                <h5 class="font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {{ post.title }}
                </h5>
                <p class="text-xs text-slate-500 mt-3 flex items-center gap-2">
                  <span>📅</span>
                  {{ formatDate(post.createdAt) }}
                </p>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const siteStore = useSiteStore()
const siteConfig = computed(() => siteStore.config)

const categories = ref([
  { id: 1, name: '前端开发', count: 12 },
  { id: 2, name: '后端技术', count: 8 },
  { id: 3, name: '项目管理', count: 5 },
  { id: 4, name: '技术分享', count: 15 },
])

const tags = ref([
  { id: 1, name: 'Vue' },
  { id: 2, name: 'Nuxt' },
  { id: 3, name: 'TypeScript' },
  { id: 4, name: 'Pinia' },
  { id: 5, name: 'CSS' },
  { id: 6, name: 'JavaScript' },
])

const recentPosts = ref([
  { id: 1, title: 'Nuxt 3 入门指南', createdAt: '2024-01-15' },
  { id: 2, title: 'Vue 3 组合式 API 实践', createdAt: '2024-01-10' },
  { id: 3, title: 'TypeScript 类型系统详解', createdAt: '2024-01-05' },
])

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
