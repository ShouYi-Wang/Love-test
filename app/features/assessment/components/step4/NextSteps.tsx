'use client';

export default function NextSteps() {
  return (
    <div className="mt-12 border-t pt-8">
      <h3 className="text-xl font-semibold text-gray-900">后续服务</h3>
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="p-6 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900">AI情感顾问</h4>
          <p className="mt-2 text-gray-600">
            获取更详细的分析和个性化建议
          </p>
          <button
            type="button"
            onClick={() => window.location.href = '/advisor'}
            className="mt-4 text-primary hover:text-primary-dark"
          >
            立即咨询 →
          </button>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900">情感社区</h4>
          <p className="mt-2 text-gray-600">
            分享经验,获取他人建议
          </p>
          <button
            type="button"
            onClick={() => window.location.href = '/community'}
            className="mt-4 text-primary hover:text-primary-dark"
          >
            加入社区 →
          </button>
        </div>
      </div>
    </div>
  );
} 