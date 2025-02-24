export interface PersonalityTraits {
  mbtiResult: {
    [key: string]: string;
  };
  bigFiveResult: {
    [key: string]: number;
  };
  emotionalExpression?: string[];
  lifestyle?: {
    schedule?: string;
    preferences?: string[];
  };
}

export interface BasicInfo {
  ageRange: string;
  gender: string;
  occupation: string[];
  education: string;
  relationshipStatus: string;
  assessmentPurpose: string;
}

export interface PartnerPreference {
  // ... 其他字段
}

export interface AssessmentResult {
  overallScore: number;
  dimensionScores: {
    personality: number;
    lifestyle: number;
    values: number;
    communication: number;
    growth: number;
  };
  strengthAreas: string[];
  riskAreas: string[];
  recommendations: {
    shortTerm: string[];
    longTerm: string[];
    practicalSteps: string[];
  };
} 