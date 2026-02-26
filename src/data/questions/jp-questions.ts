import { Question } from '@/types';

const jpQuestions: Question[] = [
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
    facet: 'systematic',
    text: '我的生活状态通常是',
    options: [
      { value: 2, text: '井井有条，一切可控' },
      { value: 1, text: '比较有规律' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较随性' },
      { value: -2, text: '经常混乱，难以管理' }
    ]
  }
];

export default jpQuestions;
