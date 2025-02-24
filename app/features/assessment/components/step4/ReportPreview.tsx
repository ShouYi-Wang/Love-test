'use client';

import { AssessmentResult } from '../../types';
import { DIMENSION_LABELS, SCORE_LEVELS } from '../../constants';

interface ReportPreviewProps {
  result: AssessmentResult;
  onClose: () => void;
}

export default function ReportPreview({ result, onClose }: ReportPreviewProps) {
  const scoreLevel = Object.entries(SCORE_LEVELS)
    .find(([, { min }]) => result.overallScore >= min)?.[1]?.label || SCORE_LEVELS.POOR.label;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">测评报告预览</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            关闭
          </button>
        </div>

        {/* 总体评分 */}
        <div className="mb-8 p-6 bg-primary-50 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">总体契合度评分</h3>
          <div className="text-4xl font-bold text-primary">
            {result.overallScore}
            <span className="text-xl ml-1">分</span>
          </div>
          <p className="mt-2 text-gray-600">{scoreLevel}</p>
        </div>

        {/* 维度分析 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">维度详细分析</h3>
          <div className="space-y-4">
            {Object.entries(result.dimensionScores).map(([key, score]) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">
                    {DIMENSION_LABELS[key as keyof typeof DIMENSION_LABELS]}
                  </span>
                  <span className="text-gray-600">{score}分</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 优势与风险 */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-green-600 mb-4">优势领域</h3>
            <ul className="space-y-2">
              {result.strengthAreas.map((strength, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="mr-2 text-green-500">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-yellow-600 mb-4">需要关注</h3>
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
        <div>
          <h3 className="text-xl font-semibold mb-4">改善建议</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">短期行动计划</h4>
              <ul className="space-y-2">
                {result.recommendations.shortTerm.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="mr-2 text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">长期发展建议</h4>
              <ul className="space-y-2">
                {result.recommendations.longTerm.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="mr-2 text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">具体实践步骤</h4>
              <ul className="space-y-2">
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

        {/* 操作按钮 */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
} 