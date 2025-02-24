'use client';

import { useState } from 'react';
import { ErrorReportingService } from '../services/errorReporting';
import { useAssessment } from '../context/AssessmentContext';

interface ErrorContext {
  [key: string]: string | number | boolean;
}

export function useAssessmentError() {
  const [error, setError] = useState<string | null>(null);
  const { state } = useAssessment();
  const errorService = ErrorReportingService.getInstance();

  const handleError = async (err: Error, context?: ErrorContext) => {
    setError(err.message);
    
    // 添加用户当前状态到上报信息
    const errorContext = {
      ...context,
      currentStep: state.currentStep,
      progress: state.progress.stepProgress,
      timestamp: new Date().toISOString()
    };

    // 上报错误
    await errorService.reportError(err, errorContext);
  };

  const clearError = () => {
    setError(null);
  };

  return { error, handleError, clearError };
} 