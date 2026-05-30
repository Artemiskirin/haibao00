<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['start'])
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const handleStart = () => {
  emit('start')
}
</script>

<template>
  <div class="min-h-screen min-h-[100dvh] flex flex-col px-5 py-8 safe-area-top safe-area-bottom">
    <div class="flex-1 flex flex-col justify-center items-center text-center">
      <transition name="fade-up">
        <div v-if="isVisible" class="w-full max-w-md">
          <div class="mb-8 animate-float">
            <div class="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl">
              <span class="text-6xl">🎯</span>
            </div>
          </div>

          <h1 class="text-3xl font-bold mb-3">
            <span class="text-gradient">大学生自媒体</span>
            <br />
            <span class="text-white">职业潜力测评</span>
          </h1>

          <p class="text-lg text-purple-200 mb-8">
            3分钟测出你的自媒体天赋与未来发展方向
          </p>

          <div class="card-glass p-5 mb-8 text-left">
            <p class="text-purple-200 mb-4 text-left">你是否也想知道：</p>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <span class="text-green-400 text-xl">✓</span>
                <span class="text-white/90">自己适不适合做自媒体？</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-green-400 text-xl">✓</span>
                <span class="text-white/90">更适合露脸、声音还是虚拟形象？</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-green-400 text-xl">✓</span>
                <span class="text-white/90">哪种内容赛道最适合自己？</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-green-400 text-xl">✓</span>
                <span class="text-white/90">有没有通过内容创作获得副业收入的潜力？</span>
              </div>
            </div>
          </div>

          <div class="card-glass p-5 mb-8">
            <p class="text-purple-200 mb-4 text-left">完成测评后获得：</p>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-white/5 rounded-xl p-3 text-center">
                <span class="text-2xl mb-1 block">📊</span>
                <span class="text-sm text-white/80">自媒体天赋指数</span>
              </div>
              <div class="bg-white/5 rounded-xl p-3 text-center">
                <span class="text-2xl mb-1 block">🎯</span>
                <span class="text-sm text-white/80">最适合的内容赛道</span>
              </div>
              <div class="bg-white/5 rounded-xl p-3 text-center">
                <span class="text-2xl mb-1 block">👤</span>
                <span class="text-sm text-white/80">人设定位分析</span>
              </div>
              <div class="bg-white/5 rounded-xl p-3 text-center">
                <span class="text-2xl mb-1 block">🗣️</span>
                <span class="text-sm text-white/80">表达能力分析</span>
              </div>
              <div class="bg-white/5 rounded-xl p-3 text-center">
                <span class="text-2xl mb-1 block">💰</span>
                <span class="text-sm text-white/80">内容变现潜力分析</span>
              </div>
              <div class="bg-white/5 rounded-xl p-3 text-center">
                <span class="text-2xl mb-1 block">🗺️</span>
                <span class="text-sm text-white/80">专属成长路线图</span>
              </div>
            </div>
          </div>

          <button @click="handleStart" class="btn-primary mb-6">
            立即测评
          </button>

          <div class="flex items-center justify-center gap-2 text-purple-300 text-sm">
            <span class="text-yellow-400">⭐</span>
            <span>已有很多大学生完成测评并获得专属报告</span>
          </div>
        </div>
      </transition>
    </div>

    <div class="w-full text-center py-4">
      <p class="text-white/30 text-xs">© 2024 大学生自媒体潜力测评</p>
    </div>
  </div>
</template>

<style scoped>
.fade-up-enter-active {
  transition: all 0.6s ease-out;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>