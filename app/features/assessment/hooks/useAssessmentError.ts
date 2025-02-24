'use client';

import { useState } from 'react';

interface ErrorContext {
  [key: string]: string | number | boolean | undefined;
}

interface ErrorService {
  reportError: (error: Error, context?: ErrorContext) => Promise<void>;
}

// 模拟错误上报服务
const errorService: ErrorService = {
  reportError: async (error: Error, context?: ErrorContext) => {
    console.error('Error reported:', error, context);
  }
};

export function useAssessmentError() {
  const [error, setError] = useState<string | null>(null);

  const handleError = async (err: Error, context?: ErrorContext) => {
    const errorMessage = err.message || '发生未知错误';
    setError(errorMessage);

    const errorContext: ErrorContext = {
      ...context,
      currentStep: context?.currentStep,
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