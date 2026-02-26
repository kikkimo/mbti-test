import { Question } from '@/types';
import eiQuestions from './ei-questions.json';
import snQuestions from './sn-questions.json';
import tfQuestions from './tf-questions.json';
import jpQuestions from './jp-questions.json';

const allQuestions: Question[] = [
  ...eiQuestions,
  ...snQuestions,
  ...tfQuestions,
  ...jpQuestions,
] as Question[];

export function getAllQuestions(): Question[] {
  return allQuestions;
}

export function getQuestionsByDimension(dimension: string): Question[] {
  return allQuestions.filter(q => q.dimension === dimension);
}

export function getQuestionById(id: string): Question | undefined {
  return allQuestions.find(q => q.id === id);
}

export default allQuestions;
