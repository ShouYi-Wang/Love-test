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
        dispatch({ type: 'RESTORE_STATE', payload: data });
      } catch (e) {
        console.error('Failed to restore assessment state:', e);
      }
    }
  }, []);

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