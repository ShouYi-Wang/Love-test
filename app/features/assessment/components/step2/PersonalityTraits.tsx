'use client';

import { useState } from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { PersonalityTraits } from '../../types';

interface Question {
  id: string;
  text: string;
  title?: string;
  options: {
    value: string;
    text: string;
  }[];
}

interface FormData {
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

// MBTI性格维度题目
const mbtiQuestions: Question[] = [
  {
    id: 'E_I',
    text: '在社交场合中，您更倾向于：',
    options: [
      { value: 'E', text: '积极主动与他人交谈' },
      { value: 'I', text: '等待他人来与您交谈' }
    ]
  },
  {
    id: 'S_N',
    text: '在处理信息时',
    options: [
      { value: 'S', text: '我更关注具体的事实和细节' },
      { value: 'N', text: '我更喜欢思考可能性和创意' }
    ]
  },
  {
    id: 'T_F',
    text: '在做决定时',
    options: [
      { value: 'T', text: '我倾向于依据逻辑和客观分析' },
      { value: 'F', text: '我更看重个人价值观和感受' }
    ]
  },
  {
    id: 'J_P',
    text: '在生活方式上',
    options: [
      { value: 'J', text: '我喜欢提前计划和做出决定' },
      { value: 'P', text: '我更喜欢保持灵活和随机应变' }
    ]
  }
];

// 情感表达方式选项
const emotionalExpressionOptions = [
  '直接表达感受',
  '通过行动表示',
  '需要时间消化',
  '倾向于理性沟通',
  '喜欢写下来',
  '与亲密的人分享'
];

// 生活习惯相关问题
const lifestyleQuestions = [
  {
    id: 'schedule',
    title: '日常作息倾向',
    options: [
      '早起早睡型',
      '夜猫子型',
      '规律作息型',
      '弹性作息型'
    ]
  },
  {
    id: 'leisure',
    title: '休闲活动偏好',
    options: [
      '户外运动',
      '文艺创作',
      '阅读学习',
      '社交聚会',
      '游戏娱乐',
      '旅行探索'
    ],
    multiple: true
  }
];

export default function PersonalityTraitsStep() {
  const { state, dispatch } = useAssessment();
  const [formData, setFormData] = useState<FormData>({
    mbtiResult: state.formData.personalityTraits?.mbtiResult || {},
    bigFiveResult: state.formData.personalityTraits?.bigFiveResult || {},
    emotionalExpression: state.formData.personalityTraits?.emotionalExpression || [],
    lifestyle: {
      schedule: state.formData.personalityTraits?.lifestyle?.schedule || '',
      preferences: state.formData.personalityTraits?.lifestyle?.preferences || []
    }
  });
  const [currentSection, setCurrentSection] = useState(1); // 1: MBTI, 2: 情感表达, 3: 生活习惯
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateSection = () => {
    const newErrors: Record<string, string> = {};

    if (currentSection === 1) {
      mbtiQuestions.forEach(q => {
        const result = formData.mbtiResult[q.id];
        if (!result) {
          newErrors[q.id] = '请选择一个选项';
        }
      });
    } else if (currentSection === 2) {
      if (!formData.emotionalExpression.length) {
        newErrors.emotionalExpression = '请至少选择一种表达方式';
      }
    } else if (currentSection === 3) {
      if (!formData.lifestyle.schedule) {
        newErrors.schedule = '请选择作息倾向';
      }
      if (!formData.lifestyle.preferences.length) {
        newErrors.preferences = '请至少选择一个休闲活动';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection()) {
      if (currentSection < 3) {
        setCurrentSection(currentSection + 1);
      } else {
        // 完成所有部分
        const personalityTraits: PersonalityTraits = {
          mbtiResult: formData.mbtiResult,
          bigFiveResult: formData.bigFiveResult,
          emotionalExpression: formData.emotionalExpression,
          lifestyle: formData.lifestyle
        };
        
        dispatch({ type: 'UPDATE_PERSONALITY_TRAITS', payload: personalityTraits });
        dispatch({
          type: 'UPDATE_PROGRESS',
          payload: {
            stepProgress: [100, 100, 0, 0],
            currentStepCompletion: 100
          }
        });
        dispatch({ type: 'SET_STEP', payload: 3 });
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    } else {
      dispatch({ type: 'SET_STEP', payload: 1 });
    }
  };

  const renderMBTISection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">MBTI 性格测评</h3>
      {mbtiQuestions.map((question) => (
        <div key={question.id} className="space-y-4">
          <p className="font-medium text-gray-900">{question.text}</p>
          <div className="grid grid-cols-2 gap-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setFormData({
                    ...formData,
                    mbtiResult: {
                      ...formData.mbtiResult,
                      [question.id]: option.value
                    }
                  });
                }}
                className={`p-4 text-left rounded-lg border ${
                  formData.mbtiResult[question.id] === option.value
                    ? 'border-primary bg-primary-50 text-primary'
                    : 'border-gray-200 hover:border-primary'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
          {errors[question.id] && (
            <p className="text-sm text-red-600">{errors[question.id]}</p>
          )}
        </div>
      ))}
    </div>
  );

  const renderEmotionalExpressionSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">情感表达方式</h3>
      <p className="text-gray-600">选择最符合您的情感表达方式（可多选）</p>
      <div className="grid grid-cols-2 gap-3">
        {emotionalExpressionOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              const current = formData.emotionalExpression || [];
              const updated = current.includes(option)
                ? current.filter(o => o !== option)
                : [...current, option];
              setFormData({ ...formData, emotionalExpression: updated });
            }}
            className={`p-4 text-left rounded-lg border ${
              formData.emotionalExpression?.includes(option)
                ? 'border-primary bg-primary-50 text-primary'
                : 'border-gray-200 hover:border-primary'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {errors.emotionalExpression && (
        <p className="text-sm text-red-600">{errors.emotionalExpression}</p>
      )}
    </div>
  );

  const renderLifestyleSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">生活习惯</h3>
      {lifestyleQuestions.map((question) => (
        <div key={question.id} className="space-y-4">
          <p className="font-medium text-gray-900">{question.title}</p>
          <div className="grid grid-cols-2 gap-3">
            {question.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  if (question.id === 'schedule') {
                    setFormData({
                      ...formData,
                      lifestyle: { ...formData.lifestyle, schedule: option }
                    });
                  } else {
                    const current = formData.lifestyle?.preferences || [];
                    const updated = current.includes(option)
                      ? current.filter(o => o !== option)
                      : [...current, option];
                    setFormData({
                      ...formData,
                      lifestyle: { ...formData.lifestyle, preferences: updated }
                    });
                  }
                }}
                className={`p-4 text-left rounded-lg border ${
                  question.id === 'schedule'
                    ? formData.lifestyle?.schedule === option
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-gray-200 hover:border-primary'
                    : formData.lifestyle?.preferences?.includes(option)
                    ? 'border-primary bg-primary-50 text-primary'
                    : 'border-gray-200 hover:border-primary'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {errors[question.id] && (
            <p className="text-sm text-red-600">{errors[question.id]}</p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">个性特征测评</h2>
        <div className="mt-4 flex space-x-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full ${
                step <= currentSection ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {currentSection === 1 && renderMBTISection()}
      {currentSection === 2 && renderEmotionalExpressionSection()}
      {currentSection === 3 && renderLifestyleSection()}

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={handlePrevious}
          className="px-6 py-2 text-gray-600 hover:text-gray-900"
        >
          上一步
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          {currentSection === 3 ? '下一步' : '继续'}
        </button>
      </div>
    </div>
  );
} 