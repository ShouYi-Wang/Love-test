// 基础信息类型
export interface BasicInfo {
  ageRange: '18-24' | '25-30' | '31-35' | '36-40' | '40+';
  gender: 'male' | 'female' | 'other';
  occupation: string[];
  education: string;
  relationshipStatus: 'single' | 'dating' | 'married';
  datingHistory: string;
  relationshipGoal: string;
  assessmentPurpose: 'findPartner' | 'evaluateRelation' | 'premaritalAssessment' | 'improveMarriage';
}

// 个性特征类型
export interface PersonalityTraits {
  mbtiResult?: string;
  emotionalExpression?: string[];
  socialTendency?: string[];
  lifeGoals?: string[];
  familyValues?: string[];
  moneyAttitude?: string[];
  lifestyle?: {
    schedule?: string;
    preferences?: string[];
    hobbies?: string[];
  };
}

// 伴侣期望类型
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

// 评估结果类型
export interface AssessmentResult {
  overallScore: number;
  dimensionScores: Record<string, number>;
  strengthAreas: string[];
  riskAreas: string[];
  recommendations: {
    shortTerm: string[];
    longTerm: string[];
    practicalSteps: string[];
  };
}

// 总体状态类型
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
    estimatedTimeRemaining: number;
  };
  results: Partial<AssessmentResult>;
} 