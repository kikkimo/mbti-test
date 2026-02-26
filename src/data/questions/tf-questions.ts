import { Question } from '@/types';

// T/F Dimension - 36 questions total
// Main dimension: 18 questions
// 6 facets: 3 questions each (Logical, Reasonable, Candid, Authentic, Questioning, Critical)

const tfQuestions: Question[] = [
  // ===== MAIN DIMENSION QUESTIONS (18) =====
  {
    id: 'tf-001',
    dimension: 'TF',
    text: '做决定时，我更看重',
    options: [
      { value: 2, text: '逻辑和客观分析' },
      { value: 1, text: '偏向逻辑分析' },
      { value: 0, text: '视情况而定' },
      { value: -1, text: '个人价值观和感受' },
      { value: -2, text: '完全基于情感和价值观' }
    ]
  },
  {
    id: 'tf-002',
    dimension: 'TF',
    text: '当朋友遇到困难时，我通常会',
    options: [
      { value: 2, text: '提供解决方案和建议' },
      { value: 1, text: '偏向解决问题' },
      { value: 0, text: '不确定' },
      { value: -1, text: '先给予情感支持' },
      { value: -2, text: '只倾听和陪伴' }
    ]
  },
  {
    id: 'tf-003',
    dimension: 'TF',
    text: '我认为自己在争论中更倾向于',
    options: [
      { value: 2, text: '坚持真理，即使伤害感情' },
      { value: 1, text: '偏向真理' },
      { value: 0, text: '不确定' },
      { value: -1, text: '维护和谐关系' },
      { value: -2, text: '避免冲突，保持友好' }
    ]
  },
  {
    id: 'tf-004',
    dimension: 'TF',
    text: '我认为更重要的是',
    options: [
      { value: 2, text: '公平公正，一视同仁' },
      { value: 1, text: '偏向公平' },
      { value: 0, text: '不确定' },
      { value: -1, text: '关心他人感受' },
      { value: -2, text: '和谐关系最重要' }
    ]
  },
  {
    id: 'tf-005',
    dimension: 'TF',
    text: '在团队中，我更看重',
    options: [
      { value: 2, text: '效率和成果' },
      { value: 1, text: '偏向结果导向' },
      { value: 0, text: '不确定' },
      { value: -1, text: '团队氛围和感受' },
      { value: -2, text: '人际关系和和谐' }
    ]
  },
  {
    id: 'tf-006',
    dimension: 'TF',
    text: '面对他人的错误，我通常会',
    options: [
      { value: 2, text: '直接指出并纠正' },
      { value: 1, text: '偏向指出问题' },
      { value: 0, text: '不确定' },
      { value: -1, text: '委婉提醒' },
      { value: -2, text: '避免批评，怕伤害对方' }
    ]
  },
  {
    id: 'tf-007',
    dimension: 'TF',
    text: '我认为自己更偏向',
    options: [
      { value: 2, text: '理性分析型' },
      { value: 1, text: '较理性' },
      { value: 0, text: '不确定' },
      { value: -1, text: '情感感受型' },
      { value: -2, text: '非常感性' }
    ]
  },
  {
    id: 'tf-008',
    dimension: 'TF',
    text: '在评价他人时，我更关注',
    options: [
      { value: 2, text: '能力和表现' },
      { value: 1, text: '偏向能力' },
      { value: 0, text: '不确定' },
      { value: -1, text: '动机和品格' },
      { value: -2, text: '情感和感受' }
    ]
  },
  {
    id: 'tf-009',
    dimension: 'TF',
    text: '做重要决定时，我更依赖',
    options: [
      { value: 2, text: '客观事实和数据' },
      { value: 1, text: '偏向客观分析' },
      { value: 0, text: '不确定' },
      { value: -1, text: '个人价值观' },
      { value: -2, text: '直觉和感受' }
    ]
  },
  {
    id: 'tf-010',
    dimension: 'TF',
    text: '我认为社会应该更注重',
    options: [
      { value: 2, text: '规则和秩序' },
      { value: 1, text: '偏向规则' },
      { value: 0, text: '不确定' },
      { value: -1, text: '人情和关怀' },
      { value: -2, text: '人与人之间的情感' }
    ]
  },
  {
    id: 'tf-011',
    dimension: 'TF',
    text: '在工作中，我更注重',
    options: [
      { value: 2, text: '完成任务和达成目标' },
      { value: 1, text: '偏向目标导向' },
      { value: 0, text: '不确定' },
      { value: -1, text: '团队协作和感受' },
      { value: -2, text: '人际关系和氛围' }
    ]
  },
  {
    id: 'tf-012',
    dimension: 'TF',
    text: '面对不公正的事情，我通常会',
    options: [
      { value: 2, text: '立即指出并坚持改正' },
      { value: 1, text: '偏向坚持原则' },
      { value: 0, text: '不确定' },
      { value: -1, text: '考虑各方感受' },
      { value: -2, text: '避免冲突，保持和谐' }
    ]
  },
  {
    id: 'tf-013',
    dimension: 'TF',
    text: '我认为成功更取决于',
    options: [
      { value: 2, text: '能力和成就' },
      { value: 1, text: '偏向能力' },
      { value: 0, text: '不确定' },
      { value: -1, text: '人际关系和影响力' },
      { value: -2, text: '帮助他人和贡献' }
    ]
  },
  {
    id: 'tf-014',
    dimension: 'TF',
    text: '在讨论中，我更倾向于',
    options: [
      { value: 2, text: '分析利弊得失' },
      { value: 1, text: '偏向理性分析' },
      { value: 0, text: '不确定' },
      { value: -1, text: '关注各方感受' },
      { value: -2, text: '维护和谐关系' }
    ]
  },
  {
    id: 'tf-015',
    dimension: 'TF',
    text: '我认为批评应该',
    options: [
      { value: 2, text: '直接指出问题' },
      { value: 1, text: '偏向直接' },
      { value: 0, text: '不确定' },
      { value: -1, text: '考虑对方感受' },
      { value: -2, text: '委婉或避免批评' }
    ]
  },
  {
    id: 'tf-016',
    dimension: 'TF',
    text: '面对他人的情绪化反应，我通常会',
    options: [
      { value: 2, text: '理性分析，不跟随情绪' },
      { value: 1, text: '偏向冷静处理' },
      { value: 0, text: '不确定' },
      { value: -1, text: '理解和共情' },
      { value: -2, text: '被情绪影响，感同身受' }
    ]
  },
  {
    id: 'tf-017',
    dimension: 'TF',
    text: '我认为领导力更体现在',
    options: [
      { value: 2, text: '决策果断和逻辑清晰' },
      { value: 1, text: '偏向理性领导' },
      { value: 0, text: '不确定' },
      { value: -1, text: '关心团队成员' },
      { value: -2, text: '情感支持和激励' }
    ]
  },
  {
    id: 'tf-018',
    dimension: 'TF',
    text: '在复杂情况下，我更相信',
    options: [
      { value: 2, text: '逻辑推理和分析' },
      { value: 1, text: '偏向理性判断' },
      { value: 0, text: '不确定' },
      { value: -1, text: '直觉和价值观' },
      { value: -2, text: '内心感受和道德感' }
    ]
  },

  // ===== FACET: LOGICAL (逻辑 vs 情感) - 3 questions =====
  {
    id: 'tf-019',
    dimension: 'TF',
    facet: 'logical',
    text: '在处理问题时，我更倾向于',
    options: [
      { value: 2, text: '用逻辑分析每个细节' },
      { value: 1, text: '偏向逻辑思考' },
      { value: 0, text: '不确定' },
      { value: -1, text: '考虑人的因素和感受' },
      { value: -2, text: '完全基于情感和关系' }
    ]
  },
  {
    id: 'tf-020',
    dimension: 'TF',
    facet: 'logical',
    text: '当逻辑与情感冲突时，我通常',
    options: [
      { value: 2, text: '坚持逻辑，忽略情感' },
      { value: 1, text: '偏向逻辑' },
      { value: 0, text: '不确定' },
      { value: -1, text: '考虑情感因素' },
      { value: -2, text: '跟随情感，放弃逻辑' }
    ]
  },
  {
    id: 'tf-021',
    dimension: 'TF',
    facet: 'logical',
    text: '我认为好的决策应该基于',
    options: [
      { value: 2, text: '纯粹的逻辑和理性' },
      { value: 1, text: '偏向理性分析' },
      { value: 0, text: '不确定' },
      { value: -1, text: '考虑人情因素' },
      { value: -2, text: '情感和价值观' }
    ]
  },

  // ===== FACET: REASONABLE (理性 vs 同情) - 3 questions =====
  {
    id: 'tf-022',
    dimension: 'TF',
    facet: 'reasonable',
    text: '面对他人的困境，我第一反应是',
    options: [
      { value: 2, text: '分析原因和解决办法' },
      { value: 1, text: '偏向理性分析' },
      { value: 0, text: '不确定' },
      { value: -1, text: '理解和同情' },
      { value: -2, text: '感同身受，情绪共鸣' }
    ]
  },
  {
    id: 'tf-023',
    dimension: 'TF',
    facet: 'reasonable',
    text: '在帮助他人时，我更倾向于',
    options: [
      { value: 2, text: '提供实际解决方案' },
      { value: 1, text: '偏向解决问题' },
      { value: 0, text: '不确定' },
      { value: -1, text: '给予情感支持' },
      { value: -2, text: '陪伴和倾听' }
    ]
  },
  {
    id: 'tf-024',
    dimension: 'TF',
    facet: 'reasonable',
    text: '我认为真正的帮助是',
    options: [
      { value: 2, text: '提供理性的解决方案' },
      { value: 1, text: '偏向实际帮助' },
      { value: 0, text: '不确定' },
      { value: -1, text: '理解和关心' },
      { value: -2, text: '情感上的支持' }
    ]
  },

  // ===== FACET: CANDID (坦诚 vs 委婉) - 3 questions =====
  {
    id: 'tf-025',
    dimension: 'TF',
    facet: 'candid',
    text: '在表达意见时，我通常',
    options: [
      { value: 2, text: '直接坦诚，不绕弯子' },
      { value: 1, text: '偏向直接' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较委婉' },
      { value: -2, text: '非常含蓄，暗示为主' }
    ]
  },
  {
    id: 'tf-026',
    dimension: 'TF',
    facet: 'candid',
    text: '当需要拒绝他人时，我会',
    options: [
      { value: 2, text: '直接说明理由' },
      { value: 1, text: '偏向直接拒绝' },
      { value: 0, text: '不确定' },
      { value: -1, text: '委婉表达' },
      { value: -2, text: '含糊其辞，避免伤害' }
    ]
  },
  {
    id: 'tf-027',
    dimension: 'TF',
    facet: 'candid',
    text: '我认为沟通应该',
    options: [
      { value: 2, text: '坦诚直率，不说废话' },
      { value: 1, text: '偏向直接' },
      { value: 0, text: '不确定' },
      { value: -1, text: '考虑对方感受' },
      { value: -2, text: '委婉得体，避免冲突' }
    ]
  },

  // ===== FACET: AUTHENTIC (真实 vs 和谐) - 3 questions =====
  {
    id: 'tf-028',
    dimension: 'TF',
    facet: 'authentic',
    text: '在社交中，我更倾向于',
    options: [
      { value: 2, text: '保持真实，不做作' },
      { value: 1, text: '偏向真实' },
      { value: 0, text: '不确定' },
      { value: -1, text: '适当迎合他人' },
      { value: -2, text: '为了和谐而妥协' }
    ]
  },
  {
    id: 'tf-029',
    dimension: 'TF',
    facet: 'authentic',
    text: '当真实表达可能伤害关系时，我会',
    options: [
      { value: 2, text: '坚持真实表达' },
      { value: 1, text: '偏向真实' },
      { value: 0, text: '不确定' },
      { value: -1, text: '有所保留' },
      { value: -2, text: '为了和谐而隐瞒' }
    ]
  },
  {
    id: 'tf-030',
    dimension: 'TF',
    facet: 'authentic',
    text: '我认为人际交往中更重要',
    options: [
      { value: 2, text: '真实和诚实' },
      { value: 1, text: '偏向真实' },
      { value: 0, text: '不确定' },
      { value: -1, text: '和谐和融洽' },
      { value: -2, text: '关系和谐至上' }
    ]
  },

  // ===== FACET: QUESTIONING (质疑 vs 接纳) - 3 questions =====
  {
    id: 'tf-031',
    dimension: 'TF',
    facet: 'questioning',
    text: '面对新观点，我通常',
    options: [
      { value: 2, text: '质疑和分析其合理性' },
      { value: 1, text: '偏向批判性思考' },
      { value: 0, text: '不确定' },
      { value: -1, text: '持开放态度' },
      { value: -2, text: '完全接纳和相信' }
    ]
  },
  {
    id: 'tf-032',
    dimension: 'TF',
    facet: 'questioning',
    text: '对于权威的观点，我会',
    options: [
      { value: 2, text: '质疑并验证' },
      { value: 1, text: '偏向质疑' },
      { value: 0, text: '不确定' },
      { value: -1, text: '适度怀疑' },
      { value: -2, text: '倾向于相信' }
    ]
  },
  {
    id: 'tf-033',
    dimension: 'TF',
    facet: 'questioning',
    text: '我认为对待不同意见应该',
    options: [
      { value: 2, text: '质疑和辩论' },
      { value: 1, text: '偏向批判' },
      { value: 0, text: '不确定' },
      { value: -1, text: '理解和包容' },
      { value: -2, text: '接纳和尊重' }
    ]
  },

  // ===== FACET: CRITICAL (批判 vs 包容) - 3 questions =====
  {
    id: 'tf-034',
    dimension: 'TF',
    facet: 'critical',
    text: '在评价他人时，我更倾向于',
    options: [
      { value: 2, text: '客观批判，指出不足' },
      { value: 1, text: '偏向批判性' },
      { value: 0, text: '不确定' },
      { value: -1, text: '看到优点和缺点' },
      { value: -2, text: '包容和鼓励' }
    ]
  },
  {
    id: 'tf-035',
    dimension: 'TF',
    facet: 'critical',
    text: '面对他人的想法，我通常',
    options: [
      { value: 2, text: '直接指出问题和漏洞' },
      { value: 1, text: '偏向批判' },
      { value: 0, text: '不确定' },
      { value: -1, text: '先肯定再建议' },
      { value: -2, text: '积极鼓励，少批评' }
    ]
  },
  {
    id: 'tf-036',
    dimension: 'TF',
    facet: 'critical',
    text: '我认为成长更依赖于',
    options: [
      { value: 2, text: '他人的批评和指正' },
      { value: 1, text: '偏向批判性反馈' },
      { value: 0, text: '不确定' },
      { value: -1, text: '鼓励和支持' },
      { value: -2, text: '包容和认可' }
    ]
  }
];

export default tfQuestions;
