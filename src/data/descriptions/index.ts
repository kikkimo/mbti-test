import { PersonalityDescription } from '@/types';
import personalityTypes from './types';
import careerGroups from './careers';

export function getPersonalityDescription(type: string): PersonalityDescription | undefined {
  return personalityTypes[type];
}

export function getCareerRecommendations(type: string): string[] {
  for (const group of Object.values(careerGroups)) {
    if (group.types.includes(type)) {
      return group.careers;
    }
  }
  return [];
}

export function getAllDescriptions(): Record<string, PersonalityDescription> {
  return personalityTypes;
}
