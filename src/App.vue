<script setup>
import { ref, provide } from 'vue'
import LandingPage from './components/LandingPage.vue'
import QuizPage from './components/QuizPage.vue'
import ResultPage from './components/ResultPage.vue'

const currentPage = ref('landing')
const quizResult = ref(null)
const userAnswers = ref([])

const startQuiz = () => {
  currentPage.value = 'quiz'
}

const finishQuiz = (result, answers) => {
  quizResult.value = result
  userAnswers.value = answers
  currentPage.value = 'result'
}

const restartQuiz = () => {
  currentPage.value = 'landing'
  quizResult.value = null
  userAnswers.value = []
}

provide('quizResult', quizResult)
provide('restartQuiz', restartQuiz)
</script>

<template>
  <div class="min-h-screen min-h-[100dvh] bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
    <LandingPage v-if="currentPage === 'landing'" @start="startQuiz" />
    <QuizPage v-else-if="currentPage === 'quiz'" @finish="finishQuiz" />
    <ResultPage v-else-if="currentPage === 'result'" :result="quizResult" :answers="userAnswers" @restart="restartQuiz" />
  </div>
</template>