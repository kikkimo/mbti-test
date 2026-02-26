import { Question } from '@/types';

// E/I Dimension - 36 questions total
// Main dimension: 18 questions
// 5 facets: 3-4 questions each (Initiating, Receptive, Expressive, Gregarious, Intimate)

const eiQuestions: Question[] = [
  // ===== MAIN DIMENSION QUESTIONS (18) =====
  {
    id: 'ei-001',
    dimension: 'EI',
    text: '在社交场合中，我通常',
    options: [
      { value: 2, text: '非常主动地与多人交谈' },
      { value: 1, text: '比较主动地与人交流' },
      { value: 0, text: '视情况而定' },
      { value: -1, text: '更愿意倾听而非发言' },
      { value: -2, text: '尽量避免与人交谈' }
    ]
  },
  {
    id: 'ei-002',
    dimension: 'EI',
    text: '周末休息时，我更倾向于',
    options: [
      { value: 2, text: '和朋友聚会或参加活动' },
      { value: 1, text: '约一两个好朋友见面' },
      { value: 0, text: '看心情决定' },
      { value: -1, text: '在家独处放松' },
      { value: -2, text: '完全独处，不与人接触' }
    ]
  },
  {
    id: 'ei-003',
    dimension: 'EI',
    text: '在团队工作中，我更喜欢',
    options: [
      { value: 2, text: '与团队成员密切合作' },
      { value: 1, text: '偏向团队合作' },
      { value: 0, text: '不确定' },
      { value: -1, text: '独立完成自己的部分' },
      { value: -2, text: '完全独立工作，避免团队互动' }
    ]
  },
  {
    id: 'ei-004',
    dimension: 'EI',
    text: '社交活动后，我通常感到',
    options: [
      { value: 2, text: '精力充沛，还想继续' },
      { value: 1, text: '比较兴奋，心情愉悦' },
      { value: 0, text: '感觉一般' },
      { value: -1, text: '有些疲惫，需要休息' },
      { value: -2, text: '精疲力尽，必须独处恢复' }
    ]
  },
  {
    id: 'ei-005',
    dimension: 'EI',
    text: '我认为自己是',
    options: [
      { value: 2, text: '非常外向的人' },
      { value: 1, text: '比较外向' },
      { value: 0, text: '中间性格' },
      { value: -1, text: '比较内向' },
      { value: -2, text: '非常内向的人' }
    ]
  },
  {
    id: 'ei-006',
    dimension: 'EI',
    text: '在大型聚会上，我通常会',
    options: [
      { value: 2, text: '主动结识新朋友' },
      { value: 1, text: '乐于与多人交流' },
      { value: 0, text: '不确定' },
      { value: -1, text: '只和熟悉的人说话' },
      { value: -2, text: '尽量避免社交，想早点离开' }
    ]
  },
  {
    id: 'ei-007',
    dimension: 'EI',
    text: '遇到问题时，我更倾向于',
    options: [
      { value: 2, text: '找人讨论解决' },
      { value: 1, text: '偏向与人交流' },
      { value: 0, text: '视情况而定' },
      { value: -1, text: '自己思考处理' },
      { value: -2, text: '完全独立解决，不与他人讨论' }
    ]
  },
  {
    id: 'ei-008',
    dimension: 'EI',
    text: '我更喜欢的工作环境是',
    options: [
      { value: 2, text: '开放式、有人互动的空间' },
      { value: 1, text: '较开放的工作环境' },
      { value: 0, text: '无所谓' },
      { value: -1, text: '独立的工作空间' },
      { value: -2, text: '完全隔离的私人空间' }
    ]
  },
  {
    id: 'ei-009',
    dimension: 'EI',
    text: '在小组讨论中，我通常',
    options: [
      { value: 2, text: '积极发言，表达观点' },
      { value: 1, text: '较常参与讨论' },
      { value: 0, text: '不确定' },
      { value: -1, text: '倾听为主，偶尔发言' },
      { value: -2, text: '很少说话，只听不说' }
    ]
  },
  {
    id: 'ei-010',
    dimension: 'EI',
    text: '当我需要集中精力时，我更喜欢',
    options: [
      { value: 2, text: '在有人在场的地方' },
      { value: 1, text: '在较开放的环境' },
      { value: 0, text: '不确定' },
      { value: -1, text: '在安静的地方' },
      { value: -2, text: '完全隔离，独自一人' }
    ]
  },
  {
    id: 'ei-011',
    dimension: 'EI',
    text: '我的朋友圈',
    options: [
      { value: 2, text: '非常广泛，认识很多人' },
      { value: 1, text: '朋友比较多' },
      { value: 0, text: '适中' },
      { value: -1, text: '朋友不多但关系深' },
      { value: -2, text: '很少，几乎没朋友' }
    ]
  },
  {
    id: 'ei-012',
    dimension: 'EI',
    text: '在公共场合，我更喜欢',
    options: [
      { value: 2, text: '成为关注的焦点' },
      { value: 1, text: '较享受被关注' },
      { value: 0, text: '不确定' },
      { value: -1, text: '不太引人注意' },
      { value: -2, text: '完全隐身，不被注意' }
    ]
  },
  {
    id: 'ei-013',
    dimension: 'EI',
    text: '面对冲突，我通常会',
    options: [
      { value: 2, text: '立即讨论解决' },
      { value: 1, text: '主动沟通' },
      { value: 0, text: '不确定' },
      { value: -1, text: '先思考再处理' },
      { value: -2, text: '回避冲突，独自消化' }
    ]
  },
  {
    id: 'ei-014',
    dimension: 'EI',
    text: '我更喜欢的沟通方式是',
    options: [
      { value: 2, text: '面对面交流' },
      { value: 1, text: '偏向口头沟通' },
      { value: 0, text: '不确定' },
      { value: -1, text: '书面沟通' },
      { value: -2, text: '完全避免沟通，自己解决' }
    ]
  },
  {
    id: 'ei-015',
    dimension: 'EI',
    text: '在陌生环境中，我通常会',
    options: [
      { value: 2, text: '主动探索并与人互动' },
      { value: 1, text: '较开放地接触环境' },
      { value: 0, text: '不确定' },
      { value: -1, text: '观察为主，谨慎行动' },
      { value: -2, text: '极度紧张，想尽快离开' }
    ]
  },
  {
    id: 'ei-016',
    dimension: 'EI',
    text: '我认为社交',
    options: [
      { value: 2, text: '非常重要，享受其中' },
      { value: 1, text: '比较重要' },
      { value: 0, text: '一般' },
      { value: -1, text: '不太重要' },
      { value: -2, text: '非常消耗精力，尽量避免' }
    ]
  },
  {
    id: 'ei-017',
    dimension: 'EI',
    text: '在会议上，我更倾向于',
    options: [
      { value: 2, text: '主动发言，表达想法' },
      { value: 1, text: '较常参与讨论' },
      { value: 0, text: '不确定' },
      { value: -1, text: '倾听为主，被问到才说' },
      { value: -2, text: '几乎不发言，只听不说' }
    ]
  },
  {
    id: 'ei-018',
    dimension: 'EI',
    text: '长期独处后，我通常会感到',
    options: [
      { value: 2, text: '非常焦虑，渴望社交' },
      { value: 1, text: '有些寂寞' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较自在' },
      { value: -2, text: '非常享受，完全放松' }
    ]
  },

  // ===== FACET: INITIATING (4 questions) =====
  {
    id: 'ei-019',
    dimension: 'EI',
    facet: 'initiating',
    text: '面对陌生人，我通常',
    options: [
      { value: 2, text: '主动发起交谈' },
      { value: 1, text: '等待对方先开口，但会积极响应' },
      { value: 0, text: '不确定' },
      { value: -1, text: '等待对方主动' },
      { value: -2, text: '避免接触' }
    ]
  },
  {
    id: 'ei-020',
    dimension: 'EI',
    facet: 'initiating',
    text: '在新环境中，我通常是',
    options: [
      { value: 2, text: '主动介绍自己' },
      { value: 1, text: '较主动与人交往' },
      { value: 0, text: '不确定' },
      { value: -1, text: '等待他人接近' },
      { value: -2, text: '完全被动，希望被忽略' }
    ]
  },
  {
    id: 'ei-021',
    dimension: 'EI',
    facet: 'initiating',
    text: '在社交场合，我通常是',
    options: [
      { value: 2, text: '主动破冰，开启话题' },
      { value: 1, text: '较常主动说话' },
      { value: 0, text: '不确定' },
      { value: -1, text: '响应他人，不主动' },
      { value: -2, text: '完全被动，避免互动' }
    ]
  },
  {
    id: 'ei-022',
    dimension: 'EI',
    facet: 'initiating',
    text: '建立新关系时，我通常',
    options: [
      { value: 2, text: '主动采取行动' },
      { value: 1, text: '较主动接触' },
      { value: 0, text: '不确定' },
      { value: -1, text: '等待对方主动' },
      { value: -2, text: '完全被动，不主动联系' }
    ]
  },

  // ===== FACET: RECEPTIVE (3 questions) =====
  {
    id: 'ei-023',
    dimension: 'EI',
    facet: 'receptive',
    text: '当有人突然联系我时，我通常会',
    options: [
      { value: 2, text: '立即回应，很兴奋' },
      { value: 1, text: '较积极回应' },
      { value: 0, text: '不确定' },
      { value: -1, text: '需要时间准备' },
      { value: -2, text: '感到被打扰，不想回应' }
    ]
  },
  {
    id: 'ei-024',
    dimension: 'EI',
    facet: 'receptive',
    text: '对于意外的社交邀请，我通常',
    options: [
      { value: 2, text: '非常欢迎，欣然接受' },
      { value: 1, text: '较可能接受' },
      { value: 0, text: '不确定' },
      { value: -1, text: '需要考虑一下' },
      { value: -2, text: '通常拒绝，不喜欢被打扰' }
    ]
  },
  {
    id: 'ei-025',
    dimension: 'EI',
    facet: 'receptive',
    text: '在对话中，我更喜欢',
    options: [
      { value: 2, text: '快速反应，即时回应' },
      { value: 1, text: '较积极回应' },
      { value: 0, text: '不确定' },
      { value: -1, text: '先思考再回应' },
      { value: -2, text: '需要很长时间处理，反应慢' }
    ]
  },

  // ===== FACET: EXPRESSIVE (4 questions) =====
  {
    id: 'ei-026',
    dimension: 'EI',
    facet: 'expressive',
    text: '表达情感时，我通常',
    options: [
      { value: 2, text: '非常开放，直接表达' },
      { value: 1, text: '较直接表达情感' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较含蓄' },
      { value: -2, text: '非常内敛，很少表露' }
    ]
  },
  {
    id: 'ei-027',
    dimension: 'EI',
    facet: 'expressive',
    text: '我的面部表情和肢体语言',
    options: [
      { value: 2, text: '非常丰富，容易看出情绪' },
      { value: 1, text: '较能表达感受' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较平静，不太明显' },
      { value: -2, text: '非常克制，看不出情绪' }
    ]
  },
  {
    id: 'ei-028',
    dimension: 'EI',
    facet: 'expressive',
    text: '在谈话中，我通常',
    options: [
      { value: 2, text: '说得很多，表达充分' },
      { value: 1, text: '较常表达想法' },
      { value: 0, text: '不确定' },
      { value: -1, text: '话不多，点到为止' },
      { value: -2, text: '很少说话，几乎不表达' }
    ]
  },
  {
    id: 'ei-029',
    dimension: 'EI',
    facet: 'expressive',
    text: '当我有想法时，我通常',
    options: [
      { value: 2, text: '立即说出来' },
      { value: 1, text: '较快表达' },
      { value: 0, text: '不确定' },
      { value: -1, text: '深思熟虑后再说' },
      { value: -2, text: '几乎不主动表达' }
    ]
  },

  // ===== FACET: GREGARIOUS (3 questions) =====
  {
    id: 'ei-030',
    dimension: 'EI',
    facet: 'gregarious',
    text: '我更喜欢',
    options: [
      { value: 2, text: '与多人一起活动' },
      { value: 1, text: '偏向群体活动' },
      { value: 0, text: '不确定' },
      { value: -1, text: '与少数人相处' },
      { value: -2, text: '独自一人或一对一' }
    ]
  },
  {
    id: 'ei-031',
    dimension: 'EI',
    facet: 'gregarious',
    text: '聚会时，我更喜欢',
    options: [
      { value: 2, text: '大型派对，热闹非凡' },
      { value: 1, text: '人多的场合' },
      { value: 0, text: '不确定' },
      { value: -1, text: '小型聚会' },
      { value: -2, text: '一对一或独自' }
    ]
  },
  {
    id: 'ei-032',
    dimension: 'EI',
    facet: 'gregarious',
    text: '在团队中，我更喜欢',
    options: [
      { value: 2, text: '大团队，人多热闹' },
      { value: 1, text: '偏向大团队' },
      { value: 0, text: '不确定' },
      { value: -1, text: '小团队' },
      { value: -2, text: '独自工作或极小团队' }
    ]
  },

  // ===== FACET: INTIMATE (4 questions) =====
  {
    id: 'ei-033',
    dimension: 'EI',
    facet: 'intimate',
    text: '与朋友相处，我更喜欢',
    options: [
      { value: 2, text: '不断认识新朋友' },
      { value: 1, text: '乐于扩展社交圈' },
      { value: 0, text: '不确定' },
      { value: -1, text: '维持深厚友谊' },
      { value: -2, text: '只与极少数密友交往' }
    ]
  },
  {
    id: 'ei-034',
    dimension: 'EI',
    facet: 'intimate',
    text: '我的人际关系偏好',
    options: [
      { value: 2, text: '广泛但相对浅显' },
      { value: 1, text: '朋友较多' },
      { value: 0, text: '不确定' },
      { value: -1, text: '朋友少但关系深' },
      { value: -2, text: '极少朋友，但非常亲密' }
    ]
  },
  {
    id: 'ei-035',
    dimension: 'EI',
    facet: 'intimate',
    text: '在社交中，我更注重',
    options: [
      { value: 2, text: '认识更多人' },
      { value: 1, text: '扩展人脉' },
      { value: 0, text: '不确定' },
      { value: -1, text: '深化现有关系' },
      { value: -2, text: '深度理解少数人' }
    ]
  },
  {
    id: 'ei-036',
    dimension: 'EI',
    facet: 'intimate',
    text: '我认为友谊',
    options: [
      { value: 2, text: '数量重要，越多越好' },
      { value: 1, text: '偏向广交朋友' },
      { value: 0, text: '不确定' },
      { value: -1, text: '质量重要，深度优先' },
      { value: -2, text: '极少数深交即可' }
    ]
  }
];

export default eiQuestions;
