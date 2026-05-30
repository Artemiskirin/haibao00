export const questions = [
  {
    id: 1,
    dimension: '表达能力',
    question: '如果让你在10个人面前分享一个观点：',
    options: [
      { text: '非常兴奋', score: { social: 3, emotional: 2, voice: 2, creative: 1, talent: 2 } },
      { text: '可以接受', score: { social: 2, emotional: 2, voice: 2, creative: 1, talent: 2 } },
      { text: '有点紧张', score: { social: 1, emotional: 1, voice: 1, creative: 1, talent: 1 } },
      { text: '非常抗拒', score: { social: 0, emotional: 0, voice: 0, creative: 0, talent: 0 } }
    ]
  },
  {
    id: 2,
    dimension: '表达能力',
    question: '朋友圈发言频率：',
    options: [
      { text: '经常', score: { social: 3, emotional: 2, voice: 1, creative: 1, talent: 2 } },
      { text: '偶尔', score: { social: 2, emotional: 2, voice: 1, creative: 1, talent: 1 } },
      { text: '很少', score: { social: 1, emotional: 1, voice: 1, creative: 2, talent: 1 } },
      { text: '几乎不发', score: { social: 0, emotional: 0, voice: 0, creative: 1, talent: 0 } }
    ]
  },
  {
    id: 3,
    dimension: '社交能力',
    question: '面对陌生人：',
    options: [
      { text: '很快熟络', score: { social: 3, emotional: 2, voice: 1, creative: 0, talent: 1 } },
      { text: '慢慢熟络', score: { social: 2, emotional: 2, voice: 2, creative: 1, talent: 1 } },
      { text: '偏安静', score: { social: 1, emotional: 2, voice: 2, creative: 2, talent: 1 } },
      { text: '不主动交流', score: { social: 0, emotional: 1, voice: 1, creative: 2, talent: 0 } }
    ]
  },
  {
    id: 4,
    dimension: '社交能力',
    question: '聚会时你通常：',
    options: [
      { text: '气氛担当', score: { social: 3, emotional: 1, voice: 2, creative: 0, talent: 3 } },
      { text: '参与聊天', score: { social: 2, emotional: 2, voice: 2, creative: 1, talent: 2 } },
      { text: '安静倾听', score: { social: 1, emotional: 3, voice: 1, creative: 2, talent: 1 } },
      { text: '想早点回家', score: { social: 0, emotional: 1, voice: 1, creative: 2, talent: 0 } }
    ]
  },
  {
    id: 5,
    dimension: '兴趣偏好',
    question: '最关注哪类内容：',
    options: [
      { text: '娱乐搞笑', score: { social: 3, emotional: 1, voice: 1, creative: 1, talent: 2 } },
      { text: '情感故事', score: { social: 1, emotional: 3, voice: 2, creative: 1, talent: 1 } },
      { text: '游戏动漫', score: { social: 1, emotional: 1, voice: 1, creative: 3, talent: 1 } },
      { text: '音乐才艺', score: { social: 1, emotional: 2, voice: 3, creative: 1, talent: 3 } }
    ]
  },
  {
    id: 6,
    dimension: '兴趣偏好',
    question: '平时刷短视频最常停留：',
    options: [
      { text: '直播间', score: { social: 3, emotional: 2, voice: 1, creative: 0, talent: 2 } },
      { text: '情感内容', score: { social: 1, emotional: 3, voice: 2, creative: 1, talent: 1 } },
      { text: '二次元内容', score: { social: 1, emotional: 1, voice: 1, creative: 3, talent: 1 } },
      { text: '才艺内容', score: { social: 1, emotional: 1, voice: 3, creative: 1, talent: 3 } }
    ]
  },
  {
    id: 7,
    dimension: '声音与表现力',
    question: '别人评价你的声音：',
    options: [
      { text: '很有感染力', score: { social: 2, emotional: 2, voice: 3, creative: 1, talent: 2 } },
      { text: '比较舒服', score: { social: 1, emotional: 2, voice: 3, creative: 1, talent: 2 } },
      { text: '普通', score: { social: 1, emotional: 1, voice: 2, creative: 1, talent: 1 } },
      { text: '不太自信', score: { social: 0, emotional: 1, voice: 1, creative: 1, talent: 0 } }
    ]
  },
  {
    id: 8,
    dimension: '声音与表现力',
    question: '如果不露脸赚钱：',
    options: [
      { text: '非常愿意', score: { social: 1, emotional: 2, voice: 3, creative: 2, talent: 1 } },
      { text: '可以尝试', score: { social: 1, emotional: 2, voice: 2, creative: 2, talent: 1 } },
      { text: '看情况', score: { social: 1, emotional: 1, voice: 1, creative: 1, talent: 1 } },
      { text: '不感兴趣', score: { social: 1, emotional: 0, voice: 0, creative: 0, talent: 2 } }
    ]
  },
  {
    id: 9,
    dimension: '执行力',
    question: '坚持一件事情30天：',
    options: [
      { text: '非常容易', score: { social: 2, emotional: 2, voice: 2, creative: 2, talent: 3 } },
      { text: '可以坚持', score: { social: 2, emotional: 2, voice: 2, creative: 2, talent: 2 } },
      { text: '偶尔放弃', score: { social: 1, emotional: 1, voice: 1, creative: 1, talent: 1 } },
      { text: '很难坚持', score: { social: 0, emotional: 1, voice: 1, creative: 1, talent: 0 } }
    ]
  },
  {
    id: 10,
    dimension: '执行力',
    question: '面对新机会：',
    options: [
      { text: '马上尝试', score: { social: 3, emotional: 2, voice: 2, creative: 2, talent: 3 } },
      { text: '了解后尝试', score: { social: 2, emotional: 2, voice: 2, creative: 2, talent: 2 } },
      { text: '观望', score: { social: 1, emotional: 1, voice: 1, creative: 2, talent: 1 } },
      { text: '拒绝尝试', score: { social: 0, emotional: 0, voice: 0, creative: 1, talent: 0 } }
    ]
  },
  {
    id: 11,
    dimension: '变现意愿',
    question: '如果学习一个技能能获得额外收入：',
    options: [
      { text: '立即学习', score: { social: 2, emotional: 2, voice: 2, creative: 2, talent: 3 } },
      { text: '愿意尝试', score: { social: 2, emotional: 2, voice: 2, creative: 2, talent: 2 } },
      { text: '看情况', score: { social: 1, emotional: 1, voice: 1, creative: 1, talent: 1 } },
      { text: '不考虑', score: { social: 0, emotional: 0, voice: 0, creative: 1, talent: 0 } }
    ]
  },
  {
    id: 12,
    dimension: '变现意愿',
    question: '未来是否希望拥有副业收入：',
    options: [
      { text: '非常希望', score: { social: 3, emotional: 2, voice: 2, creative: 2, talent: 3 } },
      { text: '希望', score: { social: 2, emotional: 2, voice: 2, creative: 2, talent: 2 } },
      { text: '一般', score: { social: 1, emotional: 1, voice: 1, creative: 1, talent: 1 } },
      { text: '不需要', score: { social: 0, emotional: 0, voice: 0, creative: 1, talent: 0 } }
    ]
  }
]

export const personalityTypes = {
  social: {
    name: '社交互动型',
    career: '娱乐直播',
    description: '擅长聊天互动，气氛感强',
    icon: '🎉',
    color: '#f472b6'
  },
  emotional: {
    name: '情绪陪伴型',
    career: '聊天主播',
    description: '共情能力强，用户粘性高',
    icon: '💗',
    color: '#fb7185'
  },
  voice: {
    name: '声音感染型',
    career: '语音厅',
    description: '声音有特色，适合不露脸',
    icon: '🎙️',
    color: '#a78bfa'
  },
  creative: {
    name: '二次元创作型',
    career: '虚拟主播',
    description: '想象力丰富，喜欢二次元文化',
    icon: '🌸',
    color: '#c084fc'
  },
  talent: {
    name: '才艺展示型',
    career: '才艺主播',
    description: '表现欲强，适合唱歌舞蹈乐器',
    icon: '✨',
    color: '#f59e0b'
  }
}

export const growthRoadmap = [
  { stage: '大学生', desc: '从零开始认知自媒体' },
  { stage: '内容表达训练', desc: '提升镜头感和表达能力' },
  { stage: '账号定位', desc: '找准人设和内容方向' },
  { stage: '内容创作', desc: '持续输出优质内容' },
  { stage: '直播变现', desc: '开启直播获得收入' },
  { stage: '个人IP', desc: '打造个人品牌影响力' }
]