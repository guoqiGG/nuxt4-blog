<template>
  <header class="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-slate-100 transition-all duration-300 dark:bg-slate-900/90 dark:border-slate-800">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-24">
        <NuxtLink to="/" class="text-3xl md:text-4xl font-bold text-slate-900 hover:text-blue-600 transition-all transform hover:scale-105 dark:text-white">
          {{ siteConfig.title }}
        </NuxtLink>
        
        <nav class="hidden md:flex items-center space-x-2">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="px-6 py-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all font-semibold dark:text-slate-300 dark:hover:bg-slate-800"
            active-class="text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20 dark:bg-gradient-to-r dark:from-blue-700 dark:to-purple-700"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center space-x-4">
          <button 
            @click="toggleTheme"
            class="p-3 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 transition-all transform hover:scale-110 dark:bg-slate-800 dark:hover:bg-blue-700"
            title="切换主题"
          >
            <span v-if="isDark" class="text-2xl">☀️</span>
            <span v-else class="text-2xl">🌙</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const siteStore = useSiteStore()
const siteConfig = computed(() => siteStore.config)
const isDark = computed({
  get: () => siteStore.isDark,
  set: (value) => siteStore.setTheme(value ? 'dark' : 'light'),
})

const navItems = [
  { label: '首页', path: '/' },
  { label: '文章', path: '/posts' },
  { label: '关于', path: '/about' },
  { label: '联系', path: '/contact' },
]

const toggleTheme = () => {
  siteStore.toggleTheme()
}
</script>
