
export interface Career {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: string;
  skills: string[];
  education: string[];
  averageSalary: string;
  workEnvironment: string;
}

export interface University {
  id: string;
  name: string;
  city: string;
  country: string;
  language: string;
  ranking: number;
  programs: string[];
  tuitionFee: string;
  scholarships: boolean;
  website: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  weights: Record<string, number>;
}

export interface QuizResult {
  careerType: string;
  description: string;
  recommendedCareers: string[];
}

export interface FavoriteItem {
  id: string;
  type: 'career' | 'university';
  data: Career | University;
}
