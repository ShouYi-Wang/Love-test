'use client';

const navigation = {
  main: [
    { name: '关于我们', href: '/about' },
    { name: '使用条款', href: '/terms' },
    { name: '隐私政策', href: '/privacy' },
    { name: '联系我们', href: '/contact' },
  ],
  social: [
    {
      name: '微信',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.04 4.86c.22 0 .42 0 .62.02 4.28 0 7.76 3.48 7.76 7.76 0 4.28-3.48 7.76-7.76 7.76-4.28 0-7.76-3.48-7.76-7.76 0-4.28 3.48-7.76 7.76-7.76.22-.02.42-.02.62-.02z" />
        </svg>
      ),
    },
    // 添加其他社交媒体图标
  ],
};

interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a
                href={item.href}
                className="text-base text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2024 AI情感顾问. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 