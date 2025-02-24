'use client';

import { useState } from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { PartnerPreference, RelationshipExpectationKey } from '../../types';

// 理想伴侣特质选项
const idealTraitsOptions = {
  personality: [
    '开朗活泼', '稳重可靠', '独立自主', '细心体贴',
    '有上进心', '幽默风趣', '理性冷静', '浪漫感性'
  ],
  lifestyle: [
    '生活规律', '爱好运动', '注重健康', '热爱旅行',
    '喜欢美食', '居家型', '社交型', '事业型'
  ],
  values: [
    '重视家庭', '追求事业', '向往自由', '注重精神生活',
    '物质主义', '环保主义', '传统保守', '开放创新'
  ]
};

// 关系期待程度问题
interface ExpectationQuestion {
  id: RelationshipExpectationKey;
  label: string;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
}

const expectationQuestions: ExpectationQuestion[] = [
  {
    id: 'commitment',
    label: '期望的承诺程度',
    min: 1,
    max: 10,
    minLabel: '开放关系',
    maxLabel: '完全忠诚'
  },
  {
    id: 'growthMindset',
    label: '成长意愿',
    min: 1,
    max: 10,
    minLabel: '保持现状',
    maxLabel: '持续进步'
  }
];

// 可接受度测评问题
const acceptanceLevels = [
  {
    id: 'toleranceScore',
    title: '差异容忍度',
    description: '您能接受伴侣与您有多大的差异？',
    min: 1,
    max: 5,
    labels: ['较低容忍', '适度容忍', '高度包容']
  },
  {
    id: 'compromiseWillingness',
    title: '妥协意愿度',
    description: '在发生分歧时,您愿意做出妥协的程度是？',
    min: 1,
    max: 5,
    labels: ['较少妥协', '适度妥协', '乐于妥协']
  }
];

// 冲突处理方式选项
const conflictResolutionOptions = [
  '及时沟通化解',
  '先冷静后解决',
  '寻求他人建议',
  '互相让步妥协',
  '记录分析问题',
  '转移注意力'
];

export default function PartnerPreferenceStep() {
  const { state, dispatch } = useAssessment();
  const [formData, setFormData] = useState<Partial<PartnerPreference>>(() => ({
    ...state.formData.partnerPreference,
    // 提供默认值
    relationshipExpectation: {
      commitment: 0,
      futurePlanning: [],
      growthMindset: 0,
      ...state.formData.partnerPreference?.relationshipExpectation
    }
  }));
  const [currentSection, setCurrentSection] = useState(1); // 1: 理想特质, 2: 关系期待, 3: 可接受度
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateSection = () => {
    const newErrors: Record<string, string> = {};

    if (currentSection === 1) {
      if (!formData.idealTraits?.personality?.length) {
        newErrors.personality = '请至少选择一个性格特质';
      }
      if (!formData.idealTraits?.lifestyle?.length) {
        newErrors.lifestyle = '请至少选择一个生活方式';
      }
      if (!formData.idealTraits?.values?.length) {
        newErrors.values = '请至少选择一个价值观';
      }
    } else if (currentSection === 2) {
      if (!formData.relationshipExpectation?.commitment) {
        newErrors.commitment = '请选择投入意愿程度';
      }
      if (!formData.relationshipExpectation?.growthMindset) {
        newErrors.growthMindset = '请选择成长意愿程度';
      }
    } else if (currentSection === 3) {
      if (!formData.acceptanceLevel?.toleranceScore) {
        newErrors.toleranceScore = '请选择容忍度';
      }
      if (!formData.acceptanceLevel?.compromiseWillingness) {
        newErrors.compromiseWillingness = '请选择妥协意愿度';
      }
      if (!formData.acceptanceLevel?.conflictResolution?.length) {
        newErrors.conflictResolution = '请至少选择一种冲突处理方式';
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
        dispatch({ type: 'UPDATE_PARTNER_PREFERENCE', payload: formData });
        dispatch({
          type: 'UPDATE_PROGRESS',
          payload: {
            stepProgress: [100, 100, 100, 0],
            currentStepCompletion: 100
          }
        });
        dispatch({ type: 'SET_STEP', payload: 4 });
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    } else {
      dispatch({ type: 'SET_STEP', payload: 2 });
    }
  };

  const handleTraitSelection = (
    category: 'personality' | 'lifestyle' | 'values',
    trait: string
  ) => {
    const currentTraits = formData.idealTraits?.[category] || [];
    const updatedTraits = currentTraits.includes(trait)
      ? currentTraits.filter(t => t !== trait)
      : [...currentTraits, trait];

    setFormData({
      ...formData,
      idealTraits: {
        personality: formData.idealTraits?.personality || [],
        lifestyle: formData.idealTraits?.lifestyle || [],
        values: formData.idealTraits?.values || [],
        [category]: updatedTraits
      }
    });
  };

  const renderIdealTraitsSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">理想伴侣特质</h3>
      
      {/* 性格特质 */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          期望的性格特质（可多选）
        </label>
        <div className="grid grid-cols-4 gap-3">
          {idealTraitsOptions.personality.map((trait) => (
            <button
              key={trait}
              type="button"
              onClick={() => handleTraitSelection('personality', trait)}
              className={`p-2 text-sm rounded-md border ${
                formData.idealTraits?.personality?.includes(trait)
                  ? 'border-primary bg-primary-50 text-primary'
                  : 'border-gray-200 hover:border-primary'
              }`}
            >
              {trait}
            </button>
          ))}
        </div>
        {errors.personality && (
          <p className="text-sm text-red-600">{errors.personality}</p>
        )}
      </div>

      {/* 生活方式 */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          期望的生活方式（可多选）
        </label>
        <div className="grid grid-cols-4 gap-3">
          {idealTraitsOptions.lifestyle.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => handleTraitSelection('lifestyle', style)}
              className={`p-2 text-sm rounded-md border ${
                formData.idealTraits?.lifestyle?.includes(style)
                  ? 'border-primary bg-primary-50 text-primary'
                  : 'border-gray-200 hover:border-primary'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
        {errors.lifestyle && (
          <p className="text-sm text-red-600">{errors.lifestyle}</p>
        )}
      </div>

      {/* 价值观 */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          期望的价值观（可多选）
        </label>
        <div className="grid grid-cols-4 gap-3">
          {idealTraitsOptions.values.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleTraitSelection('values', value)}
              className={`p-2 text-sm rounded-md border ${
                formData.idealTraits?.values?.includes(value)
                  ? 'border-primary bg-primary-50 text-primary'
                  : 'border-gray-200 hover:border-primary'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        {errors.values && (
          <p className="text-sm text-red-600">{errors.values}</p>
        )}
      </div>
    </div>
  );

  const renderExpectationSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">关系期待程度</h3>
      
      {expectationQuestions.map((question) => (
        <div key={question.id} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {question.label}
          </label>
          <input
            type="range"
            min={question.min}
            max={question.max}
            value={formData.relationshipExpectation?.[question.id] ?? 0}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setFormData(prev => ({
                ...prev,
                relationshipExpectation: {
                  commitment: prev.relationshipExpectation?.commitment ?? 0,
                  futurePlanning: prev.relationshipExpectation?.futurePlanning ?? [],
                  growthMindset: prev.relationshipExpectation?.growthMindset ?? 0,
                  [question.id]: value
                }
              }));
            }}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{question.minLabel}</span>
            <span>{question.maxLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAcceptanceSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">可接受度测评</h3>
      
      {acceptanceLevels.map((question) => (
        <div key={question.id} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {question.title}
            </label>
            <p className="mt-1 text-sm text-gray-500">{question.description}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              {question.labels.map((label, index) => (
                <span key={index} className="text-xs text-gray-500">
                  {label}
                </span>
              ))}
            </div>
            <input
              type="range"
              min={question.min}
              max={question.max}
              value={formData.acceptanceLevel?.[question.id] || 0}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  acceptanceLevel: {
                    ...formData.acceptanceLevel,
                    [question.id]: parseInt(e.target.value)
                  }
                });
              }}
              className="w-full"
            />
          </div>
          {errors[question.id] && (
            <p className="text-sm text-red-600">{errors[question.id]}</p>
          )}
        </div>
      ))}

      {/* 冲突处理方式 */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          倾向的冲突处理方式（可多选）
        </label>
        <div className="grid grid-cols-2 gap-3">
          {conflictResolutionOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                const current = formData.acceptanceLevel?.conflictResolution || [];
                const updated = current.includes(option)
                  ? current.filter(o => o !== option)
                  : [...current, option];
                setFormData({
                  ...formData,
                  acceptanceLevel: {
                    ...formData.acceptanceLevel,
                    conflictResolution: updated
                  }
                });
              }}
              className={`p-4 text-left rounded-lg border ${
                formData.acceptanceLevel?.conflictResolution?.includes(option)
                  ? 'border-primary bg-primary-50 text-primary'
                  : 'border-gray-200 hover:border-primary'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.conflictResolution && (
          <p className="text-sm text-red-600">{errors.conflictResolution}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">伴侣期望调研</h2>
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

      {currentSection === 1 && renderIdealTraitsSection()}
      {currentSection === 2 && renderExpectationSection()}
      {currentSection === 3 && renderAcceptanceSection()}

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
          {currentSection === 3 ? '查看结果' : '继续'}
        </button>
      </div>
    </div>
  );
} 