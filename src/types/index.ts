export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';

export type OptionValue = -2 | -1 | 0 | 1 | 2;

export interface Question {
  id: string;
  dimension: Dimension;
  facet?: string;
  text: string;
  options: {
    value: OptionValue;
    text: string;
  }[];
}

export interface Answer {
  questionId: string;
  value: OptionValue;
}

export interface DimensionScore {
  dimension: Dimension;
  score: number; // -100 to +100
  direction: 'positive' | 'negative'; // E/S/T/J = positive
}

export interface FacetScore {
  facet: string;
  score: number; // -100 to +100
}

export interface TestResult {
  id: string;
  type: string; // e.g., "INTJ"
  dimensions: DimensionScore[];
  facets: FacetScore[];
  createdAt: string;
}

export interface PersonalityDescription {
  type: string;
  name: string;
  description: string;
  strengths: string[];
  challenges: string[];
  careers: string[];
  advice: string;
}
