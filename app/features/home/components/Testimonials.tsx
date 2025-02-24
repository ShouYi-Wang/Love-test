'use client';

import { TestimonialItem } from '../types';

const testimonials: TestimonialItem[] = [
  {
    content: '通过AI分析系统,我更好地了解了自己和伴侣的性格特点,让我们的关系更加和谐。',
    author: '张小姐',
    role: '已婚 2 年'
  },
  {
    content: '科学的测评帮助我找到了真正适合的伴侣,现在我们已经订婚了!',
    author: '李先生',
    role: '已订婚'
  },
  {
    content: 'AI顾问给了我很多实用的建议,帮助我走出了感情困境。',
    author: '王小姐',
    role: '恋爱中'
  }
];

export default function Testimonials() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            用户真实反馈
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            听听他们怎么说
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="px-6 py-8">
                  <div className="relative text-lg text-gray-700">
                    <svg
                      className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="relative">{testimonial.content}</p>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary" />
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-medium text-gray-900">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
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