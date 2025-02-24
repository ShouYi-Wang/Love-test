'use client';

import { useState } from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { BasicInfo } from '../../types';

type Gender = 'male' | 'female' | 'other';
type RelationshipStatus = 'single' | 'dating' | 'married';
type AssessmentPurpose = 'findPartner' | 'evaluateRelation' | 'premaritalAssessment' | 'improveMarriage';

const ageRanges = ['18-24', '25-30', '31-35', '36-40', '40+'] as const;
const occupations = [
  '技术/IT', '金融/投资', '医疗/健康', '教育/培训',
  '销售/市场', '艺术/设计', '学生', '其他'
];
const educationLevels = ['高中及以下', '大专', '本科', '硕士', '博士'];
const genderOptions = [
  { value: 'male' as Gender, label: '男' },
  { value: 'female' as Gender, label: '女' },
  { value: 'other' as Gender, label: '其他' }
];
const relationshipStatuses = [
  { value: 'single' as RelationshipStatus, label: '单身' },
  { value: 'dating' as RelationshipStatus, label: '恋爱中' },
  { value: 'married' as RelationshipStatus, label: '已婚' }
];
const assessmentPurposes = [
  { value: 'findPartner' as AssessmentPurpose, label: '寻找潜在伴侣' },
  { value: 'evaluateRelation' as AssessmentPurpose, label: '评估当前关系' },
  { value: 'premaritalAssessment' as AssessmentPurpose, label: '婚前评估' },
  { value: 'improveMarriage' as AssessmentPurpose, label: '婚姻关系改善' }
];

interface FormEvent extends React.FormEvent {
  target: HTMLFormElement;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: React.ReactNode;
}

export default function BasicInfoStep() {
  const { state, dispatch } = useAssessment();
  const [formData, setFormData] = useState<Partial<BasicInfo>>(state.formData.basicInfo);
  const [errors, setErrors] = useState<Partial<Record<keyof BasicInfo, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BasicInfo, string>> = {};
    
    if (!formData.ageRange) newErrors.ageRange = '请选择年龄段';
    if (!formData.gender) newErrors.gender = '请选择性别';
    if (!formData.occupation?.length) newErrors.occupation = '请选择职业领域';
    if (!formData.education) newErrors.education = '请选择教育背景';
    if (!formData.relationshipStatus) newErrors.relationshipStatus = '请选择感情状态';
    if (!formData.assessmentPurpose) newErrors.assessmentPurpose = '请选择测评目的';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch({ type: 'UPDATE_BASIC_INFO', payload: formData });
      dispatch({ 
        type: 'UPDATE_PROGRESS', 
        payload: { 
          stepProgress: [100, 0, 0, 0],
          currentStepCompletion: 100 
        } 
      });
      dispatch({ type: 'SET_STEP', payload: 2 });
    }
  };

  const SelectButton = ({ selected, children, ...props }: ButtonProps) => (
    <button
      type="button"
      className={`px-4 py-2 text-sm rounded-md border ${
        selected
          ? 'border-primary bg-primary text-white'
          : 'border-gray-300 hover:border-primary'
      }`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">基础信息</h2>
        <p className="mt-1 text-gray-600">请填写您的基本信息,帮助我们更好地了解您</p>
      </div>

      <div className="space-y-4">
        {/* 年龄段 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">年龄段</label>
          <div className="mt-2 grid grid-cols-5 gap-3">
            {ageRanges.map((age) => (
              <button
                key={age}
                type="button"
                onClick={() => setFormData({ ...formData, ageRange: age })}
                className={`px-4 py-2 text-sm rounded-md border ${
                  formData.ageRange === age
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-primary'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
          {errors.ageRange && (
            <p className="mt-1 text-sm text-red-600">{errors.ageRange}</p>
          )}
        </div>

        {/* 性别 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">性别</label>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {genderOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, gender: option.value })}
                className={`px-4 py-2 text-sm rounded-md border ${
                  formData.gender === option.value
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-primary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
          )}
        </div>

        {/* 职业领域 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">职业领域 (可多选)</label>
          <div className="mt-2 grid grid-cols-4 gap-3">
            {occupations.map((occupation) => (
              <SelectButton
                key={occupation}
                selected={formData.occupation?.includes(occupation)}
                onClick={() => {
                  const current = formData.occupation || [];
                  const updated = current.includes(occupation)
                    ? current.filter(o => o !== occupation)
                    : [...current, occupation];
                  setFormData({ ...formData, occupation: updated });
                }}
              >
                {occupation}
              </SelectButton>
            ))}
          </div>
          {errors.occupation && (
            <p className="mt-1 text-sm text-red-600">{errors.occupation}</p>
          )}
        </div>

        {/* 教育背景 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">教育背景</label>
          <select
            value={formData.education || ''}
            onChange={handleChange}
            name="education"
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="">请选择</option>
            {educationLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.education && (
            <p className="mt-1 text-sm text-red-600">{errors.education}</p>
          )}
        </div>

        {/* 感情状况 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">感情状况</label>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {relationshipStatuses.map((status) => (
              <button
                key={status.value}
                type="button"
                onClick={() => setFormData({ ...formData, relationshipStatus: status.value })}
                className={`px-4 py-2 text-sm rounded-md border ${
                  formData.relationshipStatus === status.value
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-primary'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
          {errors.relationshipStatus && (
            <p className="mt-1 text-sm text-red-600">{errors.relationshipStatus}</p>
          )}
        </div>

        {/* 测评目标 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">测评目标</label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {assessmentPurposes.map((purpose) => (
              <button
                key={purpose.value}
                type="button"
                onClick={() => setFormData({ ...formData, assessmentPurpose: purpose.value })}
                className={`px-4 py-2 text-sm rounded-md border ${
                  formData.assessmentPurpose === purpose.value
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-primary'
                }`}
              >
                {purpose.label}
              </button>
            ))}
          </div>
          {errors.assessmentPurpose && (
            <p className="mt-1 text-sm text-red-600">{errors.assessmentPurpose}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          下一步
        </button>
      </div>
    </div>
  );
} 