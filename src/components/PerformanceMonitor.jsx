import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }

    // Monitor Core Web Vitals using native Performance API
    console.log('Performance monitoring initialized with native APIs')

    // Monitor performance metrics using native Performance API
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log('Navigation timing:', {
            domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
            loadComplete: entry.loadEventEnd - entry.loadEventStart,
            totalTime: entry.loadEventEnd - entry.fetchStart
          })
        }
        
        if (entry.entryType === 'resource') {
          // Log slow resources
          if (entry.duration > 1000) {
            console.warn('Slow resource:', entry.name, entry.duration + 'ms')
          }
        }
        
        // Monitor Core Web Vitals using native API
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP (Largest Contentful Paint):', entry.startTime + 'ms')
        }
        
        if (entry.entryType === 'first-input') {
          console.log('FID (First Input Delay):', entry.processingStart - entry.startTime + 'ms')
        }
        
        if (entry.entryType === 'layout-shift') {
          if (!entry.hadRecentInput) {
            console.log('CLS (Cumulative Layout Shift):', entry.value)
          }
        }
      }
    })

    observer.observe({ 
      entryTypes: [
        'navigation', 
        'resource', 
        'largest-contentful-paint', 
        'first-input', 
        'layout-shift'
      ] 
    })

    // Monitor memory usage
    if ('memory' in performance) {
      const logMemoryUsage = () => {
        const memory = performance.memory
        console.log('Memory usage:', {
          used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
        })
      }
      
      // Log memory usage every 30 seconds
      const memoryInterval = setInterval(logMemoryUsage, 30000)
      
      return () => {
        observer.disconnect()
        clearInterval(memoryInterval)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return null // This component doesn't render anything
}
