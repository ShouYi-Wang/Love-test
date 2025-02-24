import { createContext, useContext, useReducer, ReactNode } from 'react';
import { 
  AssessmentState, 
  BasicInfo, 
  PersonalityTraits, 
  PartnerPreference,
  AssessmentResult 
} from '../types';

// 初始状态
const initialState: AssessmentState = {
  currentStep: 1,
  formData: {
    basicInfo: {},
    personalityTraits: {},
    partnerPreference: {},
  },
  progress: {
    stepProgress: [0, 0, 0, 0],
    currentStepCompletion: 0,
    estimatedTimeRemaining: 0,
  },
  results: {},
};

// Action 类型
type AssessmentAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_BASIC_INFO'; payload: Partial<BasicInfo> }
  | { type: 'UPDATE_PERSONALITY_TRAITS'; payload: Partial<PersonalityTraits> }
  | { type: 'UPDATE_PARTNER_PREFERENCE'; payload: Partial<PartnerPreference> }
  | { type: 'UPDATE_PROGRESS'; payload: Partial<AssessmentState['progress']> }
  | { type: 'SET_RESULTS'; payload: Partial<AssessmentResult> }
  | { type: 'RESTORE_STATE'; payload: AssessmentState };

// Reducer
function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_BASIC_INFO':
      return {
        ...state,
        formData: {
          ...state.formData,
          basicInfo: { ...state.formData.basicInfo, ...action.payload },
        },
      };
    case 'UPDATE_PERSONALITY_TRAITS':
      return {
        ...state,
        formData: {
          ...state.formData,
          personalityTraits: { ...state.formData.personalityTraits, ...action.payload },
        },
      };
    case 'UPDATE_PARTNER_PREFERENCE':
      return {
        ...state,
        formData: {
          ...state.formData,
          partnerPreference: { ...state.formData.partnerPreference, ...action.payload },
        },
      };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        progress: { ...state.progress, ...action.payload },
      };
    case 'SET_RESULTS':
      return { ...state, results: { ...state.results, ...action.payload } };
    case 'RESTORE_STATE':
      return action.payload;
    default:
      return state;
  }
}

// Context
const AssessmentContext = createContext<{
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
} | null>(null);

// Provider 组件
export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  );
}

// Hook
export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
} 