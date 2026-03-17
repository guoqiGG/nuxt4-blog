<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="isLoading" class="text-center py-24">
      <div class="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      <p class="mt-8 text-slate-600 text-xl font-medium">加载中...</p>
    </div>

    <div v-else-if="!post" class="text-center py-24">
      <div class="text-8xl mb-6">📄</div>
      <h2 class="text-4xl font-bold text-slate-900 mb-4">文章未找到</h2>
      <p class="text-slate-600 text-lg mb-8">您请求的文章不存在或已被删除</p>
      <NuxtLink 
        to="/posts" 
        class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl font-semibold text-lg"
      >
        <span>←</span>
        返回文章列表
      </NuxtLink>
    </div>

    <div v-else class="card overflow-hidden animate-slide-up">
      <div class="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-10 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]"></div>
        
        <div class="relative z-10">
          <div class="flex items-center gap-4 mb-8">
            <span class="px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
              {{ post.category }}
            </span>
            <span class="flex items-center gap-2 text-blue-200 text-sm">
              <span>📅</span>
              {{ formatDate(post.createdAt) }}
            </span>
            <span class="flex items-center gap-2 text-blue-200 text-sm">
              <span>👁️</span>
              {{ post.views }} 阅读
            </span>
          </div>

          <h1 class="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            {{ post.title }}
          </h1>

          <div class="flex items-center gap-5 pt-8 border-t border-white/20">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-purple-500/30">
                {{ post.author.substring(0, 2).toUpperCase() }}
              </div>
              <div>
                <p class="font-bold text-white text-lg">{{ post.author }}</p>
                <p class="text-sm text-blue-200">作者</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-8 md:p-12">
        <div class="prose prose-lg max-w-none text-slate-600 mb-10 prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-blue-600 hover:prose-a:text-purple-600 prose-a:underline prose-a:decoration-blue-300 prose-a:hover:decoration-purple-600 prose-a:underline-offset-2">
          <div v-html="post.content"></div>
        </div>

        <div class="flex items-center justify-between pt-10 border-t border-slate-200">
          <div class="flex flex-wrap gap-3">
            <span 
              v-for="tag in post.tags" 
              :key="tag"
              class="px-5 py-2 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-lg text-sm hover:from-blue-100 hover:to-purple-100 hover:text-blue-600 transition-all cursor-default border border-slate-200"
            >
              #{{ tag }}
            </span>
          </div>
          <div class="flex items-center gap-4">
            <button class="flex items-center gap-3 px-6 py-3 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
              <span class="text-2xl">❤️</span>
              <span class="font-semibold">{{ post.views }}</span>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between mt-12 pt-10 border-t border-slate-200">
          <div class="flex gap-8">
            <NuxtLink 
              v-if="prevPost"
              :to="`/posts/${prevPost.id}`"
              class="group flex items-center gap-4 text-slate-600 hover:text-blue-600 transition-all"
            >
              <div class="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <span class="text-3xl group-hover:-translate-x-1 transition-transform">←</span>
              </div>
              <div>
                <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">上一篇</p>
                <p class="font-bold text-lg">{{ prevPost.title }}</p>
              </div>
            </NuxtLink>
          </div>
          <div class="flex gap-8">
            <NuxtLink 
              v-if="nextPost"
              :to="`/posts/${nextPost.id}`"
              class="group flex items-center gap-4 text-slate-600 hover:text-blue-600 transition-all"
            >
              <div class="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <span class="text-3xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <div class="text-right">
                <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">下一篇</p>
                <p class="font-bold text-lg">{{ nextPost.title }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="mt-16">
          <h3 class="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <span class="text-4xl">💬</span>
            评论
          </h3>
          <div class="card-gradient p-16 text-center relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
            <div class="relative z-10">
              <div class="text-8xl mb-6">💬</div>
              <p class="text-slate-300 text-xl mb-4">评论功能开发中...</p>
              <p class="text-slate-400">欢迎回来查看更新！</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/stores/post'

const route = useRoute()
const postStore = usePostStore()

const postId = computed(() => parseInt(route.params.id as string))
const { posts, isLoading } = storeToRefs(postStore)

const post = computed(() => {
  return postStore.getPostById(postId.value)
})

const prevPost = computed(() => {
  const currentIndex = posts.value.findIndex(p => p.id === postId.value)
  if (currentIndex > 0) {
    return posts.value[currentIndex - 1]
  }
  return null
})

const nextPost = computed(() => {
  const currentIndex = posts.value.findIndex(p => p.id === postId.value)
  if (currentIndex < posts.value.length - 1) {
    return posts.value[currentIndex + 1]
  }
  return null
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(() => {
  if (postId.value) {
    postStore.fetchPostById(postId.value)
  }
})
</script>
