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
  idealTraits: {
    personality: string[];
    lifestyle: string[];
    values: string[];
  };
  relationshipExpectation: {
    commitment: number;
    futurePlanning: string[];
    growthMindset: number;
  };
  acceptanceLevel: {
    toleranceScore: number;
    conflictResolution: string[];
    compromiseWillingness: number;
  };
  priorities: {
    dimensionWeights: Record<string, number>;
    coreRequirements: string[];
    flexibilityLevel: number;
  };
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

export interface AssessmentState {
  currentStep: number;
  formData: {
    basicInfo: Partial<BasicInfo>;
    personalityTraits: Partial<PersonalityTraits>;
    partnerPreference: Partial<PartnerPreference>;
  };
  progress: {
    stepProgress: number[];
    currentStepCompletion: number;
  };
  results: AssessmentResult | null;
} 