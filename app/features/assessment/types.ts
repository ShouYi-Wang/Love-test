import { 
  ageRanges, 
  occupations,
  educationLevels 
} from './constants/basicInfo';

// 基础类型定义
export type AgeRange = typeof ageRanges[number];
export type Gender = 'male' | 'female' | 'other';
export type RelationshipStatus = 'single' | 'dating' | 'married';
export type AssessmentPurpose = 'findPartner' | 'evaluateRelation' | 'premaritalAssessment' | 'improveMarriage';
export type Education = typeof educationLevels[number];
export type Occupation = typeof occupations[number];

export interface PersonalityTraits {
  mbtiResult: {
    [key: string]: string;
  };
  bigFiveResult: {
    [key: string]: number;
  };
  emotionalExpression: string[];
  lifestyle: {
    schedule: string;
    preferences: string[];
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

export interface DimensionScores {
  personality: number;
  lifestyle: number;
  values: number;
  communication: number;
  growth: number;
}

export interface AssessmentResult {
  overallScore: number;
  dimensionScores: DimensionScores;
  strengthAreas: string[];
  riskAreas: string[];
  recommendations: {
    shortTerm: string[];
    longTerm: string[];
    practicalSteps: string[];
  };
}

export interface BasicInfoFormData {
  ageRange: AgeRange;
  gender: Gender;
  occupation: Occupation[];
  education: Education;
  relationshipStatus: RelationshipStatus;
  assessmentPurpose: AssessmentPurpose;
}

export interface AssessmentState {
  currentStep: number;
  formData: {
    basicInfo: Partial<BasicInfoFormData>;
    personalityTraits: Partial<PersonalityTraits>;
    partnerPreference: Partial<PartnerPreference>;
  };
  progress: {
    stepProgress: readonly [number, number, number, number];
    currentStepCompletion: number;
  };
  results: AssessmentResult | null;
}

export type StepProgress = readonly [number, number, number, number];
export type DimensionKey = keyof DimensionScores;
export type AssessmentStep = 1 | 2 | 3 | 4;

export function isValidStepProgress(progress: unknown): progress is StepProgress {
  return Array.isArray(progress) && 
         progress.length === 4 && 
         progress.every(p => typeof p === 'number' && p >= 0 && p <= 100);
} 