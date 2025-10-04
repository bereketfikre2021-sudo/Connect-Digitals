import React, { useEffect, useState } from 'react'

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    imageCount: 0,
    totalImageSize: 0,
    optimizedImages: 0
  })

  useEffect(() => {
    console.log('Performance monitoring initialized with native APIs')
    
    // Monitor page load performance
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navTiming = {
            domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
            loadComplete: entry.loadEventEnd - entry.loadEventStart,
            totalTime: entry.loadEventEnd - entry.fetchStart
          }
          console.log('Navigation timing:', navTiming)
          
          setMetrics(prev => ({
            ...prev,
            loadTime: Math.round(entry.loadEventEnd - entry.loadEventStart)
          }))
        }
        
        if (entry.entryType === 'resource' && entry.name.includes('/img/')) {
          // Log slow resources
          if (entry.duration > 1000) {
            console.warn(`Slow resource: ${entry.name} ${entry.duration}ms`)
          }
          
          setMetrics(prev => ({
            ...prev,
            imageCount: prev.imageCount + 1,
            totalImageSize: prev.totalImageSize + (entry.transferSize || 0),
            optimizedImages: entry.name.includes('?q=') ? prev.optimizedImages + 1 : prev.optimizedImages
          }))
        }
      })
    })

    observer.observe({ entryTypes: ['navigation', 'resource'] })

    // Monitor Core Web Vitals
    const vitalsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log(`LCP (Largest Contentful Paint): ${Math.round(entry.startTime)}ms`)
        }
        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
          console.log(`CLS (Cumulative Layout Shift): ${entry.value}`)
        }
      })
    })

    vitalsObserver.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] })

    // Count total images on page
    const images = document.querySelectorAll('img')
    setMetrics(prev => ({
      ...prev,
      imageCount: images.length
    }))

    // Monitor service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        console.log('SW registered: ', registration)
      })
    }

    return () => {
      observer.disconnect()
      vitalsObserver.disconnect()
    }
  }, [])

  // Always run monitoring in background, but never show UI
  // The monitoring data is still logged to console for development
  return null
}