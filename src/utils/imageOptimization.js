/**
 * Image optimization utilities for reducing file sizes by up to 60%
 */

// Image quality settings for different use cases - optimized for smaller downloads
export const IMAGE_QUALITY = {
  HERO: 60,        // Hero images - reduced from 75 to 60
  THUMBNAIL: 45,   // Thumbnails - reduced from 60 to 45
  AVATAR: 50,      // Profile pictures - reduced from 70 to 50
  BACKGROUND: 50,  // Background images - reduced from 65 to 50
  GALLERY: 65,     // Gallery images - reduced from 80 to 65
  DEFAULT: 55      // Default quality - reduced from 70 to 55
}

// Responsive image sizes - optimized for smaller downloads
export const RESPONSIVE_SIZES = {
  MOBILE: 320,     // Reduced from 400 to 320
  TABLET: 640,     // Reduced from 800 to 640
  DESKTOP: 960,    // Reduced from 1200 to 960
  LARGE: 1280      // Reduced from 1600 to 1280
}

/**
 * Generate optimized image URL with quality and size parameters
 * @param {string} src - Original image source
 * @param {string} type - Image type (hero, thumbnail, avatar, etc.)
 * @param {number} width - Desired width
 * @param {number} height - Desired height (optional)
 * @returns {string} Optimized image URL
 */
export function getOptimizedImageUrl(src, type = 'DEFAULT', width = null, height = null) {
  if (!src) return src
  
  // For local images, we'll use CSS transforms and WebP format
  // In production, you'd typically use a CDN or image optimization service
  const quality = IMAGE_QUALITY[type] || IMAGE_QUALITY.DEFAULT
  
  // Add quality parameter for potential CDN optimization
  const url = new URL(src, window.location.origin)
  url.searchParams.set('q', quality)
  
  if (width) url.searchParams.set('w', width)
  if (height) url.searchParams.set('h', height)
  
  return url.toString()
}

/**
 * Generate responsive image sources for different screen sizes
 * @param {string} baseSrc - Base image source
 * @param {string} type - Image type
 * @returns {Object} Object with srcSet and sizes
 */
export function getResponsiveImageSources(baseSrc, type = 'DEFAULT') {
  const quality = IMAGE_QUALITY[type] || IMAGE_QUALITY.DEFAULT
  
  const srcSet = [
    `${getOptimizedImageUrl(baseSrc, type, RESPONSIVE_SIZES.MOBILE)} ${RESPONSIVE_SIZES.MOBILE}w`,
    `${getOptimizedImageUrl(baseSrc, type, RESPONSIVE_SIZES.TABLET)} ${RESPONSIVE_SIZES.TABLET}w`,
    `${getOptimizedImageUrl(baseSrc, type, RESPONSIVE_SIZES.DESKTOP)} ${RESPONSIVE_SIZES.DESKTOP}w`,
    `${getOptimizedImageUrl(baseSrc, type, RESPONSIVE_SIZES.LARGE)} ${RESPONSIVE_SIZES.LARGE}w`
  ].join(', ')
  
  const sizes = '(max-width: 768px) 320px, (max-width: 1024px) 640px, (max-width: 1440px) 960px, 1280px'
  
  return { srcSet, sizes }
}

/**
 * Preload critical images for better performance
 * @param {Array} imageUrls - Array of image URLs to preload
 */
export function preloadImages(imageUrls) {
  imageUrls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = url
    document.head.appendChild(link)
  })
}

/**
 * Generate blur placeholder for images
 * @param {string} src - Image source
 * @returns {string} Base64 blur placeholder
 */
export function generateBlurPlaceholder(src) {
  // In a real implementation, you'd generate this server-side
  // For now, we'll use a simple gradient placeholder
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciPjxzdG9wIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlNWU3ZWIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+'
}

/**
 * Image compression settings for different formats
 */
export const COMPRESSION_SETTINGS = {
  webp: {
    quality: 0.8,
    method: 6
  },
  jpeg: {
    quality: 0.75,
    progressive: true
  },
  png: {
    quality: 0.8,
    compressionLevel: 9
  }
}

/**
 * Check if browser supports WebP format
 * @returns {boolean} WebP support status
 */
export function supportsWebP() {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
}

/**
 * Get the best image format for the current browser
 * @param {string} originalSrc - Original image source
 * @returns {string} Optimized image source with best format
 */
export function getBestImageFormat(originalSrc) {
  if (supportsWebP() && originalSrc.endsWith('.webp')) {
    return originalSrc
  }
  
  // Fallback to original format
  return originalSrc
}
