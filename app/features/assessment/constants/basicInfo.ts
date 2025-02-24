import { Gender, RelationshipStatus, AssessmentPurpose } from '../types';

export const ageRanges = ['18-24', '25-30', '31-35', '36-40', '40+'] as const;

export const occupations = [
  '技术/IT', '金融/投资', '医疗/健康', '教育/培训',
  '销售/市场', '艺术/设计', '学生', '其他'
] as const;

export const educationLevels = [
  '高中及以下', '大专', '本科', '硕士', '博士'
] as const;

export const genderOptions = [
  { value: 'male' as Gender, label: '男' },
  { value: 'female' as Gender, label: '女' },
  { value: 'other' as Gender, label: '其他' }
] as const;

export const relationshipStatuses = [
  { value: 'single' as RelationshipStatus, label: '单身' },
  { value: 'dating' as RelationshipStatus, label: '恋爱中' },
  { value: 'married' as RelationshipStatus, label: '已婚' }
] as const;

export const assessmentPurposes = [
  { value: 'findPartner' as AssessmentPurpose, label: '寻找潜在伴侣' },
  { value: 'evaluateRelation' as AssessmentPurpose, label: '评估当前关系' },
  { value: 'premaritalAssessment' as AssessmentPurpose, label: '婚前评估' },
  { value: 'improveMarriage' as AssessmentPurpose, label: '婚姻关系改善' }
] as const; 