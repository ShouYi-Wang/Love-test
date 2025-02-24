'use client';

import { useEffect } from 'react';
import { useAssessment } from '../context/AssessmentContext';

const STORAGE_KEY = 'assessment_progress';

export function useAssessmentStorage() {
  const { state, dispatch } = useAssessment();

  // 从localStorage恢复状态
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        // 确保恢复的数据符合类型要求
        const restoredState = {
          ...state,
          ...data,
          formData: {
            basicInfo: data.formData?.basicInfo || {},
            personalityTraits: {
              mbtiResult: data.formData?.personalityTraits?.mbtiResult || {},
              bigFiveResult: data.formData?.personalityTraits?.bigFiveResult || {},
              emotionalExpression: data.formData?.personalityTraits?.emotionalExpression || [],
              lifestyle: {
                schedule: data.formData?.personalityTraits?.lifestyle?.schedule || '',
                preferences: data.formData?.personalityTraits?.lifestyle?.preferences || []
              }
            },
            partnerPreference: data.formData?.partnerPreference || {}
          }
        };
        dispatch({ type: 'RESTORE_STATE', payload: restoredState });
      } catch (e) {
        console.error('Failed to restore assessment state:', e);
      }
    }
  }, [dispatch]);

  // 保存状态到localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // 清除保存的状态
  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return { clearStorage };
} 