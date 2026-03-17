<template>
  <div class="flex flex-col md:flex-row">
    <aside class="w-full md:w-64 mb-6 md:mb-0 md:mr-6">
      <Sidebar />
    </aside>
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/layout/Sidebar.vue'
</script>
