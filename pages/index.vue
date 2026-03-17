<template>
  <div class="space-y-16">
    <div class="text-center py-20">
      <h1 class="text-5xl md:text-7xl font-bold mb-6 text-gradient animate-fade-in">
        {{ siteConfig.title }}
      </h1>
      <p class="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-slide-up">
        {{ siteConfig.description }}
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <div 
        v-for="post in featuredPosts" 
        :key="post.id"
        class="card cursor-pointer animate-scale-in"
        @click="navigateToPost(post.id)"
      >
        <div class="h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 flex flex-col items-center justify-center text-white relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div class="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">📝</div>
          <span class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
            {{ post.category }}
          </span>
        </div>
        
        <div class="p-8">
          <h2 class="text-2xl font-bold text-slate-900 mb-4 hover:text-blue-600 transition-colors line-clamp-2">
            {{ post.title }}
          </h2>
          
          <p class="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
            {{ post.excerpt }}
          </p>
          
          <div class="flex items-center justify-between text-sm text-slate-500 pt-6 border-t border-slate-100">
            <span class="flex items-center gap-2">
              <span>📅</span>
              {{ formatDate(post.createdAt) }}
            </span>
            <span class="flex items-center gap-2">
              <span>👁️</span>
              {{ post.views }} 阅读
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <NuxtLink 
        to="/posts"
        class="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 font-semibold text-xl"
      >
        浏览所有文章
        <span class="text-2xl">→</span>
      </NuxtLink>
    </div>

    <div class="grid lg:grid-cols-2 gap-12">
      <div class="card-gradient p-10 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div class="relative z-10">
          <h3 class="text-3xl font-bold mb-6 flex items-center gap-3">
            <span class="text-4xl">📧</span>
            订阅我的博客
          </h3>
          <p class="mb-8 text-slate-300 text-lg leading-relaxed">
            订阅我的博客，第一时间获取最新的技术文章和学习心得！每周精选内容，绝不 spam。
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="输入你的邮箱地址"
              class="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20 text-white placeholder-white/70"
            />
            <button class="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg">
              立即订阅
            </button>
          </div>
        </div>
      </div>

      <div class="card p-8">
        <h3 class="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <span class="text-4xl">🔥</span>
          最新文章
        </h3>
        <ul class="space-y-4">
          <li 
            v-for="post in recentPosts" 
            :key="post.id"
            class="group cursor-pointer"
            @click="navigateToPost(post.id)"
          >
            <div class="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all">
              <div class="w-2 h-14 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full flex-shrink-0 mt-1 group-hover:scale-125 transition-transform shadow-lg shadow-purple-500/30"></div>
              <div>
                <h4 class="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-lg">
                  {{ post.title }}
                </h4>
                <p class="text-sm text-slate-500 mt-2 flex items-center gap-3">
                  <span>{{ formatDate(post.createdAt) }}</span>
                  <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{{ post.views }} 阅读</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteStore } from '~/stores/site'
import { usePostStore } from '~/stores/post'

const siteStore = useSiteStore()
const postStore = usePostStore()

const siteConfig = computed(() => siteStore.config)
const { posts } = storeToRefs(postStore)

const featuredPosts = computed(() => posts.value.slice(0, 3))
const recentPosts = computed(() => posts.value.slice(0, 5))

const navigateToPost = (id: number) => {
  navigateTo(`/posts/${id}`)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(() => {
  postStore.fetchPosts()
})
</script>
