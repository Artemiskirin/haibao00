<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { questions } from '../data/questions.js'

const emit = defineEmits(['finish'])

const currentQuestionIndex = ref(0)
const selectedAnswers = ref({})
const timeLeft = ref(15)
const isAnimating = ref(false)
const questionVisible = ref(true)

let timerInterval = null

const currentQuestion = computed(() => questions[currentQuestionIndex.value])
const progress = computed(() => ((currentQuestionIndex.value) / questions.length) * 100)
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.length - 1)
const canProceed = computed(() => selectedAnswers.value[currentQuestionIndex.value] !== undefined)

const startTimer = () => {
  timeLeft.value = 15
  timerInterval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timerInterval)
    }
  }, 1000)
}

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

const selectAnswer = (optionIndex) => {
  selectedAnswers.value[currentQuestionIndex.value] = optionIndex
}

const goNext = () => {
  if (!canProceed.value) return
  
  stopTimer()
  isAnimating.value = true
  
  setTimeout(() => {
    questionVisible.value = false
    
    setTimeout(() => {
      if (isLastQuestion.value) {
        calculateResult()
      } else {
        currentQuestionIndex.value++
        questionVisible.value = true
        startTimer()
      }
      isAnimating.value = false
    }, 300)
  }, 200)
}

const calculateResult = () => {
  const scores = {
    social: 0,
    emotional: 0,
    voice: 0,
    creative: 0,
    talent: 0
  }
  
  questions.forEach((question, qIndex) => {
    const answerIndex = selectedAnswers.value[qIndex]
    if (answerIndex !== undefined) {
      const option = question.options[answerIndex]
      scores.social += option.score.social
      scores.emotional += option.score.emotional
      scores.voice += option.score.voice
      scores.creative += option.score.creative
      scores.talent += option.score.talent
    }
  })
  
  const sortedTypes = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([type, score]) => ({ type, score }))
  
  const totalScore = sortedTypes.reduce((sum, item) => sum + item.score, 0)
  const maxPossibleScore = questions.length * 3
  const talentIndex = Math.round((totalScore / maxPossibleScore) * 100)
  
  const randomPercent = Math.floor(Math.random() * 29) + 70
  
  const result = {
    talentIndex,
   超越同龄人: randomPercent,
    topTypes: sortedTypes.slice(0, 3).map((item, index) => ({
      rank: index + 1,
      type: item.type,
      matchPercent: Math.min(95, Math.round(60 + (item.score / (questions.length * 3)) * 35))
    })),
    allScores: scores
  }
  
  localStorage.setItem('quizResult', JSON.stringify(result))
  localStorage.setItem('userAnswers', JSON.stringify(selectedAnswers.value))
  
  emit('finish', result, selectedAnswers.value)
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<template>
  <div class="min-h-screen min-h-[100dvh] flex flex-col px-5 py-6 safe-area-top safe-area-bottom">
    <div class="mb-6">
      <div class="flex items-center justify-between mb-3">
        <span class="text-white/60 text-sm">
          第 {{ currentQuestionIndex + 1 }} 题 / 共 {{ questions.length }} 题
        </span>
        <div class="flex items-center gap-2">
          <span 
            class="text-sm font-mono"
            :class="timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-purple-300'"
          >
            {{ timeLeft }}s
          </span>
        </div>
      </div>
      
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
      
      <div class="flex justify-center gap-1 mt-2">
        <div 
          v-for="i in questions.length" 
          :key="i"
          class="w-2 h-2 rounded-full transition-all duration-300"
          :class="i <= currentQuestionIndex + 1 ? 'bg-purple-500' : 'bg-white/20'"
        ></div>
      </div>
    </div>

    <div class="flex-1 flex flex-col justify-center">
      <transition name="slide" mode="out-in">
        <div v-if="questionVisible" :key="currentQuestionIndex" class="w-full max-w-md mx-auto">
          <div class="text-center mb-8">
            <span class="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs mb-4">
              {{ currentQuestion.dimension }}
            </span>
            <h2 class="text-2xl font-bold text-white leading-relaxed">
              {{ currentQuestion.question }}
            </h2>
          </div>

          <div class="space-y-3">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              @click="selectAnswer(index)"
              class="option-card text-left flex items-center gap-4"
              :class="{ 'selected': selectedAnswers[currentQuestionIndex] === index }"
            >
              <span 
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                :class="selectedAnswers[currentQuestionIndex] === index 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-white/60'"
              >
                {{ String.fromCharCode(65 + index) }}
              </span>
              <span class="text-white">{{ option.text }}</span>
            </button>
          </div>

          <button
            @click="goNext"
            :disabled="!canProceed"
            class="w-full mt-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            :class="canProceed 
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg active:scale-95' 
              : 'bg-white/10 text-white/30 cursor-not-allowed'"
          >
            {{ isLastQuestion ? '查看结果' : '下一题' }}
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>