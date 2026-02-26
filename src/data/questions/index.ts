import { Question } from '@/types';
import eiQuestions from './ei-questions';
import snQuestions from './sn-questions';
import tfQuestions from './tf-questions';
import jpQuestions from './jp-questions';

const allQuestions: Question[] = [
  ...eiQuestions,
  ...snQuestions,
  ...tfQuestions,
  ...jpQuestions,
];

export function getAllQuestions(): Question[] {
  return allQuestions;
}

export function getQuestionsByDimension(dimension: string): Question[] {
  return allQuestions.filter(q => q.dimension === dimension);
}

export function getQuestionById(id: string): Question | undefined {
  return allQuestions.find(q => q.id === id);
}
