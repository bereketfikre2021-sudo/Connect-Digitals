import React, { useState, useRef, useEffect } from 'react'
import { 
  getOptimizedImageUrl, 
  getResponsiveImageSources, 
  generateBlurPlaceholder,
  getBestImageFormat,
  IMAGE_QUALITY 
} from '../utils/imageOptimization'

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/Connect Icon.svg',
  title,
  type = 'DEFAULT',
  priority = false,
  objectFit = 'cover',
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority) // Load immediately if priority
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const imgRef = useRef(null)

  // Get optimized image URL
  const optimizedSrc = getOptimizedImageUrl(src, type)
  const bestFormatSrc = getBestImageFormat(optimizedSrc)
  const responsiveSources = getResponsiveImageSources(src, type)
  const blurPlaceholder = generateBlurPlaceholder(src)

  useEffect(() => {
    // Skip intersection observer for priority images
    if (priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Reduced from 100px for faster loading
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

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

  const isFitWidth = objectFit === 'fitWidth'

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${isFitWidth ? 'min-h-[120px]' : ''} ${className}`}>
      {/* Blur Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <img
            src={blurPlaceholder}
            alt=""
            className={`w-full ${isFitWidth ? 'h-auto' : 'h-full'} ${objectFit === 'contain' ? 'object-contain' : objectFit === 'fitWidth' ? 'object-contain' : 'object-cover'} filter blur-sm scale-110`}
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-primaryNavy rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      
      {/* Actual Image */}
      {isInView && (
        <img
          src={hasError ? placeholder : bestFormatSrc}
          alt={alt || 'Professional graphic design and branding services by Connect Digitals in Addis Ababa, Ethiopia'}
          title={title || alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full ${isFitWidth ? 'h-auto' : 'h-full'} ${objectFit === 'contain' ? 'object-contain' : objectFit === 'fitWidth' ? 'object-contain' : 'object-cover'} transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={priority ? "high" : "auto"}
          {...props}
        />
      )}
    </div>
  )
}
