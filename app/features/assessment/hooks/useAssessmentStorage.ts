'use client';

import { useEffect } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { BasicInfoFormData } from '../types';

const STORAGE_KEY = 'assessment_progress';

export function useAssessmentStorage() {
  const { state, dispatch } = useAssessment();

  // 从localStorage恢复状态
  useEffect(() => {
    try {
      const stored = localStorage.getItem('assessment_state');
      if (stored) {
        const data = JSON.parse(stored);
        // 确保恢复的数据符合类型要求
        const restoredState = {
          ...state,
          ...data,
          formData: {
            basicInfo: {
              ...data.formData?.basicInfo,
              ageRange: data.formData?.basicInfo?.ageRange as BasicInfoFormData['ageRange']
            },
            personalityTraits: data.formData?.personalityTraits || {},
            partnerPreference: data.formData?.partnerPreference || {}
          }
        };
        dispatch({ type: 'RESTORE_STATE', payload: restoredState });
      }
    } catch (e) {
      console.error('Failed to restore assessment state:', e);
    }
  }, [dispatch, state]);

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