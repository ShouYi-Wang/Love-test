import 'promise/polyfill';
import 'whatwg-fetch';
import 'intersection-observer';

export function loadPolyfills(): void {
  if (typeof window === 'undefined') return;

  // 动态导入 polyfills
  const loadDynamicPolyfills = async () => {
    // 检查 fetch 支持
    if (!window.fetch) {
      await import('whatwg-fetch');
    }
  };

  void loadDynamicPolyfills();
} 