'use client';

import { AssessmentProvider } from '@/app/features/assessment/context/AssessmentContext';
import StepNav from '@/app/features/assessment/components/stepNav/StepNav';
import BasicInfoStep from '@/app/features/assessment/components/step1/BasicInfo';
import { useAssessment } from '@/app/features/assessment/context/AssessmentContext';
import PersonalityTraitsStep from '@/app/features/assessment/components/step2/PersonalityTraits';
import PartnerPreferenceStep from '@/app/features/assessment/components/step3/PartnerPreference';
import AssessmentResultStep from '@/app/features/assessment/components/step4/AssessmentResult';

function StepContent() {
  const { state } = useAssessment();
  
  switch (state.currentStep) {
    case 1:
      return <BasicInfoStep />;
    case 2:
      return <PersonalityTraitsStep />;
    case 3:
      return <PartnerPreferenceStep />;
    case 4:
      return <AssessmentResultStep />;
    default:
      return null;
  }
}

export default function AssessmentPage() {
  return (
    <AssessmentProvider>
      <div className="min-h-screen bg-gray-50">
        <StepNav />
        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow p-6">
            <StepContent />
          </div>
        </main>
      </div>
    </AssessmentProvider>
  );
} 