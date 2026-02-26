import { Question } from '@/types';

const tfQuestions: Question[] = [
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
    facet: 'logical',
    text: '我认为自己在争论中更倾向于',
    options: [
      { value: 2, text: '坚持真理，即使伤害感情' },
      { value: 1, text: '偏向真理' },
      { value: 0, text: '不确定' },
      { value: -1, text: '维护和谐关系' },
      { value: -2, text: '避免冲突，保持友好' }
    ]
  }
];

export default tfQuestions;
