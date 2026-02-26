import { Question } from '@/types';

// J/P Dimension - 36 questions total
// Main dimension: 18 questions
// 6 facets: 3 questions each (Systematic, Planned, Organized, Methodical, Decisive, Closure)

const jpQuestions: Question[] = [
  // ===== MAIN DIMENSION QUESTIONS (18) =====
  {
    id: 'jp-001',
    dimension: 'JP',
    text: '我的工作方式通常是',
    options: [
      { value: 2, text: '提前计划，按计划执行' },
      { value: 1, text: '偏向有计划' },
      { value: 0, text: '视情况而定' },
      { value: -1, text: '灵活应变' },
      { value: -2, text: '完全随性，不喜欢计划' }
    ]
  },
  {
    id: 'jp-002',
    dimension: 'JP',
    text: '面对截止日期，我通常',
    options: [
      { value: 2, text: '提前完成' },
      { value: 1, text: '尽量提前完成' },
      { value: 0, text: '不确定' },
      { value: -1, text: '在截止前突击完成' },
      { value: -2, text: '经常拖延到最后时刻' }
    ]
  },
  {
    id: 'jp-003',
    dimension: 'JP',
    text: '我的日常生活习惯',
    options: [
      { value: 2, text: '非常有规律，按固定时间表' },
      { value: 1, text: '比较规律' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较随性' },
      { value: -2, text: '完全随机，没有规律' }
    ]
  },
  {
    id: 'jp-004',
    dimension: 'JP',
    text: '在项目管理中，我更喜欢',
    options: [
      { value: 2, text: '制定详细计划并严格执行' },
      { value: 1, text: '偏向有计划地推进' },
      { value: 0, text: '不确定' },
      { value: -1, text: '边做边调整' },
      { value: -2, text: '完全随性，不计划' }
    ]
  },
  {
    id: 'jp-005',
    dimension: 'JP',
    text: '面对突如其来的变化，我通常',
    options: [
      { value: 2, text: '感到不安，希望维持原计划' },
      { value: 1, text: '不太喜欢变化' },
      { value: 0, text: '不确定' },
      { value: -1, text: '能够适应变化' },
      { value: -2, text: '非常兴奋，喜欢变化' }
    ]
  },
  {
    id: 'jp-006',
    dimension: 'JP',
    text: '我的办公或居住环境通常是',
    options: [
      { value: 2, text: '井井有条，每样东西都有固定位置' },
      { value: 1, text: '比较整洁有序' },
      { value: 0, text: '不确定' },
      { value: -1, text: '有些杂乱' },
      { value: -2, text: '非常混乱，到处都是东西' }
    ]
  },
  {
    id: 'jp-007',
    dimension: 'JP',
    text: '做决定时，我通常',
    options: [
      { value: 2, text: '快速决定，不拖延' },
      { value: 1, text: '较快做决定' },
      { value: 0, text: '不确定' },
      { value: -1, text: '需要更多时间思考' },
      { value: -2, text: '尽可能推迟决定' }
    ]
  },
  {
    id: 'jp-008',
    dimension: 'JP',
    text: '对于任务和项目，我更喜欢',
    options: [
      { value: 2, text: '尽早完成并了结' },
      { value: 1, text: '偏向提前完成' },
      { value: 0, text: '不确定' },
      { value: -1, text: '可以延后处理' },
      { value: -2, text: '尽可能推迟，保持开放' }
    ]
  },
  {
    id: 'jp-009',
    dimension: 'JP',
    text: '在旅行中，我更喜欢',
    options: [
      { value: 2, text: '制定详细行程计划' },
      { value: 1, text: '大致规划' },
      { value: 0, text: '不确定' },
      { value: -1, text: '到了再说，随机应变' },
      { value: -2, text: '完全随性，不喜欢计划' }
    ]
  },
  {
    id: 'jp-010',
    dimension: 'JP',
    text: '我的工作和生活节奏',
    options: [
      { value: 2, text: '非常有条理，按部就班' },
      { value: 1, text: '比较有序' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较灵活' },
      { value: -2, text: '非常随性，没有节奏' }
    ]
  },
  {
    id: 'jp-011',
    dimension: 'JP',
    text: '面对多个任务，我通常',
    options: [
      { value: 2, text: '制定清单逐项完成' },
      { value: 1, text: '有计划地处理' },
      { value: 0, text: '不确定' },
      { value: -1, text: '想到哪个做哪个' },
      { value: -2, text: '完全随机，不按计划' }
    ]
  },
  {
    id: 'jp-012',
    dimension: 'JP',
    text: '对于未完成的工作，我通常',
    options: [
      { value: 2, text: '感到焦虑，想尽快完成' },
      { value: 1, text: '希望能尽快了结' },
      { value: 0, text: '不确定' },
      { value: -1, text: '可以暂时搁置' },
      { value: -2, text: '不太在意，保持开放' }
    ]
  },
  {
    id: 'jp-013',
    dimension: 'JP',
    text: '在做决定之前，我通常',
    options: [
      { value: 2, text: '希望尽快定下来' },
      { value: 1, text: '偏向尽早决定' },
      { value: 0, text: '不确定' },
      { value: -1, text: '可以继续收集信息' },
      { value: -2, text: '尽可能保留选项' }
    ]
  },
  {
    id: 'jp-014',
    dimension: 'JP',
    text: '我的时间管理方式',
    options: [
      { value: 2, text: '严格按时间表行事' },
      { value: 1, text: '比较有计划' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较灵活' },
      { value: -2, text: '完全随性，不管理时间' }
    ]
  },
  {
    id: 'jp-015',
    dimension: 'JP',
    text: '对于新信息，我通常',
    options: [
      { value: 2, text: '希望尽快整合并做决定' },
      { value: 1, text: '偏向快速得出结论' },
      { value: 0, text: '不确定' },
      { value: -1, text: '可以继续探索' },
      { value: -2, text: '保持开放，不做定论' }
    ]
  },
  {
    id: 'jp-016',
    dimension: 'JP',
    text: '在团队工作中，我更喜欢',
    options: [
      { value: 2, text: '明确分工和截止日期' },
      { value: 1, text: '有计划地推进' },
      { value: 0, text: '不确定' },
      { value: -1, text: '灵活协作' },
      { value: -2, text: '完全随性，不设定结构' }
    ]
  },
  {
    id: 'jp-017',
    dimension: 'JP',
    text: '面对选择时，我通常',
    options: [
      { value: 2, text: '快速选择并坚持' },
      { value: 1, text: '较快做决定' },
      { value: 0, text: '不确定' },
      { value: -1, text: '需要更多时间考虑' },
      { value: -2, text: '尽可能保留所有选项' }
    ]
  },
  {
    id: 'jp-018',
    dimension: 'JP',
    text: '我的处事风格',
    options: [
      { value: 2, text: '喜欢控制和规划' },
      { value: 1, text: '偏向有计划' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较灵活随意' },
      { value: -2, text: '完全随性，喜欢自由' }
    ]
  },

  // ===== FACET: SYSTEMATIC (系统vs随意) - 3 questions =====
  {
    id: 'jp-019',
    dimension: 'JP',
    facet: 'systematic',
    text: '我的生活状态通常是',
    options: [
      { value: 2, text: '井井有条，一切可控' },
      { value: 1, text: '比较有规律' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较随性' },
      { value: -2, text: '经常混乱，难以管理' }
    ]
  },
  {
    id: 'jp-020',
    dimension: 'JP',
    facet: 'systematic',
    text: '我的工作方式',
    options: [
      { value: 2, text: '非常系统化，有固定流程' },
      { value: 1, text: '比较系统' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较随意' },
      { value: -2, text: '完全没有系统，随机而为' }
    ]
  },
  {
    id: 'jp-021',
    dimension: 'JP',
    facet: 'systematic',
    text: '我的日常作息',
    options: [
      { value: 2, text: '非常规律，按时作息' },
      { value: 1, text: '比较规律' },
      { value: 0, text: '不确定' },
      { value: -1, text: '不太规律' },
      { value: -2, text: '完全随机，没有规律' }
    ]
  },

  // ===== FACET: PLANNED (计划vs自发) - 3 questions =====
  {
    id: 'jp-022',
    dimension: 'JP',
    facet: 'planned',
    text: '对于周末或假期，我通常',
    options: [
      { value: 2, text: '提前制定详细计划' },
      { value: 1, text: '大致规划' },
      { value: 0, text: '不确定' },
      { value: -1, text: '到时再决定' },
      { value: -2, text: '完全随性，不计划' }
    ]
  },
  {
    id: 'jp-023',
    dimension: 'JP',
    facet: 'planned',
    text: '开始新任务时，我通常',
    options: [
      { value: 2, text: '先制定详细计划' },
      { value: 1, text: '先规划再行动' },
      { value: 0, text: '不确定' },
      { value: -1, text: '边做边规划' },
      { value: -2, text: '直接开始，不计划' }
    ]
  },
  {
    id: 'jp-024',
    dimension: 'JP',
    facet: 'planned',
    text: '面对未知的情况',
    options: [
      { value: 2, text: '提前准备各种方案' },
      { value: 1, text: '做些准备' },
      { value: 0, text: '不确定' },
      { value: -1, text: '到时候再说' },
      { value: -2, text: '完全自发应对' }
    ]
  },

  // ===== FACET: ORGANIZED (有序vs灵活) - 3 questions =====
  {
    id: 'jp-025',
    dimension: 'JP',
    facet: 'organized',
    text: '我的办公或居住环境',
    options: [
      { value: 2, text: '井井有条，每样东西都有固定位置' },
      { value: 1, text: '比较整洁有序' },
      { value: 0, text: '不确定' },
      { value: -1, text: '有些杂乱' },
      { value: -2, text: '非常混乱' }
    ]
  },
  {
    id: 'jp-026',
    dimension: 'JP',
    facet: 'organized',
    text: '我的文件和资料管理',
    options: [
      { value: 2, text: '非常有序，分类清晰' },
      { value: 1, text: '比较有条理' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较随意' },
      { value: -2, text: '完全没有组织' }
    ]
  },
  {
    id: 'jp-027',
    dimension: 'JP',
    facet: 'organized',
    text: '我的时间和日程安排',
    options: [
      { value: 2, text: '严格按日程表' },
      { value: 1, text: '比较有安排' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较灵活' },
      { value: -2, text: '完全不安排' }
    ]
  },

  // ===== FACET: METHODICAL (有条理vs随性) - 3 questions =====
  {
    id: 'jp-028',
    dimension: 'JP',
    facet: 'methodical',
    text: '完成任务的方式',
    options: [
      { value: 2, text: '按步骤系统进行' },
      { value: 1, text: '有条理地推进' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较随性' },
      { value: -2, text: '完全随机，不按步骤' }
    ]
  },
  {
    id: 'jp-029',
    dimension: 'JP',
    facet: 'methodical',
    text: '处理问题时',
    options: [
      { value: 2, text: '系统分析，逐步解决' },
      { value: 1, text: '有条理地处理' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较随意' },
      { value: -2, text: '凭直觉，不按条理' }
    ]
  },
  {
    id: 'jp-030',
    dimension: 'JP',
    facet: 'methodical',
    text: '我的工作流程',
    options: [
      { value: 2, text: '非常规范，有固定流程' },
      { value: 1, text: '比较有条理' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较灵活' },
      { value: -2, text: '完全没有流程' }
    ]
  },

  // ===== FACET: DECISIVE (果断vs开放) - 3 questions =====
  {
    id: 'jp-031',
    dimension: 'JP',
    facet: 'decisive',
    text: '做重要决定时，我通常',
    options: [
      { value: 2, text: '快速决定，不拖延' },
      { value: 1, text: '较快做决定' },
      { value: 0, text: '不确定' },
      { value: -1, text: '需要更多时间' },
      { value: -2, text: '尽可能推迟' }
    ]
  },
  {
    id: 'jp-032',
    dimension: 'JP',
    facet: 'decisive',
    text: '面对选择',
    options: [
      { value: 2, text: '快速选择并坚持' },
      { value: 1, text: '较快做决定' },
      { value: 0, text: '不确定' },
      { value: -1, text: '需要反复考虑' },
      { value: -2, text: '保留所有选项' }
    ]
  },
  {
    id: 'jp-033',
    dimension: 'JP',
    facet: 'decisive',
    text: '对于已做的决定',
    options: [
      { value: 2, text: '坚持执行，不轻易改变' },
      { value: 1, text: '偏向坚持' },
      { value: 0, text: '不确定' },
      { value: -1, text: '可以调整' },
      { value: -2, text: '随时准备改变' }
    ]
  },

  // ===== FACET: CLOSURE (定论vs探索) - 3 questions =====
  {
    id: 'jp-034',
    dimension: 'JP',
    facet: 'closure',
    text: '面对未完成的工作',
    options: [
      { value: 2, text: '感到焦虑，想尽快完成' },
      { value: 1, text: '希望能尽快了结' },
      { value: 0, text: '不确定' },
      { value: -1, text: '可以暂时搁置' },
      { value: -2, text: '不太在意，保持开放' }
    ]
  },
  {
    id: 'jp-035',
    dimension: 'JP',
    facet: 'closure',
    text: '对于新信息',
    options: [
      { value: 2, text: '希望尽快整合并做决定' },
      { value: 1, text: '偏向快速得出结论' },
      { value: 0, text: '不确定' },
      { value: -1, text: '可以继续探索' },
      { value: -2, text: '保持开放，不做定论' }
    ]
  },
  {
    id: 'jp-036',
    dimension: 'JP',
    facet: 'closure',
    text: '完成任务时',
    options: [
      { value: 2, text: '追求尽快完成并了结' },
      { value: 1, text: '偏向早点结束' },
      { value: 0, text: '不确定' },
      { value: -1, text: '可以继续完善' },
      { value: -2, text: '保持开放，不急于结束' }
    ]
  }
];

export default jpQuestions;
