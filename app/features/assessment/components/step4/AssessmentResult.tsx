'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { AssessmentResult } from '../../types';
import { useAssessmentStorage } from '../../hooks/useAssessmentStorage';
import { shareResults } from '../../utils/share';
import NextSteps from './NextSteps';
import { useAssessmentError } from '../../hooks/useAssessmentError';
import RetryButton from '../common/RetryButton';
import { generatePDF } from '../../utils/pdfGenerator';
import ReportPreview from './ReportPreview';
import AnimatedScore from '../common/AnimatedScore';
import { useRouter } from 'next/navigation';

// 模拟AI分析结果生成
function generateResults(): AssessmentResult {
  // 直接返回模拟数据
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
}

export default function AssessmentResultStep() {
  const { dispatch } = useAssessment();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const { error, handleError, clearError } = useAssessmentError();
  const { clearStorage } = useAssessmentStorage();
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  const generateAssessmentResults = useCallback(async () => {
    try {
      setLoading(true);
      clearError();
      const results = generateResults();
      setResult(results);
      dispatch({ type: 'SET_RESULTS', payload: results });
      dispatch({
        type: 'UPDATE_PROGRESS',
        payload: {
          stepProgress: [100, 100, 100, 100],
          currentStepCompletion: 100
        }
      });
    } catch (err) {
      handleError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, clearError, handleError]);

  useEffect(() => {
    const initResults = async () => {
      await generateAssessmentResults();
    };
    initResults();
  }, [generateAssessmentResults]);

  useEffect(() => {
    if (!loading && result) {
      clearStorage();
    }
  }, [loading, result, clearStorage]);

  const handleShare = async () => {
    try {
      if (result) {
        await shareResults(result);
      }
    } catch (err) {
      handleError(err as Error);
    }
  };

  const handleSave = async () => {
    try {
      if (!result) return;
      
      const doc = await generatePDF(result);
      
      // 生成文件名
      const fileName = `AI情感顾问测评报告_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // 保存PDF
      doc.save(fileName);
    } catch (err) {
      handleError(err as Error, { action: 'save_pdf' });
    }
  };

  const handleRetry = () => {
    generateAssessmentResults();
  };

  const handleBackToHome = () => {
    // 清除测评数据
    clearStorage();
    // 跳转到首页
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">正在生成分析报告...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <RetryButton onRetry={handleRetry} />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">生成报告时出现错误</p>
        <RetryButton onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">测评结果分析</h2>
        <p className="mt-2 text-gray-600">基于您的测评数据,我们生成了以下分析报告</p>
      </div>

      {/* 总体契合度 */}
      <div className="bg-primary-50 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900">总体契合度评分</h3>
        <div className="mt-4">
          <AnimatedScore value={result.overallScore} />
        </div>
        <p className="mt-2 text-gray-600">
          {result.overallScore >= 85 ? '非常契合' :
           result.overallScore >= 70 ? '比较契合' :
           result.overallScore >= 60 ? '基本契合' : '需要努力'}
        </p>
      </div>

      {/* 维度对比分析 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">维度对比分析</h3>
        {Object.entries(result.dimensionScores).map(([dimension, score]) => (
          <div key={dimension} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">
                {dimension === 'personality' ? '性格特质' :
                 dimension === 'lifestyle' ? '生活习惯' :
                 dimension === 'values' ? '价值观念' :
                 dimension === 'communication' ? '沟通方式' : '成长意愿'}
              </span>
              <span className="text-gray-600">{score}分</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 优势与风险 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-green-600">优势领域</h3>
          <ul className="space-y-2">
            {result.strengthAreas.map((strength, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <span className="mr-2 text-green-500">✓</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-yellow-600">需要关注</h3>
          <ul className="space-y-2">
            {result.riskAreas.map((risk, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <span className="mr-2 text-yellow-500">!</span>
                {risk}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 改善建议 */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">改善建议</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">短期行动计划</h4>
            <ul className="mt-2 space-y-2">
              {result.recommendations.shortTerm.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="mr-2 text-primary">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900">长期发展建议</h4>
            <ul className="mt-2 space-y-2">
              {result.recommendations.longTerm.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="mr-2 text-primary">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900">具体实践步骤</h4>
            <ul className="mt-2 space-y-2">
              {result.recommendations.practicalSteps.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="mr-2 text-primary">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 更新按钮组 */}
      <div className="flex justify-center space-x-4 pt-6">
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          预览报告
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          分享结果
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 border border-primary text-primary rounded-md hover:bg-primary-50"
        >
          保存报告
        </button>
      </div>

      {/* 添加返回首页按钮 */}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={handleBackToHome}
          className="text-gray-600 hover:text-gray-900 flex items-center"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
            />
          </svg>
          返回首页
        </button>
      </div>

      {/* 添加后续步骤引导 */}
      <NextSteps />

      {/* 预览模态框 */}
      {showPreview && result && (
        <ReportPreview
          result={result}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
} 