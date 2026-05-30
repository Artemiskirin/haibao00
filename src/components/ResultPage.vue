<script setup>
import { ref, computed, onMounted } from 'vue'
import { personalityTypes, growthRoadmap } from '../data/questions.js'

const props = defineProps({
  result: {
    type: Object,
    required: true
  },
  answers: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['restart'])

const showForm = ref(false)
const formData = ref({
  wechat: '',
  phone: '',
  school: '',
  grade: ''
})
const formSubmitted = ref(false)
const isSubmitting = ref(false)

const topType = computed(() => {
  if (!props.result || !props.result.topTypes || !props.result.topTypes[0]) return null
  return personalityTypes[props.result.topTypes[0].type]
})

const secondType = computed(() => {
  if (!props.result || !props.result.topTypes || !props.result.topTypes[1]) return null
  return personalityTypes[props.result.topTypes[1].type]
})

const thirdType = computed(() => {
  if (!props.result || !props.result.topTypes || !props.result.topTypes[2]) return null
  return personalityTypes[props.result.topTypes[2].type]
})

const topMatchPercent = computed(() => {
  return props.result?.topTypes?.[0]?.matchPercent || 0
})

const secondMatchPercent = computed(() => {
  return props.result?.topTypes?.[1]?.matchPercent || 0
})

const thirdMatchPercent = computed(() => {
  return props.result?.topTypes?.[2]?.matchPercent || 0
})

const validateForm = () => {
  if (!formData.value.wechat.trim()) {
    alert('请输入微信号')
    return false
  }
  if (!formData.value.school.trim()) {
    alert('请输入学校')
    return false
  }
  if (!formData.value.grade.trim()) {
    alert('请输入年级')
    return false
  }
  return true
}

const submitForm = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const submitData = {
    ...formData.value,
    result: props.result,
    submitTime: new Date().toISOString()
  }
  
  localStorage.setItem('submittedForm', JSON.stringify(submitData))
  
  isSubmitting.value = false
  formSubmitted.value = true
}

const handleShare = () => {
  if (navigator.share) {
    navigator.share({
    title: '大学生自媒体职业潜力测评',
    text: `我的自媒体天赋指数达到${props.result.talentIndex}分，超越${props.result.超越同龄人}%的同龄人！快来测测你的潜力吧！`,
    url: window.location.href
    })
  } else {
    alert('请长按保存图片或截图分享')
  }
}
</script>

<template>
  <div class="min-h-screen min-h-[100dvh] flex flex-col px-5 py-6 safe-area-top safe-area-bottom overflow-y-auto">
    <div v-if="!formSubmitted" class="flex-1 space-y-6">
      <div class="text-center pt-4 pb-2">
        <h1 class="text-2xl font-bold text-white mb-2">测评完成！</h1>
        <p class="text-purple-300 text-sm">你的专属分析报告已生成</p>
      </div>

      <div class="card-glass p-6 text-center">
        <p class="text-purple-200 text-sm mb-2">你的自媒体天赋指数</p>
        <div class="relative inline-block">
          <span class="text-7xl font-bold text-gradient">{{ result.talentIndex }}</span>
          <span class="text-2xl text-purple-300 ml-1">分</span>
        </div>
        <div class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm">
          <span>🌟</span>
          <span>超过 {{ result.超越同龄人 }}% 的同龄大学生</span>
        </div>
      </div>

      <div class="card-glass p-6">
        <h3 class="text-lg font-semibold text-white mb-4 text-center">🎯 匹配方向 TOP3</h3>
        
        <div class="space-y-4">
          <div class="bg-white/5 rounded-2xl p-4 border-2 border-yellow-500/30">
            <div class="flex items-center gap-3 mb-2">
              <span class="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-sm">1</span>
              <div>
                <span class="text-xl">{{ topType?.icon }}</span>
                <span class="text-white font-semibold ml-2">{{ topType?.name }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-purple-300 text-sm">{{ topType?.career }}</span>
              <span class="text-green-400 font-bold">{{ topMatchPercent }}% 匹配</span>
            </div>
            <p class="text-white/60 text-xs mt-2">{{ topType?.description }}</p>
          </div>

          <div class="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div class="flex items-center gap-3 mb-2">
              <span class="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-sm">2</span>
              <div>
                <span class="text-xl">{{ secondType?.icon }}</span>
                <span class="text-white font-semibold ml-2">{{ secondType?.name }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-purple-300 text-sm">{{ secondType?.career }}</span>
              <span class="text-blue-400 font-bold">{{ secondMatchPercent }}% 匹配</span>
            </div>
            <p class="text-white/60 text-xs mt-2">{{ secondType?.description }}</p>
          </div>

          <div class="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div class="flex items-center gap-3 mb-2">
              <span class="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-sm">3</span>
              <div>
                <span class="text-xl">{{ thirdType?.icon }}</span>
                <span class="text-white font-semibold ml-2">{{ thirdType?.name }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-purple-300 text-sm">{{ thirdType?.career }}</span>
              <span class="text-purple-400 font-bold">{{ thirdMatchPercent }}% 匹配</span>
            </div>
            <p class="text-white/60 text-xs mt-2">{{ thirdType?.description }}</p>
          </div>
        </div>
      </div>

      <div class="card-glass p-6">
        <h3 class="text-lg font-semibold text-white mb-4 text-center">🗺️ 成长路线图</h3>
        
        <div class="relative">
          <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>
          
          <div class="space-y-4 relative">
            <div 
              v-for="(step, index) in growthRoadmap" 
              :key="index"
              class="flex items-center gap-4 pl-4"
            >
              <div class="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shrink-0 z-10">
                <span class="text-white text-xs font-semibold">{{ index + 1 }}</span>
              </div>
              <div class="flex-1 bg-white/5 rounded-xl p-3">
                <p class="text-white font-medium text-sm">{{ step.stage }}</p>
                <p class="text-white/50 text-xs">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-3 pb-4">
        <button @click="showForm = true" class="btn-primary">
          领取完整版分析报告
        </button>
        
        <button @click="handleShare" class="w-full py-3 px-6 rounded-full bg-white/10 border border-white/20 text-white font-medium">
          📤 分享给朋友
        </button>
        
        <button @click="$emit('restart')" class="w-full py-3 text-white/60 text-sm">
          重新测试
        </button>
      </div>
    </div>

    <transition name="fade">
      <div 
        v-if="showForm && !formSubmitted" 
        class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center z-50"
        @click.self="showForm = false"
      >
        <div class="w-full max-w-md bg-gray-900 rounded-t-3xl p-6 safe-area-bottom">
          <div class="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6"></div>
          
          <h3 class="text-xl font-bold text-white text-center mb-2">领取完整版报告</h3>
          <p class="text-white/60 text-sm text-center mb-6">留下联系方式，分析师将在24小时内为你生成专属报告</p>
          
          <div class="space-y-4">
            <div>
              <label class="text-white/80 text-sm mb-1 block">微信号 *</label>
              <input 
                v-model="formData.wechat"
                type="text"
                placeholder="请输入你的微信号"
                class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label class="text-white/80 text-sm mb-1 block">手机号（选填）</label>
              <input 
                v-model="formData.phone"
                type="tel"
                placeholder="请输入手机号"
                class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label class="text-white/80 text-sm mb-1 block">学校 *</label>
              <input 
                v-model="formData.school"
                type="text"
                placeholder="请输入你的学校"
                class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label class="text-white/80 text-sm mb-1 block">年级 *</label>
              <select 
                v-model="formData.grade"
                class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="" class="bg-gray-900">请选择年级</option>
                <option value="大一" class="bg-gray-900">大一</option>
                <option value="大二" class="bg-gray-900">大二</option>
                <option value="大三" class="bg-gray-900">大三</option>
                <option value="大四" class="bg-gray-900">大四</option>
                <option value="研一" class="bg-gray-900">研一</option>
                <option value="研二" class="bg-gray-900">研二</option>
                <option value="研三" class="bg-gray-900">研三</option>
              </select>
            </div>
          </div>
          
          <button 
            @click="submitForm"
            :disabled="isSubmitting"
            class="w-full mt-6 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            :class="isSubmitting 
              ? 'bg-purple-500/50 text-white/50' 
              : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'"
          >
            {{ isSubmitting ? '提交中...' : '立即领取' }}
          </button>
          
          <button 
            @click="showForm = false"
            class="w-full mt-3 py-3 text-white/60 text-sm"
          >
            稍后再说
          </button>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div 
        v-if="formSubmitted" 
        class="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-50"
      >
        <div class="text-center max-w-sm">
          <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
            <span class="text-5xl">✅</span>
          </div>
          
          <h2 class="text-2xl font-bold text-white mb-3">提交成功！</h2>
          
          <p class="text-purple-200 mb-8">
            你的专属报告已提交分析师生成，<br />
            请留意微信消息
          </p>
          
          <button 
            @click="formSubmitted = false; $emit('restart')"
            class="w-full py-4 rounded-full bg-white/10 border border-white/20 text-white font-medium"
          >
            完成
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>