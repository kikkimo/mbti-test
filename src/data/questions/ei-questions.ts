import { Question } from '@/types';

const eiQuestions: Question[] = [
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
    facet: 'initiating',
    text: '面对陌生人，我通常',
    options: [
      { value: 2, text: '主动发起交谈' },
      { value: 1, text: '等待对方先开口，但会积极响应' },
      { value: 0, text: '不确定' },
      { value: -1, text: '等待对方主动' },
      { value: -2, text: '避免接触' }
    ]
  }
];

export default eiQuestions;
