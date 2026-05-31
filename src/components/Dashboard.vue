<script setup>
import { ref, computed, onMounted } from 'vue'

const submissions = ref([])
const filterType = ref('all')
const searchKeyword = ref('')
const sortBy = ref('time')
const sortOrder = ref('desc')
const isLoading = ref(false)

const filteredSubmissions = computed(() => {
  let result = [...submissions.value]
  
  if (filterType.value !== 'all') {
    result = result.filter(s => s.topType === filterType.value)
  }
  
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(s => 
      s.wechat.toLowerCase().includes(keyword) ||
      s.school.toLowerCase().includes(keyword)
    )
  }
  
  result.sort((a, b) => {
    const order = sortOrder.value === 'desc' ? -1 : 1
    if (sortBy.value === 'time') {
      return (new Date(b.submitTime) - new Date(a.submitTime)) * order
    }
    if (sortBy.value === 'score') {
      return (b.talentIndex - a.talentIndex) * order
    }
    return 0
  })
  
  return result
})

const statistics = computed(() => {
  if (submissions.value.length === 0) {
    return {
      total: 0,
      avgScore: 0,
      topType: '-',
      schoolCount: 0
    }
  }
  
  const totalScore = submissions.value.reduce((sum, s) => sum + s.talentIndex, 0)
  const schools = new Set(submissions.value.map(s => s.school))
  const typeCount = {}
  
  submissions.value.forEach(s => {
    typeCount[s.topType] = (typeCount[s.topType] || 0) + 1
  })
  
  const topTypeEntry = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]
  
  return {
    total: submissions.value.length,
    avgScore: Math.round(totalScore / submissions.value.length),
    topType: topTypeEntry ? `${topTypeEntry[0]} (${topTypeEntry[1]}人)` : '-',
    schoolCount: schools.size
  }
})

const personalityTypes = {
  social: { name: '社交互动型', icon: '🎉', color: '#f472b6' },
  emotional: { name: '情绪陪伴型', icon: '💗', color: '#fb7185' },
  voice: { name: '声音感染型', icon: '🎙️', color: '#a78bfa' },
  creative: { name: '二次元创作型', icon: '🌸', color: '#c084fc' },
  talent: { name: '才艺展示型', icon: '✨', color: '#f59e0b' }
}

const loadData = () => {
  isLoading.value = true
  
  const stored = localStorage.getItem('submittedForms')
  if (stored) {
    try {
      submissions.value = JSON.parse(stored)
    } catch (e) {
      submissions.value = []
    }
  }
  
  isLoading.value = false
}

const exportCSV = () => {
  const headers = ['序号', '微信号', '手机号', '学校', '年级', '天赋指数', 'TOP1类型', 'TOP2类型', 'TOP3类型', '提交时间']
  const rows = filteredSubmissions.value.map((s, i) => [
    i + 1,
    s.wechat,
    s.phone || '',
    s.school,
    s.grade,
    s.talentIndex,
    s.topType || '',
    s.secondType || '',
    s.thirdType || '',
    s.submitTime
  ])
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n')
  
  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `测评数据_${new Date().toISOString().split('T')[0]}.csv`
  link.click()
}

const clearData = () => {
  if (confirm('确定要清空所有数据吗？此操作不可恢复！')) {
    localStorage.removeItem('submittedForms')
    submissions.value = []
  }
}

const toggleSort = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
  } else {
    sortBy.value = field
    sortOrder.value = 'desc'
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="min-h-screen min-h-[100dvh] bg-gray-900 text-white">
    <div class="max-w-6xl mx-auto px-4 py-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">📊 数据仪表盘</h1>
        <button 
          @click="$emit('back')"
          class="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          返回测评
        </button>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="card-glass p-4">
          <p class="text-white/60 text-sm">总提交数</p>
          <p class="text-3xl font-bold text-gradient">{{ statistics.total }}</p>
        </div>
        <div class="card-glass p-4">
          <p class="text-white/60 text-sm">平均天赋指数</p>
          <p class="text-3xl font-bold text-gradient">{{ statistics.avgScore }}</p>
        </div>
        <div class="card-glass p-4">
          <p class="text-white/60 text-sm">热门类型</p>
          <p class="text-lg font-bold text-purple-300 truncate">{{ statistics.topType }}</p>
        </div>
        <div class="card-glass p-4">
          <p class="text-white/60 text-sm">覆盖学校数</p>
          <p class="text-3xl font-bold text-gradient">{{ statistics.schoolCount }}</p>
        </div>
      </div>
      
      <div class="card-glass p-4 mb-6">
        <h2 class="text-lg font-semibold mb-4">测评链接与二维码</h2>
        <div class="flex flex-col md:flex-row items-center gap-4">
          <div class="flex-1 w-full">
            <p class="text-white/60 text-sm mb-2">分享链接：</p>
            <div class="flex gap-2">
              <input 
                type="text" 
                readonly 
                value="https://haibao00.vercel.app"
                class="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm"
              />
              <button 
                @click="() => { navigator.clipboard.writeText('https://haibao00.vercel.app'); alert('已复制！') }"
                class="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition text-sm"
              >
                复制
              </button>
            </div>
          </div>
          <div class="text-center">
            <p class="text-white/60 text-sm mb-2">扫码分享：</p>
            <img 
              src="/share-qrcode.png" 
              alt="分享二维码" 
              class="w-32 h-32 mx-auto rounded-lg"
            />
            <a 
              href="/share-qrcode.png" 
              download="测评二维码.png"
              class="text-purple-300 text-sm hover:text-purple-200 mt-2 inline-block"
            >
              下载二维码
            </a>
          </div>
        </div>
      </div>
      
      <div class="card-glass p-4 mb-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2 class="text-lg font-semibold">提交记录</h2>
          
          <div class="flex flex-wrap gap-2">
            <select 
              v-model="filterType"
              class="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm"
            >
              <option value="all">全部类型</option>
              <option v-for="(type, key) in personalityTypes" :key="key" :value="key">
                {{ type.icon }} {{ type.name }}
              </option>
            </select>
            
            <input 
              v-model="searchKeyword"
              placeholder="搜索微信号/学校"
              class="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm w-40"
            />
            
            <button 
              @click="exportCSV"
              :disabled="submissions.length === 0"
              class="px-4 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 transition text-sm disabled:opacity-50"
            >
              📥 导出CSV
            </button>
            
            <button 
              @click="clearData"
              :disabled="submissions.length === 0"
              class="px-4 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition text-sm disabled:opacity-50"
            >
              🗑️ 清空
            </button>
          </div>
        </div>
        
        <div v-if="isLoading" class="text-center py-8 text-white/60">
          加载中...
        </div>
        
        <div v-else-if="submissions.length === 0" class="text-center py-8 text-white/60">
          暂无提交数据
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-white/60 border-b border-white/10">
                <th class="py-3 px-2 font-medium">序号</th>
                <th class="py-3 px-2 font-medium">微信号</th>
                <th class="py-3 px-2 font-medium">学校</th>
                <th class="py-3 px-2 font-medium">年级</th>
                <th 
                  class="py-3 px-2 font-medium cursor-pointer hover:text-white"
                  @click="toggleSort('score')"
                >
                  天赋指数 {{ sortBy === 'score' ? (sortOrder === 'desc' ? '↓' : '↑') : '' }}
                </th>
                <th class="py-3 px-2 font-medium">TOP1类型</th>
                <th 
                  class="py-3 px-2 font-medium cursor-pointer hover:text-white"
                  @click="toggleSort('time')"
                >
                  提交时间 {{ sortBy === 'time' ? (sortOrder === 'desc' ? '↓' : '↑') : '' }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(s, i) in filteredSubmissions" 
                :key="i"
                class="border-b border-white/5 hover:bg-white/5"
              >
                <td class="py-3 px-2 text-white/60">{{ i + 1 }}</td>
                <td class="py-3 px-2">{{ s.wechat }}</td>
                <td class="py-3 px-2">{{ s.school }}</td>
                <td class="py-3 px-2">{{ s.grade }}</td>
                <td class="py-3 px-2">
                  <span class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">
                    {{ s.talentIndex }}分
                  </span>
                </td>
                <td class="py-3 px-2">
                  <span 
                    class="px-2 py-0.5 rounded text-sm"
                    :style="{ backgroundColor: (personalityTypes[s.topType]?.color || '#666') + '20', color: personalityTypes[s.topType]?.color || '#fff' }"
                  >
                    {{ personalityTypes[s.topType]?.icon }} {{ personalityTypes[s.topType]?.name || s.topType }}
                  </span>
                </td>
                <td class="py-3 px-2 text-white/60 text-xs">
                  {{ new Date(s.submitTime).toLocaleString('zh-CN') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="card-glass p-4">
        <h2 class="text-lg font-semibold mb-4">类型分布</h2>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div 
            v-for="(type, key) in personalityTypes" 
            :key="key"
            class="p-3 rounded-xl text-center"
            :style="{ backgroundColor: type.color + '15', border: `1px solid ${type.color}30` }"
          >
            <span class="text-2xl">{{ type.icon }}</span>
            <p class="text-sm font-medium mt-1" :style="{ color: type.color }">{{ type.name }}</p>
            <p class="text-xs text-white/60 mt-1">
              {{ submissions.filter(s => s.topType === key).length }}人
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-glass {
  @apply bg-white/5 backdrop-blur-lg rounded-xl border border-white/10;
}
</style>