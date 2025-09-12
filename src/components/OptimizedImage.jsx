import React, { useState, useRef, useEffect } from 'react'

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/img/Connect.webp',
  title,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
    setHasError(false)
    setRetryCount(0)
  }

  const handleError = () => {
    if (retryCount < 2) {
      // Retry loading the image
      setRetryCount(prev => prev + 1)
      setTimeout(() => {
        const img = new Image()
        img.src = src
        img.onload = handleLoad
        img.onerror = handleError
      }, 1000 * retryCount) // Exponential backoff
    } else {
      setHasError(true)
      setIsLoaded(true)
    }
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-primaryNavy rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Actual Image */}
      {isInView && (
        <img
          src={hasError ? placeholder : src}
          alt={alt || 'Connect Digitals image'}
          title={title || alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}
    </div>
  )
}
