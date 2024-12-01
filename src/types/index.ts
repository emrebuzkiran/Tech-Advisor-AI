export interface TechnologyRecommendation {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  useCase: string;
  score: number;
  aiInsights?: string;
  learningResources?: string[];
}

export interface ProjectRequirements {
  type: string;
  scale: string;
  performance: string;
  budget: string;
  timeline: string;
  team: string;
  description: string;
}

export interface AIAnalysisResult {
  recommendations: TechnologyRecommendation[];
  reasoning: string;
}