<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
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
</script>
