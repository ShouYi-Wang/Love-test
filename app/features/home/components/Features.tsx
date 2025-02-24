'use client';

import { FeatureItem } from '../types';

const features: FeatureItem[] = [
  {
    title: '智能测评系统',
    description: '基于先进AI算法的多维度个性测评,深入分析伴侣关系契合度。'
  },
  {
    title: 'AI情感顾问',
    description: '24小时在线的AI助手,为您提供专业的情感建议和关系指导。'
  },
  {
    title: '互动功能',
    description: '丰富的情侣互动游戏和任务,让感情升温充满乐趣。'
  },
  {
    title: '社区交流',
    description: '真实用户分享平台,倾听他人故事,获取情感经验。'
  }
];

export default function Features() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">核心功能</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            科技赋能情感分析
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            运用先进的AI技术,为您的感情生活保驾护航
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                        {/* 这里可以添加图标 */}
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 