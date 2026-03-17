<template>
  <div class="space-y-12">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
      <h1 class="text-5xl font-bold text-slate-900">所有文章</h1>
      <div class="flex flex-col sm:flex-row gap-4">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="搜索文章..."
          class="input-field flex-1 sm:w-80"
        />
        <select 
          v-model="selectedCategory"
          class="input-field"
        >
          <option value="">全部分类</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-24">
      <div class="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      <p class="mt-8 text-slate-600 text-xl font-medium">加载中...</p>
    </div>

    <div v-else-if="filteredPosts.length === 0" class="text-center py-24">
      <div class="text-8xl mb-6">🔍</div>
      <p class="text-slate-600 text-xl font-medium">暂无文章</p>
    </div>

    <div v-else class="space-y-6">
      <article 
        v-for="post in paginatedPosts" 
        :key="post.id"
        class="card cursor-pointer animate-scale-in"
        @click="navigateToPost(post.id)"
      >
        <div class="p-8 md:p-10">
          <div class="flex items-center gap-4 mb-5">
            <span class="badge">
              {{ post.category }}
            </span>
            <span class="text-slate-500 text-sm flex items-center gap-2">
              <span>📅</span>
              {{ formatDate(post.createdAt) }}
            </span>
            <span class="text-slate-500 text-sm flex items-center gap-2">
              <span>👁️</span>
              {{ post.views }} 阅读
            </span>
          </div>

          <h2 class="text-3xl font-bold text-slate-900 mb-5 hover:text-blue-600 transition-colors">
            {{ post.title }}
          </h2>

          <p class="text-slate-600 mb-8 line-clamp-3 leading-relaxed">
            {{ post.excerpt }}
          </p>

          <div class="flex items-center justify-between pt-8 border-t border-slate-200">
            <div class="flex flex-wrap gap-3">
              <span 
                v-for="tag in post.tags.slice(0, 3)" 
                :key="tag"
                class="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-lg text-sm hover:from-blue-100 hover:to-purple-100 hover:text-blue-600 transition-all cursor-default border border-slate-200"
              >
                #{{ tag }}
              </span>
            </div>
            <span class="text-blue-600 font-bold hover:text-purple-600 hover:underline flex items-center gap-2">
              阅读更多 <span class="text-xl">→</span>
            </span>
          </div>
        </div>
      </article>
    </div>

    <div v-if="filteredPosts.length > 0" class="flex justify-center mt-16">
      <nav class="flex items-center gap-3">
        <button 
          v-for="page in totalPages" 
          :key="page"
          @click="currentPage = page"
          class="w-14 h-14 flex items-center justify-center rounded-xl transition-all font-bold text-lg shadow-lg"
          :class="{
            'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-purple-500/40': currentPage === page,
            'bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600 hover:shadow-md': currentPage !== page
          }"
        >
          {{ page }}
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/stores/post'

const postStore = usePostStore()

const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

const { posts, isLoading } = storeToRefs(postStore)

const categories = computed(() => {
  const uniqueCategories = new Set(posts.value.map(post => post.category))
  return Array.from(uniqueCategories)
})

const filteredPosts = computed(() => {
  let result = posts.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    result = result.filter(post => post.category === selectedCategory.value)
  }

  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / itemsPerPage)
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredPosts.value.slice(start, start + itemsPerPage)
})

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
