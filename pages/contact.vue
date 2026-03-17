<template>
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h1 class="text-6xl font-bold text-slate-900 mb-6 text-gradient">联系我</h1>
      <p class="text-2xl text-slate-600">有任何问题或建议？欢迎随时联系我！</p>
    </div>
    
    <div class="card-gradient p-10 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
      <div class="relative z-10">
        <div class="grid lg:grid-cols-2 gap-12">
          <div class="space-y-8">
            <h2 class="text-3xl font-bold mb-6 flex items-center gap-4">
              <span class="text-4xl">📩</span>
              给我发消息
            </h2>
            <p class="text-slate-300 text-lg">
              如果你有任何问题或建议，欢迎通过表单联系我。我会尽快回复你！
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-bold mb-3 text-slate-300">姓名</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="input-field text-slate-900"
                  placeholder="你的姓名"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-bold mb-3 text-slate-300">邮箱</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="input-field text-slate-900"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label for="subject" class="block text-sm font-bold mb-3 text-slate-300">主题</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="input-field text-slate-900"
                  placeholder="消息主题"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-bold mb-3 text-slate-300">消息</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  class="input-field text-slate-900"
                  placeholder="你的消息..."
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full px-8 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xl"
              >
                {{ isSubmitting ? '发送中...' : '发送消息' }}
              </button>
            </form>
          </div>

          <div class="space-y-8">
            <h2 class="text-3xl font-bold mb-6 flex items-center gap-4">
              <span class="text-4xl">📞</span>
              其他联系方式
            </h2>
            
            <div class="space-y-6">
              <div class="flex items-start gap-5 p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <div class="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg shadow-purple-500/30">
                  📧
                </div>
                <div>
                  <h3 class="font-bold text-lg mb-1 text-white">邮箱</h3>
                  <p class="text-blue-200 text-xl">{{ siteConfig.email }}</p>
                </div>
              </div>

              <div class="flex items-start gap-5 p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <div class="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg shadow-purple-500/30">
                  🌐
                </div>
                <div>
                  <h3 class="font-bold text-lg mb-1 text-white">社交媒体</h3>
                  <div class="flex flex-wrap gap-3 mt-2">
                    <a 
                      v-for="social in siteConfig.socialLinks" 
                      :key="social.name"
                      :href="social.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 font-bold"
                    >
                      {{ social.name }}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-8 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl border border-white/20">
              <h3 class="font-bold text-lg mb-3 flex items-center gap-3">
                <span class="text-2xl">⚡</span>
                响应时间
              </h3>
              <p class="text-slate-300 text-lg leading-relaxed">
                我通常会在 24 小时内回复所有消息。如果您的问题比较紧急，请通过邮箱联系我。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const siteStore = useSiteStore()
const siteConfig = computed(() => siteStore.config)

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value,
    })
    
    alert('消息发送成功！我会尽快回复你。')
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
  } catch (error) {
    console.error('Failed to send message:', error)
    alert('发送失败，请稍后重试。')
  } finally {
    isSubmitting.value = false
  }
}
</script>
