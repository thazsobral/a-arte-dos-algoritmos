export type AlgorithmType = 'linear' | 'two_pages' | 'binary';

export interface PhoneBookEntry {
  id: number;
  name: string;
  phone: string;
  page: number;
}

export interface SimulationStep {
  stepNumber: number;
  currentPage: number;
  checkedName: string;
  action: string;
  explanation: string;
  found: boolean;
  low: number;
  high: number;
  direction?: 'left' | 'right' | 'match';
}

export interface QuizQuestion {
  id: number;
  question: string;
  context: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
}
