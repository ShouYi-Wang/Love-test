'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative bg-white pt-16 pb-32 overflow-hidden">
      <div className="relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div className="mt-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  AI驱动的情感分析
                  <br />
                  <span className="text-primary">遇见更好的爱情</span>
                </h1>
                <p className="mt-6 text-xl text-gray-500">
                  通过先进的AI技术，深入分析你们的契合度。让科技助力，找到真正适合的伴侣。
                </p>
                <div className="mt-8 flex space-x-4">
                  <Link
                    href="/assessment"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
                  >
                    开始测评
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-50 hover:bg-primary-100"
                  >
                    了解更多
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              {/* 这里可以添加Hero区域的图片或动画 */}
              <div className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none">
                {/* 占位图 */}
                <div className="w-full h-96 bg-gradient-to-r from-primary-light to-primary rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 