import { AssessmentResult } from '../types';

// 模拟AI分析结果生成
export const generateResults = async (): Promise<AssessmentResult> => {
  return {
    overallScore: 85,
    dimensionScores: {
      personality: 82,
      lifestyle: 88,
      values: 85,
      communication: 86,
      growth: 84
    },
    strengthAreas: [
      '性格特质互补',
      '生活习惯契合',
      '共同成长意愿强'
    ],
    riskAreas: [
      '沟通方式存在差异',
      '对未来规划期待不同'
    ],
    recommendations: {
      shortTerm: [
        '建立定期沟通机制',
        '尝试对方感兴趣的活动',
        '共同制定近期目标'
      ],
      longTerm: [
        '深入了解彼此的价值观',
        '制定共同的人生规划',
        '建立健康的冲突处理机制'
      ],
      practicalSteps: [
        '每周安排固定约会时间',
        '学习积极倾听技巧',
        '记录共同的美好时刻',
        '定期回顾和调整目标'
      ]
    }
  };
}; 