<template>
  <footer class="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-16 relative overflow-hidden dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="text-center md:text-left">
          <p class="text-2xl font-bold mb-3">&copy; {{ currentYear }} {{ siteConfig.title }}</p>
          <p class="text-slate-400 text-lg dark:text-slate-500">All rights reserved</p>
        </div>
        
        <div class="flex items-center gap-5">
          <a 
            v-for="social in siteConfig.socialLinks" 
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="w-14 h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 transition-all font-bold dark:from-blue-700 dark:via-purple-700 dark:to-pink-700"
          >
            {{ social.name.substring(0, 2) }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const siteStore = useSiteStore()
const siteConfig = computed(() => siteStore.config)
const currentYear = new Date().getFullYear()
</script>
