'use client';

import React from 'react';

interface NavigationItem {
  name: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

const navigation = {
  main: [
    { name: '关于我们', href: '/about' },
    { name: '隐私政策', href: '/privacy' },
    { name: '使用条款', href: '/terms' },
    { name: '联系我们', href: '/contact' }
  ],
  social: [
    {
      name: '微信',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13v4h2V7h-2zm0 6v2h2v-2h-2z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      name: '微博',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 15h-9v-1.5h9V17zm0-3h-9v-1.5h9V14zm0-3h-9V9.5h9V11z"
            clipRule="evenodd"
          />
        </svg>
      )
    }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                {item.name}
              </a>
            </div>
          ))}
        </nav>

        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} AI情感顾问. 保留所有权利.
        </p>
      </div>
    </footer>
  );
} 