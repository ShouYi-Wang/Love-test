import 'promise/polyfill';
import 'whatwg-fetch';
import 'intersection-observer';

export function loadPolyfills(): void {
  if (typeof window === 'undefined') return;

  // 动态导入 polyfills
  const loadDynamicPolyfills = async () => {
    if (!window.Promise) {
      await import('promise/polyfill');
    }
    
    if (!window.fetch) {
      await import('whatwg-fetch');
    }
    
    if (!window.IntersectionObserver) {
      await import('intersection-observer');
    }
  };

  void loadDynamicPolyfills();
} 