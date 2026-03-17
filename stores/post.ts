import { defineStore } from 'pinia'

interface Post {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
  category: string
  tags: string[]
  views: number
  status: 'published' | 'draft'
}

export const usePostStore = defineStore('post', {
  state: (): { posts: Post[]; currentPost: Post | null; isLoading: boolean } => ({
    posts: [],
    currentPost: null,
    isLoading: false,
  }),

  getters: {
    publishedPosts: (state) => state.posts.filter(post => post.status === 'published'),
    getPostById: (state) => (id: number) => state.posts.find(post => post.id === id),
    getPostsByCategory: (state) => (category: string) => 
      state.posts.filter(post => post.category === category),
  },

  actions: {
    async fetchPosts() {
      this.isLoading = true
      try {
        const data = await $fetch('/api/posts')
        this.posts = data
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        this.posts = this.getMockPosts()
      } finally {
        this.isLoading = false
      }
    },

    async fetchPostById(id: number) {
      this.isLoading = true
      try {
        const data = await $fetch(`/api/posts/${id}`)
        this.currentPost = data
      } catch (error) {
        console.error(`Failed to fetch post ${id}:`, error)
        this.currentPost = this.getMockPosts().find(post => post.id === id) || null
      } finally {
        this.isLoading = false
      }
    },

    getMockPosts(): Post[] {
      return [
        {
          id: 1,
          title: 'Nuxt 4 入门指南',
          excerpt: '本文将带你快速入门 Nuxt 4，了解其核心概念和基本用法',
          content: 'Nuxt 4 是 Vue 生态系统中最强大的框架之一...（文章内容）',
          author: '开发者',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
          category: '前端开发',
          tags: ['Nuxt', 'Vue', 'SSR'],
          views: 1234,
          status: 'published',
        },
        {
          id: 2,
          title: 'Vue 3 组合式 API 实践',
          excerpt: '深入理解 Vue 3 的组合式 API，掌握其最佳实践',
          content: 'Vue 3 的组合式 API 提供了更灵活的代码组织方式...（文章内容）',
          author: '开发者',
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-10T10:00:00Z',
          category: '前端开发',
          tags: ['Vue', 'Composition API'],
          views: 987,
          status: 'published',
        },
        {
          id: 3,
          title: 'TypeScript 类型系统详解',
          excerpt: '全面了解 TypeScript 的类型系统，提升代码质量',
          content: 'TypeScript 是 JavaScript 的超集，提供了强大的类型系统...（文章内容）',
          author: '开发者',
          createdAt: '2024-01-05T10:00:00Z',
          updatedAt: '2024-01-05T10:00:00Z',
          category: '前端开发',
          tags: ['TypeScript', 'JavaScript'],
          views: 1567,
          status: 'published',
        },
      ]
    },
  },
})
