// Performance optimization utilities

// Image optimization settings
export const IMAGE_OPTIMIZATION = {
  // WebP format for better compression
  format: 'webp',
  // Quality settings for different use cases
  quality: {
    hero: 85,
    portfolio: 80,
    avatar: 75,
    thumbnail: 70
  },
  // Responsive image sizes
  sizes: {
    hero: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    portfolio: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    avatar: '(max-width: 768px) 50px, 48px'
  }
}

// Lazy loading configuration
export const LAZY_LOADING = {
  // Intersection Observer options
  observerOptions: {
    rootMargin: '50px',
    threshold: 0.1
  },
  // Placeholder settings
  placeholder: {
    backgroundColor: '#f3f4f6',
    showSpinner: true
  }
}

// Caching strategies
export const CACHE_CONFIG = {
  // Static assets cache
  staticAssets: {
    maxAge: 31536000, // 1 year
    immutable: true
  },
  // API responses cache
  apiResponses: {
    maxAge: 3600, // 1 hour
    staleWhileRevalidate: 86400 // 1 day
  },
  // Images cache
  images: {
    maxAge: 2592000, // 30 days
    staleWhileRevalidate: 604800 // 7 days
  }
}

// Mobile optimization settings
export const MOBILE_OPTIMIZATION = {
  // Touch targets minimum size
  touchTargetSize: 44,
  // Viewport settings
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true
  },
  // Performance budgets
  performanceBudget: {
    maxImageSize: 500000, // 500KB
    maxTotalSize: 2000000, // 2MB
    maxLoadTime: 3000 // 3 seconds
  }
}

// Preload critical resources
export const CRITICAL_RESOURCES = [
  '/img/Connect.webp',
  '/img/BG.webp',
  // Add other critical images here
]

// Service Worker configuration
export const SERVICE_WORKER_CONFIG = {
  cacheName: 'connect-digitals-v1',
  strategies: {
    images: 'cacheFirst',
    api: 'networkFirst',
    static: 'cacheFirst'
  }
}

// Performance monitoring
export const PERFORMANCE_MONITORING = {
  // Core Web Vitals thresholds
  thresholds: {
    LCP: 2500, // Largest Contentful Paint
    FID: 100,  // First Input Delay
    CLS: 0.1   // Cumulative Layout Shift
  },
  // Metrics to track
  metrics: [
    'LCP',
    'FID', 
    'CLS',
    'TTFB', // Time to First Byte
    'FCP'   // First Contentful Paint
  ]
}
