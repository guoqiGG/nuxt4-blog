<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 dark:bg-slate-900 dark:text-slate-100">
    <Header />
    <main class="container mx-auto px-4 py-8">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
import { useSiteStore } from '~/stores/site'

const siteStore = useSiteStore()

// 初始化主题
onMounted(() => {
  siteStore.initTheme()
})
</script>
