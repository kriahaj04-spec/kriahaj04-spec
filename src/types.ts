export interface AnalysisResult {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: SkillRecommendation[];
  analysis: {
    totalRequiredSkills: number;
    matchedCount: number;
    experienceLevel: string;
    keyStrengths: string[];
  };
}

export interface SkillRecommendation {
  skill: string;
  resources: LearningResource[];
}

export interface LearningResource {
  platform: string;
  url: string;
  type: string;
}