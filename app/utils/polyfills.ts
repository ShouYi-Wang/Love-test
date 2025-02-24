export function loadPolyfills() {
  if (typeof window !== 'undefined') {
    // 按需加载 polyfills
    if (!window.Promise) {
      require('promise/polyfill');
    }
    
    if (!window.fetch) {
      require('whatwg-fetch');
    }
    
    if (!window.IntersectionObserver) {
      require('intersection-observer');
    }
  }
} 