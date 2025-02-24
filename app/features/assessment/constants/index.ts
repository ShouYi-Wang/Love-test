export const STORAGE_KEY = 'assessment_progress';

export const SCORE_LEVELS = {
  EXCELLENT: { min: 85, label: '非常契合' },
  GOOD: { min: 70, label: '比较契合' },
  FAIR: { min: 60, label: '基本契合' },
  POOR: { min: 0, label: '需要努力' }
};

export const DIMENSION_LABELS = {
  personality: '性格特质',
  lifestyle: '生活习惯',
  values: '价值观念',
  communication: '沟通方式',
  growth: '成长意愿'
};

export const SHARE_CONFIG = {
  title: 'AI情感顾问测评结果',
  template: `
我在AI情感顾问完成了契合度测评!
总体契合度: {score}分
优势领域: {strengths}
快来测测看你的契合度吧!
`
}; 